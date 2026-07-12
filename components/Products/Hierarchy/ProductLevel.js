'use client';

import React, {useContext, useEffect, useState} from "react";
import Image from 'next/image';

import {AppContext} from "@/Context/AppContext";
import MakeQuery from "@/components/Products/Helpers/MakeQuery";
import VariantTables from "@/components/Products/Helpers/VariantTables";

const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;


const ProductLevel = ({props}) => {
	const {state} = useContext(AppContext);
	const {categories} = state;
	const [activeImage, setActiveImage] = useState()
	const [category, setCategory] = useState()
	const [subcategory, setSubcategory] = useState()
	const [product, setProduct] = useState()


	useEffect(() => {
		setCategory(categories.find(c => c.id === props.categoryId))
		setSubcategory(categories.find(c => c.id === props.categoryId).subcategories.find(s => s.id === props.subcategoryId))
		setProduct(categories.find(c => c.id === props.categoryId).subcategories.find(s => s.id === props.subcategoryId).products.find(p => p.id === props.productId))

		if (product?.product_images?.length > 0) {
			setActiveImage(product.product_images[0]);
		}

	}, [categories,category, subcategory, product]);

	return (
		<div className="w-full max-w-[1200px] flex flex-col justify-center gap-12 p-10">
			<div className="flex gap-[38px]">
				<div className="flex flex-col">
					<div className="w-[480px] h-[480px] relative rounded-lg overflow-hidden">
						<Image
							src={`${cdnUrl}${activeImage?.image?.url}`}
							alt="Main Product"
							sizes="480px"
							fill
							className="object-contain"
							priority
						/>
					</div>
					<div className="flex justify-center gap-2 mt-4">
						{product?.product_images.length > 0 && product?.product_images.map((img) => (
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
					<p className="text-gray-700 text-[16px] mb-[32px] max-w-[600px]">{product?.description?.text}</p>
					<ul className="space-y-3">
						{product?.description && product?.description?.list_items?.map((item, i) => (
							<li key={i} className="flex items-start text-[14px] gap-[18px] text-gray-800">
                            <span className="text-blue-500 text-xl">
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
	                                    d="M23.4322 8.47943L21.536 10.7164C21.7715 11.5282 21.9017 12.3834 21.9017 13.2695C21.9017 18.3261 17.787 22.4407 12.7304 22.4407C7.67389 22.4407 3.55926 18.3261 3.55926 13.2695C3.55926 8.21296 7.67389 4.09832 12.7304 4.09832C14.354 4.09832 15.8846 4.52589 17.2107 5.2695L18.89 3.29273C17.0992 2.18352 14.9861 1.53906 12.7304 1.53906C6.26104 1.53906 1 6.8001 1 13.2695C1 19.7389 6.26104 24.9999 12.7304 24.9999C19.1999 24.9999 24.4609 19.7389 24.4609 13.2695C24.4609 11.5654 24.0953 9.94186 23.4322 8.47943Z"
	                                    fill="#5CA0E2"/>
                                    <path
	                                    d="M14.0195 17.3842L8.22559 11.5902L11.0451 8.77073L13.7778 11.5097L22.695 1L25.7314 3.57785L14.0195 17.3842Z"
	                                    fill="#5CA0E2"/>
                                </svg>
                            </span>
								<span>{item}</span>
							</li>
						))}
					</ul>
					<p className="text-[14px] text-text-light mb-[32px]">* If you do not see your size, standard and custom dimensions available</p>
					<MakeQuery/>
				</div>
			</div>


		<VariantTables props={props} />
	</div>
	);
}

export default ProductLevel