"use client";
import Image from "next/image";

const hero = {
	kicker: "PACKAGING SOLUTIONS",
	title: "Secure Your Shipment with Confidence",
	subtitle: "ESK delivers premium packaging solutions — strapping, lashing, edge protection, and more — engineered for safety, compliance, and peace of mind.",
	primaryCta: { label: "Shop Now" },
	secondaryCta: { label: "Get a Quote" },
	image: { alt: "ESK packaging solutions hero image" },
};

const heroImage = "/assets/hero/solution_pc.png";

const CONCEPT_IMAGES = {
	b: {
		desktop: "/assets/hero/hero-d-product-range-full.webp",
		mobile: "/assets/hero/hero-d1-product-range-mobile.webp",
		alt: "Steel drums secured with cord lashing inside a shipping container",
	},
	c: {
		desktop: "/assets/hero/hero-d-product-range-full.webp",
		mobile: "/assets/hero/hero-d2-product-range-mobile.webp",
		alt: "ESK packaging product range: woven and composite strapping rolls, lashing strap, tensioner tools, buckles and ESK-branded box",
	},
	d: {
		full: "/assets/hero/hero-d-product-range-full.webp",
		mobileCrop: "/assets/hero/hero-d2-product-range-mobile.webp",
		alt: "ESK Packaging product range: corrugated boxes, PET and cord strapping coils, stretch film rolls, ESK-branded packing tape, clear tape, bubble cushioning, strapping dispenser carts and packaging equipment",
	},
};

function HeroText({ tone = "dark-bg" }) {
	const light = tone === "light-bg";
	return (
		<>
			<p className="text-[13px] tablet:text-[14px] font-bold tracking-[0.18em] uppercase text-text-blue">
				{hero.kicker}
			</p>
			<h1 className={`text-[28px] tablet:text-[38px] laptop:text-[44px] font-bold leading-tight ${light ? "text-text-dark" : ""}`}>
				{hero.title}
			</h1>
			<p className={`text-[15px] tablet:text-[17px] max-w-[560px] ${light ? "text-[#3d4854]" : "text-gray-300"}`}>
				{hero.subtitle}
			</p>
			<div className="flex flex-col mobile:flex-row gap-3 mt-2">
				<button
					type="button"
					className="inline-flex items-center justify-center h-[52px] px-4 mobile:px-5 tablet:px-8 whitespace-nowrap rounded-[10px] bg-custom-blue text-white font-semibold text-[15px] tablet:text-[16px] hover:bg-custom-button-green transition-colors"
				>
					{hero.primaryCta.label}
				</button>
				<button
					type="button"
					className={`inline-flex items-center justify-center h-[52px] px-4 mobile:px-5 tablet:px-8 whitespace-nowrap rounded-[10px] border-2 font-semibold text-[15px] tablet:text-[16px] transition-colors ${
						light
							? "border-text-dark/60 text-text-dark hover:bg-text-dark hover:text-white"
							: "border-white/70 text-white hover:bg-white hover:text-text-dark"
					}`}
				>
					{hero.secondaryCta.label}
				</button>
			</div>
		</>
	);
}

