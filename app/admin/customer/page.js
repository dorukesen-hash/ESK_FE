import AdminLayout from '@/components/admin/AdminLayout'
import Customers from '@/components/admin/customer/Customers'
import React from 'react'

const Page = () => {
	return (
		<AdminLayout>
			<h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
			<p className="mt-2 text-gray-600">Manage all customers here.</p>
			<Customers/>
		</AdminLayout>
	)
}

export default Page