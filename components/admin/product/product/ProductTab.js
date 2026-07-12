"use client";
import api from "@/hooks/Api";
import {useState, useEffect, useContext} from "react";
import DeleteModal from "./alt-components/DeleteModal";
import EditModal from "./alt-components/EditModal";
import CreateModal from "./alt-components/CreateModal";
import {AppContext} from "@/Context/AppContext";
import {successNote} from "@/utils/ToastNotify";
import AddImage from "@/utils/AddImage";

export default function ProductTab() {
	const [products, setProducts] = useState([]); // Alt kategorilerin listesi
	const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Ekleme modal'ı için
	const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Düzenleme modal'ı için
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Silme modal'ı için
	const [selectedProduct, setSelectedProduct] = useState(null); // Seçilen alt kategori
	const [openMenuId, setOpenMenuId] = useState(null); // Açık olan menünün ID'si
	const [isCreateLoading, setIsCreateLoading] = useState(false);
	const [openImageModal, setOpenImageModal] = useState(false);
	const [selectedImages, setSelectedImages] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [editProduct, setEditProduct] = useState({
		id: 0,
		title: "",
		description: "",
		list_items: [], //! buraya extraData varsa gelecek
		available: false,
	});
	const [variants, setVariants] = useState([]); // Varyantların listesi
	const {state} = useContext(AppContext);
	const {categories} = state;

	//Product Ekleme
	const handleAddProduct = () => {
		setIsCreateLoading(true);
		api
			.post(`/admin/product`, {...editProduct, variants})
			.then((resp) => {
				setProducts([...products, resp.data]);
				setIsAddModalOpen(false);
				setIsCreateLoading(false);
				refreshProducts();
				successNote("Product created successfully!");
			})
			.catch((err) => {
				console.log(err);
				setIsCreateLoading(false);
			});
	};

	// Product düzenleme
	// Alt kategori düzenleme
	const handleEditProduct = () => {
		api
			.put(`/admin/product`, {...editProduct, variants})
			.then(() => {
				const updatedProducts = products.map((product) =>
					product.id === selectedProduct.id ? {...editProduct} : product
				);
				setProducts(updatedProducts);
				setIsEditModalOpen(false);
				refreshProducts();
				successNote("Product edited successfully!");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// Product silme
	const handleDeleteProduct = () => {
		api
			.delete(`/admin/product/${selectedProduct.id}`)
			.then(() => {
				const updatedProducts = products.filter(
					(product) => product.id !== selectedProduct.id
				);
				setProducts(updatedProducts);
				setIsDeleteModalOpen(false);
				refreshProducts();
				successNote("Product deleted successfully!");
			})
			.catch((err) => console.log(err));
	};

	// Listeye yeni öğe ekleme
	const handleAddListItem = () => {
		setEditProduct({
			...editProduct,
			list_items: [...editProduct.list_items, ""],
		});
	};

	// Liste öğesini güncelleme
	const handleUpdateListItem = (index, value) => {
		const updatedListItems = [...editProduct.list_items];
		updatedListItems[index] = value;
		setEditProduct({
			...editProduct,
			list_items: updatedListItems,
		});
	};

	// Liste öğesini silme
	const handleRemoveListItem = (index) => {
		const updatedListItems = editProduct.list_items.filter(
			(_, i) => i !== index
		);
		setEditProduct({
			...editProduct,
			list_items: updatedListItems,
		});
	};

	// Menüyü açıp kapama
	const toggleMenu = (id) => {
		setOpenMenuId(openMenuId === id ? null : id);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await api.get(`/admin/product?search=`);
				setProducts(response.data.rows); // Varyant verileri
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchProducts();
	}, []);

	const refreshProducts = async () => {
		try {
			const response = await api.get(`/admin/product?search=${searchQuery}`);
			setProducts(response.data.rows);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleSearch = async () => {
		try {
			const res = await api.get(`/admin/product?search=${searchQuery}`);
			setProducts(res.data.rows); // veya fetch sonrası mevcut listeyi güncelle
		} catch (err) {
			errorNote("Search failed: " + err.message);
		}
	};


  return (
    <div>
      <h2 className="ttext-xl font-semibold mb-4 text-text-dark">Product List</h2>

      {/* Ekleme Butonu */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="cursor-pointer mb-4 p-2 bg-blue-900 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        + Add Product
      </button>
      {/* Search */}
      <div className="w-full flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-md text-text-dark"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 text-sm bg-blue-900 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Search
        </button>
      </div>


			{/* Tablo */}
			<div className="overflow-x-visible bg-white rounded-lg shadow">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Product-Name
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Category
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Sub-category
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Available
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Variants
						</th>
					</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
					{products.map((product) => (
						<tr key={product.id}>
							{/* Actions Sütunu */}
							<td className="px-6 py-4 whitespace-nowrap relative">
								<button
									onClick={() => toggleMenu(product.id)}
									className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
										/>
									</svg>
								</button>

								{/* Menü */}
								{openMenuId === product.id && (
									<div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-[9999]">
										<button
											onClick={() => {
												setSelectedProduct(product);
												setEditProduct({
													...product,
													id: product.id,
													name: product.name,
													available: product?.available
														? product?.available
														: false,
													list_items:
														product.extradata !== null
															? product?.extradata
															: [],
													description:
														product?.description !== null
															? product?.description
															: "",
													categoryName: product?.category?.name,
													subcategoryName: product?.subcategory?.name,
												});
												setVariants(product?.variants);
												setIsEditModalOpen(true);
												setOpenMenuId(null);
											}}
											className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Update
										</button>
										<button
											onClick={() => {
												setSelectedProduct(product);
												setOpenImageModal(true);
												setSelectedImages(
													product.product_images.length > 0
														? product.product_images.map((x) => ({
															id: x.image.id,
															url: x.image.url,
														}))
														: []
												);
												setOpenMenuId(null);
											}}
											className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Upload/Update Photos
										</button>
										<button
											onClick={() => {
												setSelectedProduct(product);
												setIsDeleteModalOpen(true);
												setOpenMenuId(null);
											}}
											className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Delete
										</button>
									</div>
								)}
							</td>

							{/* Name Sütunu */}
							<td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">
								{product.title}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{product?.category?.name}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{product?.subcategory?.name}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{product?.available ? "+" : " - "}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{product && product?.variants?.length > 0
									? product?.variants?.length
									: 0}
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>

			{/* Ekleme Modal'ı */}
			{isAddModalOpen && (
				<CreateModal
					setEditProduct={setEditProduct}
					editProduct={editProduct}
					setIsAddModalOpen={setIsAddModalOpen}
					handleAddProduct={handleAddProduct}
					handleUpdateListItem={handleUpdateListItem}
					handleRemoveListItem={handleRemoveListItem}
					handleAddListItem={handleAddListItem}
					categories={categories}
					setVariants={setVariants}
					variants={variants}
					isCreateLoading={isCreateLoading}
				/>
			)}

			{/* Düzenleme Modal'ı */}
			{isEditModalOpen && (
				<EditModal
					setEditProduct={setEditProduct}
					editProduct={editProduct}
					setIsEditModalOpen={setIsEditModalOpen}
					handleEditProduct={handleEditProduct}
					handleUpdateListItem={handleUpdateListItem}
					handleRemoveListItem={handleRemoveListItem}
					handleAddListItem={handleAddListItem}
					categories={categories}
					setVariants={setVariants}
					variants={variants}
					isCreateLoading={isCreateLoading}
				/>
			)}

			{/* Silme Modal'ı */}
			{isDeleteModalOpen && (
				<DeleteModal
					setIsDeleteModalOpen={setIsDeleteModalOpen}
					handleDeleteProduct={handleDeleteProduct}
				/>
			)}
			{openImageModal && (
				<AddImage
					selectedImages={selectedImages}
					id={selectedProduct.id}
					type={"product"}
					open={openImageModal}
					setOpen={setOpenImageModal}
					refreshTable={refreshProducts}
				/>
			)}
		</div>
	);
}
