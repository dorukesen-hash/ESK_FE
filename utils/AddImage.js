import {useEffect, useState} from "react";
import api from "@/hooks/Api";
import {successNote, errorNote} from "@/utils/ToastNotify";
import Image from "next/image";

export default function AddImage({open, setOpen, id, type, selectedImages, refreshTable}) {
	const [images, setImages] = useState([]);
	const [selected, setSelected] = useState(
		selectedImages.length > 0 ? selectedImages : []
	);
	const [submitting, setSubmitting] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		if (open) {
			const fetchImages = async () => {
				try {
					const res = await api.get(`/images/all`);
					if (res.status === 200) setImages(res.data.data);
				} catch (err) {
					errorNote("Failed to fetch images.");
				}
			};
			fetchImages();
		}
	}, [open]);

	const toggleSelect = (image) => {
		const exists = selected.find((s) => s.id === image.id);
		if (exists) {
			setSelected(selected.filter((s) => s.id !== image.id));
		} else {
			if (selected.length >= 5) {
				errorNote("You can only select up to 5 images.");
				return;
			} else {
				setSelected([...selected, image]);
			}
		}
	};

	const handleSubmit = async () => {
		if (selected.length === 0) return;
		setSubmitting(true);

		try {
			const res = await api.post("/images/attach", {
				ids: selected.map((img) => img.id),
				target: type,
				targetId: id,
			});

			if (res.status === 200) {
				successNote("Images attached successfully!");
				setOpen(false);
				refreshTable();
				setSelected([]);
			}
		} catch (err) {
			console.log(err)
			errorNote("Failed to attach images.");
		} finally {
			setSubmitting(false);
		}
	};

	const onRemoveImage = (id) => {
		setSelected([...selected.filter((item) => item.id !== id)]);
	};

	const handleSearch = async () => {
		try {
			const res = await api.get(`/images/all?search=${searchQuery}`);
			setImages(res.data.data); // veya fetch sonrası mevcut listeyi güncelle
		} catch (err) {
			errorNote("Search failed: " + err.message);
		}
	};

	return (
		<div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
			<div className="bg-white p-6 rounded-xl w-[90vw] max-w-5xl max-h-[90vh] overflow-y-auto relative">
				<button
					className="absolute top-3 right-3 text-gray-500 hover:text-black"
					onClick={() => setOpen(false)}
				>
					X
				</button>

				<h2 className="text-lg font-semibold mb-4">Select up to 5 images</h2>
				<div className="w-full flex items-center gap-2 mb-4">
					<input
						type="text"
						placeholder="Search by name..."
						className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button
						onClick={handleSearch}
						className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
					>
						Search
					</button>
				</div>
				{selected.length > 0 && (
					<div className="border border-gray-300 rounded-lg p-3 bg-gray-50 mb-10">
						<div className="text-sm font-medium text-gray-700 mb-2">
							Selected Images
						</div>
						<div className="flex gap-3 overflow-x-auto">
							{selected.map((img) => (
								<div
									key={img.id}
									className="relative w-28 h-32 shrink-0 rounded overflow-hidden shadow-sm border border-gray-200 bg-white"
								>
									<Image
										src={`https://cdn.enesdorukesen.com.tr/${img.url}`}
										width={200}
										height={200}
										alt="Selected"
										className="w-full h-full object-cover"
									/>
									<button
										onClick={() => onRemoveImage?.(img.id)}
										className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow cursor-pointer"
										title="Remove"
									>
										X
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
					{images &&
						images?.map((img) => {
							const isSelected = selected.some((s) => s.id === img.id);
							return (
								<div
									key={img.id}
									className={`relative rounded-xl overflow-hidden border-2 transition cursor-pointer shadow-md ${
										isSelected ? "border-blue-500" : "border-transparent"
									}`}
									onClick={() => toggleSelect(img)}
								>
									<Image
										src={`https://cdn.enesdorukesen.com.tr/${img.url}`}
										alt="image-esk"
										width={200}
										height={200}
										className="w-full h-32 object-cover"
									/>
									<div className="px-1 py-1 text-xs text-gray-600 truncate text-center">
										{img?.url.replace("images/", "")}
									</div>
									{isSelected && (
										<div
											className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
											✓
										</div>
									)}
								</div>
							);
						})}
				</div>

				<div className="flex justify-end gap-2">
					<button
						onClick={() => setOpen(false)}
						disabled={submitting}
						className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
					>
						Cancel
					</button>
					<button
						disabled={submitting || selected.length === 0}
						onClick={handleSubmit}
						className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
					>
						{submitting ? "Saving..." : "Save"}
					</button>
				</div>
			</div>
		</div>
	);
}
