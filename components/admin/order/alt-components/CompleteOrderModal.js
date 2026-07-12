import api from "@/hooks/Api";
import {errorNote, successNote} from "@/utils/ToastNotify";
import {useEffect, useState} from "react";


export default function CompleteOrderModal({isOpen, onClose, orderId, refetchOrders}) {
	const [carriers, setCarriers] = useState([]);
	const [selectedCarrierId, setSelectedCarrierId] = useState("");
	const [trackingNumber, setTrackingNumber] = useState("");
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (!isOpen) return;

		const fetchCarriers = async () => {
			try {
				const response = await api.get("/carriers");
				setCarriers(response.data);
			} catch (error) {
				console.error("Failed to fetch carriers:", error);
			}
		};

		fetchCarriers();
	}, [isOpen]);

	const handleSubmit = async () => {
		if (!selectedCarrierId || !trackingNumber) return;

		setIsSaving(true);
		const updatedData = {
			orderId: orderId,
			carrierId: selectedCarrierId,
			trackingNumber: trackingNumber
		};

		try {
			const res = await api.post(`/admin/orders/complete/`, updatedData)
			if (res.status === 200) {
				setIsSaving(false);
				refetchOrders();
				successNote("Order fulfilled successfully!")
				onClose();
			}
		} catch (error) {
			console.log(error)
			errorNote('Error: order fulfillment.')
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
				<h2 className="text-xl font-semibold mb-4">Complete Order</h2>

				<p className="text-sm text-gray-600 mb-4">
					Please select a shipping carrier and enter the tracking number to complete the order.
					<b>The shipment will be automatically created</b> and the order will be <b>marked as completed.</b>
				</p>

				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Shipping Carrier</label>
					<select
						value={selectedCarrierId}
						onChange={(e) => setSelectedCarrierId(e.target.value)}
						className="w-full border border-gray-300 rounded-md p-2 text-sm"
					>
						<option value="">Select carrier...</option>
						{carriers.map((carrier) => (
							<option key={carrier.id} value={carrier.id}>
								{carrier.name}
							</option>
						))}
					</select>
				</div>

				<div className="mb-6">
					<label className="block text-sm font-medium mb-1">Tracking Number</label>
					<input
						type="text"
						value={trackingNumber}
						onChange={(e) => setTrackingNumber(e.target.value)}
						className="w-full border border-gray-300 rounded-md p-2 text-sm"
						placeholder="e.g. 1234567890"
					/>
				</div>

				<div className="flex justify-end gap-2">
					<button
						onClick={onClose}
						className="cursor-pointer px-4 py-2 border text-sm rounded-md text-gray-700 hover:bg-gray-100"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						disabled={!selectedCarrierId || !trackingNumber || isSaving}
						className={`cursor-pointer px-4 py-2 text-sm text-white rounded-md ${
							!selectedCarrierId || !trackingNumber || isSaving
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
