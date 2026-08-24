"use client";
import React, {useState, useEffect} from "react";
import HomeHero from "@/components/landingPage/Hero";
import InfoButtons from "@/components/landingPage/InfoButtons";
import InfoCarts from "@/components/landingPage/InfoCarts";
import Quote from "@/components/landingPage/Quote";
import About from "@/components/landingPage/About";
import FeaturedProducts from "@/components/landingPage/FeaturedProducts";
import Slider from "@/components/landingPage/Slider";

export default function Home() {
	const [sliderState, setSliderState] = useState({
		isExpanded: false,
		contentId: null,
	});

	const handleButtonClick = (id) => {
		setSliderState({
			isExpanded: true,
			contentId: id,
		});
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			const sliderDiv = document.querySelector(".expandable-div");
			if (sliderDiv && !sliderDiv.contains(event.target)) {
				setSliderState({
					...sliderState,
					isExpanded: false,
				});
			}
		};

		if (sliderState.isExpanded) {
			document.addEventListener("mousedown", handleOutsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [sliderState]);

	return (
		<div className="flex flex-col bg-white w-full relative">
			<div className="flex flex-col items-center relative z-10">
				<HomeHero concept="a"/>
				<InfoButtons onButtonClick={handleButtonClick}/>
				<Slider isExpanded={sliderState.isExpanded} contentId={sliderState.contentId}
				        closeSlider={() => setSliderState({...sliderState, isExpanded: false,})}/>
				<FeaturedProducts/>
				<InfoCarts/>
				<Quote/>
				<About/>
			</div>
		</div>
	);
}

// empty line