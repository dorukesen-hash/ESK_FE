'use client'
import api from "@/hooks/Api";
import {successNote, errorNote} from "@/utils/ToastNotify";
import {useState} from "react";

export default function OrderStatusModal({isOpen, onClose, orderId, refetchOrders}) {
	const [selectedStatus, setSelectedStatus] = useState("");
	const [isSaving, setIsSaving] = useState(false);

	const handleSave = async () => {
		try {
			if (!selectedStatus) return;
			setIsSaving(true);
			const res = await api.post(`/admin/orders/status/`, {orderId, orderStatusId: selectedStatus})
			if (res.status === 200) {
				setIsSaving(false);
				refetchOrders();
				successNote("Status updated successfully!")
				onClose();
			}
		} catch (error) {
			console.log(error)
			errorNote('Error: status change')
		} finally {
			setIsSaving(false)
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
			<div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
				<h2 className="text-lg font-semibold mb-4">Please select order status</h2>

				<select
					value={selectedStatus}
					onChange={(e) => setSelectedStatus(e.target.value)}
					className="w-full border rounded-md p-2 text-sm mb-4"
				>
					<option value="">Select status...</option>
					<option value="1">New</option>
					<option value="2">In Progress</option>
					<option value="3">Completed</option>
					<option value="4">On Hold</option>
					<option value="5">Cancelled</option>
					<option value="6">Refunded</option>
				</select>

				<div className="flex justify-end gap-2 mt-4">
					<button
						onClick={onClose}
						className="cursor-pointer px-4 py-2 text-sm border rounded-md text-gray-600 hover:bg-gray-100"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						disabled={!selectedStatus || isSaving}
						className={`px-4 py-2 text-sm text-white rounded-md cursor-pointer ${
							!selectedStatus || isSaving
								? "bg-gray-400 cursor-not-allowed"
								: "bg-blue-600 hover:bg-blue-700"
						}`}
					>
						{isSaving ? "Saving..." : "Save"}
					</button>
				</div>
			</div>
		</div>
	);
}
