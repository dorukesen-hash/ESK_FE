'use client'
import {errorNote} from '@/utils/ToastNotify';
import React, {useEffect, useRef, useState} from 'react'
import ShipmentDetailsDrawer from './alt-components/ShipmentDetailsDrawer';
import api from '@/hooks/Api';

const searchOptions = ["Name", "Tracking Number"];
const LIMIT = 10;

export default function Shipment() {
	const [shipment, setShipment] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchType, setSearchType] = useState("Name");
	const [searchValue, setSearchValue] = useState("");
	const [openDetail, setOpenDetail] = useState(false);
	const [selectedShipmentId, setSelectedShipmentId] = useState();

	useEffect(() => {
		fetchShipment(page);
	}, []);

	const fetchShipment = async (pageNumber) => {
		let url = `admin/shipment?page=${
			pageNumber - 1
		}&limit=${LIMIT}&searchType=${searchType
			.toLowerCase()
			.replace(" ", "")}&searchValue=${searchValue}`;

		try {
			const {data} = await api.get(url);
			setShipment(data.rows);
			setTotalPages(data.count);
			setPage(pageNumber);
		} catch (error) {
			console.error("Failed to fetch shipment", error);
			errorNote("Failed to fetch shipment")
		}
	};

	const handleSearch = async () => {
		let url = `admin/shipment?page=${
			page - 1
		}&limit=${LIMIT}&searchType=${searchType
			.toLowerCase()
			.replace(" ", "")}&searchValue=${searchValue}`;

		try {
			const {data} = await api.get(url);
			setShipment(data.rows);
			setTotalPages(data.count);
			setPage(1);
		} catch (error) {
			console.error("Search failed", error);
			errorNote("Search failed")
		}
	};

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			fetchShipment(newPage);
		}
	};

	const handleReset = async () => {
		setSearchValue("");
		setPage(1);
		setSearchType("Name");

		let url = `admin/shipment?page=${
			page - 1
		}&limit=${LIMIT}&searchType=name&searchValue=`;

		try {
			const {data} = await api.get(url);
			setShipment(data.rows);
			setTotalPages(data.count);
			setPage(1);
		} catch (error) {
			console.error("Search failed", error);
		}
	};

	const getTrackingLink = (carrierName, trackingNumber) => {
		if (!carrierName || !trackingNumber) return null;
		const lower = carrierName.toLowerCase();

		if (lower.includes("fedex")) return `https://www.fedex.com/fedextrack/?tracknumbers=${trackingNumber}`;
		if (lower.includes("dhl")) return `https://www.dhl.com/global-en/home/tracking.html?tracking-id=${trackingNumber}`;
		if (lower.includes("ups")) return `https://www.ups.com/track?tracknum=${trackingNumber}`;
		if (lower.includes("usps")) return `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${trackingNumber}`;

		return null;
	};


	return (
		<div className="p-4">
			{/* Filters */}
			<div className="flex flex-wrap gap-4 mb-4 items-center">
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

			{/* Shipment Table */}
			<div className="overflow-visible bg-white rounded-lg shadow">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-200">
					<tr>
						{[
							"Actions",
							"Carrier",
							"Name",
							"Tracking Number",
							"Address",
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
					{shipment &&
						shipment.length > 0 &&
						shipment?.map((ship) => (
							<tr key={ship.id}>
								<td className="px-6 py-4 border-b whitespace-nowrap relative">
									<ActionsMenu
										setOpenDetail={setOpenDetail}
										shipmentId={ship.id}
										setSelectedShipmentId={setSelectedShipmentId}
									/>
								</td>
								<td className="px-6 py-4 border-b whitespace-nowrap">
									<b className="text-gray-700">{ship?.carrier?.name}</b>{" "}
								</td>
								<td className="px-6 py-4 border-b whitespace-nowrap text-sm text-gray-900">
									{ship?.name}
								</td>
								<td className="px-6 py-4 border-b whitespace-nowrap text-sm text-gray-900">
									<a target='_blank' className='cursor-pointer text-blue-800'
									   href={getTrackingLink(ship?.carrier?.name, ship?.tracking)}><u>{ship?.tracking}</u></a>
								</td>
								<td className="px-6 py-4 border-b whitespace-nowrap text-sm">
									<div className="my-2">
										<p>{ship?.firstline}</p>
										<p>{ship?.secondline || " - "}</p>
										<p>
											{ship?.city || " - "}
											{" / "}
											{ship?.state || " - "}
											{" / "}
											{ship?.zip || " - "}
										</p>
										<p>
											{ship?.email || " - "}
											{" / "}
											{ship?.phone || " - "}
										</p>
									</div>
								</td>
								<td className="px-6 py-4 border-b whitespace-nowrap text-sm">
									{ship?.extra_informations?.adminNote || " - "}
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
				<ShipmentDetailsDrawer
					refreshShipment={handleSearch}
					isOpen={openDetail}
					onClose={() => setOpenDetail(false)}
					shipmentId={selectedShipmentId}
				/>
			)}

		</div>
	)
}

//! ACTION MENU

function ActionsMenu({shipmentId, setSelectedShipmentId, setOpenDetail}) {
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
				onClick={() => toggleMenu(shipmentId)}
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

			{openMenuId === shipmentId && (
				<div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-[9999]">
					<button
						className="cursor-pointer block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						onClick={() => {
							setOpenDetail(true);
							setSelectedShipmentId(shipmentId);
							setOpenMenuId(null);
						}}
					>
						Shipment Details
					</button>
				</div>
			)}
		</div>
	);
}

