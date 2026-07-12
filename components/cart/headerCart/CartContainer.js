import React, {useContext} from "react";
import {AppContext} from "@/Context/AppContext";
import CartContainerItem from "@/components/cart/headerCart/CartContainerItem";
import CartContainerProgressBar from "@/components/cart/headerCart/CartContainerProgressBar";
import Link from "next/link";

const CartContainer = ({isOpen, onClose}) => {
	const {state, loading, cartTotal} = useContext(AppContext);
	const {cart, detailedCart} = state
	if (!isOpen) return null; // Don't render if not open

	return (
		<div
			className="absolute flex flex-col items-center right-0 mt-2 min-w-[508px] bg-white shadow-custom rounded-[4px] p-4 z-50
			w-[508px] max-w-[508px]">
			{/* Close Button */}
			<button onClick={onClose}
					className="cursor-pointer absolute top-2 right-2 text-2xl font-bold hover:text-red-500">
				<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M17 33C25.8366 33 33 25.8366 33 17C33 8.16344 25.8366 1 17 1C8.16344 1 1 8.16344 1 17C1 25.8366 8.16344 33 17 33Z"
						fill="#5CA0E2" stroke="white" strokeWidth="2"/>
					<path d="M11.6104 22.3904L22.3904 11.6104" stroke="white" strokeWidth="3" strokeMiterlimit="10"
					      strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M11.6104 11.6104L22.3904 22.3904" stroke="white" strokeWidth="3" strokeMiterlimit="10"
					      strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			</button>

			{/* Cart Header */}
			<h2 className="font-bold py-[22px] text-center w-full border-b-[2px] border-border-gray text-custom-blue text-[26px] sm:text-[18px] md:text-[22px]">
				{loading ? "Updating..." : `${detailedCart.length} items in your Cart`}
			</h2>

			{/* Cart Items */}
			<div className="w-full mt-[10px] max-h-[430px] overflow-y-scroll scrollbar-thumb-text-blue scrollbar sm:max-h-[260px] md:max-h-[340px]">
				{detailedCart.length > 0 ? (
					detailedCart.map((item, index) => (
						<CartContainerItem id={item.id} quantity={item.quantity} key={index}/>
					))
				) : (
					<p className="">Your cart is empty.</p>
				)}
			</div>
			{/* Subtotal section*/}
			<div className="w-full text-end my-[16px] border-t-[2px] border-border-gray">
				<p className="text-[20px] font-semibold sm:text-[14px] md:text-[16px]">Subtotal ({cart.length} items): <span
					className="text-text-blue text-[28px] font-bold sm:text-[18px] md:text-[22px]">{cartTotal.toFixed(2)}</span></p>
			</div>
			{/* Free shipping calculator*/}
			<CartContainerProgressBar cartTotal={cartTotal}/>
			{/* Buttons */}
			<div className="w-full flex justify-between sm:flex-col sm:gap-2 md:flex-row md:gap-2">
				<Link
					href="/cart"
					onClick={onClose}
					className="w-[153px] h-[53px] flex items-center justify-center bg-white border-[2px] border-custom-blue rounded-[12px] text-[20px] font-bold text-text-blue cursor-pointer hover:bg-custom-blue hover:text-white sm:w-full sm:h-[40px] sm:text-[16px] md:w-[100px] md:h-[40px] lg:w-[153px] lg:h-[53px]">
					<p>
						Edit Cart
					</p>
				</Link>
				<Link
					href="/cart/shipping"
					onClick={onClose}
					className="w-[153px] h-[53px] flex items-center justify-center bg-custom-button-green border-[2px] border-custom-button-green rounded-[12px] text-[20px] text-white font-bold cursor-pointer hover:bg-white hover:text-custom-button-green sm:w-full sm:h-[40px] sm:text-[16px] md:w-[100px] md:h-[40px] lg:w-[153px] lg:h-[53px]">Checkout
				</Link>
			</div>
		</div>
	);
};

export default CartContainer;
