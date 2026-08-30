'use client';

import React, {useEffect, useState, useContext} from 'react';
import Image from 'next/image';
import {AppContext} from '@/Context/AppContext';
import {getVariantById} from '@/hooks/Api';
import {allVariantsInCategories} from "@/hooks/service";
import icon from "@/assets/ESK_icon.png";
import MakeQuery from "@/components/Products/Helpers/MakeQuery";
import VariantCard from "@/components/landingPage/VariantCard";
import Loading from "@/components/Loading";
import {fieldLabels} from "@/assets/TableHelper";


export function VariantLevel({props}) {
	const {state, updateCart} = useContext(AppContext);
	const [variantData, setVariantData] = useState(null);
	const [activeImage, setActiveImage] = useState(icon)
	const [imageUrls, setImageUrls] = useState([]); // imageUrls artık state
	const [quantity, setQuantity] = useState(0);
	const [loading, setLoading] = useState(true);
	const [subcategoryName, setSubcategoryName] = useState(null);
	const allVariants = allVariantsInCategories(state.categories);
	const localVariant = allVariants.find(v => v.id === props.variantId.id);


	useEffect(() => {
		if (!localVariant) return;
		const fetchVariant = async () => {
			try {
				const data = await getVariantById(localVariant.id);
				setVariantData(data);
				const urls = data?.variant_images.map(image => {
					return image.image.url ? `${process.env.NEXT_PUBLIC_CDN_URL}${image.image.url}` : icon;
				}) || [];
				setImageUrls(urls);
				setActiveImage(urls[0] || icon);
			} catch (error) {
				console.error("Error fetching variant:", error);
			} finally {
				setLoading(false);
			}
		};
		const findSubcategoryById = (id)=> {
			for (const category of state.categories) {
				const found = category.subcategories.find(sub => sub.id === id);
				if (found) return found.name;
			}
			return null;
		}
		setSubcategoryName(findSubcategoryById(localVariant.subcategoryId));
		fetchVariant();
	}, [localVariant]);

	// subcategory bulunamazsa veya fieldLabels'da karşılığı yoksa crash etmemesi için
	const specFields = fieldLabels[subcategoryName] || {};

	const specRows = Object.entries(variantData || {})
		.filter(([key, value]) => specFields[key] && value !== null && value !== "")
		.map(([key, value]) => ({label: specFields[key], value}));

	const usageBullets = [1, 2, 3, 4, 5, 6]
		.map(i => variantData?.[`bullet_${i}`])
		.filter(Boolean);

	const handleAddToCart = async () => {
		if (quantity < 1) return;
		let isPallet
		quantity >= variantData?.units_per_pallet ? isPallet = true : isPallet = false;

		try {
			await updateCart({id: variantData?.id, quantity, isPallet});
		} catch (error) {
			console.error('Cart update failed:', error);
		} finally {}
	};

	if (loading){
		return <Loading />;
	}

	return (
		<div className="w-full max-w-[1180px] px-4 text-text-dark mb-[544px]" >
			{/* Images and buy sections*/}
			<div className="flex flex-col min-[1024px]:flex-row w-full gap-8 min-[1024px]:gap-[58px]">
				{/* Images section*/}
				<div className="flex flex-col">
					<div className="relative w-full max-w-[440px] mx-auto min-[1024px]:mx-0 aspect-square shrink-0 rounded-[12px] border-2 border-border-gray bg-white overflow-hidden">
						<Image
							src={activeImage}
							alt={typeof activeImage === 'string' ? activeImage : 'Product Image'}
							fill
							sizes="(max-width: 1024px) 90vw, 440px"
							className="object-contain p-2"
							priority // LCP için priority eklendi
						/>
					</div>
					<div className="flex justify-center gap-[22px] mt-4">
						{imageUrls?.map((url, index) => (
							<button
								key={index}
								onClick={() => setActiveImage(url)}
								className={`flex items-center justify-center object-contain w-[80px] h-[80px] ${activeImage === url ? 'border-[2px] border-custom-blue' : ''} cursor-pointer rounded-md box-border overflow-hidden`}
							>
								<Image
									src={url}
									alt={`Variant Image ${index + 1}`}
									width={80}
									height={80}
									className="object-contain"
								/>
							</button>
						))}
					</div>
				</div>
				{/*	Price section*/}
				<div className="flex flex-col">
					<div className="mt-[93px]">
						<p className="text-[26px]"><span
							className="text-[34px] font-semibold text-text-blue">${variantData?.one_four_units} </span> / {variantData?.unit}
						</p>
						<p className="text-[16px] font-semibold mt-[16px] mb-[8px]">Bulk discount rates</p>
						<p>Buy 10 and get 8% off</p>
						<p>Buy a pallet or more and save up to 65%</p>
					</div>
					<div className="flex gap-[22px] text-[18px] mt-[94px]">
						<div>
							<p>Buy 1</p>
							<p>Buy 5</p>
							<p>Buy 10</p>
						</div>
						<div className="font-semibold text-[18px]">
							<p>${variantData?.one_four_units}</p>
							<p>${variantData?.five_nine_units}</p>
							<p>${variantData?.ten_plus_units}</p>
						</div>
					</div>
					<div className="w-[400px] flex gap-[10px] mt-[40px] text-[18px] flex-wrap justify-center">
						<div
							className="h-[64px] w-[92px] flex items-center justify-evenly border-[2px] border-border-gray rounded-[12px] group focus-within:border-custom-blue">
							<button
								onClick={() => setQuantity(q => Math.max(0, q - 1))}
								className="h-full w-1/4 cursor-pointer"
							>
								-
							</button>
							<input
								className="max-w-[48px] h-full text-center text-sm focus:outline-none"
								value={quantity}
								onFocus={() => {
								}}
								onBlur={() => {
								}}
								onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
							/>
							<button
								onClick={() => setQuantity(q => q + 1)}
								className="h-full w-1/4 cursor-pointer"
							>
								+
							</button>
						</div>
						<button
							className="w-[286px] h-[64px] bg-custom-blue rounded-[12px] text-white font-bold cursor-pointer"
							onClick={handleAddToCart}
						>
							Add to Cart
						</button>
						<MakeQuery variantSku={variantData?.stock} variantTitle={variantData?.title}/>
					</div>
				</div>
			</div>

			{/* Description, Specifications, Applications, Frequently Purchased
			    Together — flowing sections instead of click-to-switch tabs, so
			    everything is visible without an extra click. Each section only
			    renders when it has real content. */}
			<div className="mt-10 flex flex-col gap-10">
				{variantData?.description && (
					<section aria-labelledby="description-title">
						<h2 id="description-title" className="text-[22px] tablet:text-[26px] font-bold text-text-dark mb-4">
							Product Description
						</h2>
						<p className="text-[15px] text-text-dark leading-relaxed max-w-[820px] whitespace-pre-line">{variantData.description}</p>
					</section>
				)}

				{specRows.length > 0 && (
					<section aria-labelledby="specs-title">
						<h2 id="specs-title" className="text-[22px] tablet:text-[26px] font-bold text-text-dark mb-4">
							Specifications
						</h2>
						<dl className="border-2 border-border-gray rounded-[12px] divide-y divide-border-gray/60 overflow-hidden max-w-[640px]">
							{specRows.map((row) => (
								<div key={row.label} className="flex items-baseline gap-4 px-4 py-2.5 text-[14px]">
									<dt className="w-[140px] shrink-0 font-semibold text-text-light">{row.label}</dt>
									<dd className="text-text-dark break-words">{row.value}</dd>
								</div>
							))}
						</dl>
					</section>
				)}

				{usageBullets.length > 0 && (
					<section aria-labelledby="applications-title">
						<h2 id="applications-title" className="text-[22px] tablet:text-[26px] font-bold text-text-dark mb-4">
							Benefits &amp; Applications
						</h2>
						<ul className="flex flex-col gap-2">
							{usageBullets.map((bullet, i) => (
								<li key={i} className="flex items-start gap-3 text-[14px] text-text-dark whitespace-pre-line">
									<svg className="shrink-0 mt-[2px] text-custom-blue" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
									{bullet}
								</li>
							))}
						</ul>
					</section>
				)}

				{variantData?.FPT && variantData.FPT.length > 0 && (
					<section aria-labelledby="fpt-title">
						<h2 id="fpt-title" className="text-[22px] tablet:text-[26px] font-bold text-text-dark mb-4">
							Frequently Purchased Together
						</h2>
						<div className="grid grid-cols-2 min-[1024px]:grid-cols-4 gap-3 tablet:gap-4">
							{variantData.FPT.map(variant => (
								<VariantCard key={variant.id} id={variant.target_id} />
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}
