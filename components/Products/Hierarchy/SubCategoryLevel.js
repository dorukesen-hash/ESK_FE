'use client';

import Link from 'next/link';
import Image from 'next/image';
import {prettify, slugify} from "@/hooks/service";
import React, {useContext, useState} from "react";
import {AppContext} from "@/Context/AppContext";
import icon from "@/assets/ESK_icon.png";
import Loading from "@/components/Loading";
import MakeQuery from "@/components/Products/Helpers/MakeQuery";
import VariantTables from "@/components/Products/Helpers/VariantTables";

const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

export default function SubCategoryLevel({props}) {
	const {state} = useContext(AppContext);
	const {categories} = state;
	const [activeImage, setActiveImage] = useState()

	if (!categories || categories.length === 0) {return <Loading/>}

	const category = categories.find(c => c.id === props.categoryId)
	const subcategory = categories.find(c => c.id === props.categoryId).subcategories.find(s => s.id === props.subcategoryId);

	return( subcategory?.products.length > 0
		// Image and product links stack on mobile instead of a fixed-width
		// row that overflowed on phone viewports.
		?<div className="w-full h-full max-w-[1200px] flex flex-col min-[1024px]:flex-row min-[1024px]:items-start gap-8 my-8 tablet:my-[62px]">
			<div className="relative w-full max-w-[440px] mx-auto min-[1024px]:mx-0 aspect-square shrink-0 rounded-[12px] border-2 border-border-gray bg-white overflow-hidden">
				<Image
					src={subcategory.subcategory_images?.[0]?.image?.url ? `${cdnUrl}${subcategory.subcategory_images[0].image.url}` : icon}
					alt={prettify(subcategory.name)}
					fill
					sizes="(max-width: 1024px) 90vw, 440px"
					className="object-contain p-2"
				/>
			</div>

			<div className="w-full flex flex-col gap-[16px] pb-[4px]">
				{subcategory.products.map((p) => (
					<Link
						key={p.id}
						href={`/products/${slugify(category.name)}/${slugify(subcategory.name)}/${slugify(p.title)}`}
						className="group w-full min-h-[96px] flex items-center gap-4 p-3 rounded-[12px] border-[2px] border-border-gray hover:border-custom-blue"
					>
						<div className="w-[96px] tablet:w-[160px] h-[80px] rounded-[6px] relative shrink-0 bg-white">
							<Image
								src={p.product_images.length > 0 ? `${cdnUrl}${p.product_images[0]?.image?.url}` : icon}
								alt={p.title}
								fill
								sizes="160px"
								className="object-contain rounded"
							/>
						</div>
						<div className="min-w-0">
							<h3 className="text-[16px] tablet:text-lg font-semibold text-gray-800 group-hover:text-custom-blue">
								{prettify(p.title)}
							</h3>
							{(p.variants?.length ?? 0) > 0 && (
								<p className="text-[13px] text-text-light mt-0.5">
									{p.variants.length} standard {p.variants.length === 1 ? "size" : "sizes"}
								</p>
							)}
						</div>
						<span aria-hidden="true" className="ml-auto text-custom-blue font-bold shrink-0 pr-1">→</span>
					</Link>
				))}
			</div>
		</div>
		: <div className="w-full max-w-[1200px] flex flex-col justify-center gap-12 p-10">
			<div className="flex gap-[38px]">
				<div className="flex flex-col">
					<div className="w-[480px] h-[480px] relative rounded-lg overflow-hidden">
						<Image
							src={activeImage ? `${cdnUrl}${activeImage?.image?.url}`: `${cdnUrl}${subcategory?.subcategory_images[0].image.url}`}
							alt="Main Product"
							sizes="480px"
							fill
							className="object-contain"
							priority
						/>
					</div>
					<div className="flex justify-center gap-2 mt-4">
						{subcategory?.subcategory_images.length > 0 && subcategory?.subcategory_images.map((img) => (
							<div
								key={img.id}
								className={`w-[80px] h-[80px] border-2 rounded relative cursor-pointer ${
									activeImage === img.image.url ? 'border-blue-500' : 'border-gray-300'
								}`}
								onClick={() => setActiveImage(img)}
							>
								<Image
									src={`${cdnUrl}${img.image?.url}`}
									alt="Thumbnail"
									sizes="80px"
									fill
									className="object-contain"
								/>
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-col justify-start pt-4">
					<div>
						<p className="mb-[30px] text-[16px]">{subcategory.variants[0]?.description}</p>
						{[1,2,3,4,5,6].map(i => (
							subcategory.variants[0]?.[`bullet_${i}`] && (
								<p key={i} className="flex pb-[18px] gap-[12px] text-[14px]">
									<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										{/* SVG path'leri */}
										<path d="M22.4322 7.47943L20.536 9.71645C20.7715 10.5282 20.9017 11.3834 20.9017 12.2695C20.9017 17.3261 16.787 21.4407 11.7304 21.4407C6.67389 21.4407 2.55926 17.3261 2.55926 12.2695C2.55926 7.21296 6.67389 3.09832 11.7304 3.09832C13.354 3.09832 14.8846 3.52589 16.2107 4.2695L17.89 2.29273C16.0992 1.18352 13.9861 0.539062 11.7304 0.539062C5.26104 0.539062 0 5.8001 0 12.2695C0 18.7389 5.26104 23.9999 11.7304 23.9999C18.1999 23.9999 23.4609 18.7389 23.4609 12.2695C23.4609 10.5654 23.0953 8.94186 22.4322 7.47943Z" fill="#5CA0E2"/>
										<path d="M13.0195 16.3842L7.22559 10.5902L10.0451 7.77073L12.7778 10.5097L21.695 0L24.7314 2.57785L13.0195 16.3842Z" fill="#5CA0E2"/>
									</svg>
									{subcategory.variants[0]?.[`bullet_${i}`]}
								</p>
							)
						))}
					</div>
					<p className="text-[14px] text-text-light mb-[32px]">* If you do not see your size, standard and
						custom dimensions available</p>
					<MakeQuery/>
				</div>
			</div>
			<VariantTables props={props} />
		</div>
	)
}
