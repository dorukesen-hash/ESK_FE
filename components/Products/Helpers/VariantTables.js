"use client"

import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import {AppContext} from "@/Context/AppContext";

import {allVariantsInCategories, slugify} from "@/hooks/service";
import BuyCell from "@/components/Products/Helpers/BuyCell";
import {getVariantsByIdList} from "@/hooks/Api";
import Loading from "@/components/Loading";

const VariantTables = ({props}) => {
	const {state} = useContext(AppContext);
	const categories = state.categories;
	const [localVariants, setLocalVariants] = useState([])
	const [loading, setLoading] = useState(true)


	const category = categories.find(c => c.id === props.categoryId)
	const subcategory = categories.find(c => c.id === props.categoryId).subcategories.find(s => s.id === props.subcategoryId);
	const product = categories.find(c => c.id === props.categoryId).subcategories.find(s => s.id === props.subcategoryId).products.find(p => p.id === props.productId)

	const allVariants = allVariantsInCategories(categories);
	let variantList
	product ? variantList = allVariants.filter(v => v.categoryId === props.categoryId).filter(v => v.subcategoryId === props.subcategoryId).filter(v => v.productId === props.productId) : variantList = allVariants.filter(v => v.categoryId === props.categoryId).filter(v => v.subcategoryId === props.subcategoryId)
	useEffect(() => {
		const fetchVariants = async () => {
			if (variantList.length === 0) {
				setLoading(false);
				return;
			}
			setLoading(true);
			const data = await getVariantsByIdList(variantList.map(v => v.id));
			setLocalVariants(data);
			setLoading(false);
		};

		fetchVariants();
	}, []);

	if (loading) {
		return <Loading />;
	}

	const subcategoryFields = {
		16: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "core_diameter", label: "Core Diameter" },
			{ key: "style", label: "Style" },
		],
		17: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "core_diameter", label: "Core Diameter" },
			{ key: "style", label: "Style" },
		],
		18: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "core_diameter", label: "Core Diameter" },
			{ key: "style", label: "Style" },
		],
		20: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "core_diameter", label: "Core Diameter" }
		],
		21: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "core_diameter", label: "Core Diameter" }
		],
		22: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "break_strength", label: "Break Strength" },
			{ key: "product_finish", label: "Product Finish" },
			{ key: "color", label: "Color" },
			{ key: "core_diameter", label: "Core Diameter" },
		],
		23: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "break_strength", label: "Break Strength" },
			{ key: "product_finish", label: "Product Finish" },
			{ key: "color", label: "Color" },
			{ key: "core_diameter", label: "Core Diameter" },
		],
		24: [
			{ key: "size", label: "Size" },
			{ key: "thickness", label: "Thickness" },
		],
		25: [
			{ key: "size", label: "Size" },
			{ key: "thickness", label: "Thickness" },
		],
		37: [
			{ key: "size", label: "Size" },
			{ key: "thickness", label: "Thickness" },
		],
		26: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "thickness", label: "Thickness" }
		],
		27: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "thickness", label: "Thickness" }
		],
		28: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "product_finish", label: "Product Finish" }
		],
		29: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "product_finish", label: "Product Finish" }
		],
		30: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "product_finish", label: "Product Finish" }
		],
		31: [
			{ key: "unit", label: "Unit" },
			{ key: "inside_dimensions", label: "Inside Dimentions L x W" },
			{ key: "bundle_bale_qty", label: "Bundle / Bale Quantity" }
		],
		32: [
			{ key: "unit", label: "Unit" },
			{ key: "outside_w_l", label: "Outside (W x L)" },
			{ key: "usable", label: "Usable" },
			{ key: "style", label: "Style" },
		],
		33: [
			{ key: "unit", label: "Unit" },
			{ key: "outside_w_l", label: "Outside (W x L)" },
		],
		36: [
			{ key: "unit", label: "Unit" },
			{ key: "size", label: "Size" },
			{ key: "core_diameter", label: "Core Diameter" }
		]
	};

	// Subcategory'yi al
	const variantSubcategory = localVariants && localVariants.length > 0 ? localVariants[0]?.subcategoryId : null;
	const fields = subcategoryFields[variantSubcategory] || [];
	
	return (<div className="w-full flex flex-col justify-center items-center gap-12 mt-[72px]">
		{/* CASE PRICING */}
		<div className="w-full">
			<h2 className="text-[26px] mb-[14px] text-text-dark font-bold">Case Pricing</h2>
			<div className="w-full overflow-x-auto">
			<table className="min-w-[1200px] w-full border-collapse text-[14px] mb-60">
				<thead className="h-[74px] bg-blue-100 text-[16px] font-semibold text-left">
				<tr>
					<th rowSpan="2" className="p-2 text-center border-x-[2px] border-white">Stock #</th>
					{/* Dinamik başlıklar */}
					{fields.map(f => (
						<th key={f.key} rowSpan="2" className="p-2 text-center border-x-[2px] border-white">{f.label}</th>
					))}
					<th rowSpan="2" className="p-2 text-center border-x-[2px] border-white">Qty / Case</th>
					<th colSpan="3" className="p-2 text-center border-x-[2px] border-white">Price</th>
					<th rowSpan="2" className="p-2 text-center border-x-[2px] border-white">Availability</th>
					<th rowSpan="2" className="p-2 text-center border-x-[2px] border-white">Buy</th>
				</tr>
				<tr>
					<th className="p-2 text-center bg-[#E7F2FD] border-x-[2px] border-t-[2px] border-white">1+</th>
					<th className="p-2 text-center bg-[#E7F2FD] border-x-[2px] border-t-[2px] border-white">5+</th>
					<th className="p-2 text-center bg-[#E7F2FD] border-x-[2px] border-t-[2px] border-white">10+</th>
				</tr>
				</thead>
				<tbody>
				{localVariants.length > 0 && localVariants.map((v) => (
					<tr key={v.id} className="border-b border-border-gray h-[48px]">
						<td className="p-2 text-center">
		          <Link className="underline"  href={product ? `/products/${slugify(category.name)}/${slugify(subcategory.name)}/${slugify(product.title)}/${slugify(v.title)}` : `/products/${slugify(category.name)}/${slugify(subcategory.name)}/${slugify(v.title)}`}>
								{v.stock}
							</Link>
						</td>
						{/* Dinamik extradata alanları */}
						{fields.map((f, idx) => (
							<td key={f.key} className={`p-2 text-center${idx === 0 ? ' font-bold' : ''}`}>{v[f.key]}</td>
						))}
						<td className="p-2 text-center font-semibold">{v.quantity_case}</td>
						<td className="p-2 text-center font-semibold">${v.one_four_units}</td>
						<td className="p-2 text-center font-semibold">${v.five_nine_units}</td>
						<td className="p-2 text-center font-semibold">${v.ten_plus_units}</td>
						<td className="p-2 text-center">
                            <span
	                            className={`inline-block w-3 h-3 rounded-full ${v.stockLevel > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
						</td>
						<td className="w-[220px] p-2">
							<BuyCell variantId={v.id} isPallet={false}/>
						</td>
					</tr>
				))}
				</tbody>
			</table>
			</div>
		</div>

		{/* PALLET PRICING */}
		{/*<div className="min-w-[1200px] my-[107px]">*/}
		{/*	<h2 className="text-[26px] mb-[14px] text-text-dark font-bold">Pallet Pricing</h2>*/}
		{/*	<table className="w-full border-collapse text-[14px]">*/}
		{/*		<thead className="h-[74px] bg-blue-100 text-[16px] font-semibold text-left">*/}
		{/*		<tr>*/}
		{/*			<th className="p-2 text-center border-x-[2px] border-white">Stock #</th>*/}
		{/*			/!* Dinamik başlıklar *!/*/}
		{/*			{fields.map(f => (*/}
		{/*				<th key={f.key} className="p-2 text-center border-x-[2px] border-white">{f.label}</th>*/}
		{/*			))}*/}
		{/*			<th className="p-2 text-center border-x-[2px] border-white">Qty / Pallet</th>*/}
		{/*			<th className="p-2 text-center border-x-[2px] border-white">Pallet Lot Price</th>*/}
		{/*			<th className="p-2 text-center border-x-[2px] border-white">Availability</th>*/}
		{/*			<th className="p-2 text-center border-x-[2px] border-white">Buy</th>*/}
		{/*		</tr>*/}
		{/*		</thead>*/}
		{/*		<tbody>*/}
		{/*		{localVariants.length > 0 && localVariants.map((v) => (*/}
		{/*			<tr key={v.id} className="border-b border-border-gray h-[48px]">*/}
		{/*				<td className="p-2 text-center">{v.stock}</td>*/}
		{/*				/!* Dinamik extradata alanları *!/*/}
		{/*				{fields.map(f => (*/}
		{/*					<td key={f.key} className="p-2 text-center">{v[f.key]}</td>*/}
		{/*				))}*/}
		{/*				<td className="p-2 text-center">{v.units_per_pallet}</td>*/}
		{/*				<td className="p-2 text-center">${v.pallet_pricing}</td>*/}
		{/*				<td className="p-2 text-center">*/}
        {/*                    <span*/}
	    {/*                        className={`inline-block w-3 h-3 rounded-full ${v.stockLevel > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>*/}
		{/*				</td>*/}
		{/*				<td className="w-[220px] p-2">*/}
		{/*					<BuyCell variantId={v.id} isPallet={true}/>*/}
		{/*				</td>*/}
		{/*			</tr>*/}
		{/*		))}*/}
		{/*		</tbody>*/}
		{/*	</table>*/}
		{/*</div>*/}

	</div>)
}
export default VariantTables