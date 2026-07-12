"use client";

export default function Slider({isExpanded, contentId, closeSlider}) {
	const renderContent = () => {
		switch (contentId) {
			case 1:
				return (
					<div>
						<h2 className="text-xl font-bold mb-4 text-black">Free Shipping on Qualified Orders</h2>
						<p className="text-black">All orders that meet our minimum requirements qualify for free
							shipping.</p>
					</div>
				);
			case 2:
				return (
					<div>
						<h2 className="text-xl font-bold mb-4 text-black">Competitive Price</h2>
						<p className="text-black">We offer the most competitive prices in the market.</p>
					</div>
				);
			case 3:
				return (
					<div>
						<h2 className="text-xl font-bold mb-4 text-black">Fast Turn Around</h2>
						<p className="text-black">We process your orders quickly and ship them fast!</p>
					</div>
				);
			default:
				return (
					<div>
						<h2 className="text-xl font-bold mb-4 text-black">Welcome</h2>
						<p className="text-black">Please select a button to see details.</p>
					</div>
				);
		}
	};

	return (
		<>
			{/* Backdrop */}
			<div
				className={`fixed inset-0 bg-black/30 z-40 ${
					isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
				} transition-opacity duration-300 ease-in-out`}
				onClick={closeSlider}
			/>

			{/* Slider Panel */}
			<div
				className={`fixed top-0 right-0 h-full bg-white z-50 expandable-div transform ${
					isExpanded ? "translate-x-0" : "translate-x-full"
				} transition-transform duration-300 ease-in-out`}
				style={{
					width: "30%",
				}}
			>
				<div className="p-4 flex flex-col h-full">
					<button
						onClick={closeSlider}
						className="self-end text-gray-600 hover:text-black"
					>
						Close
					</button>
					<div className="mt-40">
						{renderContent()}
					</div>
				</div>
			</div>
		</>
	);
}
