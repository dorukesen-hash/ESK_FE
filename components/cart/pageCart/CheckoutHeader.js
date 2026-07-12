"use client";

import React, {useEffect} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useContext} from "react";
import {AppContext} from "@/Context/AppContext";
import {calculatePrice} from "@/hooks/service";


const Chevron = () => (
	<svg className="mx-[10px]" width="12" height="12" viewBox="0 0 12 12" fill="none"
	     xmlns="http://www.w3.org/2000/svg">
		<path d="M4.1582 2L8.31676 6.24264L4.1582 10.4853" stroke="#182434"/>
	</svg>
);

const StepperLabels = () => (
	<div className="relative text-[14px] font-semibold w-[424px] mt-2">
		<div className="absolute left-[11px] top-0 translate-x-[-50%]">Cart</div>
		<div className="absolute left-[145px] top-0 translate-x-[-50%]">Shipping</div>
		<div className="absolute left-[279px] top-0 translate-x-[-50%]">Payment</div>
		<div className="absolute left-[414px] top-0 translate-x-[-50%]">Review</div>
	</div>
);

const CheckoutHeader = () => {
	const pathname = usePathname();
	const {state, setOrder} = useContext(AppContext);
	const cartCount = state?.cart?.length || 0;

	const steps = ["Cart", "Shipping", "Payment", "Submit"];

	useEffect(() => {
			const updateOrder = () => {
				if (state.detailedCart && state.detailedCart.length > 0) {
					setOrder(prevOrder => ({
						...prevOrder,
						items: state.detailedCart.map(item => ({
							id: item.id,
							quantity: item.quantity,
							price: calculatePrice(item)
						}))
					}));
				} else {
					setOrder(prevOrder => ({
						...prevOrder,
						items: []
					}));
				}
			};

			const timeoutId = setTimeout(updateOrder, 500);
			return () => clearTimeout(timeoutId);
	}, [state.detailedCart]);

	const currentStep = () => {
		if (pathname.includes("/shipping")) return 1;
		if (pathname.includes("/payment")) return 2;
		if (pathname.includes("/success")) return 3;
		return 0;
	};

	const breadcrumbs = [
		{label: "1. Shopping Cart", path: "/cart"}
	];
	if (currentStep() >= 1) breadcrumbs.push({label: "2. Shipping", path: "/cart/shipping"});
	if (currentStep() >= 2) breadcrumbs.push({label: "3. Payment", path: "/cart/payment"});
	if (currentStep() >= 3) breadcrumbs.push({label: "4. Review", path: "/cart/success"});

	const svgSteps = [
		<svg width="424" height="22" viewBox="0 0 424 22" fill="none" xmlns="http://www.w3.org/2000/svg" key="0">
			<path d="M12 11C12 11 249.761 11 413 11" stroke="#D6D9DC" strokeWidth="4"/>
			<circle cx="11" cy="11" r="10.5" fill="#5CA0E2" stroke="#5CA0E2"/>
			<circle cx="145" cy="11" r="10.5" fill="#D6D9DC" stroke="#D6D9DC"/>
			<circle cx="145" cy="11" r="7" fill="white"/>
			<circle cx="413" cy="11" r="10.5" fill="#D6D9DC" stroke="#D6D9DC"/>
			<circle cx="413" cy="11" r="7" fill="white"/>
			<circle cx="279" cy="11" r="10.5" fill="#D6D9DC" stroke="#D6D9DC"/>
			<circle cx="279" cy="11" r="7" fill="white"/>
		</svg>,
		<svg width="424" height="22" viewBox="0 0 424 22" fill="none" xmlns="http://www.w3.org/2000/svg" key="1">
			<path d="M12 11C12 11 90.8583 11 145 11" stroke="#5CA0E2" strokeWidth="4"/>
			<path d="M146 11C146 11 224.858 11 279 11" stroke="#D6D9DC" strokeWidth="4"/>
			<path d="M282 11C282 11 360.858 11 415 11" stroke="#D6D9DC" strokeWidth="4"/>
			<circle cx="11" cy="11" r="10.5" fill="#5CA0E2" stroke="#5CA0E2"/>
			<circle cx="145" cy="11" r="10.5" fill="#5CA0E2" stroke="#5CA0E2"/>
			<circle cx="145" cy="11" r="7" fill="white"/>
			<circle cx="413" cy="11" r="10.5" fill="#D6D9DC" stroke="#D6D9DC"/>
			<circle cx="413" cy="11" r="7" fill="white"/>
			<circle cx="279" cy="11" r="10.5" fill="#D6D9DC" stroke="#D6D9DC"/>
			<circle cx="279" cy="11" r="7" fill="white"/>
		</svg>,
		<svg width="424" height="22" viewBox="0 0 424 22" fill="none" xmlns="http://www.w3.org/2000/svg" key="2">
			<path d="M12 11C12 11 90.8583 11 145 11" stroke="#5CA0E2" strokeWidth="4"/>
			<path d="M146 11C146 11 224.858 11 279 11" stroke="#5CA0E2" strokeWidth="4"/>
			<path d="M282 11C282 11 360.858 11 415 11" stroke="#D6D9DC" strokeWidth="4"/>
			<circle cx="11" cy="11" r="10.5" fill="#5CA0E2" stroke="#5CA0E2"/>
			<circle cx="145" cy="11" r="10.5" fill="#5CA0E2" stroke="#5CA0E2"/>
			<circle cx="145" cy="11" r="7" fill="white"/>
			<circle cx="413" cy="11" r="10.5" fill="#D6D9DC" stroke="#D6D9DC"/>
			<circle cx="413" cy="11" r="7" fill="white"/>
			<circle cx="279" cy="11" r="10.5" fill="#5CA0E2" stroke="#5CA0E2"/>
			<circle cx="279" cy="11" r="7" fill="white"/>
		</svg>,
		<svg width="424" height="22" viewBox="0 0 424 22" fill="none" xmlns="http://www.w3.org/2000/svg" key="3">
			<path d="M12 11C12 11 90.8583 11 145 11" stroke="#5CA0E2" strokeWidth="4"/>
			<path d="M146 11C146 11 224.858 11 279 11" stroke="#5CA0E2" strokeWidth="4"/>
			<path d="M282 11C282 11 360.858 11 415 11" stroke="#5CA0E2" strokeWidth="4"/>
			<circle cx="11" cy="11" r="10.5" fill="#5CA0E2" stroke="#5CA0E2"/>
			<circle cx="145" cy="11" r="10.5" fill="#5CA0E2" stroke="#5CA0E2"/>
			<circle cx="145" cy="11" r="7" fill="white"/>
			<circle cx="413" cy="11" r="10.5" fill="#5CA0E2" stroke="#5CA0E2"/>
			<circle cx="413" cy="11" r="7" fill="white"/>
			<circle cx="279" cy="11" r="10.5" fill="#5CA0E2" stroke="#5CA0E2"/>
			<circle cx="279" cy="11" r="7" fill="white"/>
		</svg>
	];

	const renderStepper = () => {
		const step = currentStep();
		return (
			<div className="flex flex-col items-end scale-65 tablet:scale-100">
				{svgSteps[step]}
				<StepperLabels/>
			</div>
		);
	};

	return (
		<div className="w-full bg-white border-b-[2px] border-border-gray mt-[36px] pb-[40px] overflow-hidden">
			<div className="w-full flex flex-col gap-4 pr-[20px]">
				{/* Breadcrumb */}
				<nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-start w-full text-[16px] mb-[12px]">
					<Link href="/" className="text-text-dark hover:text-custom-blue">Home</Link>
					{breadcrumbs.map((crumb, index) => {
						const isLast = index === breadcrumbs.length - 1;
						return (
							<React.Fragment key={crumb.path}>
								<Chevron/>
								{!isLast ? (
									<Link href={crumb.path}
									      className="text-text-dark hover:text-custom-blue">{crumb.label}</Link>
								) : (
									<span className="text-text-dark">{crumb.label}</span>
								)}
							</React.Fragment>
						);
					})}
				</nav>

				{/* Title & Stepper aligned horizontally */}
				<div className="flex flex-col-reverse tablet:flex-row items-center justify-between gap-8 w-full">
					<h1 className="text-[24px] tablet:text-[30px] font-bold text-text-dark">
						{steps[currentStep()] === "Submit"
							? "Order Review"
							: steps[currentStep()] === "Cart"
								? `Shopping Cart (${cartCount} items)`
								: steps[currentStep()]}
					</h1>
					<div className="pt-2">{renderStepper()}</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutHeader;