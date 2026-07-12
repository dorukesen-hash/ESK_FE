"use client"
import {useState} from "react";
import Image from "next/image";
import banner from "@/assets/pages-images/faq.jpeg";
import Accordion from "@/components/Accordion";
import Link from "next/link";

const Page = () => {
	const [search, setSearch] = useState("");
	const searchLower = search.toLowerCase();

	const faqData = {
		orderingAccount: [
			{
				q: "How do I place an order?",
				a: <>You can place an order directly through our website. Simply browse our product catalog, add items to your cart, and proceed to checkout. If you&apos;re a business buyer or need a custom quote, contact us at <a href="mailto:info@eskpackaging.com" className="text-blue-600 underline">info@eskpackaging.com</a>.</>
			},
			{
				q: "Can I place an order without creating an account?",
				a: "Yes, guest checkout is available. However, creating an account allows you to view order history, save addresses, and manage billing information."
			},
			{
				q: "How do I apply for Net 30 terms or open a business account?",
				a: <>Please email your business credentials to <a href="mailto:info@eskpackaging.com" className="text-blue-600 underline">info@eskpackaging.com</a>. We&#39;ll respond with a credit application form.</>
			},
			{
				q: "How do I reset my password?",
				a: "Click 'Forgot Password' on the login screen and follow the instructions sent to your registered email."
			}
		],
		shippingDelivery: [
			{
				q: "What carriers do you use?",
				a: "We ship via FedEx, UPS, and common carriers based on shipment size and type."
			},
			{
				q: "How long will my order take to arrive?",
				a: "Orders are processed within 1–2 business days. Delivery typically takes 2–5 business days depending on your location."
			},
			{
				q: "Do you offer expedited shipping?",
				a: "Yes, contact us before placing your order to arrange express delivery options."
			},
			{
				q: "Where do you ship from?",
				a: "We ship from Sacramento, California and Dallas, Texas to provide fast nationwide coverage."
			},
			{
				q: "How can I track my shipment?",
				a: "You'll receive a confirmation email with tracking number once your order ships. Please allow 48 hours for tracking information to update."
			}
		],
		returnsRefunds: [
			{
				q: "What is your return policy?",
				a: "We accept returns within 30 days of delivery. Items must be unused and in original packaging. A 15% restocking fee applies."
			},
			{
				q: "How do I start a return?",
				a: <>Email <a href="mailto:info@eskpackaging.com" className="text-blue-600 underline">info@eskpackaging.com</a> with your order number and return reason. We&#39;ll provide an RMA number and instructions.</>
			},
			{
				q: "Who pays for return shipping?",
				a: "Customers are responsible for return shipping costs unless the item is defective or was shipped in error."
			},
			{
				q: "What products are non-returnable?",
				a: "Custom or made-to-order items cannot be returned unless defective."
			},
			{
				q: "When will I receive my refund?",
				a: "Refunds are processed within 7–10 business days after we inspect the returned items."
			}
		],
		paymentBilling: [
			{
				q: "What payment methods do you accept?",
				a: "We accept major credit/debit cards and ACH payments. Stripe handles our secure payment processing."
			},
			{
				q: "Can I pay with Net 30 terms?",
				a: "Yes, qualified business accounts can apply for Net 30 terms by submitting a credit application."
			},
			{
				q: "How do I get a copy of my invoice?",
				a: <>Invoices are automatically emailed and available in your online account. You can also request one at <a href="mailto:info@eskpackaging.com" className="text-blue-600 underline">info@eskpackaging.com</a>.</>
			},
			{
				q: "Do you charge sales tax?",
				a: "Yes, we charge sales tax where applicable unless we have your resale certificate on file."
			}
		],
		technicalSupport: [
			{
				q: "I'm having trouble placing an order—what should I do?",
				a: <>Try refreshing your browser or clearing cookies. If problems continue, email us at <a href="mailto:info@eskpackaging.com" className="text-blue-600 underline">info@eskpackaging.com</a>.</>
			},
			{
				q: "I didn't receive a confirmation email.",
				a: "Check your spam/junk folder. If you can't find it, contact us to verify your order status."
			},
			{
				q: "I can't log into my account.",
				a: "Try resetting your password. If that doesn't work, contact support."
			},
			{
				q: "Website not displaying correctly?",
				a: "Make sure your browser is up to date. We recommend Chrome, Firefox, or Safari."
			}
		]
	};

	return (
		<div className="bg-white min-h-screen text-text-dark flex flex-col">
			<Image
				src={banner}
				alt="FAQ Banner"
				className="w-full h-[360px] object-center object-cover"
				priority
			/>

			<div className="w-full h-full flex justify-center">
				<div className="max-w-[80%] w-[1440px] bg-white text-text-dark px-6 md:px-20 py-16 ">
					<main className="w-full">
						<h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

						{/* Sayfa içi navigasyon */}
						<nav className="flex flex-col md:flex-row gap-1 items-start w-full mb-8 h-auto">
							{[
								{ id: 'ordering', label: 'ordering & Account' },
								{ id: 'shipping', label: 'Shipping & Delivery' },
								{ id: 'returns', label: 'Returns & Refunds' },
								{ id: 'payment', label: 'Payment & Billing' },
								{ id: 'technical', label: 'Technical Support & Troubleshooting' },
								{ id: 'policies', label: 'Policies & Legal' }
							].map(section => (
								<button
									key={section.id}
									type="button"
									className="w-full h-[60px] p-1 cursor-pointer bg-custom-blue hover:bg-custom-button-green text-text-white font-semibold transition-colors duration-200"
									onClick={() => {
										const el = document.getElementById(section.id);
										if (el) {
											const headerOffset = 180; // header yüksekliği (px)
											const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
											const offsetPosition = elementPosition - headerOffset;
											window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
										}
									}}
								>
									{section.label}
								</button>
							))}
						</nav>


						<div className="mb-8 flex items-center gap-4 justify-end">
							<div className="relative w-full max-w-md">
								<input
									type="text"
									placeholder="Search FAQ..."
									value={search}
									onChange={e => setSearch(e.target.value)}
									className="border-b-1 border-text-dark px-4 py-2 w-full focus:outline-none pr-10"
								/>
								{search && (
									<button
										type="button"
										onClick={() => setSearch("")}
										className="absolute font-extrabold right-2 top-1/2 -translate-y-1/2 text-text-blue hover:text-custom-button-green"
										aria-label="Clear"
									>
										&#10005;
									</button>
								)}
							</div>
						</div>

						<section id="ordering" className="mb-10">
							<h2 className="text-xl font-bold mb-4">1. Ordering & Account</h2>
							<Accordion items={faqData.orderingAccount.filter(item => item.q.toLowerCase().includes(searchLower) || (typeof item.a === 'string' ? item.a.toLowerCase().includes(searchLower) : false))} />
						</section>
						<section id="shipping" className="mb-10">
							<h2 className="text-xl font-bold mb-4">2. Shipping & Delivery</h2>
							<Accordion items={faqData.shippingDelivery.filter(item => item.q.toLowerCase().includes(searchLower) || (typeof item.a === 'string' ? item.a.toLowerCase().includes(searchLower) : false))} />
						</section>
						<section id="returns" className="mb-10">
							<h2 className="text-xl font-bold mb-4">3. Returns & Refunds</h2>
							<Accordion items={faqData.returnsRefunds.filter(item => item.q.toLowerCase().includes(searchLower) || (typeof item.a === 'string' ? item.a.toLowerCase().includes(searchLower) : false))} />
						</section>
						<section id="payment" className="mb-10">
							<h2 className="text-xl font-bold mb-4">4. Payment & Billing</h2>
							<Accordion items={faqData.paymentBilling.filter(item => item.q.toLowerCase().includes(searchLower) || (typeof item.a === 'string' ? item.a.toLowerCase().includes(searchLower) : false))} />
						</section>
						<section id="technical" className="mb-10">
							<h2 className="text-xl font-bold mb-4">5. Technical Support & Troubleshooting</h2>
							<Accordion items={faqData.technicalSupport.filter(item => item.q.toLowerCase().includes(searchLower) || (typeof item.a === 'string' ? item.a.toLowerCase().includes(searchLower) : false))} />
						</section>
						<section id="policies" className="mb-10">
							<h2 className="text-xl font-bold mb-4">6. Policies & Legal</h2>
							<ul className="list-none pl-0 text-justify mb-2">
								<li className="mb-2">
									<Link href="pages/terms-and-conditions" className="text-blue-600 hover:underline">
										Terms & Conditions
									</Link>
								</li>
								<li className="mb-2">
									<Link href="/pages/privacy-policy" className="text-blue-600 hover:underline">
										Privacy Policy
									</Link>
								</li>
								<li className="mb-2">
									<Link href="/pages/shipping-policy" className="text-blue-600 hover:underline">
										Shipping Policy
									</Link>
								</li>
								<li className="mb-2">
									<Link href="/pages/return-policy" className="text-blue-600 hover:underline">
										Return & Refund Policy
									</Link>
								</li>
							</ul>
						</section>
					</main>
				</div>
			</div>
		</div>
	);
}



export default Page;