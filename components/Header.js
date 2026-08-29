"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";

import icon from "../assets/ESK_icon.png"
import ActionButtons from "@/components/header/ActionButtons";
import NavBar from "@/components/header/NavBar";
import MobileMenus from "@/components/header/MobileMenus";
import SearchBar from "@/components/header/SearchBar";


export default function Header() {


	return (
		<header
			className="sticky top-0 bg-white text-text-dark py-[12px] items-center overflow-visible z-50 border-b-[2px] border-border-gray">
			{/* Main header section*/}
			<div className="h-[64px] flex items-center justify-between px-[8px] tablet:px-[24px] tablet:py-[12px]">
				{/* Logo sizes: mobile 280px, tablet 302px, laptop 356px; h-auto keeps aspect ratio at every size. */}
				<Link href="/" className="py-1 flex items-center h-full flex-1 min-w-0 max-w-[280px] tablet:flex-none tablet:max-w-none">
					<Image src={icon} width={420} height={60} alt="ESK Packaging"
					       className="w-full max-w-[280px] tablet:w-[302px] tablet:max-w-none laptop:w-[356px] h-auto"/>
				</Link>
				<SearchBar position="top"/>
				<ActionButtons/>
				<MobileMenus/>
			</div>

			{/* Mobile search bar, in normal flow below the header row. Hidden
			    from tablet up so it doesn't duplicate the header row's own
			    SearchBar (SearchBar.js doesn't read `position` — both
			    instances share the same internal max-tablet:hidden class). */}
			<div className="tablet:hidden w-full">
				<SearchBar position="bottom"/>
			</div>

			{/* navbar */}
			<NavBar/>
		</header>
	)
}

