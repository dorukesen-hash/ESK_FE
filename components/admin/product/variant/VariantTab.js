"use client";
import api from "@/hooks/Api";
import React, {useState, useEffect, useContext} from "react";
import UpdateVariantModal from "./alt-components/UpdateVariantModal";
import AddImage from "@/utils/AddImage";
import DeleteVariantModal from "./alt-components/DeleteVariantModal";
import {errorNote, successNote} from "@/utils/ToastNotify";
import Image from "next/image";
import VariantUpload from "./alt-components/VariantUpload";
import FrequentlyBoughtTogether from "@/components/admin/product/variant/alt-components/FrequentlyBoughtTogether";
import {AppContext} from "@/Context/AppContext";
import {allVariantsInCategories} from "@/hooks/service";

export default function VariantTab() {
	const {state} = useContext(AppContext);
	const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa
	const [variants, setVariants] = useState([]); // Varyant verileri
	const [totalCount, setTotalCount] = useState(0); // Toplam kayıt sayısı
	const [openMenuId, setOpenMenuId] = useState(null); // Açık olan menünün ID'si
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Update modalının açık olup olmadığı
	const [selectedVariant, setSelectedVariant] = useState(null); // Seçilen varyant
	const [selectedImages, setSelectedImages] = useState([]);
	const [openImageModal, setOpenImageModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const itemsPerPage = 10; // Sayfa başına gösterilecek kayıt sayısı
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [openExcelModal, setOpenExcelModal] = useState(false)

	const allVariants = allVariantsInCategories(state.categories);

	useEffect(() => {
		const fetchVariants = async () => {
			try {
				const response = await api.get(
					`/admin/variant?page=${
						currentPage - 1
					}&limit=${itemsPerPage}&globalFilter=`
				);
				setVariants(response.data.rows); // Varyant verileri
				setTotalCount(response.data.count); // Toplam kayıt sayısı
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchVariants();
	}, [currentPage]);

	const refreshVariants = async () => {
		try {
			const response = await api.get(
				`/admin/variant?page=${
					currentPage - 1
				}&limit=${itemsPerPage}&globalFilter=${encodeURIComponent(searchQuery)}`
			);
			setVariants(response.data.rows); // Varyant verileri
			setTotalCount(response.data.count); // Toplam kayıt sayısı
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleSearch = async () => {
		try {
			const res = await api.get(
				`/admin/variant?page=${
					currentPage - 1
				}&limit=${itemsPerPage}&globalFilter=${encodeURIComponent(searchQuery)}`
			);
			setVariants(res.data.rows); // veya fetch sonrası mevcut listeyi güncelle
			setTotalCount(res.data.count); // Toplam kayıt sayısı
		} catch (err) {
			errorNote("Search failed: " + err.message);
		}
	};

	// Sayfa değiştirme
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// Menüyü açıp kapama
	const toggleMenu = (id) => {
		setOpenMenuId(openMenuId === id ? null : id);
	};

	// Update işlemi
	const handleUpdate = (id) => {
		const variant = variants.find((v) => v.id === id);
		setSelectedVariant(variant);
		setIsUpdateModalOpen(true);
		setOpenMenuId(null); // Menüyü kapat
	};

	// Delete işlemi
	const handleDeleteVariant = async () => {
		try {
			await api.delete(`/admin/variant/${selectedVariant.id}`);
			refreshVariants();
			setIsDeleteModalOpen(false);
			successNote("Variant deleted successfully!");
			setOpenMenuId(null); // Menüyü kapat
		} catch (error) {
			console.error("Error:", error);
		}
	};

	// Update modalını kapat
	const closeUpdateModal = () => {
		setIsUpdateModalOpen(false);
		setSelectedVariant(null);
		refreshVariants();
	};

	const showDescription = (desc, spec) => {
		return (
			<div>
				<p>
					{(desc &&
							desc.length > 30 &&
							desc.slice(0, 50) + "...") ||
						" - "}
				</p>
			</div>
		);
	};

	const showPrices = (single, five, ten, pallet) => {
		return (
			<div>
				<p>
					<b>Single: </b>
					{single || "-"}
				</p>
				<p>
					<b>Five: </b>
					{five || "-"}
				</p>
				<p>
					<b>Ten: </b>
					{ten || "-"}
				</p>
				<p>
					<b>Pallet: </b>
					{pallet || "-"}
				</p>
			</div>
		);
	};

	const showPicture = (item) => {
    // Sadece resim alanında yatay scroll için fonksiyon
    return (
        <div
            className="w-full overflow-scroll overscroll-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >S
            {item && item.length > 0 ? (
                <div className="flex gap-1 items-center">
                    {item.map((imgObj, idx) => (
                        <Image
                            key={imgObj.image?.id || idx}
                            src={`https://cdn.enesdorukesen.com.tr/${imgObj.image?.url}`}
                            alt={imgObj.image?.url}
                            width={54}
                            height={54}
                            className="w-16 h-16 object-cover border-1 border-border-gray rounded-sm"
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center">No Image</p>
            )}
        </div>
    );
	};

	// Table headers
	const tableHeaders = [
		{ key: "actions", label: "Actions" },
		{ key: "image", label: "Image" },
		{ key: "title", label: "Title" },
		{ key: "route", label: "Route" },
		{ key: "stock", label: "Stock #" },
		{ key: "description", label: "Description" },
		{ key: "dimensions", label: "Dimensions" },
		{ key: "prices", label: "Prices" },
		{ key: "fbt", label: "FBT" },
	];

  return (
    <div className="bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4 text-text-dark">Variant List</h2>
      <div className="mb-4">
        <button 
          onClick={()=> setOpenExcelModal(true)}
          className="px-4 py-2 text-sm bg-blue-900 text-white rounded-md hover:bg-blue-700 cursor-pointer">
          Excel Variant Upload +
        </button>
      </div>
      {/* Search */}
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
      <div className="">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {variants.map((variant) => (
              <tr key={variant.id} className="whitespace-nowrap">
                {/*Action Menu */}
                <td className="px-6 py-4 relative">
                  <button
                    onClick={() => toggleMenu(variant.id)}
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
                  {openMenuId === variant.id && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-2">
                      <button
                        onClick={() => handleUpdate(variant.id)}
                        className="block w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVariant(variant);
                          setOpenImageModal(true);
                          setSelectedImages(
                            variant.variant_images.length > 0
                              ? variant.variant_images.map((x) => ({
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
                          setIsDeleteModalOpen(true);
                          setSelectedVariant(variant);
                          setOpenMenuId(null);
                        }}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-2 py-4 text-xs text-gray-900 ">
                  {showPicture(variant?.variant_images)}
                </td>
                <td className="px-2 py-4 text-xstext-gray-900 ">
                  {variant?.title}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-xs text-black">
                  {(variant?.category?.name || " - ") +
                    " / " +
                    (variant?.subcategory?.name || " - ") +
                    " / " +
                    (variant?.product?.title || " - ")}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-900">
                  {variant?.stock || " - "}
                </td>
                <td className="px-2 py-4 text-xs text-gray-900">
                  {showDescription(variant?.description, variant?.spesification)}
                </td>
                <td className="px-2 py-4 text-xs text-gray-900">
                  {variant?.size}
                </td>
                <td className="px-2 py-4 text-xs text-gray-900">
                  {showPrices(variant?.one_four_units, variant?.five_nine_units,variant?.ten_plus_units, variant?.pallet_pricing) || " - "}
                </td>
			  	<td>
					<FrequentlyBoughtTogether variant={variant} allVariants={allVariants}/>
			  	</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


			{/* Pagination */}
			<div className="mt-6 max-w-full justify-center">
				{Array.from(
					{length: Math.ceil(totalCount / itemsPerPage)},
					(_, i) => (
						<button
							key={i + 1}
							onClick={() => handlePageChange(i + 1)}
							className={`mx-1 px-4 py-2 rounded-lg ${
								currentPage === i + 1
									? "bg-blue-500 text-white"
									: "bg-white text-gray-700 hover:bg-gray-100"
							}`}
						>
							{i + 1}
						</button>
					)
				)}
			</div>

			{/* Update Variant Modal */}
			{isUpdateModalOpen && (
				<UpdateVariantModal
					variant={selectedVariant}
					onClose={closeUpdateModal}
				/>
			)}
			{openImageModal && (
				<AddImage
					selectedImages={selectedImages}
					id={selectedVariant.id}
					type={"variant"}
					open={openImageModal}
					setOpen={setOpenImageModal}
					refreshTable={refreshVariants}
				/>
			)}
			{isDeleteModalOpen && (
				<DeleteVariantModal
					setIsDeleteModalOpen={setIsDeleteModalOpen}
					handleDeleteVariant={handleDeleteVariant}
				/>
			)}
			{openExcelModal && (
				<VariantUpload
					setOpenExcelModal={setOpenExcelModal}
					refreshTable={refreshVariants}
				/>
			)}

		</div>
	);
}
