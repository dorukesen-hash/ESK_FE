"use client"

import React, {useContext, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {AppContext} from "@/Context/AppContext";
import { slugify } from "@/hooks/service";


export default function MobileMenus() {
	const router = useRouter();
	const {state, cartTotal} = useContext(AppContext);
	const {categories} = state;
	{/* laptop and pc navbar helpers*/
	}
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const [openSections, setOpenSections] = useState(categories?.length)
	const toggleSection = (index) => {
		const updatedSections = [...openSections];
		updatedSections[index] = !updatedSections[index];
		setOpenSections(updatedSections);
	};

	{/* Close all menus on first render*/
	}
	useEffect(() => {
		setDropdownOpen(false);
		setOpenSections([]);
	}, [router.pathname]);

	const menuWrapperRef = useRef(null);

	useEffect(() => {
		if (!isDropdownOpen) return;
		function handleClickOutside(event) {
			if (menuWrapperRef.current && !menuWrapperRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isDropdownOpen]);

	return (
		<div ref={menuWrapperRef} className="h-[60px] flex items-center justify-between px-[24px] py-[12px]">
			{/* Button to open dropdown menu, displayed on tablet and mobile*/}
			<div className="relative laptop:hidden">
				<button
					className="w-[48px] h-[48px] rounded fill flex items-center justify-center hover:fill-custom-blue hover:bg-button-gray cursor-pointer"
					onClick={() => {
						setDropdownOpen(!isDropdownOpen);
					}}
				>
					{isDropdownOpen ?
						<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32"
						     viewBox="0 0 50 50">
							<path
								d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
						</svg> :
						<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32"
						     viewBox="0 0 50 50">
							<path
								d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z"></path>
						</svg>}
				</button>
				{/* Navigation menus, displayed on tablet and mobile*/}
				{isDropdownOpen &&
					<div
						className="absolute right-0 bg-white p-[12px] overflow-hidden rounded-[4px] w-[276px] shadow-custom">
						{/* Fast access links  displayed in dropdown menu for tablet and mobile*/}
						<div className="flex flex-col">
							<Link href={"/auth/my-account"}
							      className="w-full text-[16px] text-left pl-[20px] text-text-dark font-semibold py-[10px] border-r-[4px] border-transparent hover:bg-button-gray hover:border-r-custom-blue"
							      onClick={() => setDropdownOpen(false)}>
								My account
							</Link>
						</div>
						<div className="flex flex-col">
							<Link href={"/cart"}
							      className="flex items-center justify-between text-[16px] text-left px-[20px] text-text-dark font-semibold py-[10px] border-r-[4px] border-transparent hover:bg-button-gray hover:border-r-custom-blue"
							      onClick={() => setDropdownOpen(false)}>
								<p>Cart</p>
								<p>${cartTotal.toFixed(2)}</p>
							</Link>
						</div>
						<hr className="border-[1px] w-full my-[8px] border-button-gray"/>
						<nav className="flex bg-white flex-col items-start w-full">
							{categories && categories.map((item, index) => (
								<div key={index} className="w-full">
									<button
										className="w-full text-[16px] text-left pl-[20px] text-text-dark font-semibold py-[10px] border-r-[4px] border-transparent hover:bg-button-gray hover:border-r-custom-blue cursor-pointer"
										onClick={() => toggleSection(index)}
									>
										{item.name}
									</button>
									{openSections[index] && (
										<div className="pl-6 mt-2">
											{item.subcategories.map((link, linkIndex) => (
												<Link
													key={linkIndex}
													href={`/products/${slugify(item.name)}/${slugify(link.name)}`}
													className="block text-[16px] py-1 px-2 text-text-dark hover:bg-button-gray hover:border-r-custom-blue"
													onClick={() => setDropdownOpen(false)}
												>
													{link.name}
												</Link>
											))}
										</div>
									)}
								</div>
							))}
						</nav>
						<hr className="border-[1px] w-full my-[8px] border-button-gray"/>
						<div className="flex flex-col">
							<Link href={"/pages/contact-us"}
							      className="w-full text-[16px] text-left pl-[20px] text-text-dark font-semibold py-[10px] border-r-[4px] border-transparent hover:bg-button-gray hover:border-r-custom-blue">
								Contact Us
							</Link>
							<Link href={"/pages/about-us"}
							      className="w-full text-[16px] text-left pl-[20px] text-text-dark font-semibold py-[10px] border-r-[4px] border-transparent hover:bg-button-gray hover:border-r-custom-blue">
								About Us
							</Link>
							<Link href={"/knowledge-center"}
							      className="w-full text-[16px] text-left pl-[20px] text-text-dark font-semibold py-[10px] border-r-[4px] border-transparent hover:bg-button-gray hover:border-r-custom-blue">
								Knowledge Center
							</Link>
						</div>
					</div>}
			</div>
		</div>
	)
}
