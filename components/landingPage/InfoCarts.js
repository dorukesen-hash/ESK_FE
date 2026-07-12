"use client"
import bgImage3 from "../../assets/image2.png"
import bgImage2 from "../../assets/image3.png"
import Image from "next/image";

const infoCartsData = [
	{
		image: bgImage2,
		title: "Bulk Pricing",
		heading: "Personalize your pricing",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
	},
	{
		image: bgImage3,
		title: "Customized products",
		heading: "Personalize your products",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
	},
];

export default function InfoCarts() {
	return (
		<div className="w-full max-w-[1920px] text-text-dark flex justify-center items-center my-20">
			<div className="w-full h-full flex
                            flex-col justify-center items-center
                            desktop:flex-row laptop:gap-16">
				{infoCartsData.map((item, idx) => (
					<div
						key={idx}
						className="relative flex justify-end  border-[2px] border-border-gray rounded-xl mb-8 aspect-[722/372]
								w-full flex-col items-center
								tablet:flex-row tablet:w-[722px] tablet:h-[372px] tablet:items-start"
					>
						<Image
							alt={""}
							className=" rounded-xl object-cover object-bottom rounded-b-none
										block w-[full] aspect-[2/1]
									 	tablet:absolute tablet:w-[51%] tablet:-top-8 tablet:-left-8 tablet:aspect-square tablet:rounded-xl"
							src={item.image}
						/>
						<div className="w-full m-[16px] flex flex-col gap-[12px] p-4
										tablet:w-[335px] tablet:h-[256px] tablet:m-[28px] tablet:gap-[20px]">
							<p className="text-text-blue font-bold text-[16px]">{item.title}</p>
							<h1 className="font-bold text-[28px] leading-[22px] tablet:leading-[26px] laptop:leading-[30px]">{item.heading}</h1>
							<p className="text-[18px] leading-[18px] tablet:leading-[22px] laptop:leading-[26px]">{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}