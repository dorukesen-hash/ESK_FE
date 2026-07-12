"use client";

import React, { useCallback, useEffect, useMemo, useState, useContext } from "react";
import BreadCrumbs from "@/components/pageLayouts/BreadCrumbs";
import { getOrders } from "@/hooks/Api";
import { AppContext } from "@/Context/AppContext";
import { useParams, useRouter } from "next/navigation";

const formatDate = (d) => {
  if (!d) return "-";
  try {
    const date = typeof d === "string" || typeof d === "number" ? new Date(d) : d;
    if (isNaN(date.getTime())) return "-";
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  } catch {
    return "-";
  }
};

const buildShipTo = (ord) => {
  const s = ord?.shipment || {};
  const first = s.firstline || ord?.firstline || "";
  const second = s.secondline || ord?.secondline || "";
  const city = s.city || ord?.city || "";
  const state = s.state || ord?.state || "";
  const zip = s.zip || ord?.zip || "";
  const line1 = [first, second].filter(Boolean).join(" ");
  const line2 = [city, state, zip].filter(Boolean).join(", ").replace(", ,", ",");
  return [line1, line2].filter(Boolean).join(" | ") || "-";
};

const guessShipVia = (ord) => {
  return ord?.ship_via || ord?.shipVia || ord?.shippingCarrier || ord?.carrier || "-";
};

const extractTracking = (ord) => {
  return ord?.shipment?.tracking || ord?.trackingNumber || ord?.tracking || null;
};

const getRecipientName = (ord) => {
  const s = ord?.shipment || {};
  return (
    s.name || ord?.name || ord?.billing?.name || ord?.customer?.name || ""
  );
};

const buildShipToLines = (ord) => {
  const s = ord?.shipment || {};
  const lines = [];
  const recipient = getRecipientName(ord);
  const first = s.firstline || ord?.firstline || "";
  const second = s.secondline || ord?.secondline || "";
  const city = s.city || ord?.city || "";
  const state = s.state || ord?.state || "";
  const zip = s.zip || ord?.zip || "";
  if (recipient) lines.push(recipient);
  if (first) lines.push(first);
  if (second) lines.push(second);
  const cityLine = [city, state, zip].filter(Boolean).join(", ").replace(", ,", ",");
  if (cityLine) lines.push(cityLine);
  return lines.length ? lines : ["-"];
};

function findOrderFromPayload(payload, orderNoParam) {
  const list = Array.isArray(payload) ? payload : (Array.isArray(payload?.orders) ? payload.orders : []);
  if (!list.length) return null;
  const strParam = String(orderNoParam);
  const byOrderNumber = list.find((o) => String(o.orderNumber ?? o.orderNo ?? o.order_number ?? o.number ?? o.id) === strParam);
  if (byOrderNumber) return byOrderNumber;
  // Fallback: uniqueId veya tracking eşleşmesi
  const byUnique = list.find((o) => String(o.uniqueId ?? "") === strParam);
  if (byUnique) return byUnique;
  return null; // yanlış sipariş göstermemek için fallback kaldırıldı
}

