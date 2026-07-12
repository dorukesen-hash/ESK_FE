"use client"

import Link from "next/link";
import React, {useContext, useState} from "react";
import {AppContext} from "@/Context/AppContext";
import CartPageItem from "./CartPageItem";
import CalculateShippingModal from "@/components/ordering/shipping/CalculateShippingModal";



const CartTable = () => {
	const {state, emptyCart, cartTotal} = useContext(AppContext);
	const cartItems = state?.detailedCart || [];
	const [showShippingModal, setShowShippingModal] = useState(false);


	return (
		<div className="w-full pt-[42px] ">
			{showShippingModal && <CalculateShippingModal onClose={() => setShowShippingModal(false)}/>}
			<div className="flex items-center justify-between mb-1">
				<p className="text-sm text-blue-600 font-medium underline cursor-pointer"></p>
				<button
					onClick={emptyCart}
					className="text-[16px] text-text-dark border-2 border-transparent font-semibold cursor-pointer hover:text-red-700 hover:border-red-500 rounded p-2">
					Empty Cart
				</button>
			</div>

			<div className="w-full overflow-x-auto">
				<table className="w-full text-[12px] tablet:text-[16px] text-text-dark text-left">
					<thead className="h-[40px] tablet:h-[60px] bg-custom-table-head">
						<tr>
							<th className="h-full border-x-[1px] border-white text-center ">Stock #</th>
							<th className="h-full  border-x-[1px] border-white text-center">Description</th>
							<th className="h-full  border-x-[1px] border-white  text-center">Qty</th>
							<th className="h-full  border-x-[1px] border-white  text-center">Price</th>
							<th className="h-full  border-x-[1px] border-white  text-center">Total</th>
							<th className="h-full  border-x-[1px] border-white  text-center">Remove</th>
						</tr>
					</thead>
					<tbody>
					{cartItems.map((item, index) => (
						<CartPageItem key={index} item={item}/>
					))}
					</tbody>
				</table>
			</div>

			<div className="w-full flex flex-col items-center tablet:items-end gap-4 mt-8 px-4">
				{/* Top Row: Shipping & Coupon */}
				<div className="w-full flex gap-6 items-center justify-center tablet:justify-end flex-col tablet:flex-row ">
					<button onClick={() => setShowShippingModal(true)}
					        className="text-custom-blue underline cursor-pointer">
						Estimated Shipping
					</button>
					<div className="h-[36px] border-[1px] border-border-gray hidden tablet:block"></div>
					<div className="flex items-center gap-2">
						<label className="text-sm text-gray-600">Coupon Code</label>
						<input
							type="text"
							className="border border-gray-300 rounded px-2 py-1 text-sm w-[130px]"
						/>
						<button className="bg-gray-200 text-sm px-3 py-1 rounded shadow-sm">Add</button>
					</div>
				</div>

				{/* Subtotal */}
				<div className="flex items-center gap-4">
					<span className="text-[18px] font-medium">Subtotal =</span>
					<span className="text-[22px] text-custom-button-green font-semibold">
                        ${cartTotal.toFixed(2)}
                    </span>
				</div>

				{/* Checkout Button */}
				<Link
					href="/cart/shipping"
					className="w-[316px] h-[62px] flex items-center justify-center bg-custom-blue rounded-[12px] text-white text-[22px] font-[700] hover:bg-custom-button-green cursor-pointer transition"
				>
					Checkout
				</Link>

			</div>
		</div>
	);
};

export default CartTable;
