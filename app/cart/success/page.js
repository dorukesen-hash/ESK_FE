"use client"
import CheckoutHeader from "@/components/cart/pageCart/CheckoutHeader";
import Image from "next/image";
import Link from "next/link";

const Page = () => {

	return (
		<div className="w-full min-h-screen flex flex-col items-center bg-gray-50 text-gray-800 pt-8">
			<div className="w-full max-w-4xl px-4">
				<CheckoutHeader/>
				<div className="mt-12 flex justify-center">
					<div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-md border border-gray-100">
						<div className="flex flex-col items-center text-center">
							<div className="p-3 rounded-full bg-green-100 text-green-600 mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<h1 className="text-2xl font-semibold text-gray-900 mb-2">Your Order Has Been Received!</h1>
							<p className="text-gray-600 mb-8">Thank you! Your order has been successfully placed. Details have been sent to your email address.</p>
							<div className="flex flex-col sm:flex-row gap-4 w-full">
								<Link href="/auth/my-account/order-history" className="w-full text-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-300">
									View My Orders
								</Link>
								<Link href="/" className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg transition-colors duration-300">
									Continue Shopping
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Page;