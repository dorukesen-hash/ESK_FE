import React from "react";
import OrdersPage from "@/components/admin/order/Orders";
import AdminLayout from "@/components/admin/AdminLayout";

const Page = () => {
	return (
		<AdminLayout>
			<h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
			<p className="mt-2 text-gray-600">Manage all orders here.</p>
			<OrdersPage/>
		</AdminLayout>
	);
};

export default Page;
