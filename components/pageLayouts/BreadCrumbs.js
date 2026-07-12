'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Fragment, memo, useContext} from 'react';
import {AppContext} from "@/Context/AppContext";

const Chevron = () => (
	<svg className="mx-[10px]" width="12" height="12" viewBox="0 0 12 12" fill="none"
	     xmlns="http://www.w3.org/2000/svg">
		<path d="M4.1582 2L8.31676 6.24264L4.1582 10.4853" stroke="#182434"/>
	</svg>
);

// Slugify: URL'ler için
const slugify = (text) =>
	text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, '-');

// Prettify: Breadcrumb için
const prettify = (text) =>
	text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/[-_]/g, ' ')
		.replace(/\b\w/g, (l) => l.toUpperCase());

function Breadcrumbs({separator = <Chevron/>, hideSegments = []}) {
	const pathname = usePathname();
	const {state} = useContext(AppContext);

	const originalSegments = pathname
		.split(/[?#]/)[0]
		.split('/')
		.filter(Boolean);

	const hideSet = new Set((hideSegments || []).map((s) => String(s).toLowerCase()));

	const autoItems = originalSegments
		.map((segment, idx) => ({ segment, idx }))
		.filter(({ segment }) => !hideSet.has(segment.toLowerCase()))
		.map(({ segment, idx }) => {
			// State'den label bulma
			const cats = state?.categories ?? [];
			let label = null;
			for (const cat of cats) {
				if (slugify(cat.name) === slugify(segment)) label = prettify(cat.name);
				for (const sub of cat.subcategories ?? []) {
					if (slugify(sub.name) === slugify(segment)) label = prettify(sub.name);
					for (const variant of sub.variants ?? []) {
						if (slugify(variant.title) === slugify(segment)) label = variant.title.toString()
							.toLowerCase()
							.trim()
							.replace(/\b\w/g, (l) => l.toUpperCase());
					}
				}
			}
			// Eğer state'de bulunamazsa prettify ile göster
			if (!label) label = prettify(decodeURIComponent(segment));

			return {
				href: '/' + originalSegments.slice(0, idx + 1).map(slugify).join('/'),
				label,
			};
		});

	const crumbs = [{href: '/', label: 'Home'}, ...autoItems];

	return (
		<nav
			aria-label="Breadcrumb"
			className={`flex items-center justify-start w-full text-16 my-[36px] max-w-[1440px]`}
		>
			{crumbs.map((crumb, idx) => {
				const isLast = idx === crumbs.length - 1;
				return (
					<Fragment key={crumb.href}>
						{!isLast ? (
							<Link href={crumb.href} className="text-gray-600 hover:text-gray-900">
								{crumb.label}
							</Link>
						) : (
							<span className="text-gray-900 font-medium">{crumb.label}</span>
						)}
						{!isLast && separator}
					</Fragment>
				);
			})}
		</nav>
	);
}

export default memo(Breadcrumbs);
