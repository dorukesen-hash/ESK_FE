"use client"
import React from 'react';
import Image from "next/image";
import bgImage4 from "../../assets/image4.png"
import Link from "next/link";

export default function About() {
	return (
		<div className="flex justify-center items-center w-full max-w-[1920px] h-auto my-[56px] text-text-dark px-4 tablet:px-0">
			<div className="flex flex-col laptop:flex-row justify-center items-center w-full laptop:w-[1556px] gap-[32px] laptop:gap-[58px]">
				<Image
					className="rounded-[12px] w-full laptop:w-[540px] h-auto max-w-[1024px]"
					height={460}
					width={540}
					src={bgImage4} alt="eskpackaging"/>
				<div className="flex flex-col gap-[24px] max-w-[1024px] laptop:gap-[40px] laptop:w-full">
					<h3
						className="text-[28px] laptop:text-[38px] font-bold ">What We Do
					</h3>
					<hr className="border-t-2 text-border-gray" />
					<p className="text-[16px] laptop:text-[22px]">
						Established in 2021, ESK Packaging specializes in supplying businesses, industries, and
						individuals nationwide with the highest quality industrial packaging materials.
						<br/> Our beautiful facilities are located in Sacramento, CA, and Dallas, TX.
						<br/>
						<br/>From strapping, stretch film, edge & corner protectors through to tools and accessories.
					</p>
					<Link href={"/pages/about-us"} className="text-text-blue font-medium text-[16px] laptop:text-[20px]">Read more</Link>
				</div>
			</div>
		</div>
	)
}