"use client";

import React, {useEffect, useState, useContext} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {AppContext} from "@/Context/AppContext";
import CategoryCard from "@/components/CategoryCard";

// Görüntü için
function capitalizeWords(str) {
	return str
		.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

// URL için
function slugify(str) {
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');
}

export default function NavBar() {
	const router = useRouter();
	const {state} = useContext(AppContext);
	const {categories} = state;
	const [hoveredIndex, setHoveredIndex] = useState(null);

	useEffect(() => {
		setHoveredIndex(null);
	}, [router.pathname]);

	return (
		<nav className={`laptop:flex hidden relative w-full justify-center text-[20px] pt-[12px]`} >
			{categories && categories?.length > 0 && categories.map((item, index) => (
				<div
					key={index}
					className="flex items-center justify-center"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					{/* Main link */}
					<Link
						href={`/products/${slugify(item.name)}`}
						className={`flex items-center justify-between h-[60px] border-b-[4px] gap-[1px] px-2
                            ${hoveredIndex === index ? "bg-button-gray border-b-custom-blue font-semibold" : "border-transparent hover:bg-button-gray hover:border-b-custom-blue "}
                        `}
					>
						{capitalizeWords(item.name)}
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12.04 17.6172L3 8.37865L5.33002 5.99902L12.04 12.8479L18.74 5.99902L21.08 8.37865L12.04 17.6172Z" fill="#182434"/>
						</svg>
					</Link>
					{/* Dropdown menu */}
					{hoveredIndex === index && (
						<div
							className="absolute top-full left-0 bg-white w-[100vw] h-[360px] shadow-custom flex items-center justify-center gap-14"
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							{item.subcategories.map((subItem, idx) => (
								<CategoryCard
									key={idx}
									link={`/products/${slugify(item.name)}/${slugify(subItem.name)}`}
									image={subItem?.subcategory_images ? subItem?.subcategory_images[0]?.image?.url : subItem?.imgurl}
									name={capitalizeWords(subItem.name)}
								/>
							))}
						</div>
					)}
				</div>
			))}
		</nav>
	)
}
