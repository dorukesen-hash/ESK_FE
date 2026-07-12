'use client'
import api from "@/hooks/Api";
import {errorNote, successNote} from "@/utils/ToastNotify";
import Image from "next/image";
import {useEffect, useState} from "react";

export default function OrderDetailsDrawer({isOpen, onClose, orderId, refreshOrder}) {
	const [orderNumber, setOrderNumber] = useState("");
	const [orderDate, setOrderDate] = useState("");
	const [shippingAddress, setShippingAddress] = useState({
		id: 0, firstLine: "", secondLine: "", city: "", state: "", zip: "", phone: "", email: ""
	});
	const [billingAddress, setBillingAddress] = useState({
		id: 0, firstLine: "", secondLine: "", city: "", state: "", zip: "", phone: "", email: ""
	});
	const [adminNote, setAdminNote] = useState("");
	const [orderItems, setOrderItems] = useState([]);
	const [vatAmount, setVatAmount] = useState(0);
	const [subtotal, setSubtotal] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (!isOpen) return;

		const fecthOrder = async () => {
			try {
				const response = await api.get(`/admin/orders/${orderId}`)

				const data = response.data;
				setOrderNumber(data?.orderNumber);
				setOrderDate(data?.createdAt);
				setShippingAddress({
					id: data?.id || 0,
					name: data?.name || "",
					firstline: data?.firstline || "",
					secondline: data?.secondline || "",
					city: data?.city || "",
					state: data?.state || "",
					zip: data?.zip || "",
					phone: data?.phone || "",
					email: data?.email || ""
				});
				setBillingAddress({
					id: data?.id || 0,
					name: data?.name || "",
					firstline: data?.firstline || "",
					secondline: data?.secondline || "",
					city: data?.city || "",
					state: data?.state || "",
					zip: data?.zip || "",
					phone: data?.phone || "",
					email: data?.email || ""
				});
				setAdminNote(data?.extra_informations?.adminNote || "")
				setVatAmount(data?.extra_informations?.vatAmount || 0)
				setSubtotal(data.orderitems.reduce((main, acc) => main + parseFloat(acc.price * acc.quantity), 0))
				setTotalAmount(data?.price);
				setOrderItems(data?.orderitems)
			} catch (error) {
				console.log(error)
				errorNote("Error fetching order details")
			}
		}
		fecthOrder()
	}, [isOpen, orderId]);

	const showDate = (date) => {
		const utcTime = new Date(date);
		const formattedOutput = `Order Date: ${utcTime.toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})}`;
		return formattedOutput;
	}

	const handleSave = async () => {
		try {
			setIsSaving(true);
			const updatedData = {
				shippingAddress,
				billingAddress,
				adminNote,
			};
			const res = await api.put(`/admin/orders/${orderId}`, updatedData)
			if (res.status === 200) {
				setIsSaving(false);
				refreshOrder();
				successNote("Order updated sucessfully!")
				onClose();
			}
		} catch (error) {
			console.log(error)
			errorNote('Error: updating order detail')
		}


	};

	const handleAddressChange = (type, field, value) => {
		if (type === "shipping") {
			setShippingAddress(prev => ({...prev, [field]: value}));
		} else {
			setBillingAddress(prev => ({...prev, [field]: value}));
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end h-screen">
			<div className="bg-white w-1/2 h-full overflow-y-auto p-6 flex flex-col gap-6 relative">
				<div className="flex justify-end items-center pb-4">
					{/* X Close Button */}
					<button
						onClick={onClose}
						className="absolute top-4 right-4 text-gray-500 hover:text-black"
					>
						<b className=" border rounded-xl p-2 text-red cursor-pointer">x</b>
					</button>
				</div>
				{/* Header */}
				<div className="flex justify-between items-center border-b pb-4">
					<div className="text-lg font-semibold">Order No: #{orderNumber}</div>
					<div className="text-lg font-semibold">{showDate(orderDate)}</div>
				</div>

				{/* Shipping & Billing Address */}
				<div className="flex gap-4">
					{/* Shipping */}
					<div className="w-1/2 flex flex-col gap-2">
						<h3 className="font-semibold mb-2">Shipping Address</h3>
						{[
							"name",
							"firstline",
							"secondline",
							"city",
							"state",
							"zip",
							"phone",
							"email",
						].map((field) => (
							<input
								key={field}
								type="text"
								value={shippingAddress[field]}
								onChange={(e) =>
									handleAddressChange("shipping", field, e.target.value)
								}
								placeholder={field}
								className="border p-2 rounded-md text-xs"
							/>
						))}
					</div>

					{/* Billing */}
					<div className="w-1/2 flex flex-col gap-2">
						<h3 className="font-semibold mb-2">Billing Address</h3>
						{[
							"name",
							"firstline",
							"secondline",
							"city",
							"state",
							"zip",
							"phone",
							"email",
						].map((field) => (
							<input
								key={field}
								type="text"
								value={billingAddress[field]}
								onChange={(e) =>
									handleAddressChange("billing", field, e.target.value)
								}
								placeholder={field}
								className="border p-2 rounded-md text-xs"
							/>
						))}
					</div>
				</div>

				{/* Admin Note */}
				<textarea
					value={adminNote}
					onChange={(e) => setAdminNote(e.target.value)}
					className="w-full p-3 border rounded-md resize-none text-sm"
					rows={4}
					placeholder="Admin Note"
				/>

				{/* Order Items */}
				<div className="w-full flex flex-col gap-4">
					{orderItems.map((item) => (
						<div
							key={item.id}
							className="flex items-center gap-4 border-b pb-3"
						>
							<Image
								width={200}
								height={200}
								src={`https://cdn.enesdorukesen.com.tr/${item.imgurl}`}
								alt={item.title}
								className="w-16 h-16 object-cover rounded-md border"
							/>
							<div className="flex flex-col flex-1 text-sm">
								<div className="font-semibold truncate max-w-[400px]">
									{item.variant.length > 40
										? `${item.variant.slice(0, 40)}...`
										: item.variant}
								</div>
								<div className="text-gray-500">Quantity: {item.quantity}</div>
							</div>
							<div className="flex flex-col text-right text-sm">
								<div>${parseFloat(item.price).toFixed(2)}</div>
								<div className="text-gray-500">
									${(item.price * item.quantity).toFixed(2)}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* VAT & Total */}
				<div className="flex flex-col gap-2 mt-4 text-sm">
					<div className="flex justify-between">
						<span>VAT ({vatAmount}%)</span>
						<span>${(totalAmount - subtotal).toFixed(2)}</span>
					</div>
					<div className="flex justify-between font-semibold text-lg border-t pt-2">
						<span>TOTAL</span>
						<span>${parseFloat(totalAmount).toFixed(2)}</span>
					</div>
				</div>

				{/* Buttons */}
				<div className="flex justify-end gap-2 mt-6">
					<button
						onClick={onClose}
						className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer "
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className={`px-4 py-2 rounded-md text-white cursor-pointer ${
							isSaving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
						}`}
						disabled={isSaving}
					>
						{isSaving ? "Saving..." : "Save"}
					</button>
				</div>
			</div>
		</div>
	);
}
