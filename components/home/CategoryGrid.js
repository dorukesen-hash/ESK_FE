"use client";

import {useContext} from "react";
import Image from "next/image";
import Link from "next/link";
import {AppContext} from "@/Context/AppContext";
import {prettify, slugify} from "@/hooks/service";

const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

function CardImage({image}) {
	if (!image) {
		return (
			<div className="relative w-full aspect-[4/3] bg-[#F4F6F8] flex items-center justify-center text-border-gray">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
					<path d="M3 8l9 5 9-5M12 13v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
				</svg>
			</div>
		);
	}
	return (
		<div className="relative w-full aspect-[4/3] bg-[#F4F6F8]">
			<Image
				src={image.src}
				alt={image.alt}
				fill
				sizes="(max-width: 1024px) 50vw, 33vw"
				className="object-cover group-hover:scale-[1.03] transition-transform"
			/>
		</div>
	);
}

function CategoryCard({category}) {
	return (
		<Link
			href={category.href}
			className="group flex flex-col border-2 border-border-gray rounded-[12px] overflow-hidden bg-white hover:border-custom-blue hover:shadow-custom transition-all"
		>
			<CardImage image={category.image}/>
			<div className="flex items-center justify-between gap-2 px-4 py-2 min-h-[64px] tablet:min-h-[60px] grow">
				<span className="font-semibold text-[14px] tablet:text-[16px] leading-tight text-text-dark">{category.label}</span>
				<span aria-hidden="true" className="text-custom-blue font-bold shrink-0">→</span>
			</div>
		</Link>
	);
}

export default function CategoryGrid() {
	const {state} = useContext(AppContext);
	const categories = state?.categories ?? [];

	// Card image comes from the category's first subcategory (categories
	// themselves carry no image field in the API response — same source
	// CategoryLevel.js reads for the subcategory grid one level in).
	const cards = categories.map((cat) => {
		const thumbUrl = cat.subcategories?.[0]?.subcategory_images?.[0]?.image?.url;
		return {
			label: prettify(cat.name),
			href: `/products/${slugify(cat.name)}`,
			image: thumbUrl ? {src: `${cdnUrl}${thumbUrl}`, alt: cat.name} : null,
		};
	});

	if (cards.length === 0) return null;

	return (
		<section aria-labelledby="shop-by-category" className="w-full max-w-[1440px] mx-auto px-6 tablet:px-[24px] py-12">
			<div className="flex items-end justify-between mb-6">
				<div>
					<h2 id="shop-by-category" className="text-[24px] tablet:text-[32px] font-bold text-text-dark">
						Shop by Category
					</h2>
					<p className="text-[14px] tablet:text-[16px] text-text-light mt-1">
						Browse our full range of industrial packaging products.
					</p>
				</div>
				<Link href="/products" className="hidden tablet:block text-custom-blue font-semibold hover:underline whitespace-nowrap">
					View all products →
				</Link>
			</div>

			<div className="grid grid-cols-2 min-[1024px]:grid-cols-3 gap-3 tablet:gap-6">
				{cards.map((category) => (
					<CategoryCard key={category.label} category={category}/>
				))}
				<Link
					href="/products"
					className="min-[1024px]:hidden flex items-center justify-center border-2 border-custom-blue/50 rounded-[12px] text-custom-blue font-semibold text-[14px] hover:bg-custom-blue hover:text-white transition-colors min-h-[120px]"
				>
					View all products →
				</Link>
			</div>
		</section>
	);
}
