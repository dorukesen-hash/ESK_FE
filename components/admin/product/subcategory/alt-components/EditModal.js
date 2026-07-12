'use client'
import Image from 'next/image';
import React, {useState} from 'react';

const EditModal = ({
	                   setEditSubcategory,
	                   editSubcategory,
	                   handleUpdateListItem,
	                   handleRemoveListItem,
	                   handleAddListItem,
	                   setIsEditModalOpen,
	                   handleEditSubcategory,
	                   variants,
	                   setVariants,
	                   isCreateLoading
                   }) => {

	const [hasVariants, setHasVariants] = useState(editSubcategory.variants && editSubcategory.variants.length > 0 ? true : false); // Varyant var mı?

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

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg w-3/4">
				<h3 className="text-lg font-semibold mb-4">Edit Subcategory</h3>
				<p className=' my-2 mt-8'>{editSubcategory?.categoryName}</p>
				<input
					type="text"
					placeholder="Subcategory Name"
					value={editSubcategory.name}
					onChange={(e) =>
						setEditSubcategory({...editSubcategory, name: e.target.value})
					}
					className="w-full p-2 border border-gray-300 rounded-lg mb-4"
				/>
				{editSubcategory.subcategory_images.length > 0 && (
					<div className="flex gap-2">
						{editSubcategory.subcategory_images.map((img, index) => (
							<div
								key={index}
								className="w-20 h-20 mb-4 border rounded-md flex items-center justify-center overflow-hidden bg-gray-100 cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
								onClick={() => !img && onClickEmpty(index)}
							>
								{img ? (
									<Image
										src={`https://cdn.enesdorukesen.com.tr/${img}`}
										width={200}
										height={200}
										alt={`Image ${index + 1}`}
										className="w-full h-full object-cover"
									/>
								) : (
									<span className="text-gray-400 text-xl">+</span>
								)}
							</div>
						))}
					</div>)}

				<textarea
					type="text"
					placeholder="Description"
					value={editSubcategory.description}
					maxLength={255}
					rows={2}
					onChange={(e) =>
						setEditSubcategory({...editSubcategory, description: e.target.value})
					}
					className="w-full p-2 h-32 border border-gray-300 rounded-lg mb-4 resize-none overflow-hidden"
				/>
				<div className="mb-4">
					<h4 className="text-sm font-bold mb-2">List Items</h4>
					{editSubcategory?.desc2?.list_items && editSubcategory?.desc2?.list_items.map((item, index) => (
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
						<label className="flex items-center font-bold">
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
								onChange={() => setEditSubcategory({
									...editSubcategory,
									available: !editSubcategory.available
								})}
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
										className="w-1/3 p-2 border border-gray-300 rounded-lg"
									/>
									<input
										type="text"
										placeholder="SKU"
										value={variant.sku}
										onChange={(e) => handleUpdateVariant(index, 'sku', e.target.value)}
										className="w-1/3 p-2 border border-gray-300 rounded-lg"
									/>
									<input
										type="number"
										placeholder="Stock"
										value={variant.stockLevel}
										onChange={(e) => handleUpdateVariant(index, 'stockLevel', parseInt(e.target.value))}
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

				<div className="flex justify-end space-x-2">
					<button
						onClick={() => {
							setIsEditModalOpen(false)
							setEditSubcategory({
								id: 0,
								name: "",
								description: "",
								list_items: []
							})
							setVariants([
								{
									title: "",
									sku: "",
									stockLevel: 0
								}
							]);
						}}
						className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							handleEditSubcategory();
							setVariants([
								{
									title: "",
									sku: "",
									stockLevel: 0
								}
							]);
							setEditSubcategory({
								id: 0,
								name: "",
								description: "",
								list_items: [],
							})
							setIsEditModalOpen(false)
						}}
						disabled={isCreateLoading}
						className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
					>
						{isCreateLoading ? "Updating..." : "Update"}
					</button>
				</div>
			</div>
		</div>
	)
}

export default EditModal