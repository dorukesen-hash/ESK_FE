export default function CartContainerProgressBar({cartTotal}) {

	const isFreeShipping = cartTotal >= 2000;
	const progress = Math.min((cartTotal / 2000) * 100, 100);

	return (

		<div
			className="w-full h-[138px] flex flex-col items-center justify-between bg-custom-table-head my-[16px] rounded-[12px]">
			<p className="my-[12px]">
				{isFreeShipping
					? <span className="font-bold text-green-600">Congratulations! You have qualified for Free Shipping!</span>
					: <>You are <span className="font-bold">${(2000 - cartTotal).toFixed(2)}</span> away from Free Shipping at $2000.00</>
				}
			</p>
			{/* Progress Bar Container */}
			<div className="w-full h-[40px] flex flex-col px-[32px] my-0">
				<div className="w-full bg-white rounded-full h-[16px] ">
					<div
						className="bg-custom-blue h-[16px] rounded-full transition-all duration-300"
						style={{width: `${progress}%`}}
					></div>
					<p className="w-full flex justify-between font-bold mt-[4px] text-text-blue">
						<span>${cartTotal.toFixed(2)}</span> <span>$2000.00</span></p>
				</div>
			</div>
			<p className="text-[14px] mb-[12px] mt-[24px]">Or <span className="font-bold">collect</span> your goods for
				free from our warehouses</p>
		</div>
	);
}
