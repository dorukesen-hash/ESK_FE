'use client';

import {useContext, useState} from 'react';
import {AppContext} from "@/Context/AppContext";
import { toast } from 'react-toastify';
import {successNote} from "@/utils/ToastNotify";

const BuyCell = ({variantId, isPallet }) => {
	const {updateCart} = useContext(AppContext);
	const [quantity, setQuantity] = useState(0);
	const [loading, setLoading] = useState(false);

	const handleUpdateCart = async () => {
		if (quantity < 1) return;

		setLoading(true);

		try {
			await updateCart({id: variantId, quantity});
			successNote('Product(s) added to cart!');
			setQuantity(0)
		} catch (error) {
			console.error('Cart update failed:', error);
		} finally {
			setLoading(false);

		}
	};

	return (
		<div className="w-max-[220px] flex items-center justify-between gap-[8px]">

			<div
				className="h-[40px] w-[88px] flex items-center justify-between border-[2px] border-gray-200 rounded-[6px]">
				<button
					onClick={() => setQuantity(q => Math.max(0, q - 1))}
					className="w-6 h-6 text-sm cursor-pointer"
				>
					-
				</button>
				<input
					className="max-w-[48px] text-center text-sm focus:outline-custom-blue"
					value={quantity}
					onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
				/>
				<button
					onClick={() => setQuantity(q => q + 1)}
					className="w-6 h-6 text-sm cursor-pointer"
				>
					+
				</button>
			</div>
			<button
				onClick={handleUpdateCart}
				disabled={loading || quantity < 1}
				className="w-[125px] h-[40px] text-[14px] text-white rounded bg-custom-blue hover:bg-custom-button-green disabled:bg-border-gray cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
			>
				{loading ? (
					<span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
				) : (
					'Add to Cart'
				)}
			</button>
		</div>
	);
};

export default BuyCell;
