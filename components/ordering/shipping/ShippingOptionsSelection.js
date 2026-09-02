/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {AppContext} from "@/Context/AppContext";
import {useContext, useState, useEffect, useRef} from "react";
import {getShippingOptions} from "@/hooks/Api";
import axios from "axios";


export function ShippingOptionsSelection() {
    const {state, order, setOrder, cartTotal, options, setOptions} = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [localCartTotal, setLocalCartTotal] = useState(cartTotal);
    const [selectedOption, setSelectedOption] = useState();
    const cancelTokenSourceRef = useRef();

    const handleCalculateShipping = async () => {
        // start loading and cancel previous request if any
        setLoading(true);
        if (cancelTokenSourceRef.current) {
            cancelTokenSourceRef.current.cancel();
        }
        const source = axios.CancelToken.source();
        cancelTokenSourceRef.current = source;

        // Pallet packing is computed server-side from real DB package
        // dimensions - the client only sends variantId+quantity.
        const zip = order?.recipient?.zip;

        // Generate request data
        const reqData = {
            recipient: {
                PostalCode: String(zip),
            },
            items: (state.detailedCart || []).map((item) => ({
                variantId: item.id,
                quantity: item.quantity,
            })),
        };

        try {
            // remove free shipping option if exists
            setOrder(prevOrder => ({
                ...prevOrder,
                shipping:{
                    ...prevOrder.shipping,
                    carrier: null,
                    carrierSCAC: null,
                    price: 0
                },
            }));
            let result = await getShippingOptions(reqData, source.token);
            const rawOptions = Array.isArray(result?.options) ? result.options : [];
            // Parsing and normalizing results
            const normalized = rawOptions.map((o) => ({
                ...o,
                priceTotal: o?.priceTotal !== null && o?.priceTotal !== undefined && o?.priceTotal !== '' ? Number(o.priceTotal) : null,
                carrierName: o?.carrierName ?? '',
                shippingOption: o?.shippingOption ?? '',
                apiQuoteNumber: o?.apiQuoteNumber ?? null,
                carrierSCAC: o?.carrierSCAC ?? null,
            }));
            // Sort by price ascending, nulls to end
            let sorted = [...normalized].sort((a, b) => (a.priceTotal ?? Infinity) - (b.priceTotal ?? Infinity));
            sorted = [...sorted, {zip: zip}];
            setOptions(sorted);

            setOrder(prevOrder => ({
                ...prevOrder,
                shipping: {
                    ...prevOrder.shipping,
                    totalWeight: result?.packing?.totalWeight ?? 0,
                    totalDeci: result?.packing?.totalDeci ?? 0,
                },
            }));

            setLoading(false);
        } catch (err) {
            if (!axios.isCancel(err)) {
                setOptions(null);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        // get zip from order
        const zip = order?.recipient?.zip;
        if (!zip) {
            setOptions(null);
            setLoading(false);
            return;
        }

        // if cart total > 2000, set free shipping option directly
        if (cartTotal > 2000) {
            setOptions([
                {carrierName: 'Free Shipping',
                    priceTotal: 0,
                    carrierSCAC: 'FREE'
                }]);
            setOrder(prevOrder => ({
                ...prevOrder,
                shipping: {
                    ...prevOrder.shipping,
                    carrier: 'Free Shipping',
                    carrierSCAC: 'FREE',
                    price: 0,
                },
            }));
            setLoading(false);
        }
        // if options not set or zip changed, fetch options
        else if (!options || (options && options[options.length - 1]?.zip !== zip)) {
            handleCalculateShipping(order).then(r => console.log(r));
        }
        else if (localCartTotal !== cartTotal) {
            handleCalculateShipping(order).then(r => console.log(r));
        }
        else {
            setLoading(false);
        }
    }, [order?.recipient?.zip, cartTotal]);


    return (
        <div className="w-full mx-auto space-y-2 my-2 tablet:my-4 mt-16">
            {loading ? (
                <div className="flex flex-col items-center justify-center gap-4 py-10">
                    <div className="h-12 w-12 rounded-full border-4 border-text-dark border-t-transparent animate-spin"></div>
                    <div className="text-center">
                        <p className="text-sm tablet:text-base font-semibold">Loading shipping options...</p>
                        <p className="text-xs tablet:text-sm text-gray-500">This may take up to 1 minute.</p>
                    </div>
                </div>
            ) : options ? (
                <>
                    <h2 className="text-[16px] tablet:text-[22px] mb-4 tablet:mb-[48px] col-span-full font-bold">Shipping Methods</h2>
                    <div>
                        <div className="text-[12px] tablet:text-[16px] border-1 border-border-gray rounded-[10px] p-4 mb-4 tablet:mb-16 bg-gray-100 font-semibold">
                            {order.items?.reduce((total, item) => total + (item.quantity || 0), 0)} packages totaling {order.shipping?.totalWeight} lbs
                        </div>
                    </div>
                    <div className="border-1 border-border-gray rounded-[10px] p-0 mb-1 overflow-hidden">

                    {options?.map((option, idx) => (
                            option.zip ? null :
                            <>
                            <div
                                key={`${option.carrierName || 'opt'}-${option.shippingOption || 'ship'}-${idx}`}
                                className={`flex items-center justify-between px-8 py-2 tablet:py-[14px] bg-[#FCFCFC] cursor-pointer transition-colors duration-150 hover:bg-[#F3F8FC]`}
                                onClick={() => {
                                    setOrder(prevOrder => ({
                                        ...prevOrder,
                                        shipping:{
                                            ...prevOrder.shipping,
                                            carrier: option.carrierName,
                                            carrierSCAC: option.carrierSCAC,
                                            price: option.priceTotal ?? 0,
                                        },
                                    }));
                                    setSelectedOption(idx);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                <span className="mr-4 flex items-center justify-center w-[12px] tablet:w-[18px] tablet:h-[18px]">
                                    {selectedOption === idx ? (
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="9" cy="9" r="8.5" stroke="#5CA0E2" />
                                            <circle cx="9" cy="9" r="5" fill="#5CA0E2" />
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="9" cy="9" r="8.5" stroke="#BDC2C7" />
                                        </svg>
                                    )}
                                </span>
                                <input
                                    type="radio"
                                    name="shippingOption"
                                    checked={selectedOption === idx}
                                    className="hidden"
                                />
                                <h3 className={`text-[12px] tablet:text-[14px] font-semibold ${selectedOption === idx ? 'font-bold' : ''}`}>{option.carrierName}</h3>
                                </div>
                                <p className="text-[12px] tablet:text-[14px] font-semibold">{option.priceTotal === 0 ? 'Free Shipping' : `Price: ${option.priceTotal != null ? option.priceTotal.toFixed(2) : '-'}`}</p>
                            </div>
                            {idx !== options.length - 1 && (
                                <div className="border-b border-[#E5E7EB]" style={{height: '1px'}}></div>
                            )}

                            </>
                    ))}
                    </div>
                </>
            ) : (
                <h1 className="text-[12px] tablet:text-[14px] font-semibold mb-[48px] col-span-full">Please enter zip code to see shipping options</h1>
            )}
        </div>
    );
}
