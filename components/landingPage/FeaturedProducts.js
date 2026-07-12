"use client";
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "@/Context/AppContext";
import VariantCard from "@/components/landingPage/VariantCard";
import {allVariantsInCategories} from "@/hooks/service";

export default function FeaturedProducts() {
	const {state} = useContext(AppContext);
	const categories = state.categories;
	const [currentIndex, setCurrentIndex] = useState(1);
	const [cardsToShow, setCardsToShow] = useState(3);

	const allVariants = allVariantsInCategories(categories);
	allVariants.sort((a, b) => a.id - b.id);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1000) {
				setCardsToShow(1);
			} else if (window.innerWidth < 1440) {
				setCardsToShow(2);
			} else {
				setCardsToShow(3);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex > 0 ? prevIndex - 1 : allVariants.length - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex < allVariants.length - 1 ? prevIndex + 1 : 0
		);
	};

	const getVisibleItems = () => {
		const visibleItems = [];
		for (let i = 0; i < cardsToShow; i++) {
			let index = currentIndex + i;
			if (index >= allVariants.length) index -= allVariants.length;
			visibleItems.push(allVariants[index]);
		}
		return visibleItems;
	};

	return (
		<div className=" text-text-dark flex flex-col items-center mt-[72px] gap-[40px] mb-20">
			<h2 className="text-[26px] tablet:text-[38px] font-bold text-center">Featured Products</h2>
			<div className="flex items-center justify-center gap-1 tablet:gap-[20px] w-full max-w-full">
				<button
					className="bg-white rounded-full shadow p-2 md:p-2 sm:p-1"
					onClick={handlePrev}
				>
					<svg
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						className="tablet:w-[32px] tablet:h-[32px] w-[16px] h-[16px]"
					>
						<polyline points="16,6 8,12 16,18" stroke="#909AA3" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
				<div className="flex gap-[20px] w-full justify-center">
					{getVisibleItems().map((item) =>
						item && <VariantCard key={item.id} id={item.id}/>
					)}
				</div>
				<button
					className="bg-white rounded-full shadow p-2 md:p-2 sm:p-1"
					onClick={handleNext}
				>
					<svg
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						className="tablet:w-[32px] tablet:h-[32px] w-[16px] h-[16px]"
					>
						<polyline points="8,6 16,12 8,18" stroke="#909AA3" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
			</div>
		</div>
	);
}
