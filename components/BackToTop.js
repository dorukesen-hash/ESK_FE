"use client"
import {useState, useEffect} from "react";

const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Show button only when the user scrolls down
	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > window.innerHeight) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);

		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	// Scroll to the top of the page
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth", // Smooth scroll effect
		});
	};

	return (
		<>
			{isVisible && (
				<button
					onClick={scrollToTop}
					className="fixed bottom-4 w-[50px] h-[50px] rounded-[30px] right-4 z-50"
				>
					<svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M44.0005 86.9907C20.2996 86.9907 1.00977 67.701 1.00977 44.0002C1.00977 20.2993 20.2996 1.00952 44.0005 1.00952C67.7013 1.00952 86.991 20.2993 86.991 44.0002C86.991 67.701 67.7013 86.9907 44.0005 86.9907Z"
							fill="white"/>
						<path
							d="M44.0001 2.01881C67.1862 2.01881 85.9812 20.814 85.9812 44.0001C85.9812 67.1861 67.1862 85.9812 44.0001 85.9812C20.8141 85.9812 2.01881 67.1861 2.01881 44.0001C2.01881 20.814 20.8141 2.01881 44.0001 2.01881ZM44.0001 0C19.734 0 0 19.734 0 44.0001C0 68.2662 19.734 88 44.0001 88C68.2663 88 88 68.2662 88 44.0001C88 19.734 68.2562 0 44.0001 0Z"
							fill="#5CA0E2"/>
						<path
							d="M44.0007 29.0103L63.1592 48.1689L58.2129 53.1149L44.0007 38.9025L29.778 53.1149L24.832 48.1689L44.0007 29.0103Z"
							fill="#5CA0E2"/>
					</svg>

				</button>
			)}
		</>
	);
};

export default BackToTop;