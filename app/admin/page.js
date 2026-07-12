'use client'
import Link from 'next/link';

const Page = () => {


	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<div className="bg-white w-64 px-4 py-8 border-r border-gray-200">
				<h2 className="text-xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>
				<nav>
					<ul className="space-y-2">
						<li>
							<Link
								href="/admin/products"
								className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
							>
								<span>Products</span>
							</Link>
						</li>
						<li>
							<Link
								href="/admin/shipping"
								className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
							>
								<span>Shipping</span>
							</Link>
						</li>
						<li>
							<Link
								href="/admin/order"
								className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
							>
								<span>Order</span>
							</Link>
						</li>
						<li>
							<Link
								href="/admin/image"
								className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
							>
								<span>Images</span>
							</Link>
						</li>
						<li>
							<Link
								href="/admin/customer"
								className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
							>
								<span>Customers</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>

			{/* Main Content */}
			<div className="flex-1 p-8">
				<h1 className="text-2xl font-bold text-gray-800">Welcome to the Admin Dashboard</h1>
				<p className="mt-2 text-gray-600">Select an option from the sidebar to get started.</p>
			</div>
		</div>
	)
}

export default Page