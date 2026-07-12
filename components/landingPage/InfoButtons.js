"use client"

export default function InfoButtons({onButtonClick}) {

	return (
		<div className="w-full">
			{/* Buttons */}
			<div
				className="hidden laptop:flex justify-center w-full h-[274px] py-[33px] gap-[56px] text-text-dark text-[18px] font-semibold">
				<div
					className="flex flex-col w-[222px] h-[222px] items-center gap-[12px] pt-[10px] rounded-[12px]"
					// border-2 cursor-pointer border-transparent hover:border-custom-blue
					// onClick={() => onButtonClick(1)}
				>
					<svg width="149" height="132" viewBox="0 0 149 132" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M75 131C110.899 131 140 101.899 140 66C140 30.1015 110.899 1 75 1C39.1015 1 10 30.1015 10 66C10 101.899 39.1015 131 75 131Z" fill="#A3CEF9"/>
						<path d="M123.81 66H117L113.67 52.6802C113.28 51.1102 111.86 50 110.24 50H94.12L91 84H103.14H104.89H127V69.1904C127 67.4304 125.57 66 123.81 66Z" fill="white"/>
						<path d="M46.9496 34.9702C45.2796 34.9702 43.8796 36.2402 43.7296 37.9102L40.2196 75.9404L40.2696 75.9604L40.2096 76.6504C40.0996 77.9004 41.0796 78.9702 42.3296 78.9702H49.2196H51.7496H88.9896L92.9896 34.9702H46.9496Z" fill="#5CA0E2"/>
						<path d="M114 66L110.9 53.6201H100V66H114Z" fill="#A3CEF9"/>
						<path d="M60 90C63.3137 90 66 87.3137 66 84C66 80.6863 63.3137 78 60 78C56.6863 78 54 80.6863 54 84C54 87.3137 56.6863 90 60 90Z" fill="#A3CEF9"/>
						<path d="M111 90C114.314 90 117 87.3137 117 84C117 80.6863 114.314 78 111 78C107.686 78 105 80.6863 105 84C105 87.3137 107.686 90 111 90Z" fill="#A3CEF9"/>
						<path d="M83 131C118.899 131 148 101.899 148 66C148 30.1015 118.899 1 83 1C47.1015 1 18 30.1015 18 66C18 101.899 47.1015 131 83 131Z" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M50.29 47.75L50.73 42.9404C50.88 41.2804 52.28 40 53.95 40H100L96.0001 84H70.98" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M58.7501 84H49.3301C48.0801 84 47.0901 82.9202 47.2101 81.6802L48.6201 66.2202" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M121.96 84H132V69.1904C132 67.4304 130.57 66 128.81 66H122L118.67 52.6802C118.28 51.1102 116.86 50 115.24 50H99.1201" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M96 84H109.88" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M118 66L114.9 53.6201H104V66H118Z" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M65 90C68.3137 90 71 87.3137 71 84C71 80.6863 68.3137 78 65 78C61.6863 78 59 80.6863 59 84C59 87.3137 61.6863 90 65 90Z" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M116 90C119.314 90 122 87.3137 122 84C122 80.6863 119.314 78 116 78C112.686 78 110 80.6863 110 84C110 87.3137 112.686 90 116 90Z" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M61 48H34" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M69 54H42" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M57 60H30" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M66 66H39" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<circle cx="15" cy="66" r="15" fill="white"/>
						<circle cx="15" cy="66" r="10" fill="#E23641"/>
					</svg>

					<p className="">Free Shipping<br/><span className="text-[14px] text-[#808080] font-normal">*On Qualified Orders</span>
					</p>
				</div>
				<div
					className="flex flex-col w-[222px] h-[222px] items-center gap-[12px] pt-[10px] rounded-[12px]"
					// border-2 cursor-pointer border-transparent hover:border-custom-blue
					// onClick={() => onButtonClick(2)}
				>
					<svg width="149" height="132" viewBox="0 0 149 132" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M75 131C110.899 131 140 101.899 140 66C140 30.1015 110.899 1 75 1C39.1015 1 10 30.1015 10 66C10 101.899 39.1015 131 75 131Z" fill="#A3CEF9"/>
						<path d="M122.59 40.4599L108.09 34.1899C107.08 33.7499 105.93 33.7499 104.91 34.1899L90.41 40.4599C88.95 41.0899 88 42.5398 88 44.1298V96.1498V96.4999C88 98.7099 89.79 100.5 92 100.5H121C123.21 100.5 125 98.7099 125 96.4999V44.1298C125 42.5298 124.06 41.0899 122.59 40.4599ZM106.5 47.4999C104.84 47.4999 103.5 46.1599 103.5 44.4999C103.5 42.8399 104.84 41.4999 106.5 41.4999C108.16 41.4999 109.5 42.8399 109.5 44.4999C109.5 46.1599 108.16 47.4999 106.5 47.4999Z" fill="white"/>
						<path d="M47.21 94.3501H38.21C37.11 94.3501 36.21 93.4501 36.21 92.3501V63.3501C36.21 62.2501 37.11 61.3501 38.21 61.3501H47.21C48.31 61.3501 49.21 62.2501 49.21 63.3501V92.3501C49.21 93.4601 48.31 94.3501 47.21 94.3501Z" fill="#5CA0E2"/>
						<path d="M52.21 88.3501C55.46 88.3501 57.84 89.23 59.33 90.04C60.95 90.92 62.77 91.3501 64.62 91.3501H83.22C85.43 91.3501 87.22 89.5601 87.22 87.3501C87.22 85.1401 85.43 83.3501 83.22 83.3501H82.22H81.22H85.22C87.43 83.3501 89.22 81.5601 89.22 79.3501C89.22 77.1401 87.43 75.3501 85.22 75.3501H82.22H86.22C88.43 75.3501 90.22 73.5601 90.22 71.3501C90.22 69.1401 88.43 67.3501 86.22 67.3501H82.22H87.22C89.43 67.3501 91.22 65.5601 91.22 63.3501C91.22 61.1401 89.43 59.3501 87.22 59.3501H73.22C73.22 59.3501 75.22 54.3501 75.22 49.3501C75.22 46.6501 74.64 43.95 74.1 42.04C73.65 40.45 72.2199 39.3501 70.5699 39.3501C68.6699 39.3501 67.0899 40.8002 66.9199 42.6802L66.73 44.7202C66.4 48.3302 64.6799 51.66 61.9299 54.02L52.22 62.3398V88.3501" fill="#FFC6AE"/>
						<path d="M83 131C118.899 131 148 101.899 148 66C148 30.1015 118.899 1 83 1C47.1015 1 18 30.1015 18 66C18 101.899 47.1015 131 83 131Z" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M52.21 62.3501L61.9199 54.0298C64.6699 51.6698 66.39 48.34 66.72 44.73L66.91 42.6899C67.08 40.7999 68.6599 39.3599 70.5599 39.3599C72.2099 39.3599 73.65 40.4598 74.09 42.0498C74.63 43.9598 75.21 46.6599 75.21 49.3599C75.21 54.3599 73.21 59.3599 73.21 59.3599H87.21C89.42 59.3599 91.21 61.1499 91.21 63.3599C91.21 65.5699 89.42 67.3599 87.21 67.3599H82.21" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M82.21 67.3501H86.21C88.42 67.3501 90.21 69.1401 90.21 71.3501C90.21 73.5601 88.42 75.3501 86.21 75.3501H82.21" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M82.21 75.3501H85.21C87.42 75.3501 89.21 77.1401 89.21 79.3501C89.21 81.5601 87.42 83.3501 85.21 83.3501H81.21" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M82.2102 83.3501H83.2102C85.4202 83.3501 87.2102 85.1401 87.2102 87.3501C87.2102 89.5601 85.4202 91.3501 83.2102 91.3501H64.6102C62.7702 91.3501 60.9402 90.92 59.3202 90.04C57.8302 89.23 55.4602 88.3501 52.2002 88.3501" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M50.21 91.3501H42.21C41.11 91.3501 40.21 90.4501 40.21 89.3501V60.3501C40.21 59.2501 41.11 58.3501 42.21 58.3501H50.21C51.31 58.3501 52.21 59.2501 52.21 60.3501V89.3501C52.21 90.4601 51.31 91.3501 50.21 91.3501Z" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M82.79 91.35C82.79 93.56 84.58 95.35 86.79 95.35H115.79C118 95.35 119.79 93.56 119.79 91.35V40.9799C119.79 39.3799 118.84 37.94 117.38 37.31L102.88 31.04C101.87 30.6 100.72 30.6 99.7001 31.04L85.2001 37.31C83.7401 37.94 82.79 39.3899 82.79 40.9799V59.1801" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M101.29 44.3501C102.947 44.3501 104.29 43.007 104.29 41.3501C104.29 39.6932 102.947 38.3501 101.29 38.3501C99.6332 38.3501 98.29 39.6932 98.29 41.3501C98.29 43.007 99.6332 44.3501 101.29 44.3501Z" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M105.79 70.0498V69.1802C105.79 67.4802 104.41 66.1001 102.71 66.1001H99.8701C98.1701 66.1001 96.79 67.4802 96.79 69.1802V70.48C96.79 71.51 97.4301 72.43 98.3901 72.79L104.19 74.98C105.15 75.34 105.79 76.27 105.79 77.29V79.0098C105.79 80.7098 104.41 82.0898 102.71 82.0898H99.8701C98.1701 82.0898 96.79 80.7098 96.79 79.0098V78.2202" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M101.29 82.23V85.6001" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M101.29 62.6001V65.98" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<circle cx="15" cy="66" r="15" fill="white"/>
						<circle cx="15" cy="66" r="10" fill="#E9636C"/>
					</svg>


					<p className="">Competitive Price</p>
				</div>
				<div
					className="flex flex-col w-[222px] h-[222px] items-center gap-[12px] pt-[10px] rounded-[12px]"
					// border-2 cursor-pointer border-transparent hover:border-custom-blue
					// onClick={() => onButtonClick(3)}
				>
					<svg width="149" height="132" viewBox="0 0 149 132" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M75 131C110.899 131 140 101.899 140 66C140 30.1015 110.899 1 75 1C39.1015 1 10 30.1015 10 66C10 101.899 39.1015 131 75 131Z" fill="#A3CEF9"/>
						<path d="M79.4902 95C95.5065 95 108.49 82.0163 108.49 66C108.49 49.9837 95.5065 37 79.4902 37C63.474 37 50.4902 49.9837 50.4902 66C50.4902 82.0163 63.474 95 79.4902 95Z" fill="white"/>
						<path d="M92.9902 60.5H121.99C121.99 44.48 109.01 31.5 92.9902 31.5V60.5Z" fill="#5CA0E2"/>
						<path d="M59.1406 75.4902C63.0606 86.7302 73.7606 94.8003 86.3306 94.8003C102.231 94.8003 115.121 81.9103 115.121 66.0103C115.121 50.1103 102.231 37.2202 86.3306 37.2202C73.8406 37.2202 63.2006 45.1803 59.2206 56.3003" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M86.8594 45.7402V66" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M99.6593 66H86.8594" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M86.8605 37.2104H55.9404" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M43.1406 46.8101H64.4706" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M47.4102 56.4004H69.8002" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M39.9404 56.4004H41.0105" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M61.2705 94.8003H86.8605" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M53.8008 94.8003H54.8708" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M38.8701 66H66.6001" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M45.2705 75.6001H73.0005" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M50.5996 85.2002H83.6595" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M83 131C118.899 131 148 101.899 148 66C148 30.1015 118.899 1 83 1C47.1015 1 18 30.1015 18 66C18 101.899 47.1015 131 83 131Z" stroke="#20517C" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<circle cx="15" cy="66" r="15" fill="white"/>
						<circle cx="15" cy="66" r="10" fill="#EF8F96"/>
					</svg>

					<p className="">Fast Turn Around</p>
				</div>
			</div>
		</div>
	)
}