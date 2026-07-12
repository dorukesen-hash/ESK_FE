import Image from "next/image";
import banner from "@/assets/pages-images/privacy-policy.jpeg";

const Page = () => {
	return (
		<div className="bg-white min-h-screen text-text-dark flex flex-col ">
			<Image
				src={banner}
				alt="Privacy Policy"
				className="w-full h-[360px] object-center object-cover"
				priority
			/>
			<main className="w-full max-w-4xl mx-auto py-12 px-4">
				<h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
				<p className="text-justify mb-4">
					At ESK Packaging LLC (&#34;we,&#34; &#34;us,&#34; or &#34;our&#34;), your privacy and trust are
					our highest priorities. This Privacy Policy explains how we collect, use,
					and safeguard your information when you visit our website or use our
					services. By using our website, you agree to these terms.
				</p>
				<hr className="my-6" />
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">1. Information We Collect</h2>
					<p className="text-justify mb-2">
						We collect personal information that you voluntarily provide when you:
					</p>
					<ul className="list-disc pl-6 text-justify mb-2">
						<li>Place an order through our website</li>
						<li>Create an account or login</li>
						<li>Subscribe to email communications</li>
						<li>Submit a contact form or reach out to customer service</li>
					</ul>
					<p className="text-justify mb-2">
						This may include your name, company, email address, shipping and
						billing address, phone number, and order history.
					</p>
					<p className="text-justify mb-2">
						We also automatically collect anonymous information through cookies,
						including your IP address, browser type, device data, and site
						activity. This helps us improve site performance and enhance your
						customer experience.
					</p>
				</section>
				<hr className="my-6" />
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">2. How We Use Your Information</h2>
					<p className="text-justify mb-2">We use the information we collect to:</p>
					<ul className="list-disc pl-6 text-justify mb-2">
						<li>Process and fulfill orders</li>
						<li>Provide order updates and shipment tracking</li>
						<li>Respond to customer service requests</li>
						<li>Analyze trends and optimize website performance</li>
						<li>Prevent fraud and ensure security</li>
						<li>Comply with applicable legal and tax obligations</li>
					</ul>
				</section>
				<hr className="my-6" />
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">3. Payment Security and Processing</h2>
					<p className="text-justify mb-2 font-semibold">
						We do not store or retain any payment card details on our servers.
					</p>
					<p className="text-justify mb-2">
						All payments made through our website are processed securely via{" "}
						<strong>Stripe</strong>, a trusted, PCI-DSS-compliant payment processor.
						When you enter payment information at checkout, it is{" "}
						<strong>
							encrypted and transmitted directly to Stripe&#39;s secure platform
						</strong>
						, completely bypassing our systems.
					</p>
					<p className="text-justify mb-2">
						Stripe uses end-to-end encryption, tokenization, and fraud protection to
						keep your information safe. Learn more about Stripe&#39;s security at{" "}
						<a
							href="https://stripe.com/docs/security"
							target="_blank"
							className="text-blue-600 underline"
						>
							https://stripe.com/docs/security
						</a>
						.
					</p>
					<p className="text-justify mb-2">
						By using our services, you authorize Stripe to process your payment and
						agree to their privacy and security terms.
					</p>
				</section>
				<hr className="my-6" />
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">4. Third-Party Services</h2>
					<p className="text-justify mb-2">
						We partner with select trusted third-party providers to help run our
						business, including:
					</p>
					<ul className="list-disc pl-6 text-justify mb-2">
						<li>Stripe (payment processing)</li>
						<li>FedEx, UPS, and common carriers (shipping)</li>
						<li>Google Analytics (website analytics)</li>
						<li>Email and CRM tools</li>
					</ul>
					<p className="text-justify mb-2">
						These partners access only the information necessary to perform their
						specific functions and must keep your data confidential.
					</p>
				</section>
				<hr className="my-6" />
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">5. Cookies and Tracking</h2>
					<p className="text-justify mb-2">
						Our website uses cookies to remember your preferences, monitor traffic,
						and improve usability. You may disable cookies in your browser
						settings, though this might limit your ability to use certain
						features.
					</p>
				</section>
				<hr className="my-6" />
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">6. Data Retention</h2>
					<p className="text-justify mb-2">
						We retain only information necessary for completing transactions and
						supporting customer accounts. You may request deletion of your data at
						any time by contacting{" "}
						<a
							href="mailto:info@eskpackaging.com"
							className="text-blue-600 underline"
						>
							info@eskpackaging.com
						</a>
						, unless we&#39;re legally required to retain it (for tax or regulatory
						compliance).
					</p>
				</section>
				<hr className="my-6" />
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">7. Your Rights</h2>
					<p className="text-justify mb-2">
						California residents may request access to, correction of, or deletion
						of personal data we hold under the California Consumer Privacy Act
						(CCPA). We do not sell personal information.
					</p>
					<p className="text-justify mb-2">
						To make a request, email us at{" "}
						<a
							href="mailto:info@eskpackaging.com"
							className="text-blue-600 underline"
						>
							info@eskpackaging.com
						</a>
						.
					</p>
				</section>
				<hr className="my-6" />
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">8. Children&#39;s Privacy</h2>
					<p className="text-justify mb-2">
						Our services are not intended for children under 13. We do not
						knowingly collect personal information from minors. If you believe a
						child has provided personal data, please contact us for prompt
						deletion.
					</p>
				</section>
				<hr className="my-6" />
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">9. Policy Updates</h2>
					<p className="text-justify mb-2">
						This Privacy Policy may be updated periodically. Changes will be
						posted on this page with the new effective date. Your continued use
						of the website after updates constitutes acceptance of these changes.
					</p>
				</section>
				<hr className="my-6" />
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">10. Contact Us</h2>
					<p className="text-justify mb-2">
						If you have questions about this Privacy Policy or our data practices,
						please contact us:
					</p>
					<ul className="list-none mt-2 text-justify">
						<li>
							<strong>ESK Packaging LLC</strong>
						</li>
						<li>
							📧{" "}
							<a
								href="mailto:info@eskpackaging.com"
								className="text-blue-600 underline"
							>
								info@eskpackaging.com
							</a>
						</li>
						<li>📍 Sacramento, CA</li>
					</ul>
				</section>
			</main>
		</div>
	);
};

export default Page;

