'use client';

import { useEffect, useState } from 'react';
import BreadCrumbs from "@/components/pageLayouts/BreadCrumbs";
import { getInvoices } from "@/hooks/Api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
	const [invoices, setInvoices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const data = await getInvoices();
				setInvoices(data);
			} catch (err) {
				console.error('Failed to fetch invoices', err);
				setError(err);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<div className="w-full h-full bg-white p-1 flex flex-col items-center">
			<div className="w-full max-w-[1440px]">
				<BreadCrumbs hideSegments={['auth']} />

				<h1 className="text-[28px] tablet:text-[32px] font-bold text-text-dark mb-4">Payments</h1>

				{error ? (
					<div className="mb-3 p-3 rounded-md border border-red-300 text-red-700 bg-red-50">
						Faturalar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
					</div>
				) : loading ? (
					<p className="text-text-light">Yükleniyor...</p>
				) : invoices.length === 0 ? (
					<p className="text-text-light">Henüz bir faturanız yok.</p>
				) : (
					<div className="w-full overflow-x-auto">
						<table className="w-full text-[14px] text-text-dark text-left">
							<thead className="h-[48px] bg-custom-table-head">
								<tr>
									<th className="px-4">Fatura No</th>
									<th className="px-4">Sipariş</th>
									<th className="px-4">Tarih</th>
									<th className="px-4">Tutar</th>
									<th className="px-4">PDF</th>
								</tr>
							</thead>
							<tbody>
								{invoices.map((invoice) => (
									<tr key={invoice.id} className="border-b border-border-gray h-[56px]">
										<td className="px-4">{invoice.documentNumber}</td>
										<td className="px-4">
											{invoice.orders?.[0] ? `#${invoice.orders[0].orderNumber}` : "-"}
										</td>
										<td className="px-4 text-text-light">
											{invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString() : "-"}
										</td>
										<td className="px-4 font-semibold text-custom-button-green">
											${parseFloat(invoice.grandTotal ?? 0).toFixed(2)}
										</td>
										<td className="px-4">
											{invoice.orders?.[0] && (
												<a
													href={`${API_URL}/invoices/pdf/${invoice.orders[0].id}`}
													target="_blank"
													rel="noreferrer"
													className="text-custom-blue hover:underline"
												>
													İndir
												</a>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
