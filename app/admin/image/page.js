import AdminLayout from '@/components/admin/AdminLayout'
import Images from '@/components/admin/image/Images'
import React from 'react'

const Page = () => {
	return (
		<AdminLayout>
			<h1 className="text-2xl font-bold text-gray-800">Image Management</h1>
			<p className="mt-2 text-gray-600">Manage all images here.</p>
			<Images/>
		</AdminLayout>
	)
}

export default Page