"use client"
import React, {useContext} from "react";

import {AppContext} from "@/Context/AppContext";
import {slugify} from "@/hooks/service";
import Link from "next/link";
import Image from "next/image";
import icon from "@/assets/ESK_icon.png"
import Loading from "@/components/Loading";
const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

const CategoryLevel = ({props}) => {
	const {state} = useContext(AppContext);
	const {categories} = state;

	if (!categories || categories.length === 0) {return <Loading/>;	}
	const category = categories.find(c => c.id === props.categoryId);

	if (!category) {
		return <div>Category not found</div>;
	}

	return (
		<div className="w-full max-w-[1920px] flex justify-center mt-[62px] gap-[48px] items-center">
			{category.subcategories.length > 0 && category.subcategories.map((s) =>
				<Link
					key={s.id}
					href={`/products/${slugify(category.name)}/${slugify(s.name)}`}
					className="flex flex-col items-center justify-end h-[454px] w-[372px] rounded-[12px] border-[2px] border-border-gray hover:border-custom-blue"
				>
					<div className="relative w-[356px] h-[356px] flex items-center justify-center">
						<Image
							src={s.subcategory_images.length >0 ? `${cdnUrl}${s.subcategory_images[0]?.image?.url}` : icon}
							fill
							alt="Category Image"
							className="object-contain"
							sizes="356px"
						/>
					</div>
					<p className="text-[20px] font-[700] text-center mb-[32px] mt-[16px]">{s.name}</p>
				</Link>
			)}
		</div>
	);
};

export default CategoryLevel;