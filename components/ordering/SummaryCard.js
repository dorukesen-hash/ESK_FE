import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/Context/AppContext";
import Link from "next/link";
import api from "@/hooks/Api";
import {useDiscountCode} from "@/hooks/useDiscountCode";


export default function SummaryCard() {
    const {order} = useContext(AppContext);
    const [total, setTotal]  = useState(0);
    const [tax, setTax] = useState(0);
    const [canProceed, setCanProceed] = useState(false);
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponInput, setCouponInput] = useState("");
    const {discountCode, preview, isApplying, error, applyCode, removeCode} = useDiscountCode();

    useEffect(() => {
        if (!order?.items) return;
        let tempTotal = 0;
        order.items.forEach(item => {
            tempTotal += item.price;
        });
        setTotal(tempTotal);
    }, [order.items])

    useEffect( () => {
        // Toplam veya alıcı hazır değilse çalıştırma
        if (total <= 0) return;
        if (!order?.recipient) return;

        (async () => {
            try {
                const res = await api.post("/stripe/calculate-tax", {
                    amount: total,
                    recipient: order.recipient
                });
                // Stripe miktarlar en küçük para biriminde gelir (cent). UI için dolara çevir.
                const data = res?.data;
                const taxCents = data?.tax_amount_inclusive ?? data?.tax_amount_exclusive ?? 0;
                setTax((taxCents || 0) / 100);
            } catch (e) {
                console.error("Vergi hesaplama hatası:", e);
                setTax(0);
            }
        })();

    },    [total, order.recipient, order.shipping]);

    useEffect(() => {
        if (order.recipient.firstname &&
        order.recipient.lastname &&
        order.recipient.firstline &&
        order.recipient.state &&
        order.recipient.city &&
        order.shipping.carrier) {
            setCanProceed(true);
        }
    },[order.recipient, order.shipping]);

    const discountAmount = preview?.applied ? preview.discountAmount : 0;
    const orderTotal = total - discountAmount + order.shipping.price + tax;

    return (
      <div className="scale-70 tablet:scale-85 laptop:scale-100 w-[350px] h-[478px] bg-[#FAFAFD] rounded-[10px] shadow-md shadow-border-gray p-6 text-text-dark text-[22px]">
        <h2 className="text-[20px] font-[700] mb-6">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items: ({order.items.length})</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping:</span>
          <span>${order?.shipping?.price?.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span>Est. Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between mb-4 text-custom-button-green">
            <span>Discount ({discountCode}):</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <hr className="border-gray-300 mb-4" />

        <div className="flex justify-between font-[600] text-[18px] mb-6">
          <span>Order Total:</span>
          <span>${orderTotal.toFixed(2)}</span>
        </div>

        {discountCode ? (
          <div className="flex items-center gap-2 mb-2 text-[13px]">
            <span className="text-custom-button-green font-medium">
              &quot;{discountCode}&quot;{preview?.applied ? "" : preview?.message ? " (not applied)" : ""}
            </span>
            <button onClick={removeCode} className="text-red-600 underline cursor-pointer">Remove</button>
          </div>
        ) : showCouponInput ? (
          <div className="flex items-center gap-2 mb-2 text-[13px]">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-[13px] w-[110px]"
              placeholder="Code"
            />
            <button
              onClick={() => applyCode(couponInput)}
              disabled={isApplying || !couponInput.trim()}
              className="bg-gray-200 px-2 py-1 rounded shadow-sm disabled:opacity-50"
            >
              {isApplying ? "..." : "Apply"}
            </button>
          </div>
        ) : (
          <p
            onClick={() => setShowCouponInput(true)}
            className="text-[14px] text-[#3686c7] font-medium mb-2 cursor-pointer"
          >
            Have a coupon?
          </p>
        )}
        {error && <p className="text-[12px] text-red-600 mb-2">{error}</p>}

        <p className="text-[13px] leading-[1.4] mb-6">
          By counting, I affirm that my shipping destination has a receiving
          dock that is accessible and is able to receive LTL shipments.
        </p>
          <Link
              href="/cart/payment"
              className={`w-full p-6 text-white font-[600] text-[16px] py-3 rounded-[12px] ${
                  !canProceed
                      ? "bg-gray-400 cursor-not-allowed pointer-events-none"
                      : "bg-custom-blue cursor-pointer hover:bg-custom-button-green"
              }`}
          >
              {canProceed ? 'Proceed to Payment' : 'Fill required fields'}
          </Link>
      </div>
    );
}
