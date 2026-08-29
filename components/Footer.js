"use client";

import Image from "next/image";
import Link from "next/link";
import {useContext, useMemo} from "react";

import icon from "../assets/EKS_icon_dark.png";
import {AppContext} from "@/Context/AppContext";
import {slugify} from "@/hooks/service";

function capitalizeWords(str) {
	return str
		.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

const companyLinks = [
	{label: "About Us", href: "/pages/about-us"},
	{label: "Contact Us", href: "/pages/contact-us"},
	{label: "Knowledge Center", href: "/knowledge-center"},
	{label: "FAQ", href: "/pages/faq"},
];

const serviceLinks = [
	{label: "Shipping Policy", href: "/pages/shipping-policy"},
	{label: "Return & Refund Policy", href: "/pages/retrun-policy"},
	{label: "Privacy Policy", href: "/pages/privacy-policy"},
	{label: "Terms & Conditions", href: "/pages/terms-and-conditions"},
];

function FooterLink({href, label}) {
	if (!href) {
		return (
			<li>
				<span className="block py-[7px] text-[14px] text-gray-400 cursor-default">{label}</span>
			</li>
		);
	}
	return (
		<li>
			<Link
				href={href}
				className="block py-[7px] text-[14px] text-gray-400 hover:text-white focus-visible:text-white transition-colors"
			>
				{label}
			</Link>
		</li>
	);
}

function BrandBlock() {
	return (
		<div className="flex flex-col gap-4">
			<Image src={icon} alt="ESK Packaging" className="w-[200px] h-auto"/>
			<p className="text-[14px] text-gray-400 leading-relaxed max-w-[300px]">
				Industrial packaging supplies for businesses across the U.S. —
				strapping, edge protection, stretch film, mailers, boxes and tools.
			</p>
			<address className="not-italic text-[14px] text-gray-400 leading-relaxed">
				2050 Forest Ln #350, Garland, TX 75042
			</address>
			<div className="flex flex-col gap-1">
				<a href="tel:+14699922447"
				   className="py-[5px] text-[15px] font-semibold text-white hover:text-text-blue transition-colors">
					469-992-2447
				</a>
				<a href="mailto:sales@eskpackaging.com"
				   className="py-[5px] text-[15px] font-semibold text-white hover:text-text-blue transition-colors">
					sales@eskpackaging.com
				</a>
			</div>
		</div>
	);
}

export default function Footer() {
	const {state} = useContext(AppContext);

	// Shop Products list mirrors the live category tree (same source NavBar's
	// mega menu uses) instead of a fixed list, so it never drifts from what's
	// actually in the catalog.
	const shopLinks = useMemo(() => ([
		{label: "All Products", href: "/products"},
		...(state?.categories ?? []).map((cat) => ({
			label: capitalizeWords(cat.name),
			href: `/products/${slugify(cat.name)}`,
		})),
	]), [state?.categories]);

	const groups = [
		{title: "Shop Products", links: shopLinks},
		{title: "Company", links: companyLinks},
		{title: "Customer Service", links: serviceLinks},
	];

	return (
		<footer className="bg-custom-blue-gray text-white border-t-[4px] border-[#C83642]">
			<div className="max-w-[1440px] mx-auto px-6 tablet:px-[24px] py-10 tablet:py-12">
				{/* Tablet and up: brand + link columns (2x2 on tablet, 4 across on laptop) */}
				<div className="hidden tablet:grid tablet:grid-cols-2 laptop:grid-cols-4 gap-x-10 gap-y-10">
					<BrandBlock/>
					{groups.map((g) => (
						<nav key={g.title} aria-label={g.title}>
							<h2 className="text-[14px] font-bold uppercase tracking-[0.12em] text-white mb-3">
								{g.title}
							</h2>
							<ul>
								{g.links.map((l) => (
									<FooterLink key={l.href ?? l.label} {...l} />
								))}
							</ul>
						</nav>
					))}
				</div>

				{/* Mobile: brand first, then compact native accordions */}
				<div className="tablet:hidden flex flex-col gap-6">
					<BrandBlock/>
					<div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
						{groups.map((g) => (
							<details key={g.title} className="group">
								<summary
									className="flex items-center justify-between py-[14px] cursor-pointer list-none text-[14px] font-bold uppercase tracking-[0.12em]">
									{g.title}
									<span aria-hidden="true"
									      className="text-gray-400 transition-transform group-open:rotate-180">
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
											<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5"
											      strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</span>
								</summary>
								<ul className="pb-3">
									{g.links.map((l) => (
										<FooterLink key={l.href ?? l.label} {...l} />
									))}
								</ul>
							</details>
						))}
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-white/10">
				{/* Right padding keeps clear of the floating back-to-top control */}
				<div
					className="max-w-[1440px] mx-auto px-6 tablet:px-[24px] py-4 pr-[88px] tablet:pr-[96px] flex flex-col mobile:flex-row items-center justify-between gap-2 text-[13px] text-gray-400">
					<p>© ESK Packaging LLC. All Rights Reserved.</p>
					<div className="flex items-center gap-5">
						<Link href="/pages/privacy-policy" className="py-1 hover:text-white transition-colors">Privacy</Link>
						<Link href="/pages/terms-and-conditions" className="py-1 hover:text-white transition-colors">Terms</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
