"use client"

import CheckoutHeader from "@/components/cart/pageCart/CheckoutHeader";
import RecipientAddressForm from "@/components/ordering/shipping/RecipientAddressForm";
import SummaryCard from "@/components/ordering/SummaryCard";
import SelectShippingAddress from "@/components/ordering/shipping/SelectShippingAddress";
import React, {useContext} from "react";
import {AppContext} from "@/Context/AppContext";
import {ShippingOptionsSelection} from "@/components/ordering/shipping/ShippingOptionsSelection";
import Link from "next/link";

const Page = () => {
	const {state} = useContext(AppContext);
	console.log(state);
	return (
		<div className="w-screen min-h-[100vw] flex justify-center bg-white text-text-dark">
			<div className="w-full p-2 my-4 laptop:w-[80%] max-w-[1400px] flex flex-col items-center ">
				<CheckoutHeader/>
				<div className="flex w-full">
					<div className="flex w-full tablet:flex-row flex-col items-center tablet:items-start tablet:justify-between mt-[44px] p-2">
						{state?.detailedCart.length ===0 ?
							<div className="w-full">
								<div className="w-full flex flex-col items-center justify-center text-center p-10 tablet:p-12 bg-gray-50 ">
									{/* Decorative, accessible SVG illustration */}
									<svg className="mr-[8px]" width="128" height="128" viewBox="0 0 32 32" fill="none"
										 xmlns="http://www.w3.org/2000/svg">
										<path
											d="M24.9569 31.0031C24.3969 30.8631 23.8568 30.7031 23.3768 30.3632C22.1668 29.4833 21.707 27.9635 22.267 26.6037C22.807 25.274 24.2569 24.4241 25.6969 24.5741C27.2569 24.744 28.4469 25.8339 28.6869 27.2936C28.9569 29.0234 27.7669 30.6331 25.9769 30.9431C25.9169 30.9531 25.867 30.9831 25.807 30.9931C25.527 31.0031 25.2469 31.0031 24.9569 31.0031ZM11.6769 31.0031C11.7469 30.9831 11.8068 30.9531 11.8768 30.9431C13.4468 30.6531 14.617 29.2933 14.597 27.7536C14.577 26.2238 13.4068 24.874 11.8868 24.6241C10.2668 24.3541 8.71684 25.164 8.13684 26.6037C7.54684 28.0635 8.09694 29.7033 9.48694 30.5031C9.89694 30.7331 10.387 30.8431 10.837 31.0031C11.107 31.0031 11.3969 31.0031 11.6769 31.0031ZM30.517 6.94693C23.297 6.84694 16.0868 6.74694 8.86682 6.64696C8.65682 6.64696 8.57696 6.57696 8.50696 6.38699C8.16696 5.37715 7.83692 4.36731 7.46692 3.35747C6.97692 2.00769 6.00697 1.17783 4.51697 1.04785C3.57697 0.96786 2.62689 1.00786 1.68689 1.02786C1.51689 1.02786 1.3269 1.15784 1.1969 1.27782C0.986901 1.46779 0.947018 1.72776 1.06702 1.97772C1.19702 2.25768 1.41695 2.42763 1.74695 2.42763C2.51695 2.43763 3.28701 2.42764 4.05701 2.43764C5.08701 2.44764 5.75703 2.90755 6.07703 3.85739C7.51703 8.05672 8.94686 12.2661 10.4069 16.4554C10.6269 17.0853 10.7468 17.6552 10.3768 18.2551C10.3468 18.2951 10.347 18.3451 10.327 18.3951C9.56703 20.6847 11.1969 22.8444 13.6969 22.8444C18.3869 22.8444 23.077 22.8444 27.767 22.8444C27.897 22.8444 28.0369 22.8444 28.1569 22.8144C28.4769 22.7344 28.6669 22.5244 28.7169 22.2245C28.7669 21.9345 28.6468 21.6845 28.3868 21.5546C28.1968 21.4646 27.967 21.4146 27.757 21.4146C23.067 21.4046 18.3769 21.3846 13.6869 21.4246C12.2269 21.4346 11.227 20.0548 11.787 18.775C11.857 18.615 11.9069 18.4451 11.9869 18.2851C12.2569 17.7852 12.357 17.2753 12.057 16.7554C12.047 16.7454 12.067 16.7254 12.077 16.6954C12.137 16.6854 12.207 16.6754 12.277 16.6654C13.947 16.5054 15.607 16.3454 17.277 16.1754C20.527 15.8555 23.777 15.5255 27.027 15.2056C28.327 15.0756 29.1669 14.3857 29.4669 13.1559C29.8069 11.7961 30.1469 10.4264 30.4869 9.06658C30.6569 8.37669 30.827 7.68679 30.997 6.9569C30.8169 6.94691 30.667 6.94693 30.517 6.94693Z"
											fill="#182434"/>
									</svg>

									<h2 className="mt-6 text-2xl tablet:text-3xl font-semibold text-text-dark">Your cart is empty</h2>
									<p className="mt-2 text-base tablet:text-lg text-gray-600 max-w-xl">Add items to your cart before proceeding to checkout.</p>
									<Link href="/products" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-custom-blue px-5 py-3 text-white hover:bg-custom-button-green focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition">
										<span>Go to Products</span>
										<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
											<path d="M5 12h14"/>
											<path d="M13 5l7 7-7 7"/>
										</svg>
									</Link>
								</div>
							</div> :
							<>
								<div>
									{state.user ? <SelectShippingAddress/> : ""}
									<RecipientAddressForm/>
									<ShippingOptionsSelection/>
								</div>
								<SummaryCard/>
							</>
						}
					</div>
				</div>
			</div>
		</div>
	)
}
export default Page;