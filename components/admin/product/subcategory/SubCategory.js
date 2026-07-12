"use client";
import api from "@/hooks/Api";
import {useState, useEffect, useContext} from "react";
import {AppContext} from "@/Context/AppContext";
import CreateModal from "./alt-components/CreateModal";
import EditModal from "./alt-components/EditModal";
import DeleteModal from "./alt-components/DeleteModal";
import {successNote} from "@/utils/ToastNotify";
import AddImage from "@/utils/AddImage";

export default function SubcategoryTab() {
	const [subcategories, setSubcategories] = useState([]); // Alt kategorilerin listesi
	const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Ekleme modal'ı için
	const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Düzenleme modal'ı için
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Silme modal'ı için
	const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Seçilen alt kategori
	const [openImageModal, setOpenImageModal] = useState(false);
	const [isCreateLoading, setIsCreateLoading] = useState(false);
	const [selectedImages, setSelectedImages] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [editSubcategory, setEditSubcategory] = useState({
		id: 0,
		name: "",
		description: "",
		list_items: [],
		available: false,
	});
	const [variants, setVariants] = useState([]); // Varyantların listesi
	const [openMenuId, setOpenMenuId] = useState(null); // Açık olan menünün ID'si
	const {state} = useContext(AppContext);
	const {categories} = state;

	const refreshTable = async () => {
		const fetchSubcategories = async () => {
			try {
				const response = await api.get(`/admin/subcategory?search=${searchQuery}`);
				setSubcategories(response.data.rows); // Varyant verileri
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchSubcategories();
	};

	// Yeni alt kategori ekleme
	const handleAddSubcategory = () => {
		setIsCreateLoading(true);
		api
			.post(`/admin/subcategory`, {...editSubcategory, variants})
			.then((resp) => {
				setSubcategories([...subcategories, resp.data]);
				setIsAddModalOpen(false);
				setIsCreateLoading(false);
				successNote("Subcategory created successfully!");
				refreshTable();
			})
			.catch((err) => {
				console.log(err);
				setIsCreateLoading(false);
			});
	};

	// Alt kategori düzenleme
	const handleEditSubcategory = () => {
		api
			.put(`/admin/subcategory`, {...editSubcategory, variants})
			.then(() => {
				const updatedSubcategories = subcategories.map((subcategory) =>
					subcategory.id === selectedSubcategory.id
						? {...editSubcategory}
						: subcategory
				);
				setSubcategories(updatedSubcategories);
				setIsEditModalOpen(false);
				successNote("Subcategory edited successfully!");
				refreshTable();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// Alt kategori silme
	const handleDeleteSubcategory = () => {
		api
			.delete(`/admin/subcategory/${selectedSubcategory.id}`)
			.then(() => {
				const updatedSubcategories = subcategories.filter(
					(subcategory) => subcategory.id !== selectedSubcategory.id
				);
				setSubcategories(updatedSubcategories);
				setIsDeleteModalOpen(false);
				successNote("Subcategory deleted successfully!");
			})
			.catch((err) => console.log(err));
	};

	// Listeye yeni öğe ekleme
	const handleAddListItem = () => {
		setEditSubcategory({
			...editSubcategory,
			list_items: [...editSubcategory.list_items, ""],
		});
	};

	// Liste öğesini güncelleme
	const handleUpdateListItem = (index, value) => {
		const updatedListItems = [...editSubcategory.list_items];
		updatedListItems[index] = value;
		setEditSubcategory({
			...editSubcategory,
			list_items: updatedListItems,
		});
	};

	const handleUpdateListItemX = (index, value) => {
		const updatedListItems = [...editSubcategory?.desc2?.list_items];
		updatedListItems[index] = value;
		setEditSubcategory({
			...editSubcategory,
			desc2: {...editSubcategory.desc2, list_items: updatedListItems},
		});
	};

	// Liste öğesini silme
	const handleRemoveListItem = (index) => {
		const updatedListItems = editSubcategory.list_items.filter(
			(_, i) => i !== index
		);
		setEditSubcategory({
			...editSubcategory,
			list_items: updatedListItems,
		});
	};

	// Liste öğesini silme
	const handleRemoveListItemX = (index) => {
		const updatedListItems = editSubcategory?.desc2?.list_items.filter(
			(_, i) => i !== index
		);
		setEditSubcategory({
			...editSubcategory,
			desc2: {...editSubcategory.desc2, list_items: updatedListItems},
		});
	};

	// Menüyü açıp kapama
	const toggleMenu = (id) => {
		setOpenMenuId(openMenuId === id ? null : id);
	};

	useEffect(() => {
		const fetchSubcategories = async () => {
			try {
				const response = await api.get(`/admin/subcategory?search=`);
				setSubcategories(response.data.rows); // Varyant verileri
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchSubcategories();
	}, []);

	const handleSearch = async () => {
		try {
			const res = await api.get(`/admin/subcategory?search=${searchQuery}`);
			setSubcategories(res.data.rows); // veya fetch sonrası mevcut listeyi güncelle
		} catch (err) {
			errorNote("Search failed: " + err.message);
		}
	};


	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Subcategory List</h2>

      <div className="w-full flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-text-dark"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-sm bg-blue-900 text-white rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Search
          </button>
        </div>

			{/* Tablo */}
			<div className="overflow-visible bg-white rounded-lg shadow">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
							Actions
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
							Name
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
							Category
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase ">
							Draft / Active
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase ">
							Product
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase ">
							Variants
						</th>
					</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
					{subcategories.map((subcategory) => (
						<tr key={subcategory.id}>
							{/* Actions Sütunu */}
							<td className="px-6 py-4 whitespace-nowrap relative">
								<button
									onClick={() => toggleMenu(subcategory.id)}
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
								{openMenuId === subcategory.id && (
									<div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-[9999]">
										<button
											onClick={() => {
												setSelectedSubcategory(subcategory);
												setEditSubcategory({
													...subcategory,
													id: subcategory.id,
													name: subcategory.name,
													available: subcategory?.available
														? subcategory?.available
														: false,
													list_items:
														subcategory.desc2 !== null
															? subcategory?.desc2?.list_items
															: [],
													description:
														subcategory?.desc2 !== null
															? subcategory?.desc2?.text
															: "",
													categoryName: subcategory?.category?.name,
													subcategory_images:
														subcategory.subcategory_images.length > 0
															? subcategory.subcategory_images.map(
																(x) => x.image.url
															)
															: [],
												});
												setVariants(subcategory?.variants);
												setIsEditModalOpen(true);
												setOpenMenuId(null);
											}}
											className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Update
										</button>
										<button
											onClick={() => {
												setSelectedSubcategory(subcategory);
												setOpenImageModal(true);
												setSelectedImages(
													subcategory.subcategory_images.length > 0
														? subcategory.subcategory_images.map((x) => ({
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
												setSelectedSubcategory(subcategory);
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
							<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
								{subcategory?.name}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{subcategory?.category?.name}
							</td>
							<td
								className={`px-6 py-4 text-center ${
									subcategory?.available && "font-bold"
								} whitespace-nowrap text-sm text-gray-900`}
							>
								{subcategory?.available ? "+" : " - "}
							</td>
							<td
								className={`px-6 py-4 text-center ${
									subcategory?.products?.length > 0 && "font-bold"
								} whitespace-nowrap text-sm text-gray-900`}
							>
								{subcategory && subcategory?.products?.length > 0
									? subcategory?.products?.length
									: 0}
							</td>
							<td
								className={`x-6 py-4 text-center ${
									subcategory?.variants?.length > 0 && "font-bold"
								} whitespace-nowrap text-sm text-gray-900`}
							>
								{subcategory && subcategory?.variants?.length > 0
									? subcategory?.variants?.length
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
					setEditSubcategory={setEditSubcategory}
					editSubcategory={editSubcategory}
					handleUpdateListItem={handleUpdateListItem}
					handleRemoveListItem={handleRemoveListItem}
					handleAddListItem={handleAddListItem}
					categories={categories}
					setIsAddModalOpen={setIsAddModalOpen}
					handleAddSubcategory={handleAddSubcategory}
					setVariants={setVariants}
					variants={variants}
					isCreateLoading={isCreateLoading}
				/>
			)}

			{/* Düzenleme Modal'ı */}
			{isEditModalOpen && (
				<EditModal
					setEditSubcategory={setEditSubcategory}
					editSubcategory={editSubcategory}
					handleUpdateListItem={handleUpdateListItemX}
					handleRemoveListItem={handleRemoveListItemX}
					handleAddListItem={handleAddListItem}
					categories={categories}
					setVariants={setVariants}
					variants={variants}
					setIsEditModalOpen={setIsEditModalOpen}
					handleEditSubcategory={handleEditSubcategory}
					isCreateLoading={isCreateLoading}
				/>
			)}

			{/* Silme Modal'ı */}
			{isDeleteModalOpen && (
				<DeleteModal
					setIsDeleteModalOpen={setIsDeleteModalOpen}
					handleDeleteSubcategory={handleDeleteSubcategory}
				/>
			)}
			{openImageModal && (
				<AddImage
					selectedImages={selectedImages}
					id={selectedSubcategory.id}
					type={"subcategory"}
					open={openImageModal}
					setOpen={setOpenImageModal}
					refreshTable={refreshTable}
				/>
			)}
		</div>
	);
}
