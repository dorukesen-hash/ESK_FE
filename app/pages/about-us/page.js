import Image from "next/image";
import banner from "@/assets/pages-images/about-us.jpeg";

const Page = () => {
	return (
		<div className="bg-white min-h-screen text-text-dark flex flex-col">
			<Image
				src={banner}
				alt="About Us Banner"
				className="w-full h-[360px] object-center object-cover"
				priority
			/>
			<main className="w-full max-w-4xl mx-auto py-12 px-4">
				<h1 className="text-3xl font-bold mb-4">Who We Are at ESK Packaging</h1>
				<p className="text-justify mb-4">
					Established in 2021, ESK Packaging is more than a packaging materials supplier – we&#39;re your partner
					in delivering quality and value. We specialize in supplying businesses across the country with the
					highest quality industrial packaging materials.
				</p>
				<p className="text-justify mb-4">
					From humble beginnings in a small warehouse, we&#39;ve grown into a trusted supplier for businesses big
					and small across the nation. Our focus has always been on quality, affordability, and exceptional
					customer service. We&#39;re proud of the reputation we&#39;ve built and are committed to continually
					improving our products and services to better serve our customers.
				</p>
				<p className="text-justify mb-4">
					We offer a wide range of product lines, from strapping, stretch film, edge & corner protectors
					through to tools and accessories.
				</p>
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">What Sets Us Apart</h2>
					<ul className="list-disc pl-6 text-justify mb-2">
						<li>
							<strong>Low Price Guarantee</strong>
							<br />
							We&#39;ll meet or beat any total order price for the identical product and quantity. Don&#39;t be
							misled by the &#34;free shipping&#34; that some competitors are offering. The freight costs are
							padded back into the price of the product.
						</li>
						<li>
							<strong>Fast Shipping</strong>
							<br />
							Fast and reliable shipping on all orders. Most stock orders placed by 2:00 p.m. EST ship
							the very same day. If your order requires faster service, let us know.
						</li>
						<li>
							<strong>100% Satisfaction Guarantee</strong>
							<br />
							If you&#39;re not 100% satisfied with your order, we accept returns within 30 days of the
							delivery date. Please contact Customer Service and we will help you arrange the return and
							provide a replacement. Non-defective returns are subject to a 15% restocking fee.
						</li>
						<li>
							<strong>Quality Assurance</strong>
							<br />
							We understand that our customers&#39; trust hinges on the quality of our products. That&#39;s why
							quality assurance isn&#39;t just a process, it&#39;s a promise – a promise that every product we
							sell is designed and manufactured to meet the highest standards of performance and
							reliability.
						</li>
					</ul>
				</section>
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">Mission</h2>
					<ul className="list-none pl-0 text-justify mb-2">
						<li>
							<strong>Our Goal</strong>
							<br />
							To deliver high-quality, affordable products that meet your packaging needs.
						</li>
						<li>
							<strong>Our Commitment</strong>
							<br />
							Our customer-centric approach is the backbone of our operations. We strive for excellence in
							everything we do, ensuring the best service, the best products, and the best prices.
						</li>
						<li>
							<strong>Our Philosophy</strong>
							<br />
							Inspired by Rumi, who said, &#34;Let the beauty of what you love be what you do.&#34; We see our
							work as an art — the art of safeguarding your products, your trust, and your peace of
							mind.
						</li>
					</ul>
				</section>
				<section className="mb-8">
					<h2 className="text-xl font-bold mb-2">Our Address</h2>
					<div className="flex flex-col md:flex-row gap-6">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.768146495125!2d-96.70938092473695!3d32.90567867481211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c1f34679b4f29%3A0x448b0d954874ba94!2sESK%20Packaging%20LLC!5e0!3m2!1sen!2sus!4v1713960000001!5m2!1sen!2sus&hl=en&gl=US"
							width="100%"
							height="350"
							allowFullScreen=""
							loading="lazy"
							className="w-full md:w-1/2"
						/>

						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.1799833594844!2d-121.4831051!3d38.5984873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809add2e6fa345b3%3A0x953bc38b5702999f!2s1099%20Vine%20St%20%23204%2C%20Sacramento%2C%20CA%2095811!5e0!3m2!1sen!2sus!4v1713960000000!5m2!1sen!2sus&hl=en&gl=US"
							width="100%"
							height="350"
							allowFullScreen=""
							loading="lazy"
							className="w-full md:w-1/2"
						/>
					</div>
				</section>

			</main>
		</div>
	);
};

export default Page;
