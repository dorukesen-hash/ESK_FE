"use client";

import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Link from "next/link";

const EMAIL = "sales@eskpackaging.com";

const FAMILIES = [
	"Strapping & Load Securement",
	"Edge Protection",
	"Stretch Film & Pallet Wrap",
	"Packaging Tape",
	"Protective Packaging",
	"Boxes & Mailers",
	"Packaging Equipment",
	"Tools & Accessories",
];

const HELP_POINTS = [
	"Product selection support — compare materials, specifications and buying quantities for your application.",
	"Bulk-order and volume pricing for pallet and container quantities.",
	"Custom-product assistance, including custom corner boards and custom boxes.",
];

const schema = yup.object().shape({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Enter a valid email address").required("Email is required"),
	company: yup.string().required("Company is required"),
	message: yup.string().required("Tell us what you need quoted"),
});

function RequiredMark() {
	return <span aria-hidden="true" className="text-red-500"> *</span>;
}

export default function QuoteSection() {
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema)});

	const onSubmit = (data) => {
		const subject = encodeURIComponent(`Quote request — ${data.company}`);
		const body = encodeURIComponent(
			`Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\n\n${data.message}`
		);
		window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
		reset();
	};

	const inputClass = (err) =>
		`w-full p-3 border-2 rounded-[8px] bg-white focus:outline-none focus:border-custom-blue ${
			err ? "border-red-500" : "border-border-gray"
		}`;

	return (
		<section id="quote" aria-labelledby="quote-title" className="w-full bg-[#F4F6F8] border-t-2 border-border-gray/50 scroll-mt-[140px]">
			<div className="max-w-[1440px] mx-auto px-6 tablet:px-[24px] py-14 flex flex-col laptop:flex-row gap-10">
				<div className="laptop:w-1/2 flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<h2 id="quote-title" className="text-[26px] tablet:text-[34px] font-bold text-text-dark">
							Request a Quote
						</h2>
						<p className="text-[15px] tablet:text-[17px] text-text-light max-w-[560px]">
							Tell us what you need quoted, and our team will follow up with pricing and availability.
						</p>
					</div>

					<div className="flex flex-col gap-2">
						<h3 className="text-[16px] tablet:text-[17px] font-bold text-text-dark">How our sales team helps</h3>
						<ul className="flex flex-col gap-2 max-w-[560px]">
							{HELP_POINTS.map((point) => (
								<li key={point} className="flex gap-2.5 text-[14px] tablet:text-[15px] text-text-light leading-relaxed">
									<span aria-hidden="true" className="text-custom-blue font-bold mt-[1px]">✓</span>
									<span>{point}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="flex flex-col gap-2">
						<h3 className="text-[14px] font-bold uppercase tracking-[0.12em] text-text-dark">
							Product families we quote
						</h3>
						<ul className="flex flex-wrap gap-1.5 max-w-[560px]">
							{FAMILIES.map((family) => (
								<li
									key={family}
									className="inline-flex items-center px-2.5 py-1 rounded-full border border-border-gray bg-white text-[12px] tablet:text-[13px] font-semibold text-text-dark"
								>
									{family}
								</li>
							))}
						</ul>
					</div>

					<div className="flex flex-col gap-1 border-t-2 border-border-gray/60 pt-4 max-w-[560px]">
						<p className="text-[14px] font-semibold text-text-dark">Prefer to reach us directly?</p>
						<div className="flex flex-col mobile:flex-row mobile:items-center gap-1 mobile:gap-5">
							<a href="tel:+14699922447" className="py-1 text-[15px] font-semibold text-custom-blue hover:underline">
								469-992-2447
							</a>
							<a href={`mailto:${EMAIL}`} className="py-1 text-[15px] font-semibold text-custom-blue hover:underline">
								{EMAIL}
							</a>
						</div>
						<address className="not-italic text-[14px] text-text-light">2050 Forest Ln #350, Garland, TX 75042</address>
					</div>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					className="laptop:w-1/2 bg-white border-2 border-border-gray rounded-[12px] p-6 tablet:p-8 flex flex-col gap-4"
				>
					<p className="text-[12px] text-text-light">
						Fields marked <span aria-hidden="true" className="text-red-500">*</span> are required.
					</p>
					<div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
						<div>
							<label htmlFor="quote-name" className="block text-[13px] font-semibold text-text-dark mb-1">
								Name<RequiredMark/>
							</label>
							<input
								id="quote-name"
								type="text"
								aria-required="true"
								aria-invalid={errors.name ? "true" : "false"}
								aria-describedby={errors.name ? "quote-name-error" : undefined}
								{...register("name")}
								className={inputClass(errors.name)}
							/>
							{errors.name && (
								<p id="quote-name-error" role="alert" className="text-red-500 text-sm mt-1">{errors.name.message}</p>
							)}
						</div>
						<div>
							<label htmlFor="quote-email" className="block text-[13px] font-semibold text-text-dark mb-1">
								Email<RequiredMark/>
							</label>
							<input
								id="quote-email"
								type="email"
								aria-required="true"
								aria-invalid={errors.email ? "true" : "false"}
								aria-describedby={errors.email ? "quote-email-error" : undefined}
								{...register("email")}
								className={inputClass(errors.email)}
							/>
							{errors.email && (
								<p id="quote-email-error" role="alert" className="text-red-500 text-sm mt-1">{errors.email.message}</p>
							)}
						</div>
					</div>
					<div>
						<label htmlFor="quote-company" className="block text-[13px] font-semibold text-text-dark mb-1">
							Company<RequiredMark/>
						</label>
						<input
							id="quote-company"
							type="text"
							aria-required="true"
							aria-invalid={errors.company ? "true" : "false"}
							aria-describedby={errors.company ? "quote-company-error" : undefined}
							{...register("company")}
							className={inputClass(errors.company)}
						/>
						{errors.company && (
							<p id="quote-company-error" role="alert" className="text-red-500 text-sm mt-1">{errors.company.message}</p>
						)}
					</div>
					<div>
						<label htmlFor="quote-message" className="block text-[13px] font-semibold text-text-dark mb-1">
							What do you need quoted?<RequiredMark/>
						</label>
						<textarea
							id="quote-message"
							rows="4"
							placeholder="Product, size, quantity, destination…"
							aria-required="true"
							aria-invalid={errors.message ? "true" : "false"}
							aria-describedby={errors.message ? "quote-message-error" : undefined}
							{...register("message")}
							className={inputClass(errors.message)}
						/>
						{errors.message && (
							<p id="quote-message-error" role="alert" className="text-red-500 text-sm mt-1">{errors.message.message}</p>
						)}
					</div>
					<button
						type="submit"
						className="w-full h-[52px] rounded-[10px] bg-custom-blue text-white font-semibold text-[16px] hover:bg-custom-button-green transition-colors cursor-pointer"
					>
						Send Quote Request
					</button>
					<p className="text-[12px] text-text-light text-center">
						Share your product requirements with our sales team — your request goes to {EMAIL}.{" "}
						By sending this form you agree to our{" "}
						<Link href="/pages/privacy-policy" className="text-custom-blue hover:underline">
							privacy policy
						</Link>.
					</p>
				</form>
			</div>
		</section>
	);
}
