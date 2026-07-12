import Link from "next/link"

const BottomNavBar = () => {
	return (
		<div
			className="laptop:h-[80px] w-full bg-custom-table-head text-text-dark text-[16px] font-bold flex flex-col laptop:flex-row items-center justify-evenly gap-2 laptop:gap-0 laptop:h-[100px] laptop:text-[20px]">
			<Link href="/pages/contact-us" className="py-2 px-4 w-full text-center laptop:w-auto">CONTACT US</Link>
			<Link href="/pages/about-us" className="py-2 px-4 w-full text-center laptop:w-auto">ABOUT US</Link>
			<Link href="/pages/faq" className="py-2 px-4 w-full text-center laptop:w-auto">FAQ</Link>
			{/*<Link href="/pages/blog" className="py-2 px-4 w-full text-center laptop:w-auto">BLOG</Link>*/}
			<Link href="/pages/privacy-policy" className="py-2 px-4 w-full text-center laptop:w-auto">PRIVACY POLICY</Link>
			<Link href="/pages/shipping-policy" className="py-2 px-4 w-full text-center laptop:w-auto">SHIPPING POLICY</Link>
			<Link href="/pages/retrun-policy" className="py-2 px-4 w-full text-center laptop:w-auto">RETURN AND REFUND POLICY</Link>
			<Link href="/pages/terms-and-conditions" className="py-2 px-4 w-full text-center laptop:w-auto">TERMS & CONDITIONS</Link>
		</div>
	)
}

export default BottomNavBar