import { AppContext } from "@/Context/AppContext";
import { useContext, useState, useEffect } from "react";
import StripeModal from "./StripeModal";
import PaymentPage from "./CheckOut";
import {calculatePrice} from "@/hooks/service";


export function PaymentInfo() {
  const {order, state} = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discount, setDiscount] = useState(0);

    const normalizedFields = {
            cart: state.detailedCart?.map((product) => ({
                title: product.title || "-",
                quantity: product.quantity || 0,
                sku: product.stock || "-",
                price: calculatePrice(product) / product.quantity || 0,
                total: calculatePrice(product) || 0
            })),
            shipTo: {
                name: `${order.recipient?.firstname + " " + order.recipient?.lastname || ""}`,
                email: order.recipient?.email || "",
                phone: order.recipient?.phone || "",
                line1: order.recipient?.firstline || "",
                line2: order.recipient?.secondline || "",
                city: order.recipient?.city || "",
                state: order.recipient?.state || "",
                zip: order.recipient?.zip || "",
            },
            method: {
                carrier: order.shipping?.carrier || " ",
                price: order.shipping?.price ? order.shipping.price : 0
            },
            billing: {
                name: `${order.billing?.firstname + " " + order.billing?.lastname || ""}`,
                email: order.billing?.email || "",
                phone: order.billing?.phone || "",
                line1: order.billing?.firstline || "",
                line2: order.billing?.secondline || "",
                city: order.billing?.city || "",
                state: order.billing?.state || "",
                zip: order.billing?.zip || "",
            }
    };

    // İndirim hesaplaması için useEffect
    useEffect(() => {
      if(state.user?.firstOrder){
        setDiscount(normalizedFields.cart.reduce((acc, item) => acc + item.total, 0)*0.1);
      } else {
        setDiscount(0);
      }
    }, [state.user?.firstOrder, normalizedFields.cart])

  return (
      <div className="w-[720px] mx-auto p-6 bg-white rounded-md shadow-md space-y-6">
        {/* Payment Information */}
        <div>
          <h2 className="text-[22px] font-semibold mb-[48px]">Payment Information</h2>
            <div className="w-full grid grid-cols-12 gap-4 mb-8 text-[16px]">
                <div className=" col-span-2 font-semibold">Cart</div>
                <div className="w-full col-span-10 space-y-4">
                    {normalizedFields.cart.map((item, index) => (
                        <div key={index} className="grid grid-cols-10 space-x-2">
                            <div className="col-span-7">
                                <span className="font-semibold">{item.title} </span><br/>
                                <span className="font-normal">Quantity: {item.quantity}</span>
                            </div>
                            <div className="col-span-3 font-semibold">${item.total.toFixed(2)}</div>
                        </div>
                    ))}
                    <div className="w-full grid grid-cols-10">
                            {state.user?.firstOrder &&
                                <div className="col-span-10 grid grid-cols-10">
                                    <span className="col-span-7">Discount</span>
                                    <span className="col-span-2">${discount.toFixed(2)}</span>
                                </div> }
                            <span className="col-span-7 font-semibold">Total </span>
                            <span className="col-span-2 font-semibold">${(normalizedFields.cart.reduce((acc, item) => acc + item.total, 0) - discount).toFixed(2)}</span>
                    </div>
                </div>

                <hr className="col-span-12 border-[#BDC2C7]" />
                <div className="col-span-2 font-semibold">Method</div>
                <div className="grid grid-cols-10 space-x-2 col-span-10">
                    <span className="col-span-7">{normalizedFields.method.carrier} </span>
                    <span className="col-span-3">${normalizedFields.method.price} </span>
                </div>

                <hr className="col-span-12 border-[#BDC2C7]" />
                <div className="col-span-2 font-semibold">Ship To</div>
                <div className="w-full col-span-5 space-y-4 ont-medium">
                    <span >{normalizedFields.shipTo.name} </span><br/>
                    <span >{normalizedFields.shipTo.email} </span><br/>
                    <span >{normalizedFields.shipTo.phone} </span>
                </div>
                <div className="w-full col-span-5">
                    <span >{normalizedFields.shipTo.line1} </span><br/>
                    <span >{normalizedFields.shipTo.line2} </span><br/>
                    <span >{normalizedFields.shipTo.city + normalizedFields.shipTo.state + normalizedFields.shipTo.zip } </span>
                </div>

                <hr className="col-span-12 border-[#BDC2C7]" />
                <div className="col-span-2 font-semibold">Bill To</div>
                <div className="w-full col-span-5 space-y-4 ont-medium">
                    <span >{normalizedFields.billing.name} </span><br/>
                    <span >{normalizedFields.billing.email} </span><br/>
                    <span >{normalizedFields.billing.phone} </span>
                </div>
                <div className="w-full col-span-5">
                    <span >{normalizedFields.billing.line1} </span><br/>
                    <span >{normalizedFields.billing.line2} </span><br/>
                    <span >{normalizedFields.billing.city + normalizedFields.shipTo.state + normalizedFields.shipTo.zip } </span>
                </div>
            </div>
        </div>
        {/* Payment Type */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Type</h2>
          <div className="space-y-3">
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full h-[62px]  bg-[#4A90E2] cursor-pointer text-white font-[600] py-2 rounded flex items-center justify-center gap-2"
            >
              <span>
                  <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 3.08527V1.78894C22 0.803725 21.207 0 20.2349 0H1.76512C0.793023 0 0 0.803725 0 1.78894V3.08527H22Z" fill="white"/>
                    <path d="M0 5.15918V12.2112C0 13.1964 0.793023 14.0002 1.76512 14.0002H20.2349C21.207 14.0002 22 13.1964 22 12.2112V5.15918H0ZM6.26744 11.226C6.26744 11.589 5.98605 11.8742 5.62791 11.8742H3.32558C2.96744 11.8742 2.68605 11.589 2.68605 11.226V9.92968C2.68605 9.5667 2.96744 9.28151 3.32558 9.28151H5.62791C5.98605 9.28151 6.26744 9.5667 6.26744 9.92968V11.226Z" fill="white"/>
                  </svg>
                  </span> Credit Card
            </button>
            <button
                className="w-full h-[62px] flex border border-[#4A90E2] items-center justify-center rounded hover:bg-blue-50"
            >
                <svg width="108" height="34" viewBox="0 0 108 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.30762 25.5651C1.47034 25.538 1.4161 25.3752 1.44322 25.2939C1.95853 22.9343 2.47383 20.6019 2.98913 18.2423C3.74853 14.7708 4.50793 11.2722 5.26732 7.80066C5.51141 6.60732 5.78262 5.44111 6.02672 4.24778C6.05384 4.05793 6.1352 3.97656 6.35217 3.97656C9.87793 3.97656 13.4308 3.97656 16.9566 4.00368C18.4211 4.00368 19.7772 4.43762 20.9163 5.38687C21.974 6.28187 22.6249 7.39384 22.7605 8.80415C23.0046 11.2451 22.2995 13.4419 20.8349 15.3675C19.8586 16.6422 18.5839 17.5101 17.0922 18.0796C15.9531 18.5136 14.7869 18.7034 13.5664 18.6763C12.1832 18.6763 10.8272 18.6763 9.44399 18.6763C9.25414 18.6763 9.17278 18.7305 9.11854 18.9204C8.76596 20.629 8.38626 22.3648 8.03369 24.0734C7.9252 24.6158 7.76248 25.1854 7.68111 25.7278C7.65399 25.9448 7.54551 25.9448 7.38278 25.9448C6.40641 25.9448 5.43005 25.9448 4.45368 25.9448C3.39595 25.9448 2.36535 25.9448 1.30762 25.9448C1.30762 25.8363 1.30762 25.7007 1.30762 25.5651ZM11.8035 14.4725C12.2104 14.4725 12.5901 14.4725 12.9969 14.4725C14.136 14.4725 15.031 13.9572 15.7904 13.1435C16.3328 12.574 16.604 11.8688 16.7396 11.1095C16.9837 9.75339 16.0887 8.50581 14.7055 8.45157C13.6749 8.42445 12.6714 8.45157 11.6408 8.45157C11.5052 8.45157 11.451 8.47869 11.4238 8.6143C11.3425 9.02112 11.234 9.40081 11.1526 9.80763C10.8272 11.2722 10.5017 12.7639 10.1491 14.2284C10.0949 14.4454 10.1763 14.4454 10.339 14.4454C10.8001 14.4725 11.3154 14.4725 11.8035 14.4725Z" fill="#11559D"/>
                    <path d="M39.3589 33.2419C39.7657 32.4283 40.2539 31.6689 40.7149 30.9095C41.61 29.3636 42.5321 27.8448 43.4271 26.2989C43.5356 26.1361 43.5627 25.9734 43.5356 25.7836C43.1287 22.8816 42.749 19.9796 42.3422 17.1048C41.9896 14.474 41.61 11.8704 41.2574 9.2396C41.2574 9.18536 41.2574 9.15824 41.2303 9.104C41.176 8.88703 41.2574 8.80566 41.5015 8.80566C43.0474 8.80566 44.5662 8.80566 46.1121 8.80566C46.2206 8.80566 46.329 8.80566 46.4375 8.80566C47.0613 8.83279 46.9528 8.67006 47.0071 9.34809C47.2783 12.1687 47.5224 14.9622 47.7665 17.7828C47.7936 18.1625 47.8207 18.5422 47.875 18.949C48.0106 18.8677 48.0377 18.7592 48.0648 18.6778C49.8277 15.5046 51.5906 12.3314 53.3263 9.13112C53.4619 8.88703 53.5975 8.80566 53.8688 8.80566C55.6045 8.83279 57.3674 8.80566 59.1032 8.80566C59.4557 8.80566 59.4557 8.80566 59.293 9.104C55.2248 16.3454 51.1838 23.5596 47.1156 30.801C46.7087 31.5333 46.2748 32.2927 45.868 33.0521C45.8409 33.1334 45.7866 33.1877 45.7595 33.269C43.6712 33.2419 41.5286 33.2419 39.3589 33.2419Z" fill="#11559D"/>
                    <path d="M57.4761 25.9448C57.6659 25.0769 57.8558 24.209 58.0456 23.314C59.239 17.8355 60.4323 12.357 61.6256 6.87854C61.8155 6.01066 62.0053 5.11566 62.1952 4.24778C62.2223 4.05793 62.3037 3.97656 62.5206 3.97656C65.9921 3.97656 69.4908 3.97656 72.9623 3.97656C74.7523 3.97656 76.2982 4.54611 77.5458 5.87505C78.6307 7.04126 79.0646 8.45157 78.9561 9.99748C78.7663 12.8181 77.6543 15.1776 75.349 16.9134C73.8031 18.0796 72.0131 18.5949 70.0875 18.6492C68.6229 18.6763 67.1312 18.6763 65.6667 18.6492C65.4226 18.6492 65.3412 18.7305 65.287 18.9475C64.7988 21.1986 64.2835 23.4496 63.7953 25.7007C63.7682 25.8634 63.714 25.9448 63.5512 25.9448C61.5985 25.9448 59.6187 25.9448 57.6659 25.9448C57.5846 25.9448 57.5574 25.9448 57.4761 25.9448ZM69.3823 8.45157C68.7585 8.45157 68.2703 8.45157 67.755 8.45157C67.5652 8.45157 67.5109 8.50581 67.4838 8.69566C67.1041 10.5399 66.6973 12.3842 66.2905 14.2284C66.2362 14.4725 66.3176 14.4996 66.5074 14.4996C67.294 14.4996 68.0805 14.4725 68.867 14.4996C69.979 14.5267 70.9282 14.1199 71.7147 13.3605C72.5284 12.574 72.9894 11.6248 72.9081 10.4857C72.8267 9.48218 72.1216 8.69566 71.1452 8.53293C70.5214 8.39733 69.8976 8.50581 69.3823 8.45157Z" fill="#2997D8"/>
                    <path d="M80.4748 13.6868C80.5562 12.9003 80.6646 12.1137 80.746 11.3272C80.8002 10.7848 80.8816 10.2424 80.9359 9.69995C80.9359 9.59147 80.9359 9.51011 81.0715 9.48298C82.2919 9.23889 83.4852 8.88632 84.7057 8.69647C87.011 8.34389 89.2892 8.28965 91.5403 8.88632C92.598 9.15753 93.5472 9.64571 94.2524 10.4865C95.066 11.4357 95.283 12.5477 95.1203 13.741C94.9033 15.3412 94.4694 16.8871 94.1439 18.4601C93.6286 20.8739 93.0862 23.2606 92.5709 25.6744C92.5166 25.8913 92.4353 25.9456 92.2183 25.9456C90.4825 25.9456 88.7468 25.9456 87.011 25.9456C86.7669 25.9456 86.7127 25.8913 86.7669 25.6473C86.8754 25.2133 86.9568 24.7523 87.0924 24.2369C86.8754 24.4268 86.7127 24.5353 86.5771 24.6709C84.7871 25.9727 82.8072 26.5151 80.6104 26.1626C78.6848 25.8371 77.4915 24.5353 77.2474 22.5826C77.0575 20.8197 77.383 19.1924 78.5492 17.8092C79.3628 16.8328 80.4477 16.2362 81.6139 15.8022C83.0784 15.2869 84.5972 15.0428 86.116 14.9072C87.0381 14.8259 87.9603 14.7988 88.8824 14.7988C89.0451 14.7988 89.1265 14.7716 89.1536 14.5818C89.3706 13.4427 88.801 12.7375 87.5263 12.5748C86.2787 12.4121 85.0312 12.5477 83.7836 12.7647C82.6716 12.9816 81.5596 13.2257 80.5019 13.6597C80.529 13.6868 80.5019 13.6868 80.4748 13.6868ZM87.1737 18.6771C86.7127 18.65 86.1431 18.6771 85.6007 18.7856C84.8413 18.9483 84.109 19.1653 83.5666 19.7891C82.6445 20.8739 83.1327 22.1757 84.5159 22.4469C84.9498 22.5283 85.3566 22.4741 85.7634 22.3656C86.6584 22.1757 87.3636 21.7418 87.7704 20.8739C88.0687 20.1959 88.123 19.4636 88.2857 18.7585C88.3128 18.6228 88.2044 18.65 88.1501 18.65C87.8518 18.6771 87.5534 18.6771 87.1737 18.6771ZM87.1195 24.2912C87.1195 24.2641 87.1195 24.2641 87.1195 24.2912V24.2912Z" fill="#2997D8"/>
                    <path d="M30.7344 24.2921C30.0292 24.9159 29.2427 25.4312 28.3477 25.7566C26.9374 26.2719 25.5 26.4618 24.0354 26.055C22.3539 25.5939 21.269 24.2921 21.1063 22.5563C20.9707 21.1189 21.1606 19.7357 21.9199 18.461C22.7336 17.105 23.9812 16.3184 25.4186 15.8031C26.856 15.2878 28.3477 15.0437 29.8665 14.9353C30.7615 14.8539 31.6565 14.8268 32.5786 14.8268C32.7685 14.8268 32.8227 14.7454 32.8498 14.6098C33.0125 13.6606 32.6057 13.0096 31.6836 12.7384C30.8428 12.4943 30.0021 12.5215 29.1613 12.6028C27.5069 12.7384 25.8797 13.091 24.3337 13.7148C24.3066 13.7148 24.2795 13.7148 24.2253 13.7148C24.3066 13.1181 24.3609 12.5215 24.4422 11.9248C24.5236 11.2196 24.605 10.5145 24.6863 9.80934C24.7134 9.61949 24.7677 9.53813 24.9847 9.48388C26.2322 9.18555 27.4527 8.86009 28.7274 8.67025C31.0056 8.34479 33.2566 8.31767 35.4806 9.02282C36.3756 9.29403 37.1892 9.72797 37.813 10.4331C38.708 11.4366 38.925 12.6299 38.7351 13.8775C38.491 15.4506 38.0842 16.9965 37.7588 18.5695C37.2706 20.9291 36.7282 23.2886 36.24 25.6481C36.1857 25.8651 36.1044 25.9465 35.8874 25.9465C34.1516 25.9465 32.4159 25.9465 30.7072 25.9465C30.436 25.9465 30.4089 25.8651 30.4631 25.621C30.5716 25.1871 30.7344 24.7531 30.7344 24.2921C30.7615 24.2921 30.7615 24.2921 30.7344 24.2921ZM30.8971 18.678C30.436 18.6509 29.8936 18.678 29.3512 18.7865C29.08 18.8407 28.8087 18.9221 28.5375 19.0034C27.9137 19.2204 27.3984 19.573 27.073 20.1697C26.5306 21.146 26.9916 22.1766 28.0765 22.4478C28.5375 22.5563 28.9986 22.5021 29.4597 22.3936C30.3275 22.2038 31.0327 21.7698 31.4395 20.9562C31.7921 20.2781 31.765 19.5187 31.9819 18.8407C32.0362 18.7051 31.9277 18.7051 31.8463 18.7051C31.548 18.678 31.2497 18.678 30.8971 18.678Z" fill="#11559D"/>
                    <path d="M102.985 3.92285C103.88 3.92285 104.802 3.92285 105.697 3.92285C105.914 3.92285 105.941 3.97709 105.914 4.19406C104.341 11.3541 102.768 18.5141 101.195 25.7012C101.141 25.9182 101.059 25.9724 100.842 25.9724C99.0796 25.9724 97.3167 25.9724 95.5538 25.9724C95.3097 25.9724 95.2555 25.9182 95.3097 25.6741C96.8285 18.5141 98.4016 11.3541 99.9475 4.19406C100.002 3.97709 100.083 3.92285 100.273 3.94997C101.168 3.92285 102.063 3.92285 102.985 3.92285Z" fill="#2997D8"/>
                </svg>
            </button>
          </div>
        </div>
        <StripeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <PaymentPage/>
        </StripeModal>
      </div>
  );
}
