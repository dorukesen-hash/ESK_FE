import React, {useContext} from "react";
import Image from "next/image";

import QuantityButtons from "@/components/cart/QuantityButtons";
import {AppContext} from "@/Context/AppContext";
import {getUnitPrice} from "@/hooks/service";

const CartPageItem = ({item}) => {
	const {id, variant_images, title, quantity, isPallet} = item;
	const {removeItemFromCart} = useContext(AppContext);

	const imageUrl = variant_images?.[0]?.image?.url || "/placeholder.webp";

	const unitPrice = getUnitPrice(item);
	const total = unitPrice * quantity;

	return <tr className="border-b border-gray-200 text-[10px] tablet:text-[14px] h-[121px]">
		{/* Stock # (Image + SKU) */}
		<td className="h-full flex flex-col items-center justify-center py-4">
			<div className="w-[90px] h-[90px]">
				<Image
					src={`https://cdn.enesdorukesen.com.tr/${imageUrl}`}
					alt="SKU image"
					width={90}
					height={90}
					className="w-full h-full object-cover mb-[2px]"
				/>
			</div>
		</td>

		{/* Description */}
		<td className="px-1 tablet:px-4 py-4">
			<div className="font-semibold text-text-dark mb-1">{title}</div>
			<div className="tablet:text-sm text-gray-500">
				{item.stock}
			</div>
		</td>

		{/* Quantity */}
		<td className="px-1 tablet:px-4 py-4">
			<QuantityButtons id={id} isPallet={isPallet}/>
		</td>

		{/* Price */}
		<td className="px-1 tablet:px-4 py-4 text-center text-[14px] tablet:text-[16px]">
			${unitPrice}
		</td>

		{/* Total */}
		<td className="px-1 tablet:px-4 py-4 text-center text-[14px] tablet:text-[16px] font-semibold text-custom-button-green">
			${total.toFixed(2)}
		</td>

		{/* Remove */}
		<td className="tablet:px-4 py-4 text-center">
			<button
				onClick={() => removeItemFromCart(id)}
				className="scale-75 tablet:scale-100 text-border-gray hover:text-red-700 cursor-pointer rounded-full hover:border-red-500 hover:border-2 p-2"
			>
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2 16L16 2" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10"
					      strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M2 2L16 16" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10"
					      strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			</button>
		</td>
	</tr>;
};

export default CartPageItem;