'use client'
import {useState} from 'react';
import CategoryTab from './category/CategoryTab';
import SubcategoryTab from './subcategory/SubCategory';
import ProductTab from './product/ProductTab';
import VariantTab from './variant/VariantTab';

export default function ProductPage() {
	const [activeTab, setActiveTab] = useState('category')

	return (
		<div className="p-8 bg-gray-100 text-text-dark w-auto max-w-full">
			{/* Tab Menüsü */}
			<div className="flex space-x-4 border-b border-gray-200">
				<button
					onClick={() => setActiveTab('category')}
					className={`px-4 py-2 text-sm font-medium cursor-pointer ${
						activeTab === 'category'
							? 'text-blue-500 border-b-2 border-blue-500'
							: 'text-gray-500 hover:text-gray-700'
					}`}
				>
					Category
				</button>
				<button
					onClick={() => setActiveTab('subcategory')}
					className={`px-4 py-2 text-sm font-medium cursor-pointer ${
						activeTab === 'subcategory'
							? 'text-blue-500 border-b-2 border-blue-500'
							: 'text-gray-500 hover:text-gray-700'
					}`}
				>
					Subcategory
				</button>
				<button
					onClick={() => setActiveTab('product')}
					className={`px-4 py-2 text-sm font-medium cursor-pointer ${
						activeTab === 'product'
							? 'text-blue-500 border-b-2 border-blue-500'
							: 'text-gray-500 hover:text-gray-700'
					}`}
				>
					Product
				</button>
				<button
					onClick={() => setActiveTab('variant')}
					className={`px-4 py-2 text-sm font-medium cursor-pointer ${
						activeTab === 'variant'
							? 'text-blue-500 border-b-2 border-blue-500'
							: 'text-gray-500 hover:text-gray-700'
					}`}
				>
					Variant
				</button>
			</div>

			{/* Tab İçeriği */}
			<div className="max-w-full">
				{activeTab === 'category' && <CategoryTab/>}
				{activeTab === 'subcategory' && <SubcategoryTab/>}
				{activeTab === 'product' && <ProductTab/>}
				{activeTab === 'variant' && <VariantTab/>}
			</div>
		</div>
	);
}