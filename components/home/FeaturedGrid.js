"use client";

import {useContext} from "react";
import Link from "next/link";
import {AppContext} from "@/Context/AppContext";
import VariantCard from "@/components/landingPage/VariantCard";
import {allVariantsInCategories} from "@/hooks/service";

const MAX_ITEMS = 8;

export default function FeaturedGrid() {
	const {state} = useContext(AppContext);
	const categories = state?.categories ?? [];

	const items = allVariantsInCategories(categories)
		.sort((a, b) => a.id - b.id)
		.slice(0, MAX_ITEMS);

	return (
		<section aria-labelledby="featured-products" className="w-full bg-[#F4F6F8] border-y-2 border-border-gray/50">
			<div className="max-w-[1440px] mx-auto px-4 tablet:px-[24px] py-10">
				<h2 id="featured-products" className="text-[24px] tablet:text-[32px] font-bold text-text-dark">
					Featured Products
				</h2>
				<p className="text-[15px] tablet:text-[16px] text-text-light mt-1 mb-6 leading-relaxed">
					Ready to order online.
				</p>

				{items.length > 0 ? (
					<>
						<div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-3 tablet:gap-6">
							{items.map((item) => (
								<VariantCard key={item.id} id={item.id}/>
							))}
						</div>
						<Link
							href="/products"
							className="mt-6 flex items-center justify-center w-full tablet:w-fit tablet:mx-auto h-[48px] px-8 rounded-[10px] border-2 border-custom-blue text-custom-blue font-semibold text-[15px] hover:bg-custom-blue hover:text-white transition-colors"
						>
							View All Products →
						</Link>
					</>
				) : (
					<div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-3 tablet:gap-6" aria-hidden="true">
						{Array.from({length: 8}).map((_, i) => (
							<div key={i} className="border-2 border-border-gray rounded-[12px] bg-white overflow-hidden">
								<div className="w-full aspect-square bg-button-gray animate-pulse"/>
								<div className="p-4 space-y-2">
									<div className="h-4 bg-button-gray rounded animate-pulse"/>
									<div className="h-4 w-1/2 bg-button-gray rounded animate-pulse"/>
									<div className="h-[48px] bg-button-gray rounded animate-pulse"/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
