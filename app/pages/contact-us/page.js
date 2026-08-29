"use client";

import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Link from "next/link";

const CONTACT = {
	phoneDisplay: "469-992-2447",
	phoneHref: "tel:+14699922447",
	email: "sales@eskpackaging.com",
};

const LOCATIONS = [
	{
		name: "Garland, TX",
		addressLines: ["2050 Forest Ln #350", "Garland, TX 75042", "United States"],
		directionsHref:
			"https://www.google.com/maps/dir/?api=1&destination=2050+Forest+Ln+%23350,+Garland,+TX+75042",
		mapSrc:
			"https://maps.google.com/maps?q=2050+Forest+Ln+%23350,+Garland,+TX+75042&hl=en&gl=US&z=14&output=embed",
	},
	{
		name: "Sacramento, CA",
		addressLines: ["1099 Vine St #204", "Sacramento, CA 95811", "United States"],
		directionsHref:
			"https://www.google.com/maps/dir/?api=1&destination=1099+Vine+St+%23204,+Sacramento,+CA+95811",
		mapSrc:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.1799833594844!2d-121.4831051!3d38.5984873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809add2e6fa345b3%3A0x953bc38b5702999f!2s1099%20Vine%20St%20%23204%2C%20Sacramento%2C%20CA%2095811!5e0!3m2!1sen!2sus!4v1713960000000!5m2!1sen!2sus&hl=en&gl=US",
	},
];

const directionsButtonClass =
	"inline-flex items-center justify-center h-[40px] px-4 rounded-[10px] border-2 border-custom-blue text-custom-blue text-[14px] font-semibold hover:bg-custom-blue hover:text-white transition-colors";

const schema = yup.object().shape({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Enter a valid email address").required("Email is required"),
	company: yup.string(),
	phone: yup.string(),
	message: yup.string().required("Message is required"),
});

function RequiredMark() {
	return <span aria-hidden="true" className="text-red-500"> *</span>;
}

function Field({id, label, required, error, children}) {
	return (
		<div>
			<label htmlFor={id} className="block text-[13px] font-semibold text-text-dark mb-1">
				{label}
				{required && <RequiredMark/>}
			</label>
			{children}
			{error && (
				<p id={`${id}-error`} role="alert" className="text-red-500 text-sm mt-1">{error.message}</p>
			)}
		</div>
	);
}

