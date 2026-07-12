import AdminLayout from '@/components/admin/AdminLayout'
import ProductPage from '@/components/admin/product/ProductPage'
import React from 'react'

const Page = () => {
	return (
		<AdminLayout>
			<h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
			<p className="mt-2 text-gray-600">Manage all products here.</p>
			<ProductPage/>
		</AdminLayout>
	)
}

export default Page