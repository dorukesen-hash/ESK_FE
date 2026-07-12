import Link from "next/link";
import React from "react";
import Image from "next/image";

const CategoryCard = ({link, image, name}) => {

	return (
		<Link
			href={link}
			className="flex flex-col items-center h-[330px] p-4 rounded-[4px] hover:bg-button-gray border-b-[4px] border-transparent hover:border-b-custom-blue"
		>
			{image && (
				<div className="relative w-[326px] h-[254px] flex items-center justify-center bg-white ">
					<Image
						src={`https://cdn.enesdorukesen.com.tr/${image}`}
						fill
						alt="Category Image"
						className="object-contain"
					/>
				</div>
			)}
			<p className="text-[20px] font-[700] text-center mt-4">{name}</p>
		</Link>
	)
}

export default CategoryCard;