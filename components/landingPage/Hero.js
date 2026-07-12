"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const heroData = [
	{
		title: "PACKAGING SOLUTIONS",
		description: "We are your partner in delivering quality and value.",
		images: {
			pc: "/assets/hero/solution_pc.png",
			tablet: "/assets/hero/solution_tablet.png",
			mob: "/assets/hero/solution_mob.png",
		},
		link: "/products",
		bgColor: "bg-custom-blue"
	},
	{
		title: "CORD STRAPPING & LASHING",
		description: "Solutions to secure your shipment",
		images: {
			pc: "/assets/hero/strapping_pc.png",
			tablet: "/assets/hero/strapping_tablet.png",
			mob: "/assets/hero/strapping_mob.png",
		},
		link:"/products/cord-strapping",
		bgColor: "bg-[#F73B45]"
	},
	{
		title: "CORNER BOARDS",
		description: "ESK carries a huge variety of edge protectors",
		images: {
			pc: "/assets/hero/corner_pc.png",
			tablet: "/assets/hero/corner_tablet.png",
			mob: "/assets/hero/corner_mob.png",
		},
		link:"/products/edge-protection/corner-board",
		bgColor: "bg-text-dark"
	},
];

export default function Hero() {
	const [resolution, setResolution] = useState("pc");
	const [current, setCurrent] = useState(0);
	const intervalRef = useRef();

	const resetInterval = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setCurrent((prev) => (prev + 1) % heroData.length);
		}, 5000);
	};

	const handlePrev = () => {
		setCurrent((prev) => (prev - 1 + heroData.length) % heroData.length);
		resetInterval();
	};
	const handleNext = () => {
		setCurrent((prev) => (prev + 1) % heroData.length);
		resetInterval();
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setResolution("mob");
			} else if (window.innerWidth < 1440) {
				setResolution("tablet");
			} else {
				setResolution("pc");
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		resetInterval();
		return () => intervalRef.current && clearInterval(intervalRef.current);
	}, []);

	const getImageForResolution = (item) => {
		return item.images[resolution];
	};

	return (
		<div className="w-full max-w-[1980px] h-[644px] max-h-[700px] relative flex items-start justify-center bg-transparent overflow-hidden
						laptop:justify-start">
				<Image
					src={getImageForResolution(heroData[current])}
					alt={heroData[current].title}
					width={2048}
					height={2048}
					className="absolute w-full h-full object-cover -z-20"
				/>
			<div className={`w-full flex flex-col items-center justify-start p-4 bg-c
						laptop:h-full laptop:w-[440px] laptop:justify-center ${heroData[current].bgColor}`}>
				<h3 className="text-center tracking-widest leading-tight font-bold
				 				text-[36px] mb-[14px]
				 				tablet:text-[44px] tablet:mt-[30px]" >
					{heroData[current].title}
				</h3>
				<p className="text-center leading-tight font-normal
								text-[20px] mb-[34px]
								tablet:text-[22px]">
					{heroData[current].description}
				</p>
				<Link href={heroData[current].link}
				className="w-[164px] h-[42px] mb-[28px] font-semibold items-center justify-center flex bg-transparent text-white border-2 border-white rounded-[8px] hover:bg-white hover:text-custom-button-green">
					Shop Now
				</Link>
			</div>
			{/* Slider Kontrol Butonları */}
			<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 z-10">
				<button onClick={handlePrev} className="w-10 h-10 flex items-center justify-center bg-transparent group cursor-pointer">
				  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform duration-200 group-hover:scale-125 group-active:scale-90">
				    <polyline points="16,6 8,12 16,18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
				  </svg>
				</button>
				<div className="flex gap-2">
					{heroData.map((_, idx) => (
						<span
							key={idx}
							className={`w-2 h-2 rounded-full ${
								idx === current
									? "bg-custom-blue"
									: "bg-button-gray"
							}`}
						/>
					))}
				</div>
				<button onClick={handleNext} className="w-10 h-10 flex items-center justify-center bg-transparent group cursor-pointer">
				  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform duration-200 group-hover:scale-125 group-active:scale-90">
				    <polyline points="8,6 16,12 8,18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
				  </svg>
				</button>
			</div>
		</div>
	);
}