import React, {useContext, useState, useEffect} from "react";
import {AppContext} from "@/Context/AppContext";

const QuantityButtons = ({id}) => {
	const {state, updateCart, removeItemFromCart} = useContext(AppContext);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		const item = state.detailedCart.find(v => v.id === id);
		if (item) setQuantity(item.quantity);
	}, [state.detailedCart, id]);

	const handleChange = async (delta) => {
		const newQty = quantity + delta;
		if (newQty < 1) {
			removeItemFromCart(id)
			return;
		}
		setQuantity(newQty);
		updateCart({id, quantity: newQty});
	};

	return (
		<div className="scale-70 tablet:scale-100 w-[94px] h-[36px] rounded-[12px] border-[2px] border-border-gray inline-flex overflow-hidden">
			<button onClick={() => handleChange(-1)} className="px-[10px] cursor-pointer">
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
			<input
				type="text"
				value={quantity}
				onChange={(e) => {
					const val = parseInt(e.target.value);
					setQuantity(isNaN(val) || val < 1 ? 1 : val);
				}}
				onBlur={() => updateCart({id, quantity})}
				className="w-full text-center text-text-dark text-[18px] font-semibold focus:outline-none"
			/>
			<button onClick={() => handleChange(1)} className="px-[10px] cursor-pointer">
				<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.608 8.516V0.883999H4.742V8.516H3.608ZM0.26 5.24V4.178H8.09V5.24H0.26Z"
					      fill="currentColor"/>
				</svg>
			</button>
		</div>
	);
};

export default QuantityButtons;