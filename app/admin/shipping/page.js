import AdminLayout from '@/components/admin/AdminLayout'
import Shipment from '@/components/admin/shipment/Shipment'
import React from 'react'

const Page = () => {
	return (
		<AdminLayout>
			<h1 className="text-2xl font-bold text-gray-800">Shipping Management</h1>
			<p className="mt-2 text-gray-600">Manage all shipments here.</p>
			<Shipment/>
		</AdminLayout>
	)
}

export default Page