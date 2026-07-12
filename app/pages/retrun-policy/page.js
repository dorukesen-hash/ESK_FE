import Image from "next/image";
import banner from "@/assets/pages-images/return-refund-policy.jpeg";

const Page = () => {
	return (
		<div className="bg-white min-h-screen text-text-dark flex flex-col">
			<Image
				src={banner}
				alt="Return Policy"
				className="w-full h-[360px] object-center object-cover"
				priority
			/>
			<main className="w-full max-w-4xl mx-auto py-12 px-4">
				<h1 className="text-3xl font-bold mb-4">Return & Refund Policy</h1>
				<p className="text-justify mb-4">
					We stand by the quality of our products. If you&#39;re not fully satisfied with your purchase,
					ESK Packaging accepts returns within 30 days of delivery. To qualify for a return, items
					must be unused, in their original condition, and securely packaged in the original carton
					or equivalent. All returns require pre-approval via email to{" "}
					<a
						href="mailto:info@eskpackaging.com"
						className="text-blue-600 underline"
					>
						info@eskpackaging.com
					</a>
					. Please include your order number, company name, and reason for return in your request.
				</p>
				<p className="text-justify mb-4">
					Customers are responsible for return shipping costs unless the return is due to our
					error. A <strong>15% restocking fee</strong> applies to all returned merchandise and will
					be deducted from your refund or credit.
				</p>
				<p className="text-justify mb-4">
					After we receive and inspect your return, we&#39;ll email you about the status of your
					refund. Approved refunds will be credited to your original payment method within 7–10
					business days, depending on your payment provider.
				</p>
				<p className="text-justify mb-4">
					Only standard-stock items are eligible for return.{" "}
					<strong>
						Tailor-made, special-order, or custom-manufactured products are final sale
					</strong>{" "}
					and cannot be returned or refunded except in cases of manufacturing defects or
					fulfillment errors by ESK Packaging.
				</p>
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">Damaged or Defective Products</h2>
					<p className="text-justify mb-2">
						If you receive a damaged, defective, or incorrect item, please contact ESK Customer
						Service immediately at{" "}
						<a
							href="mailto:info@eskpackaging.com"
							className="text-blue-600 underline"
						>
							info@eskpackaging.com
						</a>
						. Include the following in your email:
					</p>
					<ul className="list-disc pl-6 text-justify mb-2">
						<li>Your account name or number</li>
						<li>Invoice number</li>
						<li>Product number</li>
						<li>Description of the issue</li>
						<li>Photographs of the damaged or incorrect item(s)</li>
					</ul>
					<p className="text-justify mb-2">
						We&#39;ll promptly assess the issue and determine whether a replacement, credit, or refund
						is appropriate. In some cases, we may ask you to return the defective item for quality
						review before processing your claim.
					</p>
					<p className="text-justify mb-2">
						We reserve the right to deny refunds or credits if returned products don&#39;t meet our
						eligibility criteria.
					</p>
					<p className="text-justify mb-2">
						For questions about returns or product concerns, please contact our team at{" "}
						<a
							href="mailto:info@eskpackaging.com"
							className="text-blue-600 underline"
						>
							info@eskpackaging.com
						</a>
						. We&#39;re committed to ensuring your experience meets our high standards.
					</p>
				</section>
			</main>
		</div>
	);
};

export default Page;