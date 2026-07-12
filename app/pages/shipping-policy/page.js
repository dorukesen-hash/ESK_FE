import Image from "next/image";
import banner from "@/assets/pages-images/shipping-policy.jpeg";

const Page = () => {
	return (
		<div className="bg-white min-h-screen text-text-dark flex flex-col">
			<Image
				src={banner}
				alt="Shpipping Policy"
				className="w-full h-[360px] object-center object-cover"
				priority
			/>
			<main className="w-full max-w-4xl mx-auto py-12 px-4">
				<h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>
				<p className="text-justify mb-4">
					At ESK Packaging, we are committed to fast, reliable shipping. We process all orders within
					1-2 business days after you receive your order confirmation email. Once your order ships,
					you&#39;ll receive a notification with tracking information. Please note that tracking details
					may take up to 48 hours to activate in the carrier&#39;s system.
				</p>
				<p className="text-justify mb-4">
					We ship via FedEx, UPS, or common carrier based on your order&#39;s size, weight, and
					destination. Our logistics team selects the most efficient shipping method for your
					specific needs. ESK Packaging prepays all shipping costs and invoices you at fulfillment
					unless otherwise agreed in writing. Special handling services—such as liftgate,
					residential delivery, or scheduled delivery—may incur additional charges, which will
					appear itemized on your invoice.
				</p>
				<p className="text-justify mb-4">
					Once your order is in transit, title and risk of loss transfer to you under our standard
					FOB Origin terms. We are not responsible for carrier-caused delays, loss, or damage after
					dispatch. If you receive visibly damaged goods, notify the delivery driver immediately
					and contact our support team within 48 hours. We may require photos and documentation to
					initiate a freight claim.
				</p>
				<p className="text-justify mb-4">
					If you haven&#39;t received your order within five business days of your shipping
					confirmation, please contact us at{" "}
					<a
						href="mailto:info@eskpackaging.com"
						className="text-blue-600 underline"
					>
						info@eskpackaging.com
					</a>{" "}
					with your name and order number. We&#39;ll promptly investigate and resolve the issue.
				</p>
				<p className="text-justify mb-4">
					Shipping timelines are estimates that may vary due to carrier volume, weather, or other
					factors beyond our control. Nevertheless, we ensure all shipments leave our facilities
					promptly and securely.
				</p>
				<p className="text-justify mb-4">
					For questions about tracking, freight quotes, or delivery arrangements, please reach out
					anytime. We&#39;re here to support you throughout the entire process.
				</p>
			</main>
		</div>
	);
};

export default Page;

