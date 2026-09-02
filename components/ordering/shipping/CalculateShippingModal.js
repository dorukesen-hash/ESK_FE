import React, {useContext, useEffect, useState} from "react";

import api from "@/hooks/Api";
import {AppContext} from "@/Context/AppContext";
import ShippingMethodDropdown from "@/components/ordering/ShippingMethodDropdown";


const CalculateShippingModal = ({ onClose }) => {
    const {state} = useContext(AppContext);
    const {detailedCart} = state
    const [zipCode, setZipCode] = useState("");
    const [isResidential, setIsResidential] = useState(false);
    const [shippingOptions, setShippingOptions] = useState([]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);



    const handleEstimate = async () => {
        const payload = {
            recipient: {
                PostalCode: zipCode,
            },
            items: (detailedCart || []).map((item) => ({
                variantId: item.id,
                quantity: item.quantity,
            })),
        };

        try {
            const res = await api.post('/services/sending-options', payload);
            setShippingOptions(res.data);
        } catch (err) {
            console.error('Shipping estimate failed:', err);
        }
    };

    // Sağ panel
    const getShippingDate = () => {
        // Texas (Central Time) saat dilimi
        const now = new Date();
        const options = { timeZone: "America/Chicago", hour: "2-digit", minute: "2-digit", year: "numeric", month: "2-digit", day: "2-digit" };
        const localeDate = new Date(now.toLocaleString("en-US", options));
        const hour = parseInt(localeDate.getHours(), 10);
        let shippingDate = localeDate;
        if (hour >= 18) {
            shippingDate.setDate(shippingDate.getDate() + 1);
        }
        const mm = String(shippingDate.getMonth() + 1).padStart(2, '0');
        const dd = String(shippingDate.getDate()).padStart(2, '0');
        const yyyy = shippingDate.getFullYear();
        return { date: shippingDate, formatted: `${mm} / ${dd} / ${yyyy}` };
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="relative bg-white w-full max-w-[1076px] max-h-[90vh] px-[20px] tablet:px-0 overflow-y-auto rounded-lg shadow-xl">
                {/* Başlık ve Kapat */}
                <div className="w-full flex justify-center tablet:justify-between items-end px-[40px] tablet:px-[75px] mb-[12px] pt-[24px]">
                    <h1 className="text-[14px] tablet:text-[30px] text-text-dark font-bold">Estimate Shipping</h1>
                    <p className="text-[10px] tablet:text-[16px] text-text-dark">Order by 6 PM for same day shipping.</p>
                    <button
                        onClick={onClose}
                        className="absolute right-[10px] top-[10px] cursor-pointer text-white"
                    >
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="#5CA0E2"/>
                            <path d="M9.61035 20.3904L20.3904 9.61035" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.61035 9.61035L20.3904 20.3904" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                {/* İçerik */}
                <div className="flex w-full flex-col tablet:flex-row justify-center-center px-2 tablet:px-[32px] mb-[26px] gap-[12px]">
                    {/* Sol panel */}
                    <div className="flex flex-col items-start w-full tablet:w-[732px] border-[2px] border-border-gray rounded-[12px] px-[42px] py-[26px]">
                        <label htmlFor="zipcode" className="text-[14px] tablet:text-[18px] font-semibold">Zip Code <span className="text-red-500">*</span></label>
                        <input
                            id="zipcode"
                            type="text"
                            placeholder="Enter a Zip Code"
                            className="w-[215px] h-[62px] border-[2px] border-border-gray rounded-[12px] mt-[6px] indent-2 focus:outline-custom-blue"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                        <div className="flex items-center gap-2 my-[23px] font-[500]">
                            <input
                                id="residential"
                                type="checkbox"
                                className="appearance-none w-[25px] h-[25px] border-[2px] border-border-gray rounded-[4px] mr-[12px]
                                    checked:bg-custom-blue checked:border-custom-blue transition duration-150"
                                checked={isResidential}
                                onChange={(e) => setIsResidential(e.target.checked)}
                            />
                            <label htmlFor="residential">This is a residential address.</label>
                        </div>
                        <button
                            onClick={handleEstimate}
                            className="w-[72px] h-[42px] rounded-[12px] bg-custom-blue text-white text-[18px] font-semibold hover:bg-custom-button-green cursor-pointer mb-4"
                        >
                            Go
                        </button>

                        {shippingOptions.length > 0 && <ShippingMethodDropdown shippingOptions={shippingOptions} />} 
                        <p className="w-full text-center mt-[10px] text-[14px]">Additional charges may apply for Inside Delivery and Liftgate services.</p>
                    </div>

                    {/* Sağ panel */}
                    <div className="flex flex-col items-start pl-12 justify-evenly w-[268px] border-[2px] border-border-gray rounded-[12px] py-4">
                        {(() => {
                            const shippingDateObj = getShippingDate();
                            return [
                                {
                                    title: "Shipping Date",
                                    value: shippingDateObj.formatted
                                },
                                {
                                    title: "Delivery Date",
                                    value: "2-5 Bussiness Days"
                                },
                                {
                                    title: "Warehouse",
                                    value: "DFW Airport, TX"
                                }
                            ].map(({ title, value }) => (
                                <div key={title} className="flex flex-col text-[20px] mb-4">
                                    <span className="text-custom-blue font-semibold underline">{title}</span>
                                    <span className="text-text-dark font-[500]">{value}</span>
                                </div>
                            ));
                        })()}
                    </div>
                </div>

                {/* Carrier Info */}
                <h2 className="w-full px-[75px] mt-[12px] mb-[12px] text-left text-[24px] text-text-dark font-bold">Carrier Information</h2>
                <div className="w-full px-[32px] pb-[36px]">
                    <div className="w-full flex flex-col pl-[43px] pr-[35px] gap-[32px] border-[2px] py-[26px] border-border-gray rounded-[12px] text-text-dark font-[500]">
                            <h3 className="font-bold underline text-[18px]">Uline Shipping Carrier</h3>
                            <p className="text-[14px]">
                                The carrier initially presented to you during the order represents the best overall value we can offer.
                                If you prefer to use your UPS or FedEx Account Number for freight collection, please enter it in the
                                Special Instruction box.
                            </p>
                            <h4 className="font-bold text-[15px]">UPS</h4>
                            <ul className="list-disc list-inside text-[14px]">
                                <li className=" leading-6"><strong>UPS Ground</strong> – <span className="underline">Best value</span>. 1–3 business days to most US locations.</li>
                                <li className=" leading-6"><strong>Next Day Air</strong> – Arrives at most US locations by 10:30 am on weekdays, and noon on Saturday.</li>
                                <li className=" leading-6"><strong>2-Day Air</strong> – Delivery in two business days to most US locations.</li>
                                <li className=" leading-6"><strong>3-Day Select</strong> – Delivery in three business days to most US locations.</li>
                            </ul>
                            <h4 className="font-bold text-[15px]">FedEx</h4>
                            <ul className="list-disc list-inside text-[14px]">
                                <li className=" leading-6"><strong>Priority Overnight</strong> – Next business day delivery by 10:30 am to most US locations, noon on Saturday. <br/><span className="italic" >(Specify “Saturday Delivery” when prompted during checkout.)</span></li>
                                <li className=" leading-6"><strong>Standard Overnight</strong> – Next business day delivery by 3 pm to most US locations.</li>
                                <li className=" leading-6"><strong>2-Day</strong> – Delivery in two business days to most US locations.</li>
                                <li className=" leading-6"><strong>3-Day</strong> – Delivery in three business days to most US locations.</li>
                                <li className=" leading-6"><strong>Ground</strong> – Sorry, FedEx Ground service is not available.</li>
                            </ul>
                            <h4 className="font-bold text-[15px]">Motor Freight</h4>
                            <ul className="list-disc list-inside text-[14px]">
                                <li className=" leading-6"><strong>Track/Trailer for large or heavy shipments.</strong> Offer additional services such as inside delivery, and liftgate delivery. <span className="underline">Additional fees may apply.</span></li>
                                <li className=" leading-6"><strong>Freight Collect</strong> – Your own specified carrier, who will bill you directly using your own freight rates. The delivery date is determined by your carrier.</li>
                            </ul>
                            <h4 className="font-bold text-[15px]">U.S. Postal Service</h4>
                            <ul className="list-disc list-inside text-[14px]">
                                <li className=" leading-6"><strong>Parcel Post Priority</strong> – Delivery in five to seven days. No tracking is available, and no service guarantees. Only available when UPS or motor freight is not an option.</li>
                            </ul>

                    </div>
                </div>
            </div>
        </div>
    );

};

export default CalculateShippingModal;
