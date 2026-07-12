import Image from "next/image";
import {AppContext} from "@/Context/AppContext";
import React, {useContext, useEffect, useState} from "react";
import altImage from "@/assets/ESK_icon_mini.png";
import {calculatePrice} from "@/hooks/service";


const CartContainerItem = ({id}) => {
	const {state, updateCart, removeItemFromCart} = useContext(AppContext);
	const [sum, setSum] = useState(0);
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const item = state.detailedCart.find((p) => p.id === id);

	useEffect(() => {
		setQuantity(item?.quantity);
		setSum(calculatePrice(item))
		setPrice(item.one_four_units)
		if (quantity > 4) {
			setPrice(item.five_nine_units)
		}
		if (quantity > 9) {
			setPrice(item.ten_plus_units)
		}
	}, [item, item?.quantity, quantity]) // quantity eklendi

	const handleChange = async (delta) => {
		const newQty = quantity + delta;
		if (newQty < 1) {
			removeItemFromCart(id)
			return;
		}
		setQuantity(newQty);
		updateCart({id, quantity: newQty});
	};

	if (!item) return null;

	return (
		<div className="h-[145px] flex items-center border-b-[1px] border-border-gray">
			<Image
				src={item.variant_images?.length > 0 ? `https://cdn.enesdorukesen.com.tr/${item.variant_images[0]?.image?.url}` : altImage}
				alt="item"
				width={90}
				height={90}/>
			<div className="w-[238px] flex flex-col ml-[24px]">
				<p className="h-[40px] font-bold text-[16px] overflow-hidden leading-[19px]">{item.title}</p>
				<p>SKU: {item.stock}</p>
				<p>Unit Price: ${price}</p>
			</div>
			<div className="h-[90px] flex flex-col items-center justify-between ml-[36px] mr-[4px]">
				<p className="font-bold text-[22px] text-custom-button-green">
					${sum.toFixed(2)}
				</p>
				<div
					className="flex items-center justify-between w-[96px] h-[30px] rounded-[12px] border-[2px] border-border-gray text-[14px] px-[12px]">
					<button className="cursor-pointer" onClick={() => handleChange(-1)} >
						{quantity === 1 ? (
							<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 3.36426H14" stroke="#182434" strokeMiterlimit="10" strokeLinecap="round"/>
								<path
									d="M2.8457 3.36441L3.71399 13.0542C3.75051 13.4726 4.13597 13.7976 4.60257 13.7976H10.3966C10.8632 13.7976 11.2486 13.4726 11.2892 13.0501L12.1575 3.36035H2.8457V3.36441Z"
									stroke="#182434" strokeMiterlimit="10" strokeLinecap="round"/>
								<path d="M5.76562 6.22461L6.11456 10.6937" stroke="#182434" strokeMiterlimit="10"
									  strokeLinecap="round"/>
								<path d="M9.23077 6.22461L8.88184 10.6937" stroke="#182434" strokeMiterlimit="10"
									  strokeLinecap="round"/>
								<path
									d="M9.53391 1H5.46837C5.09915 1 4.76644 1.2072 4.63254 1.52004L3.85352 3.36454H11.1488L10.3697 1.52004C10.2358 1.2072 9.90314 1 9.53391 1Z"
									stroke="#182434" strokeMiterlimit="10" strokeLinecap="round"/>
							</svg>
						) : (
							<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0.26 5.24V4.178H8.09V5.24H0.26Z" fill="currentColor"/>
							</svg>
						)}
					</button>
					<p>{item.quantity}</p>
					<button className="cursor-pointer" onClick={() => handleChange(1)}>
						+
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartContainerItem;
