'use client'
import React from 'react'

const DeleteModal = ({handleDeleteSubcategory, setIsDeleteModalOpen}) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-6 rounded-lg w-96">
				<h3 className="text-lg font-semibold mb-4">Delete Subcategory</h3>
				<p className="mb-4">Are you sure you want to delete this subcategory?</p>
				<div className="flex justify-end space-x-2">
					<button
						onClick={() => setIsDeleteModalOpen(false)}
						className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={handleDeleteSubcategory}
						className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteModal