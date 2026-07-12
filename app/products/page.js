"use client"
import React, {useContext, useEffect, useMemo, useState} from "react";
import {AppContext} from "@/Context/AppContext";
import PageHeader from "@/components/pageLayouts/PageHeader";
import BreadCrumbs from "@/components/pageLayouts/BreadCrumbs";
import {allVariantsInCategories} from "@/hooks/service";
import VariantCard from "@/components/landingPage/VariantCard";
import {subcategoryLabels} from "@/assets/TableHelper";


const Page = () => {
	const { state } = useContext(AppContext);
	const allVariants = allVariantsInCategories(state.categories);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedSubcategories, setSelectedSubcategories] = useState([]);
	const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

	const handleCategoryChange = (category) => {
		setSelectedCategories(prev =>
			prev.includes(category.id)
				? prev.filter(c => c !== category.id)
				: [...prev, category.id]
		);
	};

	const handleSubcategoryChange = (subcategory) => {
		setSelectedSubcategories(prev => {
			const isSelected = prev.includes(subcategory.id);
			const newSelected = isSelected
				? prev.filter(sc => sc !== subcategory.id)
				: [...prev, subcategory.id];

			// Seçili subcategory'lere göre variant özelliklerini güncelle
			if (isSelected) {
				// Kaldırılan subcategory'nin özelliklerini bul
				const removedFields = Object.keys(subcategoryLabels[subcategory.id] || {});
				setSelectedVariantOptions(prevOptions => {
					const updated = { ...prevOptions };
					removedFields.forEach(field => {
						delete updated[field];
					});
					return updated;
				});
			}
			return newSelected;
		});
	};

	const mergedVariantFields = useMemo(() => {
		if (selectedSubcategories.length === 0) return {};
		return selectedSubcategories
			.map(id => subcategoryLabels[id] || {})
			.reduce((acc, obj) => {
				Object.entries(obj).forEach(([key, value]) => {
					acc[key] = value;
				});
				return acc;
			}, {});
	}, [selectedSubcategories]);


	const [selectedVariantOptions, setSelectedVariantOptions] = useState({});


	const filteredVariants = useMemo(() => {
		let filtered = allVariants;
		if (selectedCategories.length > 0) {
			filtered = filtered.filter(variant => selectedCategories.includes(variant.categoryId));
		}
		if (selectedSubcategories.length > 0) {
			filtered = filtered.filter(variant => selectedSubcategories.includes(variant.subcategoryId));
		}
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(variant =>
				(variant.title && variant.title.toLowerCase().includes(query)) ||
				(variant.stock && variant.stock.toString().toLowerCase().includes(query))
			);
		}
		// Variant özelliklerine göre filtreleme (checkbox)
		Object.entries(selectedVariantOptions).forEach(([key, values]) => {
			if (values && values.length > 0) {
				filtered = filtered.filter(variant => values.includes(variant[key]?.toString()));
			}
		});
		return filtered;
	}, [searchQuery, selectedCategories, selectedSubcategories, allVariants, selectedVariantOptions]);


	useEffect(() => {
		const allowedSubcategories = state.categories
			.filter(cat => selectedCategories.includes(cat.id))
			.flatMap(cat => cat.subcategories || [])
			.map(sub => sub.id);
		setSelectedSubcategories(prev => prev.filter(id => allowedSubcategories.includes(id)));
	}, [selectedCategories, state.categories]);

	// Variant özelliklerini variantlardan dinamik olarak çek
	const variantFieldOptions = useMemo(() => {
		if (selectedSubcategories.length === 0) return {};
		const fields = mergedVariantFields;
		const options = {};
		Object.keys(fields)
			.sort((a, b) => fields[a].localeCompare(fields[b], undefined, { sensitivity: 'base' })) // Özellik adlarına göre alfabetik sırala
			.forEach(key => {
				const values = allVariants
					.filter(v => selectedSubcategories.includes(v.subcategoryId))
					.map(v => v[key])
					.filter(v => v !== undefined && v !== null && v !== "")
					.map(v => v.toString())
					.filter((v, i, arr) => arr.indexOf(v) === i)
					.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })); // Seçenekleri alfabetik sırala
				if (values.length > 0) options[key] = values;
			});
		return options;
	}, [allVariants, selectedSubcategories, mergedVariantFields]);

	return (
		<div className="relative w-full h-full min-h-[100vh] bg-white flex justify-center text-text-dark">
			<div className="flex flex-col items-center w-[80%] max-w-[1075px]">
				<BreadCrumbs />
				<PageHeader />
				{/* Drawer */}
				<div
					className={`fixed top-0 left-0 h-full w-[400px] scrollbar-hide pt-8 bg-white z-50 shadow-lg transition-transform duration-300 ${filterDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
					style={{overflowY: 'auto'}}
				>
					<div className="flex flex-col gap-4 p-4 text-sm">
						<button onClick={() => setFilterDrawerOpen(false)}
								className="cursor-pointer absolute top-2 right-2 text-2xl font-bold hover:text-red-500">
							<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M17 33C25.8366 33 33 25.8366 33 17C33 8.16344 25.8366 1 17 1C8.16344 1 1 8.16344 1 17C1 25.8366 8.16344 33 17 33Z"
									fill="#5CA0E2" stroke="white" strokeWidth="2"/>
								<path d="M11.6104 22.3904L22.3904 11.6104" stroke="white" strokeWidth="3" strokeMiterlimit="10"
									  strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M11.6104 11.6104L22.3904 22.3904" stroke="white" strokeWidth="3" strokeMiterlimit="10"
									  strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</button>
						<input
							className="h-[60px] border-2 border-button-gray rounded px-4 focus:outline-none focus:border-2 focus:border-custom-blue"
							onChange={e => setSearchQuery(e.target.value)} value={searchQuery} placeholder="Product name or stock number" />


						{/* Kategori filtreleme menüsü */}
						<div className="flex flex-col">
							<span className="font-semibold mb-1">Categories</span>
							<div className="flex flex-col max-h-[160px] border-t-2 gap-2 p-2 border-custom-blue scrollbar-hide overflow-y-auto">
								{state.categories.map(category => {
									const checked = selectedCategories.includes(category.id);
									const formattedName = category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase();
									return (
										<label key={category.id} className="flex items-center gap-2 cursor-pointer relative pl-6">
											<input
												type="checkbox"
												checked={checked}
												onChange={() => handleCategoryChange(category)}
											/>
											<span>{formattedName}</span>
										</label>
									);
								})}
							</div>
						</div>
						{/* Subcategory filtreleme menüsü */}
						<div className="flex flex-col">
							<span className="font-semibold mb-1">Sub-categories</span>
							<div className="flex flex-col max-h-[160px] border-t-2 gap-2 p-2 border-custom-blue scrollbar-hide overflow-y-auto">
								{(selectedCategories.length === 0
										? state.categories.flatMap(category => category.subcategories || [])
										: state.categories
											.filter(category => selectedCategories.includes(category.id))
											.flatMap(category => category.subcategories || [])
								).map(subcategory => {
									const checked = selectedSubcategories.includes(subcategory.id);
									return (
										<label key={subcategory.id} className="flex items-center gap-2 cursor-pointer relative pl-6">
											<input
												type="checkbox"
												checked={checked}
												onChange={() => handleSubcategoryChange(subcategory)}
											/>
											<span>{subcategory.name}</span>
										</label>
									);
								})}
							</div>
						</div>
						{/* Variant özelliklerine göre filtreleme menüsü (checkbox) */}
							<div className="flex flex-col">
									{Object.entries(variantFieldOptions).map(([key, values]) => (
										<div key={key} className="flex flex-col mb-2">
											<span className="font-semibold mb-1">{mergedVariantFields[key]}</span>
											<div className="flex flex-col max-h-[160px] border-t-2 gap-2 p-2 border-custom-blue scrollbar-hide overflow-y-auto">
												{values.map(value => (
													<label key={value} className="flex items-center gap-2 cursor-pointer relative pl-6">
														<input
															type="checkbox"
															checked={selectedVariantOptions[key]?.includes(value) || false}
															onChange={e => {
																setSelectedVariantOptions(prev => {
																	const arr = prev[key] || [];
																	if (e.target.checked) {
																		return { ...prev, [key]: [...arr, value] };
																	} else {
																		return { ...prev, [key]: arr.filter(v => v !== value) };
																	}
																});
															}}
														/>
														<span>{value}</span>
													</label>
												))}
											</div>
										</div>
									))}
							</div>

					</div>
				</div>
				{/* Ürün kartları */}
				<div className="w-full p-2 flex items-center justify-between">
					<div className="flex gap-2 items-center">
						<button
							className="bg-custom-blue text-white px-4 py-2 rounded shadow-lg cursor-pointer"
							onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
						>
							Filters
						</button>
						<p
							className="text-gray-600 hover:text-text-dark text-sm cursor-pointer p-2"
							onClick={
								() => {
									setSearchQuery("");
									setSelectedCategories([]);
									setSelectedSubcategories([]);
									setSelectedVariantOptions({});
								}
							}						>
							Reset Filters
						</p>
					</div>
					<span>{filteredVariants.length} Products Found</span>
				</div>
				<div className="w-full grid grid-cols-3 justify-center gap-4 p-2 mb-16">
					{filteredVariants.length === 0 ? (
					<p>No product found.</p>
				) : (
					filteredVariants.map(variant => (
						<VariantCard key={variant.id} id={variant.id} />
					))
				)}
				</div>
			</div>
		</div>
	);
}

export default Page