export default function Page() {
  const { state } = useContext(AppContext);
  const router = useRouter();
  const params = useParams();
  const orderNo = params?.orderNo;

  useEffect(() => {
    if (!state?.user) {
      router.push("/auth/login");
    }
  }, [state?.user, router]);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = useCallback(async () => {
    if (!orderNo) return;
    setLoading(true);
    setError(null);
    try {
      // Backend hangi parametreyle arıyorsa ikisini de gönderiyoruz; yok sayılanı backend filtrelemezse sorun olmaz.
      const payload = await getOrders({ q: orderNo, orderNumber: orderNo });
      const found = findOrderFromPayload(payload, orderNo);
      setOrder(found || null);
    } catch (err) {
      console.error("Failed to fetch order details", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [orderNo]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const shipmentDetails = useMemo(() => {
    const ord = order || {};
    return {
      shipVia: guessShipVia(ord) || "-",
      packageCount: ord.packageCount ?? (Array.isArray(ord.packages) ? ord.packages.length : undefined) ?? "-",
      status: ord.orderstatus?.name || ord.status || ord.closure || "-",
      tracking: extractTracking(ord) || "-",
      deliveredOn: formatDate(ord.delivered_on || ord.deliveryDate || ord.shipment?.delivered_on || null),
      signedBy: ord.signed_by || ord.shipment?.signed_by || "-",
    };
  }, [order]);

  const orderDetails = useMemo(() => {
    const ord = order || {};
    return {
      orderNo: ord.orderNumber || ord.orderNo || ord.order_number || ord.number || ord.id || "-",
      poNumber: ord.poNumber || ord.po || "-",
      orderDate: formatDate(ord.createdAt || ord.orderDate || ord.ordertime || ord.created_at || null),
      dateShipped: formatDate(ord.shipment_date || ord.date_of_closure || null),
      invoiceNo: ord.invoiceNumber || ord.invoice?.number || ord.invoiceId || "-",
      shipTo: buildShipTo(ord),
    };
  }, [order]);

  return (
    <div className="w-full h-full bg-white p-1 flex flex-col items-center">
      <div className="w-full max-w-[1440px]">
        <BreadCrumbs hideSegments={['auth']} />
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[28px] tablet:text-[32px] font-bold text-text-dark">Tracking Details</h1>
            <button
              className="text-custom-blue hover:underline text-sm cursor-pointer"
              onClick={() => router.push("/auth/my-account/track-orders")}
            >
              ← Back to Track Orders
            </button>
          </div>

          {loading ? (
            <div className="p-4 border border-border-gray rounded-lg text-text-light">Yükleniyor…</div>
          ) : error ? (
            <div className="mb-3 p-3 rounded-md border border-red-300 text-red-700 bg-red-50">
              Detaylar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
            </div>
          ) : !order ? (
            <div className="p-4 border border-border-gray rounded-lg text-text-light">Order not found.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {/* Shipment Details */}
              <div>
                <h2 className="text-[20px] font-semibold text-text-dark mb-3 pl-4">Shipment Details</h2>
                <div className="border border-border-gray rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-[14px]">
                    {/* Left column */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start text-text-dark">
                        <div className="w-40 shrink-0 font-semibold">Ship Via:</div>
                        <div className="flex-1">{shipmentDetails.shipVia}</div>
                      </div>
                      <div className="flex items-start text-text-dark">
                        <div className="w-40 shrink-0 font-semibold">Package Count:</div>
                        <div className="flex-1">{shipmentDetails.packageCount}</div>
                      </div>
                      <div className="flex items-start text-text-dark">
                        <div className="w-40 shrink-0 font-semibold">Status:</div>
                        <div className="flex-1">{shipmentDetails.status}</div>
                      </div>
                      <div className="flex items-start text-text-dark">
                        <div className="w-40 shrink-0 font-semibold">Tracking #:</div>
                        <div className="flex-1">
                          {shipmentDetails.tracking !== '-' ? (
                            <a
                              className="text-custom-blue hover:underline"
                              href={`https://parcelsapp.com/en/tracking/${encodeURIComponent(String(shipmentDetails.tracking))}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {shipmentDetails.tracking}
                            </a>
                          ) : '-'}
                        </div>
                      </div>
                    </div>
                    {/* Right column */}
                    <div className="flex flex-col gap-2 md:justify-end">
                      <div className="flex items-start text-text-dark">
                        <div className="w-40 shrink-0 font-semibold">Delivered On:</div>
                        <div className="flex-1">{shipmentDetails.deliveredOn}</div>
                      </div>
                      <div className="flex items-start text-text-dark">
                        <div className="w-40 shrink-0 font-semibold">Signed By:</div>
                        <div className="flex-1">{shipmentDetails.signedBy}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div>
                <h2 className="text-[20px] font-semibold text-text-dark mb-3 pl-4">Order Details</h2>
                <div className="border border-border-gray rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-[14px]">
                    {/* Left column */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start text-text-dark">
                        <div className="w-40 shrink-0 font-semibold">Order #:</div>
                        <div className="flex-1">{orderDetails.orderNo}</div>
                      </div>
                      <div className="flex items-start text-text-dark">
                        <div className="w-40 shrink-0 font-semibold">PO #:</div>
                        <div className="flex-1">{orderDetails.poNumber}</div>
                      </div>
                      <div className="flex items-start text-text-dark">
                        <div className="w-40 shrink-0 font-semibold">Order Date:</div>
                        <div className="flex-1">{orderDetails.orderDate}</div>
                      </div>
                      <div className="flex items-start text-text-dark">
                        <div className="w-40 shrink-0 font-semibold">Date Shipped:</div>
                        <div className="flex-1">{orderDetails.dateShipped}</div>
                      </div>
                      <div className="flex items-start text-text-dark">
                        <div className="w-40 shrink-0 font-semibold">Invoice #:</div>
                        <div className="flex-1">{orderDetails.invoiceNo}</div>
                      </div>
                    </div>
                    {/* Right column */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start text-text-dark">
                        <div className="w-40 shrink-0 font-semibold">Ship To:</div>
                        <div className="flex-1">
                          {buildShipToLines(order).map((ln, i) => (
                            <div key={`shipto-${i}`}>{ln}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
