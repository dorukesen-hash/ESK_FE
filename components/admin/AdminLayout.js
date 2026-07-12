import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen w-max-full overflow-scroll">
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
          {children}
      </div>
		</div>
	);
}