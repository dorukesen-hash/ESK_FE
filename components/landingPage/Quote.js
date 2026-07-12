import MakeQuery from "@/components/Products/Helpers/MakeQuery";

export default function Quote() {
	return (
		<div className="flex flex-col justify-center items-center w-full max-w-[1920px] h-[262px] text-text-dark ">
			<h1 className="text-center font-bold text-[28px] tablet:text-[38px] ">Request a quote</h1>
			<p className="text-center text-[12px] tablet:text-[16px] mb-[38px]">Get a custom quote for boxes and more.</p>
			<MakeQuery/>
		</div>
	)
}