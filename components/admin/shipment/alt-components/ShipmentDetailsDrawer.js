'use client'
import React, {useEffect, useState} from 'react'
import api from '@/hooks/Api'
import {errorNote, successNote} from '@/utils/ToastNotify'
import Image from 'next/image'
import FedEx from "../../../../assets/FedEx.png"
import DHL from "../../../../assets/DHL.png";
import UPS from "../../../../assets/UPS.png";
import USPS from "../../../../assets/USPS.png";


export default function ShipmentDetailsDrawer({isOpen, onClose, shipmentId, refreshShipment}) {
	const [shipment, setShipment] = useState(null)
	const [trackingNumber, setTrackingNumber] = useState('')
	const [adminNote, setAdminNote] = useState("");
	const [loading, setLoading] = useState(false)

	const getCarrierLogo = (name) => {
		if (!name) return null;
		const lower = name.toLowerCase();
		if (lower.includes("fedex")) return FedEx;
		if (lower.includes("dhl")) return DHL;
		if (lower.includes("ups")) return UPS;
		if (lower.includes("usps")) return USPS;
		return null;
	};

	useEffect(() => {
		if (!isOpen || !shipmentId) return
		setLoading(true)
		api.get(`admin/shipment/${shipmentId}`)
			.then((shipmentRes) => {
				setShipment(shipmentRes.data)
				setTrackingNumber(shipmentRes.data.tracking)
				setAdminNote(shipmentRes.data?.extra_informations ? shipmentRes.data.extra_informations?.adminNote : "")
			})
			.catch(err => {
				console.error('Failed to load shipment details', err)
				errorNote('Failed to load shipment details')
			})
			.finally(() => setLoading(false))
	}, [isOpen, shipmentId])

	const handleSave = async () => {
		try {
			await api.put(`admin/shipment/${shipmentId}`, {tracking: trackingNumber, adminNote})
			successNote('Tracking number updated')
			refreshShipment()
			onClose()
		} catch (err) {
			console.error('Failed to update tracking number', err)
			errorNote('Failed to update tracking number')
		}
	}

	if (!isOpen) return null


	return (
		<div className="fixed inset-0 z-50 flex">
			<div
				className="absolute inset-0 bg-black bg-opacity-50"
				onClick={onClose}
			/>
			<div className="relative ml-auto w-full max-w-md h-full bg-white shadow-xl flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b">
					<h2 className="text-lg font-semibold text-gray-800">Shipment Details</h2>
					<button onClick={onClose} className="text-gray-600 hover:text-gray-800">
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
							      d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</button>
				</div>

				{/* Content */}
				<div className="p-4 flex-1 overflow-auto">
					{loading ? (
						<p className="text-center text-gray-500">Loading...</p>
					) : shipment ? (
						<>
							{/* Carrier Logo */}
							{shipment && (
								<div className="flex justify-center mb-4">
									<Image
										width={200}
										height={200}
										src={getCarrierLogo(shipment?.carrier?.name)}
										alt={shipment?.carrier?.name}
										className="h-32 w-32 object-contain"
									/>
								</div>
							)}

							{/* Shipment Info */}
							<div className="space-y-2 mb-4">
								<p className="text-sm text-gray-900"><span
									className=" font-bold">Name:</span> {shipment.name}</p>
								<div className="text-sm text-gray-900  mt-4">
									<p><span className="font-bold">Address:</span></p>
									<p className="pl-2">{shipment.firstline}</p>
									{shipment.secondline && <p className="pl-2">{shipment.secondline}</p>}
									<p className="pl-2">{shipment.city} / {shipment.state} / {shipment.zip}</p>
									<p className="pl-2">{shipment.email} / {shipment.phone}</p>
								</div>
							</div>

							{/* Tracking Number Editor */}
							<div className="mb-4">
								<label className="block text-sm font-bold text-gray-900 my-3" htmlFor="tracking">
									Tracking Number
								</label>
								<input
									id="tracking"
									type="text"
									value={trackingNumber}
									onChange={(e) => setTrackingNumber(e.target.value)}
									className="w-full border border-gray-300 rounded-md p-2 text-sm"
								/>
							</div>
							<div>
								<label className="block text-sm text-gray-600 mb-1">Admin Note</label>
								<textarea
									rows={4}
									value={adminNote}
									onChange={(e) => setAdminNote(e.target.value)}
									className="w-full border border-gray-300 rounded-md p-2 text-sm"
								/>
							</div>
						</>
					) : (
						<p className="text-center text-gray-500">No data available.</p>
					)}
				</div>

				{/* Actions */}
				<div className="flex justify-end items-center p-4 border-t space-x-2">
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
						disabled={loading}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	)
}
