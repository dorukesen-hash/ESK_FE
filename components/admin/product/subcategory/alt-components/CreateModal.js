'use client';
import api from '@/hooks/Api';
import React, {useEffect, useState} from 'react';

const CreateModal = ({
	                     setEditSubcategory,
	                     editSubcategory,
	                     handleUpdateListItem,
	                     handleRemoveListItem,
	                     handleAddListItem,
	                     setIsAddModalOpen,
	                     handleAddSubcategory,
	                     variants,
	                     setVariants,
	                     isCreateLoading
                     }) => {
	const [hasVariants, setHasVariants] = useState(false); // Varyant var mı?
	const [categories, setCategories] = useState([])

	// Yeni varyant ekleme
	const handleAddVariant = () => {
		setVariants([...variants, {title: '', sku: '', stockLevel: 0}]);
	};

	// Varyant güncelleme
	const handleUpdateVariant = (index, field, value) => {
		const updatedVariants = [...variants];
		updatedVariants[index][field] = value;
		setVariants(updatedVariants);
	};

	// Varyant silme
	const handleRemoveVariant = (index) => {
		const updatedVariants = variants.filter((_, i) => i !== index);
		setVariants(updatedVariants);
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await api.get(`/admin/category/`);
				setCategories(response.data.rows); // Varyant verileri
			} catch (error) {
				console.error('Error:', error);
			}
		};

		fetchCategories();
	}, []);


	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg w-3/4 p-6 overflow-y-auto">
				<h3 className="text-lg font-semibold mb-4">Add Subcategory</h3>

				{/* Kategori Seçimi */}
				<select
					value={editSubcategory.categoryId || ""}
					onChange={(e) =>
						setEditSubcategory({
							...editSubcategory,
							categoryId: parseInt(e.target.value),
						})
					}
					className="w-full p-2 border border-gray-300 rounded-lg mb-4"
				>
					<option value="">Select a category</option>
					{categories &&
						categories?.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
				</select>

				{/* Alt Kategori Adı */}
				<input
					type="text"
					placeholder="Subcategory Name"
					value={editSubcategory.name}
					onChange={(e) =>
						setEditSubcategory({...editSubcategory, name: e.target.value})
					}
					className="w-full p-2 border border-gray-300 rounded-lg mb-4"
				/>

				{/* Açıklama */}
				<textarea
					type="text"
					placeholder="Description"
					value={editSubcategory.description}
					onChange={(e) =>
						setEditSubcategory({
							...editSubcategory,
							description: e.target.value,
						})
					}
					className="w-full p-2 border border-gray-300 rounded-lg mb-4"
				/>

				{/* List Items */}
				<div className="mb-4">
					<h4 className="text-sm font-medium mb-2">List Items</h4>
					{editSubcategory.list_items.map((item, index) => (
						<div key={index} className="flex items-center mb-2">
							<input
								type="text"
								value={item}
								onChange={(e) => handleUpdateListItem(index, e.target.value)}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<button
								onClick={() => handleRemoveListItem(index)}
								className="ml-2 p-2 text-red-500 hover:text-red-700 cursor-pointer"
							>
								×
							</button>
						</div>
					))}
					<button
						onClick={handleAddListItem}
						className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
					>
						+ Add Item
					</button>
				</div>

				{/* Varyantlar */}
				<div className="mb-4">
					<div className="flex items-center space-x-4">
						<label className="flex items-center">
							<input
								type="checkbox"
								checked={hasVariants}
								onChange={() => setHasVariants(!hasVariants)}
								className="mr-2"
							/>
							Has Variants
						</label>
						<label className="flex items-center">
							<input
								type="checkbox"
								checked={editSubcategory.available}
								onChange={() =>
									setEditSubcategory({
										...editSubcategory,
										available: !editSubcategory.available,
									})
								}
								className="mr-2"
							/>
							Available
						</label>
					</div>

					{/* Varyant Inputları */}
					{hasVariants && (
						<div className="mt-4">
							{variants &&
								variants?.map((variant, index) => (
									<div key={index} className="flex space-x-4 mb-4">
										<input
											type="text"
											placeholder="Title"
											value={variant.title}
											onChange={(e) =>
												handleUpdateVariant(index, "title", e.target.value)
											}
											className="w-1/3 p-2 border border-gray-300 rounded-lg"
										/>
										<input
											type="text"
											placeholder="SKU"
											value={variant.sku}
											onChange={(e) =>
												handleUpdateVariant(index, "sku", e.target.value)
											}
											className="w-1/3 p-2 border border-gray-300 rounded-lg"
										/>
										<input
											type="number"
											placeholder="Stock"
											value={variant.stockLevel}
											onChange={(e) =>
												handleUpdateVariant(
													index,
													"stockLevel",
													parseInt(e.target.value)
												)
											}
											className="w-1/3 p-2 border border-gray-300 rounded-lg"
										/>
										<button
											onClick={() => handleRemoveVariant(index)}
											className="p-2 text-red-500 hover:text-red-700 cursor-pointer"
										>
											×
										</button>
									</div>
								))}
							<button
								onClick={handleAddVariant}
								className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
							>
								+ Add Variant
							</button>
						</div>
					)}
				</div>

				{/* Butonlar */}
				<div className="flex justify-end space-x-2">
					<button
						onClick={() => {
							setVariants([
								{
									title: "",
									sku: "",
									stock: 0,
								},
							]);
							setIsAddModalOpen(false);
							setEditSubcategory({
								id: 0,
								name: "",
								description: "",
								list_items: [],
							});
						}}
						className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							handleAddSubcategory();
							setVariants([
								{
									title: "",
									sku: "",
									stock: 0,
								},
							]);
							setIsAddModalOpen(false);
							setEditSubcategory({
								id: 0,
								name: "",
								description: "",
								list_items: [],
							});
						}}
						disabled={isCreateLoading}
						className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
					>
						{isCreateLoading ? "Saving..." : "Save"}
					</button>
				</div>

			</div>
		</div>

	);
};

export default CreateModal;