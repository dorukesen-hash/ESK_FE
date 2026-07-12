'use client';
import {useContext} from "react";
import {usePathname} from "next/navigation";
import {AppContext} from "@/Context/AppContext";

import {getVariantFromCategories, slugify} from "@/hooks/service";

import BreadCrumbs from "@/components/pageLayouts/BreadCrumbs";
import PageHeader from "@/components/pageLayouts/PageHeader";
import CategoryLevel from "@/components/Products/Hierarchy/CategoryLevel";
import SubCategoryLevel from "@/components/Products/Hierarchy/SubCategoryLevel";
import Loading from "@/components/Loading";
import ProductLevel from "@/components/Products/Hierarchy/ProductLevel";
import {VariantLevel} from "@/components/Products/Hierarchy/VariantLevel";

const Page = () => {
	const {state} = useContext(AppContext);
	const categories = state?.categories ?? [];
	const pathname = usePathname();
	const segments = pathname.split('/').filter(Boolean);
	const depth = segments.length;
	const decode = (index) => decodeURIComponent(segments[index] || '');


	if(categories.length === 0) return (<Loading/>)

	// find Id of all hierarchy
	const categoryId = categories.find(cat => slugify(cat.name) === slugify(decode(1)))?.id;
	const subcategoryId = categories?.find(c => c.id === categoryId)?.subcategories?.find(sub => slugify(sub.name) === slugify(decode(2)))?.id;
	const productId = categories.find(c => c.id === categoryId)?.subcategories?.find(s => s.id === subcategoryId)?.products?.find(p => slugify(p.title) === slugify(decode(3)))?.id;
	const variantId = getVariantFromCategories(categories, slugify(decode(segments.length-1)));
	const idList = {categoryId, subcategoryId, productId, variantId};

	return (
		<div className="w-full h-full min-h-[100vh] bg-white flex flex-col items-center">
			<div className="w-[80%] max-w-[1200px]">
				<BreadCrumbs/>
				<PageHeader/>
			</div>
			<div className="h-full w-[80%] flex flex-col  text-text-dark items-center justify-center">

				{variantId                                                                                              // Display variant details
					? <VariantLevel props={idList} />
					: (
						productId && depth === 4                                                                        // Display variants of a product
							? <ProductLevel props={idList}></ProductLevel>
							: (
								subcategoryId && depth === 3                                                            // Display products or variants of a subcategory
									? <SubCategoryLevel props={idList}/>
									: depth === 2 && <CategoryLevel props={idList}/>                                    // Display subcategories or variants of a category
							)
					)
				}
			</div>
		</div>
	);
};

export default Page;

