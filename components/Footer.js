import Image from "next/image";

import icon from "../assets/EKS_icon_dark.png";

export default function Footer() {
	return (
		<footer className="
						border-t-[8px] border-[#C83642]
                        flex flex-col items-center justify-center p-[12px] bg-custom-blue-gray text-white z-0
                        tablet:relative
                        laptop:flex-row laptop:items-start laptop:justify-evenly">
			{/* ESK icon displayed in footer */}
			<div className="
                        w-[240px] py-[12px] laptop:py-0
                        laptop:w-[430px]"><Image src={icon} alt="ESK Packaging"/></div>
			{/* Contact info displayed in footer */}
			<div className="
                        flex flex-col h-full w-auto justify-between items-center text-[12px]
                        tablet:flex-row tablet:justify-evenly
                        laptop:justify-around laptop:text-[20px]">
				<div className="flex flex-col">
					<p className="flex items-center justify-start py-[6px]">
						<svg className="flex-shrink-0" width="24" height="24" viewBox="0 0 38 38" fill="none"
						     xmlns="http://www.w3.org/2000/svg">
							<path
								d="M36.9994 18.9295C37.0802 28.781 29.0928 36.8879 19.1869 36.9989C9.34155 37.1098 1.09165 29.0734 1.00077 19.2824C0.909891 9.23929 8.86699 1.11205 18.9042 1.00113C28.7899 0.890216 36.9085 8.93681 36.9994 18.9295ZM11.3308 16.2775C11.6237 17.3161 11.7044 18.4756 12.2396 19.363C14.1178 22.4989 16.1475 25.5543 18.1468 28.6297C18.7325 29.5372 19.3586 29.4464 19.9241 28.5792C21.8628 25.5744 23.9127 22.6402 25.7101 19.5546C27.2853 16.8321 26.6997 13.4239 24.569 11.1148C22.4788 8.85614 19.197 8.07967 16.3494 9.17877C13.411 10.298 11.4823 13.1315 11.3308 16.2775Z"
								fill="white"/>
							<path
								d="M15.9458 16.2477C15.9155 14.5635 17.2181 13.192 18.8944 13.1416C20.6413 13.0911 22.055 14.4123 22.0953 16.1469C22.1357 17.8412 20.7119 19.2833 18.9953 19.2833C17.3292 19.2732 15.9761 17.9319 15.9458 16.2477Z"
								fill="white"/>
						</svg>
						<span className="pl-[12px]">11514 Pagemill Rd, Dallas, TX 75243</span>
					</p>
					<p className="flex items-center justify-start py-[6px]">
						<svg className="flex-shrink-0" width="24" height="24" viewBox="0 0 38 38" fill="none"
						     xmlns="http://www.w3.org/2000/svg">
							<path
								d="M18.9093 36.9997C8.94993 36.9391 0.919799 28.8104 1.0006 18.8842C1.08141 8.94786 9.24285 0.909882 19.1618 1.00076C29.0908 1.09164 37.0603 9.22044 36.9997 19.1971C36.9492 29.0324 28.7979 37.0602 18.9093 36.9997ZM23.0505 29.0122C25.5252 28.7497 27.4848 27.4269 27.9797 25.5184C28.2322 24.5389 27.9898 23.822 27.0201 23.4383C26.1414 23.0849 25.2121 22.8223 24.3838 22.378C23.1112 21.7115 22.0405 21.8629 21.1213 22.9434C20.5961 23.5695 20.1112 23.509 19.4951 23.0647C17.5355 21.6611 16.0911 19.8333 15.0204 17.7128C14.879 17.43 15.0002 16.7535 15.2225 16.602C16.6669 15.6225 16.9093 14.3905 16.2729 12.8455C16.0709 12.3507 16.0205 11.7954 15.8891 11.2703C15.3942 9.18007 14.1417 8.5843 12.3438 9.75565C11.5559 10.2706 10.8893 11.1189 10.4347 11.957C9.43475 13.815 9.74786 15.7841 10.6064 17.5815C12.5054 21.5701 15.2325 24.9226 18.99 27.3057C20.2122 28.0833 21.697 28.4568 23.0505 29.0122Z"
								fill="white"/>
						</svg>
						<span className="pl-[12px]">(469) 756-1887</span>
					</p>
					<p className="flex items-center justify-start py-[6px]">
						<svg className="flex-shrink-0" width="24" height="24" viewBox="0 0 38 38" fill="none"
						     xmlns="http://www.w3.org/2000/svg">
							<path
								d="M18.9344 1.00009C28.881 0.969783 36.9798 9 37 18.9191C37.0202 28.8786 29.0224 36.9493 19.0859 36.9998C9.17957 37.0503 1.03033 28.9594 1.00004 19.0706C0.979842 9.13134 9.01798 1.03039 18.9344 1.00009ZM29.2446 12.0707C29.1638 11.9595 29.083 11.8384 29.0124 11.7273C22.3375 11.7273 15.6525 11.7273 8.9776 11.7273C8.91701 11.8485 8.86654 11.9697 8.80595 12.0909C12.1888 14.7272 15.5717 17.3737 19.0152 20.0504C22.4687 17.3434 25.8516 14.707 29.2446 12.0707ZM8.88669 26.1614C8.94728 26.2624 8.99781 26.3736 9.0584 26.4746C15.7131 26.4746 22.3576 26.4746 29.1638 26.4746C29.0022 26.1816 28.9618 25.9898 28.8406 25.8989C26.2252 24.0302 23.5997 22.1615 20.9742 20.3231C20.7924 20.2019 20.3683 20.121 20.2774 20.222C19.2878 21.3331 18.3891 20.8281 17.4601 19.9998C14.5821 22.0705 11.7344 24.121 8.88669 26.1614ZM29.0729 13.3434C26.3464 15.4646 23.8623 17.404 21.267 19.4241C23.9127 21.3332 26.4171 23.121 29.0729 25.0301C29.0729 21.02 29.0729 17.3332 29.0729 13.3434ZM16.7532 19.414C14.1277 17.3636 11.6334 15.4242 8.98771 13.3636C8.98771 17.3535 8.98771 21.0302 8.98771 24.9797C11.6334 23.0807 14.1176 21.3029 16.7532 19.414Z"
								fill="white"/>
						</svg>
						<span className="pl-[12px]">sales@eskpackaging.com</span>
					</p>
				</div>
			</div>
			<hr className="border-[1px] border-gray-800 w-full my-[8px] tablet:hidden"/>
			{/* Copyright announcement */}
			<p className="
                        text-[12px]
                        tablet:self-end tablet:absolute tablet:right-0 tablet:bottom-0 tablet:p-[18px]
                        laptop:static laptop:p-0 laptop:text-[20px]">© ESK Packaging LLC. All Rights Reserved.</p>
		</footer>
	)

}