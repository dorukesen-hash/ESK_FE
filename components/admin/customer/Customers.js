'use client'
import React from 'react'
import {useState, useEffect} from 'react';
import api from '@/hooks/Api';

const Customers = () => {

	const [customers, setCustomers] = useState([]); // State to store customers
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1); // State for pagination
	const [totalCount, setTotalCount] = useState(0); // Toplam kayıt sayısı
	const [openMenuId, setOpenMenuId] = useState(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Düzenleme modal'ı için
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Silme modal'ı için
	const customerPerPage = 10; // Number of customers per page

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const response = await api.get(`/admin/customers?page=${currentPage - 1}&limit=${customerPerPage}&globalFilter=${encodeURIComponent(searchQuery)}`);
				setCustomers(response.data.rows); // Set the fetched data to state
				setTotalCount(response.data.count);
			} catch (error) {
				console.error('Error fetching customers:', error);
			}
		};

		fetchCustomers();
	}, [currentPage, searchQuery]);

	const refreshCustomers = async () => {
		try {
			const response = await api.get(`/admin/customers?page=${currentPage - 1}&limit=${customerPerPage}&globalFilter=${encodeURIComponent(searchQuery)}`);
			setCustomers(response.data.rows);
			setTotalCount(response.data.count);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleSearch = async () => {
		try {
			const res = await api.get(`/admin/customers?page=${currentPage - 1}&limit=${customerPerPage}&globalFilter=${encodeURIComponent(searchQuery)}`);
			setCustomers(res.data.rows); // veya fetch sonrası mevcut listeyi güncelle
			setTotalCount(response.data.count);
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


	return (
		<div className="p-8 bg-gray-100 min-h-screen">
			{/* Search */}
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

			{/* Table */}
			<div className="overflow-visible bg-white rounded-lg shadow">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Name
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Email
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Address
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Phone
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							City
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							State
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Zip
						</th>
					</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
					{customers.map((customer) => (
						<tr key={customer.id}>
							{/* Actions Sütunu */}
							<td className="px-6 py-4 whitespace-nowrap relative">
								<button
									onClick={() => toggleMenu(customer.id)}
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
								{openMenuId === customer.id && (
									<div className="absolute left-5 mt-1 w-48 bg-white rounded-lg shadow-lg z-[9999]">
										<button
											onClick={() => {
												setSelectedCustomer(customer);
												setIsEditModalOpen(true);
												setOpenMenuId(null);
											}}
											className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Update
										</button>
										<button
											onClick={() => {
												setSelectedCustomer(customer);
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
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{customer?.name + " " + customer?.surname}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{customer?.email}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{customer?.address}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{customer?.phone}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{customer?.city}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{customer?.state}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{customer?.zip}
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="mt-6 flex justify-center">
				{Array.from({length: Math.ceil(totalCount / customerPerPage)}, (_, i) => (
					<button
						key={i + 1}
						onClick={() => handlePageChange(i + 1)}
						className={`mx-1 px-4 py-2 rounded-lg ${
							currentPage === i + 1
								? 'bg-blue-500 text-white'
								: 'bg-white text-gray-700 hover:bg-gray-100'
						}`}
					>
						{i + 1}
					</button>
				))}
			</div>
		</div>
	)
}

export default Customers