"use client"
import React from "react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object().shape({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	company: yup.string().required("Company is required"),
	message: yup.string().required("Message is required"),
});

// variantSku/variantTitle (optional) tie the enquiry to one exact variant:
// the modal names it and the message is prefilled with it.
const MakeQuery = ({
	wrapperClassName = "h-[120px] w-full flex flex-col items-center relative",
	buttonClassName = `border-[2px] border-custom-blue rounded-[12px] text-text-blue font-semibold hover:bg-custom-blue hover:text-white
								w-[200px] h-[64px]
								tablet:w-[388px]`,
	label = "Make Enquiry",
	variantSku = null,
	variantTitle = null,
}) => {
	const [formOpen, setFormOpen] = useState(false)
	const defaultMessage = variantSku
		? `${label} — SKU ${variantSku}${variantTitle ? ` (${variantTitle})` : ""}.`
		: variantTitle
			? `${label} — ${variantTitle}.`
			: "";
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {name: "", email: "", company: "", message: defaultMessage},
	});

	const onSubmit = () => {
		reset()
		setFormOpen(false)
	};


	return (
		<div className={wrapperClassName}>
			<button
				type="button"
				className={buttonClassName}
				onClick={() => setFormOpen(true)}>{label}
			</button>
			{formOpen && <div className="fixed inset-0 bg-[#182434D1] flex items-center justify-center z-50">
				<div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md">
					<div className="flex justify-between items-center mb-6">
						<div>
							<h2 className="text-2xl font-bold text-text-blue">{label === "Make Enquiry" ? "Product Enquiry" : label}</h2>
							{(variantSku || variantTitle) && (
								<p className="text-[13px] text-gray-500 mt-1">
									{variantSku ? `SKU ${variantSku}${variantTitle ? ` · ${variantTitle}` : ""}` : variantTitle}
								</p>
							)}
						</div>
						<button className="text-gray-500 hover:text-red-500 text-xl cursor-pointer" onClick={() => setFormOpen(false)}>
							<svg width="30" height="30" viewBox="0 0 30 30" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<path
									d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
									fill="#5CA0E2"/>
								<path d="M9.60986 20.39L20.3899 9.60999" stroke="white" strokeWidth="3"
								      strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M9.60986 9.60999L20.3899 20.39" stroke="white" strokeWidth="3"
								      strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</button>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<input
								type="text"
								{...register("name")}
								placeholder="Name"
								className={`w-full p-3 border rounded ${
									errors.name ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{errors.name && (
								<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
							)}
						</div>
						<div>
							<input
								type="email"
								{...register("email")}
								placeholder="Email"
								className={`w-full p-3 border rounded ${
									errors.email ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
							)}
						</div>
						<div>
							<input
								type="text"
								{...register("company")}
								placeholder="Company"
								className={`w-full p-3 border rounded ${
									errors.company ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{errors.company && (
								<p className="text-red-500 text-sm mt-1">
									{errors.company.message}
								</p>
							)}
						</div>
						<div>
                            <textarea
	                            {...register("message")}
	                            placeholder="Message"
	                            className={`w-full p-3 border rounded ${
		                            errors.message ? "border-red-500" : "border-gray-300"}`}
	                            rows="4"></textarea>
							{errors.message && (
								<p className="text-red-500 text-sm mt-1">
									{errors.message.message}
								</p>
							)}
						</div>
						<button
							type="submit"
							className="w-full bg-custom-blue text-white py-3 rounded hover:bg-custom-button-green cursor-pointer"
						>
							Send Enquiry
						</button>
					</form>
					<p className="text-gray-500 text-sm mt-4 text-center">
						By sending this form you agree to our{" "}
						<a
							href="/pages/privacy-policy"
							className="text-blue-500 hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							privacy policy
						</a>
						.
					</p>
				</div>
			</div>}
		</div>
	)
}
export default MakeQuery
