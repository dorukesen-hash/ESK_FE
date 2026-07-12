"use client";
import {useEffect, useState, useRef} from "react";
import api from "@/hooks/Api";
import Image from "next/image";
import OrderDetailsDrawer from "./alt-components/OrderDetailsDrawer";
import StatusChangeModal from "./alt-components/StatusChangeModal";
import CompleteOrderModal from "./alt-components/CompleteOrderModal";

const statuses = [
	"All",
	"New",
	"In Progress",
	"Completed",
	"On Hold",
	"Cancelled",
	"Refunded",
];
const searchOptions = ["Recipient Name", "Order Number"];
const LIMIT = 10;

export default function OrdersPage() {
	const [orders, setOrders] = useState([]);
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [searchType, setSearchType] = useState("Recipient Name");
	const [searchValue, setSearchValue] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [openDetail, setOpenDetail] = useState(false);
	const [selectedOrderId, setSelectedOrderId] = useState();
	const [statusModalOpen, setStatusModalOpen] = useState(false);
	const [completeModalOpen, setCompleteModalOpen] = useState(false);

	useEffect(() => {
		fetchOrders(page);
	}, [selectedStatus]);

	const fetchOrders = async (pageNumber) => {
		let url = `admin/orders?page=${
			pageNumber - 1
		}&limit=${LIMIT}&searchType=${searchType
			.toLowerCase()
			.replace(" ", "")}&searchValue=${searchValue}`;
		if (selectedStatus !== "All") {
			url += `&status=${selectedStatus}`;
		}
		try {
			const {data} = await api.get(url);
			setOrders(data.rows);
			setTotalPages(data.count);
			setPage(pageNumber);
		} catch (error) {
			console.error("Failed to fetch orders", error);
		}
	};

	const handleSearch = async () => {
		let url = `admin/orders?page=${
			page - 1
		}&limit=${LIMIT}&searchType=${searchType
			.toLowerCase()
			.replace(" ", "")}&searchValue=${searchValue}`;
		if (selectedStatus !== "All") {
			url += `&status=${selectedStatus}`;
		}
		try {
			const {data} = await api.get(url);
			setOrders(data.rows);
			setTotalPages(data.count);
			setPage(1);
		} catch (error) {
			console.error("Search failed", error);
		}
	};

	const showStatusColor = (id) => {
		if (id === 1) {
			return "bg-blue-400";
		} else if (id === 2) {
			return "bg-orange-400";
		} else if (id === 3) {
			return "bg-green-400";
		} else if (id === 4) {
			return "bg-purple-400";
		} else if (id === 5) {
			return "bg-red-400";
		} else if (id === 6) {
			return "bg-yellow-400";
		}
	};

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			fetchOrders(newPage);
		}
	};

	const handleReset = async () => {
		setSearchValue("");
		setPage(1);
		setSearchType("Recipient Name");
		setSelectedStatus("All");
		let url = `admin/orders?page=${
			page - 1
		}&limit=${LIMIT}&searchType=recipientname&searchValue=`;
		if (selectedStatus !== "All") {
			url += `&status=${selectedStatus}`;
		}
		try {
			const {data} = await api.get(url);
			setOrders(data.rows);
			setTotalPages(data.count);
			setPage(1);
		} catch (error) {
			console.error("Search failed", error);
		}
	};

	return (
		<div className="p-4">
			{/* Filters */}
			<div className="flex flex-wrap gap-4 mb-4 items-center">
				<select
					value={selectedStatus}
					onChange={(e) => setSelectedStatus(e.target.value)}
					className="border p-2 rounded-md"
				>
					{statuses.map((status) => (
						<option key={status} value={status}>
							{status}
						</option>
					))}
				</select>

				<select
					value={searchType}
					onChange={(e) => setSearchType(e.target.value)}
					className="border p-2 rounded-md"
				>
					{searchOptions.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>

				<input
					type="text"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder="Search..."
					className="border p-2 rounded-md"
					onKeyDown={(e) => e.key === "Enter" && handleSearch()}
				/>
				<button
					onClick={handleSearch}
					className="bg-blue-900 text-white px-4 py-2 rounded-md cursor-pointer"
				>
					Search
				</button>
				<button
					onClick={handleReset}
					className="bg-green-800 text-white px-4 py-2 rounded-md cursor-pointer"
				>
					Reset
				</button>
			</div>

			{/* Orders Table */}
			<div className="overflow-visible bg-white rounded-lg shadow">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-200">
					<tr>
						{[
							"Actions",
							"Order No",
							"Status",
							"Address",
							"Items",
							"Price",
							"Admin Message",
						].map((heading) => (
							<th
								key={heading}
								className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase border-b"
							>
								{heading}
							</th>
						))}
					</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200 text-md">
					{orders &&
						orders.length > 0 &&
						orders?.map((order) => (
							<tr key={order.id}>
								<td className="px-6 py-4 border-b whitespace-nowrap relative">
									<ActionsMenu
										orderstatus={order?.orderstatus?.id}
										setOpenDetail={setOpenDetail}
										setStatusModalOpen={setStatusModalOpen}
										orderId={order.id}
										setSelectedOrderId={setSelectedOrderId}
										setCompleteModalOpen={setCompleteModalOpen}
									/>
								</td>
								<td className="px-6 py-4 border-b whitespace-nowrap">
									<b className="text-gray-700">#{order?.orderNumber}</b>{" "}
								</td>
								<td className="px-6 py-4 border-b whitespace-nowrap text-sm text-gray-900">
                    <span
	                    className={`text-white p-2 ${showStatusColor(order?.orderstatus?.id)} w-3.5 h-2 rounded-2xl`}
                    >
                      {order?.orderstatus?.name}
                    </span>{" "}
								</td>
								<td className="px-6 py-4 border-b whitespace-nowrap text-sm">
									<div className="my-2">
										<p>
											<b className="text-gray-700">{order?.name}</b>
										</p>
										<p>{order?.firstline}</p>
										<p>{order?.secondline || " - "}</p>
										<p>
											{order?.city || " - "}
											{" / "}
											{order?.state || " - "}
											{" / "}
											{order?.zip || " - "}
										</p>
										<p>
											{order?.email || " - "}
											{" / "}
											{order?.phone || " - "}
										</p>
									</div>
								</td>
								<td className="px-6 py-4 border-b align-top">
									<div className="flex flex-col gap-4">
										{order?.orderitems?.map((item) => (
											<div key={item.id} className="flex gap-3">
												<div className="w-16 h-16 flex-shrink-0 border-2 rounded-md">
													<Image
														width={50}
														height={50}
														src={`https://cdn.enesdorukesen.com.tr/${item.imgurl}`}
														alt={item.title}
														className="w-full h-full object-cover rounded-md border"
													/>
												</div>
												<div
													className="flex flex-col text-sm text-gray-700 w-full overflow-hidden">
													<ul className="list-disc list-inside space-y-1">
														<li>
                                <span className="font-semibold">
                                  Code / Title:
                                </span>{" "}
															{item.code} / {item.title}
														</li>
														<li className="break-words">
															<span className="font-semibold">Variant:</span>{" "}
															{item.variant}
														</li>
														<li>
															<span className="font-semibold">Quantity:</span>{" "}
															{item.quantity}
														</li>
														<li>
															<span className="font-semibold">Price:</span> $
															{item.price}
														</li>
													</ul>
												</div>
											</div>
										))}
									</div>
								</td>
								<td className="px-6 py-4 border-b whitespace-nowrap">
									<b className="text-gray-700">${order.price}</b>
								</td>
								<td className="px-6 py-4 border-b whitespace-nowrap text-sm">
									{order?.extra_informations?.adminNote || " - "}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-center mt-4 space-x-2">
				<button
					onClick={() => handlePageChange(page - 1)}
					disabled={page === 1}
					className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 disabled:opacity-50"
				>
					Previous
				</button>
				<span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
				<button
					onClick={() => handlePageChange(page + 1)}
					disabled={page === totalPages}
					className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 disabled:opacity-50"
				>
					Next
				</button>
			</div>
			{openDetail && (
				<OrderDetailsDrawer
					refreshOrder={handleSearch}
					isOpen={openDetail}
					onClose={() => setOpenDetail(false)}
					orderId={selectedOrderId}
				/>
			)}

			{statusModalOpen && (
				<StatusChangeModal
					isOpen={statusModalOpen}
					onClose={() => setStatusModalOpen(false)}
					orderId={selectedOrderId}
					refetchOrders={handleSearch}
				/>
			)}
			{completeModalOpen && (
				<CompleteOrderModal
					isOpen={completeModalOpen}
					onClose={() => setCompleteModalOpen(false)}
					orderId={selectedOrderId}
					refetchOrders={handleSearch}
				/>
			)}
		</div>
	);
}


//! ACTION MENU

function ActionsMenu({
	                     orderId,
	                     setSelectedOrderId,
	                     setOpenDetail,
	                     setStatusModalOpen,
	                     orderstatus,
	                     setCompleteModalOpen
                     }) {
	const [openMenuId, setOpenMenuId] = useState(null);

	const menuRef = useRef();

	const toggleMenu = (id) => {
		setOpenMenuId((prev) => (prev === id ? null : id));
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setOpenMenuId(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div ref={menuRef}>
			<button
				onClick={() => toggleMenu(orderId)}
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
						d="M12 5v.01M12 12v.01M12 19v.01"
					/>
				</svg>
			</button>

			{openMenuId === orderId && (
				<div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-[9999]">
					<button
						className="cursor-pointer block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						onClick={() => {
							setOpenDetail(true);
							setSelectedOrderId(orderId);
							setOpenMenuId(null);
						}}
					>
						Order Details
					</button>
					<button
						className="cursor-pointer block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						onClick={() => {
							setStatusModalOpen(true)
							setSelectedOrderId(orderId);
							setOpenMenuId(null);
						}}
					>
						Change Status
					</button>
					<button disabled={parseInt(orderstatus) !== 2}
					        className="cursor-pointer block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					        onClick={() => {
						        setCompleteModalOpen(true);
						        setSelectedOrderId(orderId);
						        setOpenMenuId(null);
					        }}
					>
						Complete Order
					</button>
					<button className="cursor-pointer block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
						Generate Invoice
					</button>
					<button disabled={parseInt(orderstatus) !== 3}
					        className="cursor-pointer block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
						Repeat Order
					</button>
				</div>
			)}
		</div>
	);
}
