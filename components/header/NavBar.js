"use client";

import React, {useEffect, useMemo, useRef, useState, useContext} from "react";
import {useRouter, usePathname} from "next/navigation";
import Link from "next/link";
import {AppContext} from "@/Context/AppContext";
import {slugify} from "@/hooks/service";

// Görüntü için
function capitalizeWords(str) {
	return str
		.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

const shopMenu = {
	label: "Shop Products",
	viewAll: {label: "View All Products", href: "/products"},
};

const primaryNav = [
	{label: "Industries We Serve", href: "/#industries-we-serve"},
	{label: "Knowledge Center", href: "/knowledge-center"},
	{label: "About Us", href: "/pages/about-us"},
];

function Chevron({open}) {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
		>
			<path d="M12.04 17.6172L3 8.37865L5.33002 5.99902L12.04 12.8479L18.74 5.99902L21.08 8.37865L12.04 17.6172Z" fill="#182434"/>
		</svg>
	);
}

export default function NavBar() {
	const router = useRouter();
	const pathname = usePathname();
	const {state} = useContext(AppContext);
	const {categories} = state;
	const [shopOpen, setShopOpen] = useState(false);
	const navRef = useRef(null);

	useEffect(() => {
		setShopOpen(false);
	}, [pathname]);

	// Menü dışına tıklanınca kapat
	useEffect(() => {
		if (!shopOpen) return;
		function handleClickOutside(event) {
			if (navRef.current && !navRef.current.contains(event.target)) {
				setShopOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [shopOpen]);

	// Backend'den gelen kategoriler -> mega menu grupları
	const groups = useMemo(() => (
		(categories ?? []).map((item) => ({
			label: capitalizeWords(item.name),
			href: `/products/${slugify(item.name)}`,
			children: (item.subcategories ?? []).map((subItem) => ({
				label: capitalizeWords(subItem.name),
				href: `/products/${slugify(item.name)}/${slugify(subItem.name)}`,
				children: [],
			})),
		}))
	), [categories]);

	const itemClass = (active) => `flex items-center justify-between gap-1 h-[60px] border-b-[4px] px-2 text-[20px]
		${active
			? "bg-button-gray border-b-custom-blue font-semibold"
			: "border-transparent hover:bg-button-gray hover:border-b-custom-blue"}`;

	const closeMenu = () => setShopOpen(false);

	return (
		<nav ref={navRef} aria-label="Primary" className="hidden laptop:flex relative w-full items-center justify-center gap-1 pt-[12px]">
			{/* Shop Products + mega menu */}
			<div onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
				<button
					type="button"
					aria-expanded={shopOpen}
					aria-haspopup="true"
					onClick={() => setShopOpen((open) => !open)}
					className={itemClass(shopOpen)}
				>
					{shopMenu.label}
					<Chevron open={shopOpen}/>
				</button>
				{shopOpen && (
					<div className="absolute top-full left-0 w-full bg-white shadow-custom border-t-2 border-border-gray">
						<div className="max-w-[1440px] mx-auto px-[24px] py-8">
							<div className="grid grid-cols-4 gap-x-6 gap-y-8">
								{groups.map((group) => (
									<div key={group.label}>
										{group.href ? (
											<Link
												href={group.href}
												onClick={closeMenu}
												className="block text-[14px] font-bold uppercase tracking-[0.08em] text-text-dark hover:text-custom-blue"
											>
												{group.label}
											</Link>
										) : (
											<p className="text-[14px] font-bold uppercase tracking-[0.08em] text-text-dark">
												{group.label}
											</p>
										)}
										<ul className="mt-3 flex flex-col gap-1">
											{group.children.map((child) => (
												<li key={child.label}>
													{child.href ? (
														<Link
															href={child.href}
															onClick={closeMenu}
															className="block py-1 text-[15px] text-text-dark hover:text-custom-blue hover:underline"
														>
															{child.label}
														</Link>
													) : (
														<span className="block py-1 text-[15px] text-text-light cursor-default">
															{child.label}
														</span>
													)}
													{child.children?.length > 0 && (
														<ul className="pl-3 border-l-2 border-border-gray/60 flex flex-col">
															{child.children.filter((sub) => sub.href).map((sub) => (
																<li key={sub.label}>
																	<Link
																		href={sub.href}
																		onClick={closeMenu}
																		className="block py-1 text-[14px] text-text-light hover:text-custom-blue hover:underline"
																	>
																		{sub.label}
																	</Link>
																</li>
															))}
														</ul>
													)}
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
							<div className="mt-6 pt-4 border-t-2 border-border-gray/60 flex justify-end">
								<Link
									href={shopMenu.viewAll.href}
									onClick={closeMenu}
									className="text-custom-blue font-semibold text-[16px] hover:underline"
								>
									{shopMenu.viewAll.label} →
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>

			{primaryNav.map((item) => (
				item.href ? (
					<Link key={item.label} href={item.href} className={itemClass(false)}>
						{item.label}
					</Link>
				) : (
					<span key={item.label} className={`${itemClass(false)} cursor-default select-none`}>
						{item.label}
					</span>
				)
			))}
		</nav>
	);
}
