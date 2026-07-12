"use client"

import CheckoutHeader from "@/components/cart/pageCart/CheckoutHeader";
import CartTable from "@/components/cart/pageCart/CartTable";

const Page = () => {
	return (
		<div className="w-screen min-h-[100vw] flex justify-center bg-white text-text-dark">
			<div className="w-full p-2 my-4 laptop:w-[80%] max-w-[1400px] flex flex-col items-center ">
				<CheckoutHeader/>
				<CartTable/>
			</div>
		</div>
	)
}
export default Page;