export default function HomeHero({ concept = "a" }) {
	if (concept === "b") {
		const img = CONCEPT_IMAGES.b;
		return (
			<section className="relative w-full bg-custom-blue-gray text-white border-b-[8px] border-[#C83642] overflow-hidden">
				<Image src={img.mobile} alt={img.alt} fill priority sizes="100vw" className="object-cover tablet:hidden" />
				<Image src={img.desktop} alt={img.alt} fill priority sizes="100vw" className="object-cover hidden tablet:block" />
				<div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-custom-blue-gray/95 via-custom-blue-gray/70 to-custom-blue-gray/30" />
				<div className="relative max-w-[1440px] mx-auto flex items-center px-6 tablet:px-[24px] py-10 tablet:py-14 min-h-[420px] tablet:min-h-[460px]">
					<div className="flex flex-col gap-5 tablet:w-1/2">
						<HeroText />
					</div>
				</div>
			</section>
		);
	}

	if (concept === "d1") {
		const img = CONCEPT_IMAGES.d;
		return (
			<section className="relative w-full bg-white text-text-dark border-b-[8px] border-[#C83642] overflow-hidden">
				<div className="hidden tablet:block min-[1280px]:hidden absolute inset-y-0 right-0 w-[62%]">
					<Image src={img.full} alt={img.alt} fill priority sizes="62vw" className="object-contain object-right" />
					<div aria-hidden="true" className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-white via-white/80 to-transparent" />
				</div>
				<div className="hidden min-[1280px]:block absolute inset-y-0 right-0 w-[52%]">
					<Image src="/assets/hero/hero-d1-desktop-band.webp" alt={img.alt} fill priority sizes="52vw" className="object-cover object-left" />
					<div aria-hidden="true" className="absolute inset-y-0 left-0 w-[200px] bg-gradient-to-r from-white to-transparent" />
				</div>
				<div className="relative z-10 hidden tablet:flex max-w-[1440px] mx-auto px-[24px] py-14 min-h-[540px] items-center">
					<div className="flex flex-col gap-5 tablet:w-[46%] min-[1280px]:w-auto min-[1280px]:max-w-[470px]">
						<HeroText tone="light-bg" />
					</div>
				</div>
				<div className="tablet:hidden">
					<div className="relative">
						<Image src="/assets/hero/hero-d1-product-range-mobile.webp" alt={img.alt} width={1122} height={748} priority sizes="100vw" className="w-full h-auto" />
						<div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-white via-white/60 to-transparent" />
					</div>
					<div className="px-6 pt-2 pb-6 flex flex-col gap-3">
						<HeroText tone="light-bg" />
					</div>
				</div>
			</section>
		);
	}

	if (concept === "d2") {
		const img = CONCEPT_IMAGES.d;
		return (
			<section className="w-full bg-[#F4F6F8] text-text-dark border-b-[8px] border-[#C83642]">
				<div className="max-w-[1440px] mx-auto flex flex-col tablet:flex-row items-center gap-6 tablet:gap-12 px-6 tablet:px-[24px] py-8 tablet:py-14">
					<div className="flex flex-col gap-5 tablet:w-1/2">
						<HeroText tone="light-bg" />
					</div>
					<div className="tablet:w-1/2 w-full">
						<div className="relative rounded-[16px] border-2 border-border-gray bg-white shadow-custom overflow-hidden">
							<div className="hidden tablet:block relative h-[440px] laptop:h-[500px]">
								<Image src={img.full} alt={img.alt} fill priority sizes="50vw" className="object-contain" />
							</div>
							<Image src={img.mobileCrop} alt={img.alt} width={1122} height={842} priority sizes="100vw" className="tablet:hidden w-full h-auto" />
						</div>
					</div>
				</div>
			</section>
		);
	}

	const sideImage = concept === "c" ? (
		<>
			<Image src={CONCEPT_IMAGES.c.mobile} alt={CONCEPT_IMAGES.c.alt} width={900} height={675} priority sizes="100vw" className="tablet:hidden w-full h-auto rounded-[12px] bg-white object-cover" />
			<Image src={CONCEPT_IMAGES.c.desktop} alt={CONCEPT_IMAGES.c.alt} width={1920} height={1350} priority sizes="50vw" className="hidden tablet:block w-full h-auto rounded-[12px] bg-white object-cover" />
		</>
	) : (
		<Image src={heroImage} alt={hero.image.alt} width={1920} height={1080} priority sizes="(max-width: 768px) 100vw, 50vw" className="w-full h-auto rounded-[12px] bg-white object-cover" />
	);

	return (
		<section className="w-full bg-custom-blue-gray text-white border-b-[8px] border-[#C83642]">
			<div className="max-w-[1440px] mx-auto flex flex-col tablet:flex-row items-center gap-8 tablet:gap-12 px-6 tablet:px-[24px] py-10 tablet:py-14">
				<div className="flex flex-col gap-5 tablet:w-1/2">
					<HeroText />
				</div>
				<div className="tablet:w-1/2 w-full">{sideImage}</div>
			</div>
		</section>
	);
}