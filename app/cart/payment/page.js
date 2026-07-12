"use client"

import CheckoutHeader from "@/components/cart/pageCart/CheckoutHeader";
import {PaymentInfo} from "@/components/ordering/payment/PaymentInfo";

const Page = () => {

	return (
    <div className="w-full min-h-[100vw] flex justify-center bg-white text-text-dark">
      <div className="w-[80%] max-w-[1400px] flex flex-col items-center ">
        <CheckoutHeader />
        <div className="flex w-full">
          <div className="flex w-full justify-between mt-[44px]">
            <PaymentInfo />
            {/*<SummaryCard />*/}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page;