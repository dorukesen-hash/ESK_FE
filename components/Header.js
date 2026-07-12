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
			<div className="h-[60px] flex items-center justify-between tablet:px-[24px] tablet:py-[12px]">
				<Link href="/" className="py-1 min-w-[180px] flex justify-center items-center h-full ratio-[420/60]">
					<Image src={icon} width={420} height={60} alt="ESK Packaging"/>
				</Link>
				<SearchBar position="top"/>
				<ActionButtons/>
				<MobileMenus/>
			</div>

			{/* below navigation */}
			<div className="absolute tablet:hidden w-full ">
				<SearchBar position="bottom"/>
			</div>

			{/* navbar */}
			<NavBar/>
		</header>
	)
}

