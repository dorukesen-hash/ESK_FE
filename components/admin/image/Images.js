'use client'
import {useEffect, useState} from "react";
import Image from "next/image";
import api from "@/hooks/Api";
import {errorNote, successNote} from "@/utils/ToastNotify";


const Images = () => {
	const [images, setImages] = useState([]);
	const [selectedImages, setSelectedImages] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const imageURL = process.env.IMAGE_URL

	const fetchImages = () => {
		api.get("/images/all?search=")
			.then(res => {
				setImages(res.data.data)
			})
	};


	useEffect(() => {

		fetchImages();
	}, []);


	const toggleSelect = (image) => {
		setSelectedImages((prevSelected) => {
			const alreadySelected = prevSelected.find((img) => img.id === image.id);
			if (alreadySelected) {
				return prevSelected.filter((img) => img.id !== image.id);
			} else {
				return [...prevSelected, {id: image.id, url: image.url}];
			}
		});
	};


	const handleConfirmDelete = async () => {
		try {
			const body = {
				images: selectedImages.map(img => ({
					id: img.id,
					url: img.url
				}))
			};

			const res = await api.post("/images/delete", body);
			if (res.status === 200) {
				successNote("The image(s) deleted successfully!");
				fetchImages();
				setSelectedImages([]); // seçimleri temizle
				setShowDeleteModal(false); // modalı kapat
			}
		} catch (err) {
			errorNote("An error occurred while deleting the image(s).");
			console.error(err);
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file) {
			setPreviewImage(file);
		}
	};

	const handleUpload = async () => {
		if (!previewImage) return;
		setUploading(true);
		const formData = new FormData();
		formData.append("file", previewImage);

		try {
			const res = await api.post("/images/upload", formData);
			if (res.status === 201) {
				setShowModal(false);
				setPreviewImage(null);
				successNote("The image uploaded successfully!")
				fetchImages();
			}
		} catch (err) {
			console.error("Upload error:", err);
			errorNote(`Upload error: ${err}`)
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="p-6">
			{/* Info bar */}
			<div className="flex items-center justify-between bg-blue-100 px-4 py-2 rounded-md mb-4">
        <span className="text-blue-800 font-medium">
          {selectedImages.length} image{selectedImages.length !== 1 && "s"} selected
        </span>
				<div className="flex gap-2">
					<button
						onClick={() => setShowModal(true)}
						className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
					>
						Upload New Image
					</button>
					<button
						onClick={() => setShowDeleteModal(true)}
						className={`px-4 py-2 rounded-md text-sm text-white ${
							selectedImages.length === 0
								? "bg-red-300 cursor-not-allowed"
								: "bg-red-500 hover:bg-red-600"
						}   cursor-pointer`}
						disabled={selectedImages.length === 0}
					>
						Delete Images
					</button>
				</div>
			</div>

			{/* Image Grid */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{images.map((img, idx) => (
					<div
						key={idx}
						className="relative group rounded-md overflow-hidden border border-gray-200 hover:shadow-lg"
					>
						<Image
							src={`https://cdn.enesdorukesen.com.tr/${img.url}`}
							alt={`Image ${idx}`}
							loading="lazy"
							width={200}
							height={200}
							className="w-full aspect-square object-cover"
						/>
						<input
							type="checkbox"
							className="absolute top-2 right-2 h-5 w-5 text-blue-600 border-gray-300 rounded-full focus:ring-0 cursor-pointer"
							checked={selectedImages.some((x) => x.id === img.id)}
							onChange={() => toggleSelect(img)}
						/>
						<button
							onClick={() => deleteImage(img.url)}
							className="absolute top-2 left-2 text-red-600 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
							aria-label="Delete image"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				))}
			</div>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-custom-blue-gray bg-opacity-10 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg w-full max-w-md">
						<h2 className="text-lg font-semibold mb-4">Upload Image</h2>
						<div
							onDrop={handleDrop}
							onDragOver={(e) => e.preventDefault()}
							className="border-2 border-dashed border-gray-400 rounded-md h-40 flex items-center justify-center text-gray-500 mb-4 cursor-pointer"
						>
							{previewImage ? (
								<Image
									src={URL.createObjectURL(previewImage)}
									alt="Preview"
									className="h-full object-contain"
									width={300}
									height={300}
								/>
							) : (
								<span>Drag and drop an image here</span>
							)}
						</div>
						<div className="flex justify-end gap-2">
							<button
								onClick={handleUpload}
								disabled={uploading || !previewImage}
								className={`px-4 py-2 rounded-md text-white text-sm ${
									uploading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
								} cursor-pointer`}
							>
								{uploading ? "Uploading..." : "Upload"}
							</button>
							<button
								onClick={() => setShowModal(false)}
								disabled={uploading}
								className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			{showDeleteModal && (
				<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg w-full max-w-lg">
						<h2 className="text-lg font-semibold mb-4 text-red-600">
							Are you sure?
						</h2>
						<p className="mb-4 text-sm text-gray-700">
							Are you sure you want to delete the selected images?
						</p>
						<div className="grid grid-cols-3 gap-2 mb-4">
							{selectedImages
								.map((img, idx) => (
									<Image
										key={idx}
										src={`https://cdn.enesdorukesen.com.tr/${img.url}`}
										width={200}
										height={200}
										alt="Selected"
										className="rounded-md object-cover w-full aspect-square border border-gray-200"
									/>
								))}
						</div>
						<div className="flex justify-end gap-2">
							<button
								onClick={handleConfirmDelete}
								className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm cursor-pointer"
							>
								Apply
							</button>
							<button
								onClick={() => setShowDeleteModal(false)}
								className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Images;