export default function ContactPage() {
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema)});

	const onSubmit = (data) => {
		const subject = encodeURIComponent(`Website contact — ${data.name}`);
		const body = encodeURIComponent(
			`Name: ${data.name}\nEmail: ${data.email}` +
			(data.company ? `\nCompany: ${data.company}` : "") +
			(data.phone ? `\nPhone: ${data.phone}` : "") +
			`\n\n${data.message}`
		);
		window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
		reset();
	};

	const inputClass = (err) =>
		`w-full p-3 border-2 rounded-[8px] bg-white focus:outline-none focus:border-custom-blue ${
			err ? "border-red-500" : "border-border-gray"
		}`;

	const fieldProps = (name, required) => ({
		"aria-required": required ? "true" : undefined,
		"aria-invalid": errors[name] ? "true" : "false",
		"aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
	});

	return (
		<main className="w-full bg-white">
			<div className="max-w-[1200px] mx-auto px-6 tablet:px-[24px] py-12 tablet:py-16">
				<h1 className="text-[28px] tablet:text-[38px] font-bold text-text-dark">Contact ESK Packaging</h1>
				<p className="text-[15px] tablet:text-[17px] text-text-light mt-3 max-w-[680px] leading-relaxed">
					Questions about products, pricing or an existing order? Send us a message and our team will
					follow up.
				</p>

				<div className="flex flex-col min-[1024px]:flex-row gap-8 min-[1024px]:gap-12 mt-8">
					<div className="min-[1024px]:w-[38%] self-start">
						<div className="border-2 border-border-gray rounded-[12px] p-5">
							<h2 className="font-bold text-[17px] text-text-dark">Contact Details</h2>
							<dl className="mt-3 flex flex-col gap-3">
								<div>
									<dt className="text-[13px] font-semibold text-text-light">Phone</dt>
									<dd>
										<a href={CONTACT.phoneHref} className="text-[17px] font-semibold text-custom-blue hover:underline">
											{CONTACT.phoneDisplay}
										</a>
									</dd>
								</div>
								<div>
									<dt className="text-[13px] font-semibold text-text-light">Email</dt>
									<dd>
										<a href={`mailto:${CONTACT.email}`} className="text-[17px] font-semibold text-custom-blue hover:underline break-all">
											{CONTACT.email}
										</a>
									</dd>
								</div>
							</dl>
						</div>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						className="min-[1024px]:w-[62%] bg-white border-2 border-border-gray rounded-[12px] p-6 tablet:p-8 flex flex-col gap-4 h-fit"
					>
						<p className="text-[12px] text-text-light">
							Fields marked <span aria-hidden="true" className="text-red-500">*</span> are required.
						</p>
						<div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
							<Field id="contact-name" label="Name" required error={errors.name}>
								<input id="contact-name" type="text" {...fieldProps("name", true)} {...register("name")} className={inputClass(errors.name)}/>
							</Field>
							<Field id="contact-email" label="Email" required error={errors.email}>
								<input id="contact-email" type="email" {...fieldProps("email", true)} {...register("email")} className={inputClass(errors.email)}/>
							</Field>
							<Field id="contact-company" label="Company (optional)" error={errors.company}>
								<input id="contact-company" type="text" {...fieldProps("company", false)} {...register("company")} className={inputClass(errors.company)}/>
							</Field>
							<Field id="contact-phone" label="Phone (optional)" error={errors.phone}>
								<input id="contact-phone" type="tel" {...fieldProps("phone", false)} {...register("phone")} className={inputClass(errors.phone)}/>
							</Field>
						</div>
						<Field id="contact-message" label="Message" required error={errors.message}>
							<textarea
								id="contact-message"
								rows="5"
								placeholder="How can we help?"
								{...fieldProps("message", true)}
								{...register("message")}
								className={inputClass(errors.message)}
							/>
						</Field>
						<button
							type="submit"
							className="w-full h-[52px] rounded-[10px] bg-custom-blue text-white font-semibold text-[16px] hover:bg-custom-button-green transition-colors cursor-pointer"
						>
							Send Message
						</button>
						<p className="text-[12px] text-text-light text-center">
							Opens your email app to send this message to {CONTACT.email}.
						</p>
					</form>
				</div>

				<section aria-labelledby="locations-title" className="mt-10">
					<h2 id="locations-title" className="text-[22px] tablet:text-[26px] font-bold text-text-dark mb-4">
						Our Locations
					</h2>
					<div className="grid grid-cols-1 min-[1024px]:grid-cols-2 gap-4 tablet:gap-6">
						{LOCATIONS.map((location) => (
							<div key={location.name} className="border-2 border-border-gray rounded-[12px] overflow-hidden flex flex-col">
								<div className="p-4 flex items-start justify-between gap-3">
									<div>
										<h3 className="font-bold text-[16px] text-text-dark">{location.name}</h3>
										<address className="not-italic mt-1 text-[14px] text-text-dark leading-relaxed">
											{location.addressLines.map((line) => (
												<span key={line} className="block">{line}</span>
											))}
										</address>
									</div>
									<Link
										href={location.directionsHref}
										target="_blank"
										rel="noopener noreferrer"
										className={`${directionsButtonClass} shrink-0`}
									>
										Get Directions
									</Link>
								</div>
								<iframe
									title={`Map of ESK Packaging — ${location.name}`}
									src={location.mapSrc}
									width="100%"
									height="260"
									allowFullScreen=""
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className="w-full border-0"
								/>
							</div>
						))}
					</div>
				</section>
			</div>
		</main>
	);
}
