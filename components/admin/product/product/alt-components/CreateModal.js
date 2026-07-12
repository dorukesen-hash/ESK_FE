import api from '@/hooks/Api';
import React, {useEffect, useState} from 'react'

const CreateModal = ({
	                     setEditProduct,
	                     editProduct,
	                     handleAddProduct,
	                     handleUpdateListItem,
	                     handleRemoveListItem,
	                     handleAddListItem,
	                     setVariants,
	                     variants,
	                     isCreateLoading,
	                     setIsAddModalOpen
                     }) => {
	const [hasVariants, setHasVariants] = useState(false); // Varyant var mı?
	const [catList, setCatList] = useState([]);
	const [subcatList, setSubcatList] = useState([]);
	const [catId, setCatId] = useState(null)
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
				setCatList(response.data.rows); // Varyant verileri
			} catch (error) {
				console.error('Error:', error);
			}
		};
		fetchCategories();
	}, []);

	useEffect(() => {

		const fetchCategories = async () => {
			try {
				const response = await api.get(`/subcategory/${catId}`);
				setSubcatList(response.data);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		if (catId) {
			fetchCategories();
		}

	}, [catId]);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-6 rounded-lg w-3/4 overflow-y-auto z-50">
				<h3 className="text-lg font-semibold mb-4">Add Product</h3>

				{/* Kategori Seçimi */}
				<select
					value={editProduct.categoryId || ''}
					onChange={(e) => {
						setEditProduct({...editProduct, categoryId: parseInt(e.target.value)});
						setCatId(parseInt(e.target.value))
					}
					}
					className="w-full p-2 border border-gray-300 rounded-lg mb-4"
				>
					<option value="">Select a category</option>
					{catList && catList?.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>

				{
					editProduct.categoryId && catList.length > 0 &&
					(
						<select
							value={editProduct.subcategoryId || ''}
							onChange={(e) =>
								setEditProduct({...editProduct, subcategoryId: parseInt(e.target.value)})
							}
							className="w-full p-2 border border-gray-300 rounded-lg mb-4"
						>
							<option value="">Select a Subcategory</option>
							{subcatList.length > 0 && subcatList?.map((subcategory) => (
								<option key={subcategory.id} value={subcategory.id}>
									{subcategory.name}
								</option>
							))}
						</select>
					)
				}

				{/* Alt Kategori Adı */}
				<input
					type="text"
					placeholder="Product Name"
					value={editProduct.title}
					onChange={(e) =>
						setEditProduct({...editProduct, title: e.target.value})
					}
					className="w-full p-2 border border-gray-300 rounded-lg mb-4"
				/>

				{/* Açıklama */}
				<textarea
					type="text"
					placeholder="Description"
					value={editProduct.description}
					onChange={(e) =>
						setEditProduct({...editProduct, description: e.target.value})
					}
					className="w-full p-2 border border-gray-300 rounded-lg mb-4"
				/>

				{/* List Items */}
				<div className="mb-4">
					<h4 className="text-sm font-medium mb-2">List Items</h4>
					{editProduct.list_items.map((item, index) => (
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
								checked={editProduct.available}
								onChange={() => setEditProduct({...editProduct, available: !editProduct.available})}
								className="mr-2"
							/>
							Available
						</label>
					</div>

					{/* Varyant Inputları */}
					{hasVariants && (
						<div className="mt-4">
							{variants && variants?.map((variant, index) => (
								<div key={index} className="flex space-x-4 mb-4">
									<input
										type="text"
										placeholder="Title"
										value={variant.title}
										onChange={(e) => handleUpdateVariant(index, 'title', e.target.value)}
										className="w-2/3 p-2 border border-gray-300 rounded-lg"
									/>
									<input
										type="text"
										placeholder="stock"
										value={variant.stock}
										onChange={(e) => handleUpdateVariant(index, 'stock', e.target.value)}
										className="w-1/3 p-2 border border-gray-300 rounded-lg"
									/>
									{/* <input
										type="number"
										placeholder="Stock"
										value={variant.stockLevel}
										onChange={(e) => handleUpdateVariant(index, 'stockLevel', parseInt(e.target.value))}
										className="w-1/3 p-2 border border-gray-300 rounded-lg"
									/> */}
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
									stock: 0
								}
							]);
							setIsAddModalOpen(false);
							setEditProduct({
								id: 0,
								name: "",
								description: "",
								list_items: [],
								available: false
							})
						}}
						className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							handleAddProduct();
							setVariants([
								{
									title: "",
									sku: "",
									stock: 0
								}
							]);
							setIsAddModalOpen(false);
							setEditProduct({
								id: 0,
								name: "",
								description: "",
								list_items: [],
								available: false
							})
						}}
						disabled={isCreateLoading}
						className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
					>
						{isCreateLoading ? "Saving..." : "Save"}
					</button>
				</div>
			</div>
		</div>
	)
}

export default CreateModal