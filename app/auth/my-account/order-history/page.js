'use client';

import React, { useCallback, useEffect, useState } from 'react';
import BreadCrumbs from "@/components/pageLayouts/BreadCrumbs";
import OrderHistoryTable from "@/components/account/OrderHistoryTable";
import PurchasedProductsTable from "@/components/account/PurchasedProductsTable";
import { getOrders } from "@/hooks/Api";
import Link from "next/link";

// API yanıtını tablo satırlarına normalleştirme (satır=order item)
function normalizeOrdersPayload(payload) {
	// Yeni API: kök düzeyde dizi dönüyor. Eski senaryolar için de korumalı.
	const list = Array.isArray(payload)
		? payload
		: (Array.isArray(payload?.orders) ? payload.orders : []);

	const rows = [];
	for (const ord of list) {
		const orderNo = ord.orderNumber || ord.orderNo || ord.order_number || ord.number || ord.id || '-';
		const date = ord.createdAt || ord.date || ord.orderDate || ord.created_at || new Date().toISOString();
		const currency = ord.currency || ord.currencyCode || 'USD';

		// Yeni API: "orderitems" (lowercase) alanı
		const items = Array.isArray(ord.orderitems)
			? ord.orderitems
			: (Array.isArray(ord.items)
				? ord.items
				: (Array.isArray(ord.lines)
					? ord.lines
					: (Array.isArray(ord.orderItems) ? ord.orderItems : [])));

		if (items.length > 0) {
			for (const it of items) {
				const qty = it.quantity ?? it.qty ?? it.qtyOrdered ?? 0;
				const unitPrice = it.price ?? it.unitPrice ?? it.unit_price ?? 0;
				const ext = it.extPrice ?? it.ext_price ?? it.total ?? (Number(unitPrice) * Number(qty));
				const title = it.title || it.description || it.name || it.product?.name || '-';
				rows.push({
					date,
					orderNo,
					category: it.categoryName || it.category || it.product?.category?.name || '-',
					sku: it.code || it.sku || it.SKU || it.product?.sku || '-',
					title,
					// Geriye dönük uyumluluk için description da ekleyelim
					description: title,
					qty: Number(qty) || 0,
					extPrice: Number(ext) || 0,
					currency,
				});
			}
		} else {
			// Ürün yoksa sipariş özeti satırı
			const title = ord.description || ord.title || '-';
			rows.push({
				date,
				orderNo,
				category: ord.category || '-',
				sku: ord.sku || '-',
				title,
				description: title,
				qty: ord.itemsCount || ord.total_qty || 0,
				extPrice: Number(ord.price ?? ord.total ?? ord.totalPrice ?? 0) || 0,
				currency,
			});
		}
	}
	return rows;
}

export default function Page() {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [activeTab, setActiveTab] = useState('orders'); // orders | products

	const fetchOrders = useCallback(async (params) => {
		setLoading(true);
		setError(null);
		try {
			const payload = await getOrders(params);
			console.log(payload);
			const normalized = normalizeOrdersPayload(payload);
			setRows(normalized);
		} catch (err) {
			console.error('Failed to fetch orders', err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	const handleSearch = useCallback((keyword) => {
		// Backend arama parametreniz farklıysa burada uyarlayın (örn: q, search, keyword)
		const q = keyword?.trim?.();
		fetchOrders(q ? { q } : undefined);
	}, [fetchOrders]);

	return (
		<div className="w-full h-full bg-white p-1 flex flex-col items-center">
			<div className="w-full max-w-[1440px]">

				<BreadCrumbs hideSegments={['auth']}/>

				<div className="w-full">
					<h1 className="text-[28px] tablet:text-[32px] font-bold text-text-dark mb-4">Order History</h1>
					{error ? (
						<div className="mb-3 p-3 rounded-md border border-red-300 text-red-700 bg-red-50">
							Siparişler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
						</div>
					) : (
						<div>
							{/* İkili sekme: 1) Order History 2) Purchased Products */}
							<div className=" flex justify-between border-b-[4px] border-border-gray mb-4">
								<div className="flex gap-2 -mb-[4px]">
									<button
										className={`relative px-3 py-2 font-bold text-[18px] border-b-[4px] border-1 rounded-t-lg w-[336px] h-[62px] cursor-pointer ${activeTab === 'orders' ? 'border-custom-blue text-custom-blue' : 'border-border-gray text-gray-500 '}`}
										onClick={() => setActiveTab('orders')}
									>
										Order History
									</button>
									<button
										className={` px-3 py-2 font-bold text-[18px] border-b-[4px] border-1 rounded-t-lg w-[336px] h-[62px] cursor-pointer ${activeTab === 'products' ? 'border-custom-blue text-custom-blue' : 'border-border-gray text-gray-500 '}`}
										onClick={() => setActiveTab('products')}
									>
										Purchased Products
									</button>
								</div>
								<div className="flex items-center justify-end mb-3">
									<Link href="/pages/contact-us" className="text-custom-blue text-sm hover:underline">Don&apos;t see your order?</Link>
								</div>
							</div>

							{activeTab === 'orders' ? (
								<OrderHistoryTable orders={rows} loading={loading} onSearch={handleSearch} />
							) : (
								<PurchasedProductsTable data={rows} loading={loading} />
							)}
						</div>
					)}
				</div>


			</div>
		</div>
	)
}