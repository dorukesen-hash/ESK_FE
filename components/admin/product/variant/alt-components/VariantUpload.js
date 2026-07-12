import api from '@/hooks/Api';
import {errorNote, successNote} from '@/utils/ToastNotify';
import axios from 'axios';
import {useEffect, useState} from 'react';

export default function VariantUpload({refreshTable, setOpenExcelModal}) {
	const [file, setFile] = useState(null);
	const [isUploading, setIsUploading] = useState(false);

	const [hierarchyType, setHierarchyType] = useState('');
	const [selectedItemId, setSelectedItemId] = useState('');
	const [options, setOptions] = useState([]);

	const handleFileChange = (e) => {
		const uploaded = e.target.files?.[0];
		if (uploaded) setFile(uploaded);
	};

	const API_URL = process.env.NEXT_PUBLIC_API_URL

	// Hierarchy seçildiğinde ilgili listeyi API'den çekiyoruz
	useEffect(() => {
		const fetchOptions = async () => {
			if (!hierarchyType) return;
			try {
				const response = await api.get(`/variant/drop/${hierarchyType}`);
				setOptions(response.data); // burada response.data bir liste olmalı
			} catch (error) {
				console.error(error);
				errorNote('Failed to fetch options');
			}
		};
		fetchOptions();
		setSelectedItemId(''); // üst seçim değişince alt seçimi sıfırlıyoruz
	}, [hierarchyType]);

	const handleUpload = async () => {
		if (!file || !hierarchyType || !selectedItemId) return;
		setIsUploading(true);

		const formData = new FormData();
		formData.append('file', file);

		await axios({
			method: 'post',
			url: `${API_URL}/admin/variant-upload`,
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
				'Hierarchy_Type': hierarchyType,  // üst seçimi header'a koyduk
				'Hierarchy_Id': selectedItemId,    // alt seçimi header'a koyduk
			}
		}).then((result) => {
			if (result.status === 200) {
				setOpenExcelModal(false);
				successNote('Variants uploaded!');
				refreshTable();
			} else {
				errorNote('Error uploading');
				setIsUploading(false);
			}
		}).catch(() => {
			errorNote('Error uploading');
			setIsUploading(false);
		}).finally(() => setIsUploading(false));
	};

	const excelFilePath = `/variants.xlsx`;
	const handleDownload = (url) => {
		fetch(url)
			.then((response) => response.blob())
			.then((blob) => {
				const blobURL = window.URL.createObjectURL(new Blob([blob]));
				const fileName = url.split("/").pop();
				const aTag = document.createElement("a");
				aTag.href = blobURL;
				aTag.setAttribute("download", fileName);
				document.body.appendChild(aTag);
				aTag.click();
				aTag.remove();
			});
	};

	const isSaveEnabled = file && hierarchyType && selectedItemId;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
			<div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6">
				<h2 className="text-lg font-semibold mb-4">Upload Variant Excel</h2>
				<ol className="list-decimal pl-5 mb-6 text-gray-700 text-sm">
					<li>Download the Excel template</li>
					<li>Fill in the downloaded Excel</li>
					<li>Select the hierarchy you want to add variants into and upload your file</li>
				</ol>

				<div className="flex gap-4 mb-6">
					<button
						onClick={() => handleDownload(excelFilePath)}
						className="bg-blue-900 text-white px-4 py-2 rounded cursor-pointer"
					>
						Download Template
					</button>

					<label
						className="bg-blue-100 text-blue-900 border border-blue-900 rounded px-4 py-2 cursor-pointer">
						Upload Excel
						<input
							type="file"
							accept=".xlsx"
							onChange={handleFileChange}
							className="hidden"
						/>
					</label>
				</div>

				{/* Hierarchy Type Seçimi */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">Hierarchy Type</label>
					<select
						value={hierarchyType}
						onChange={(e) => setHierarchyType(e.target.value)}
						className="w-full border rounded p-2"
					>
						<option value="">Select Hierarchy</option>
						<option value="category">Category</option>
						<option value="subcategory">Subcategory</option>
						<option value="product">Product</option>
					</select>
				</div>

				{/* Seçilen Hierarchy'ye Bağlı Alt Seçenekler */}
				{hierarchyType && (
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Select {hierarchyType.charAt(0).toUpperCase() + hierarchyType.slice(1)}
						</label>
						<select
							value={selectedItemId}
							onChange={(e) => setSelectedItemId(e.target.value)}
							className="w-full border rounded p-2"
						>
							<option value="">Select</option>
							{options.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</select>
					</div>
				)}

				{file && (
					<div
						className="border-2 border-dashed border-blue-300 p-4 rounded mb-4 text-center text-sm text-gray-600">
						{file.name}
					</div>
				)}

				<div className="flex justify-end gap-2">
					<button
						className="bg-gray-300 text-gray-800 px-4 py-2 rounded cursor-pointer"
						onClick={() => setOpenExcelModal(false)}
					>
						Cancel
					</button>

					<button
						className={`px-4 py-2 rounded text-white cursor-pointer ${
							isSaveEnabled ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
						}`}
						onClick={handleUpload}
						disabled={!isSaveEnabled || isUploading}
					>
						{isUploading ? 'Uploading...' : 'Save'}
					</button>
				</div>
			</div>
		</div>
	);
}
