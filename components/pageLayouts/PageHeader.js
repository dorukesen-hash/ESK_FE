'use client';

import {useContext, useMemo} from 'react';
import {usePathname} from 'next/navigation';
import {AppContext} from "@/Context/AppContext";

export default function PageHeader({}) {
	const {state} = useContext(AppContext);
	const pathname = usePathname();

	const slug = decodeURIComponent(pathname.split('/').filter(Boolean).pop());

	const slugify = (str) =>
		str
			.trim()
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');

	const prettify = (str) =>
		str
			.replace(/[-_]/g, ' ')
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');

	const resolvedTitle = useMemo(() => {
		const cats = state?.categories ?? [];
		for (const cat of cats) {
			if (slugify(cat.name) === slugify(slug)) return cat.name;

			for (const sub of cat.subcategories ?? []) {
				if (slugify(sub.name) === slugify(slug)) return sub.name

				for (const variant of sub.variants ?? []) {
					if (slugify(variant.title) === slugify(slug)) return variant.title
				}
			}
		}

		return prettify(slug || '');
	}, [slug, state]);

	return (
		<header className={`w-full`}>
			<h1 className="text-[38px] mb-[42px] font-extrabold text-[#182434]">
				{resolvedTitle}
			</h1>
			<hr className="border-[2px] mt-4 border-t border-gray-300"/>
		</header>
	);
}
