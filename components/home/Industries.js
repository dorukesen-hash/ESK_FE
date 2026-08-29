import Image from "next/image";
import Link from "next/link";

const items = [
	{
		name: "Agriculture & Produce",
		text: "Support pallet stability and protect soft cartons with stretch film, plastic strapping and corner boards.",
		image: {
			src: "/homepage/ind-agriculture.webp",
			alt: "Stacked wooden crates of fresh produce loaded in a delivery truck",
		},
	},
	{
		name: "Lumber, Doors & Building Materials",
		text: "Secure long and heavy bundles with high-strength cord strapping, corner boards and application tools.",
		image: {
			src: "/homepage/ind-lumber-strapping.webp",
			alt: "Lumber bundle secured with composite cord strapping and a wire buckle",
		},
	},
	{
		name: "Manufacturing & Metalworking",
		text: "Strap, lash and protect machinery, metal products and demanding industrial loads.",
		image: {
			src: "/homepage/ind-manufacturing.webp",
			alt: "Machine housings strapped to wooden crate bases with cord strapping and buckles",
		},
	},
	{
		name: "Warehousing, 3PL & Distribution",
		text: "Standardize pallet wrapping, load containment and replenishment across high-volume shipping operations.",
		image: {
			src: "/homepage/app-dunnage-container.jpg",
			alt: "Palletized boxes braced inside a shipping container",
		},
	},
	{
		name: "E-commerce & Fulfillment",
		text: "Pack parcel-level orders with mailers, corrugated boxes and repeatable case-quantity purchasing.",
		image: {
			src: "/homepage/ind-ecommerce.webp",
			alt: "Hands packing an order with paper cushioning into a corrugated shipping box",
		},
	},
	{
		name: "Export & Container Shipping",
		text: "Secure freight moving by road or ocean with lashing, cord strapping, buckles, tools and corner boards.",
		image: {
			src: "/homepage/app-container-lashing.jpg",
			alt: "Drums secured inside a shipping container with lashing strap",
		},
	},
];

// scroll-mt keeps the heading clear of the sticky header when the
// /#industries-we-serve anchor is used.
export default function Industries() {
	return (
		<section
			id="industries-we-serve"
			aria-labelledby="industries-title"
			className="w-full bg-custom-blue-gray scroll-mt-[150px] tablet:scroll-mt-[100px] min-[1024px]:scroll-mt-[170px]"
		>
			<div className="max-w-[1440px] mx-auto px-6 tablet:px-[24px] py-12 tablet:py-14">
				<p className="text-[13px] tablet:text-[14px] font-bold tracking-[0.18em] uppercase text-text-blue">
					Industries We Serve
				</p>
				<h2 id="industries-title" className="text-[24px] tablet:text-[32px] font-bold text-white mt-2 max-w-[820px]">
					Packaging solutions built for the way your industry ships
				</h2>
				<p className="text-[14px] tablet:text-[16px] text-gray-300 mt-2 max-w-[760px] leading-relaxed">
					From everyday packing supplies to load securement and pallet protection, ESK helps businesses
					choose materials that fit their products, equipment and shipping environment.
				</p>
				<div className="grid grid-cols-1 tablet:grid-cols-2 min-[1280px]:grid-cols-3 gap-4 tablet:gap-6 mt-8">
					{items.map((item) => (
						<div
							key={item.name}
							className="flex flex-col rounded-[12px] overflow-hidden bg-white/5 border border-white/15"
						>
							<div className="p-5 flex flex-col gap-2 grow">
								<h3 className="font-bold text-[16px] tablet:text-[17px] text-white">{item.name}</h3>
								<p className="text-[14px] tablet:text-[15px] text-gray-300 leading-relaxed">{item.text}</p>
							</div>
							<div className="relative w-full aspect-[2/1] tablet:aspect-[16/9] shrink-0 border-t border-white/15">
								<Image
									src={item.image.src}
									alt={item.image.alt}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
									className="object-cover"
								/>
							</div>
						</div>
					))}
				</div>
				<div className="mt-8 flex justify-center">
					<Link
						href="/products"
						className="inline-flex items-center justify-center h-[52px] px-8 rounded-[10px] bg-custom-blue text-white font-semibold text-[15px] tablet:text-[16px] hover:bg-custom-button-green transition-colors"
					>
						Explore Products
					</Link>
				</div>
			</div>
		</section>
	);
}
