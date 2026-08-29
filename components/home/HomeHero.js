import Image from "next/image";
import Link from "next/link";

// Approved broad-assortment product photo (owner-supplied), matching the
// concept the site settled on.
const heroImage = {
	alt: "ESK Packaging product range: corrugated boxes, PET and cord strapping coils, stretch film rolls, ESK-branded packing tape, clear tape, bubble cushioning, strapping dispenser carts and packaging equipment",
};

export default function HomeHero() {
	return (
		<section className="relative w-full bg-white text-text-dark border-b-[8px] border-[#C83642] overflow-hidden">
			{/* Tablet only (768–1279): full photo anchored right, white studio background extends the canvas */}
			<div className="hidden tablet:block min-[1280px]:hidden absolute inset-y-0 right-0 w-[62%]">
				<Image
					src="/homepage/candidates/hero-d-product-range-full.webp"
					alt={heroImage.alt}
					fill
					sizes="62vw"
					className="object-contain object-right"
				/>
				<div aria-hidden="true" className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-white via-white/70 to-transparent"/>
			</div>
			{/* Laptop/desktop (1280+): wide product band, bottom-anchored in the right 52% */}
			<div className="hidden min-[1280px]:block absolute inset-y-0 right-0 w-[52%]">
				<Image
					src="/homepage/candidates/hero-d1-desktop-band.webp"
					alt={heroImage.alt}
					fill
					priority
					sizes="52vw"
					className="object-contain object-right-bottom"
				/>
				<div aria-hidden="true" className="absolute inset-y-0 left-0 w-[340px] bg-gradient-to-r from-white via-white/60 to-transparent"/>
			</div>
			{/* Mobile: panoramic crop, full-bleed, text on clean white below it */}
			<div className="tablet:hidden relative">
				<Image
					src="/homepage/candidates/hero-d1-product-range-mobile.webp"
					alt={heroImage.alt}
					width={1122}
					height={748}
					priority
					sizes="100vw"
					className="w-full h-auto"
				/>
				<div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-white via-white/60 to-transparent"/>
			</div>
			<div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-2 pb-6 tablet:px-[24px] tablet:py-14 tablet:min-h-[540px] flex items-center">
				<div className="flex flex-col gap-3 tablet:gap-5 tablet:w-[46%] min-[1280px]:w-auto min-[1280px]:max-w-[470px]">
					<p className="text-[13px] tablet:text-[14px] font-bold tracking-[0.18em] uppercase text-text-blue">
						Industrial Packaging Supply
					</p>
					<h1 className="text-[28px] tablet:text-[38px] laptop:text-[44px] font-bold leading-tight text-text-dark">
						Industrial packaging supplies for every business
					</h1>
					<p className="text-[15px] tablet:text-[17px] max-w-[560px] text-[#3d4854]">
						Shop boxes, strapping, stretch film, tape, protective packaging, tools and equipment.
						Available for online orders and volume quotes across the U.S.
					</p>
					<div className="flex flex-col mobile:flex-row gap-3 mt-2">
						<Link
							href="/products"
							className="inline-flex items-center justify-center h-[52px] px-4 mobile:px-5 tablet:px-8 whitespace-nowrap rounded-[10px] bg-custom-blue text-white font-semibold text-[15px] tablet:text-[16px] hover:bg-custom-button-green transition-colors"
						>
							Shop Products
						</Link>
						<Link
							href="#quote"
							className="inline-flex items-center justify-center h-[52px] px-4 mobile:px-5 tablet:px-8 whitespace-nowrap rounded-[10px] border-2 font-semibold text-[15px] tablet:text-[16px] transition-colors border-text-dark/60 text-text-dark hover:bg-text-dark hover:text-white"
						>
							Request a Quote
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
