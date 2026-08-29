import Image from "next/image";
import Link from "next/link";

const items = [
	{
		title: "Choose the right material",
		text: "Compare cord strapping, PET and PP strapping, stretch film, edge protection and other packaging options for the application.",
	},
	{
		title: "Match the right specifications",
		text: "Select the appropriate width, thickness, strength, core size and package quantity.",
	},
	{
		title: "Avoid costly ordering mistakes",
		text: "Reduce mismatches between strapping, buckles, tools, dimensions and units of measure.",
	},
	{
		title: "Plan the right buying quantity",
		text: "Compare case, pallet and container quantities based on how you purchase and ship.",
	},
];

export default function ProductGuidance() {
	return (
		<section aria-labelledby="product-guidance" className="w-full max-w-[1440px] mx-auto px-6 tablet:px-[24px] py-12">
			<div className="flex flex-col min-[1280px]:flex-row min-[1280px]:items-center gap-8 min-[1280px]:gap-12">
				<div className="min-[1280px]:w-[58%]">
					<p className="text-[13px] tablet:text-[14px] font-bold tracking-[0.18em] uppercase text-text-blue">
						Product Guidance
					</p>
					<h2 id="product-guidance" className="text-[24px] tablet:text-[32px] font-bold text-text-dark mt-2">
						Get the right packaging for your application
					</h2>
					<p className="text-[15px] tablet:text-[16px] text-text-light mt-2 max-w-[720px] leading-relaxed">
						Tell us what you&apos;re packing, how it moves, and what performance you need. We&apos;ll help you
						compare materials, specifications and buying quantities before you order.
					</p>
					<div className="grid grid-cols-1 mobile:grid-cols-2 gap-4 mt-6">
						{items.map((item) => (
							<div key={item.title} className="border-2 border-border-gray rounded-[12px] p-5 bg-white">
								<h3 className="font-bold text-[16px] tablet:text-[17px] text-text-dark">{item.title}</h3>
								<p className="text-[14px] tablet:text-[15px] text-text-light mt-1.5 leading-relaxed">{item.text}</p>
							</div>
						))}
					</div>
					<div className="mt-6 flex flex-col mobile:flex-row items-start mobile:items-center gap-3">
						<Link
							href="#quote"
							className="inline-flex items-center justify-center h-[52px] px-8 rounded-[10px] bg-custom-blue text-white font-semibold text-[15px] tablet:text-[16px] hover:bg-custom-button-green transition-colors whitespace-nowrap"
						>
							Get Product Guidance
						</Link>
						<p className="text-[13px] text-text-light">Opens the quote form below — tell us about your application.</p>
					</div>
				</div>
				<div className="min-[1280px]:w-[42%] w-full max-w-[720px] mx-auto min-[1280px]:max-w-none">
					<Image
						src="/homepage/candidates/hero-d2-product-range-mobile.webp"
						alt="ESK Packaging product range: corrugated boxes, strapping coils, stretch film rolls, ESK-branded packing tape, clear tape, bubble cushioning and strapping dispenser carts"
						width={1920}
						height={1350}
						sizes="(max-width: 1279px) 100vw, 42vw"
						className="w-full h-auto rounded-[12px] border-2 border-border-gray bg-white"
					/>
				</div>
			</div>
		</section>
	);
}
