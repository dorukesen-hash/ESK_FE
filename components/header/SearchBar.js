"use client"

import React, {useState} from "react";
import Link from "next/link";

export default function SearchBar() {

	const [search, setSearch] = useState("");

	return (
		<div className="w-full flex items-center justify-center">
			<div
				className="flex w-full items-center justify-between max-tablet:hidden flex-1 max-w-[948px] mx-[24px] h-[48px] border-[2px] border-border-gray rounded-[12px] overflow-hidden focus-within:border-custom-blue">
				<input className="pl-2 w-full h-full font-semibold focus:outline-none"
				       onChange={(e) => setSearch(e.target.value)} value={search}/>
				<Link href={`/products?q=${search}`} className="pr-2 py-0">
					<svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
							fill="#5CA0E2"/>
						<path
							d="M35.4302 32.635L29.9102 27.0459C30.8502 25.5361 31.3903 23.7464 31.3903 21.8267C31.3903 16.3976 27.0502 11.9983 21.6902 11.9983C16.3302 11.9983 11.9902 16.3976 11.9902 21.8267C11.9902 27.2558 16.3302 31.6551 21.6902 31.6551C23.7502 31.6551 25.6602 31.0052 27.2302 29.8954L32.6802 35.4245C33.0602 35.8045 33.5602 35.9944 34.0502 35.9944C34.5502 35.9944 35.0402 35.8045 35.4202 35.4245C36.1902 34.6547 36.1902 33.4049 35.4302 32.635ZM21.7002 28.4757C18.0802 28.4757 15.1403 25.5061 15.1403 21.8367C15.1403 18.1673 18.0702 15.1878 21.7002 15.1878C25.3202 15.1878 28.2603 18.1673 28.2603 21.8367C28.2503 25.4961 25.3202 28.4757 21.7002 28.4757Z"
							fill="white"/>
					</svg>
				</Link>
			</div>
		</div>
	)
}

