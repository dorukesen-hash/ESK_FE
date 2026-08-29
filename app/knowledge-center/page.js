import Link from "next/link";

export const metadata = {
	title: "Packaging Knowledge Center — ESK Packaging",
	description:
		"Practical guides to help businesses compare packaging materials, specifications and applications: strapping selection, stretch film, corner boards and tooling compatibility.",
};

const topics = [
	{
		title: "Strapping Selection",
		text: "Compare cord, PET, PP and steel strapping by application, strength and tooling requirements.",
	},
	{
		title: "Stretch Film & Pallet Wrapping",
		text: "Understand film gauge, load profile and pallet-wrapping considerations.",
	},
	{
		title: "Corner Boards & Load Protection",
		text: "Choose dimensions, thicknesses and placement based on the load being protected.",
	},
	{
		title: "Tools, Buckles & Compatibility",
		text: "Match strapping materials with the correct buckles, tensioners and application tools.",
	},
];

export default function KnowledgeCenter() {
	return (
		<main className="w-full bg-white">
			<div className="max-w-[1440px] mx-auto px-6 tablet:px-[24px] py-12 tablet:py-16">
				<p className="text-[13px] tablet:text-[14px] font-bold tracking-[0.18em] uppercase text-text-blue">
					Knowledge Center
				</p>
				<h1 className="text-[28px] tablet:text-[38px] font-bold text-text-dark mt-2">
					Packaging Knowledge Center
				</h1>
				<p className="text-[15px] tablet:text-[17px] text-text-light mt-3 max-w-[720px] leading-relaxed">
					Practical guides to help businesses compare packaging materials, specifications and applications.
				</p>

				<div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-6 mt-8 max-w-[960px]">
					{topics.map((topic) => (
						<div key={topic.title} className="border-2 border-border-gray rounded-[12px] p-6 bg-white">
							<h2 className="font-bold text-[17px] tablet:text-[19px] text-text-dark">{topic.title}</h2>
							<p className="text-[14px] tablet:text-[15px] text-text-light mt-2 leading-relaxed">{topic.text}</p>
						</div>
					))}
				</div>

				<p className="text-[15px] tablet:text-[16px] text-text-dark mt-8 max-w-[720px] leading-relaxed">
					The first guides are in preparation. Until they&apos;re published, tell us about your application
					and we&apos;ll walk you through the options directly.
				</p>
				<div className="flex flex-col tablet:flex-row gap-3 mt-4">
					<Link
						href="/products"
						className="inline-flex items-center justify-center h-[52px] px-8 rounded-[10px] bg-custom-blue text-white font-semibold text-[15px] tablet:text-[16px] hover:bg-custom-button-green transition-colors whitespace-nowrap"
					>
						Browse Products
					</Link>
					<Link
						href="/#quote"
						className="inline-flex items-center justify-center h-[52px] px-8 rounded-[10px] border-2 border-custom-blue text-custom-blue font-semibold text-[15px] tablet:text-[16px] hover:bg-custom-blue hover:text-white transition-colors whitespace-nowrap"
					>
						Get Product Guidance
					</Link>
				</div>
			</div>
		</main>
	);
}
