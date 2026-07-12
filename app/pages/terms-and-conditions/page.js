import Image from "next/image";
import banner from "/assets/pages-images/terms-and-conditions.jpeg"
const Page = () => {
	return (
	<div className="bg-white min-h-screen text-text-dark flex flex-col justify-center">
		<Image
			src={banner}
			alt="Terms and Conditions"
			className="w-full h-[360px] object-top object-cover"
			priority
		/>
		<main className="w-full max-w-4xl mx-auto py-12 px-4">
			<h1 className="text-3xl font-bold mb-4">TERMS AND CONDITIONS OF SALE AND WEBSITE USE</h1>
			<p className="mb-2 font-semibold text-justify">Effective Date: July 10, 2025</p>
			<p className="mb-2 text-justify"><strong>Company:</strong> ESK Packaging LLC (&#34;ESK,&#34; &#34;we,&#34; &#34;us,&#34; or &#34;our&#34;)</p>
			<p className="mb-2 text-justify"><strong>Principal Office:</strong> Sacramento, California</p>
			<p className="mb-6 text-justify"><strong>Operational Fulfillment:</strong> Dallas, Texas</p>
			<hr className="my-6" />
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">1. LEGAL AGREEMENT AND ACCEPTANCE</h2>
				<p className="text-justify">These Terms and Conditions (&#34;Agreement&#34;) govern your access to and use of ESK&#39;s website and apply to all sales of goods and services by ESK to the Customer (&#34;you,&#34; &#34;your,&#34; or &#34;Buyer&#34;). This Agreement forms a legally binding contract between the parties and supersedes all prior proposals, communications, representations, or agreements, whether oral or written. No waiver, modification, or addition to this Agreement will be binding unless expressly agreed to in writing and executed by an authorized representative of ESK.</p>
				<p className="mt-2 text-justify">By accessing the website or submitting an order to ESK, you acknowledge that you have read, understood, and agreed to be bound by this Agreement in its entirety.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">2. JURISDICTION, VENUE, AND CHOICE OF LAW</h2>
				<p className="text-justify">This Agreement shall be governed exclusively by the laws of the State of California, without reference to its conflicts of law principles. You hereby irrevocably submit to the exclusive jurisdiction of the state and federal courts located in Sacramento County, California, and waive any objection based on forum non conveniens or venue.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">3. ORDER ACCEPTANCE, MODIFICATION, AND CANCELLATION</h2>
				<p className="text-justify">All quotations, proposals, and price lists issued by ESK are non-binding and subject to withdrawal or revision without notice. Orders submitted by Buyer are deemed offers to purchase and do not bind ESK until ESK provides written acknowledgment or begins performance. ESK reserves the right to reject, cancel, or limit quantities of any order, in whole or in part, at its sole discretion.</p>
				<p className="mt-2 text-justify">Orders for custom-manufactured goods or goods not regularly stocked are non-cancellable and non-returnable upon acceptance. Modifications to confirmed orders must be submitted in writing and require express written consent from ESK to be binding.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">4. PRICES, TAXES, AND PAYMENT TERMS</h2>
				<p className="text-justify">All prices are quoted in U.S. Dollars and exclude all applicable federal, state, and local taxes, freight charges, and other assessments unless expressly stated otherwise. All such amounts shall be paid by Buyer.</p>
				<p className="mt-2 text-justify">Unless otherwise agreed in writing, payment terms are Net 30 days from invoice date for approved commercial accounts. All other orders require payment in full at the time of order. Past-due amounts accrue interest at 1.5% per month (18% annually) or the maximum permitted by law, whichever is less. Buyer is responsible for all collection costs, attorneys&#39; fees, and court expenses incurred by ESK in recovering overdue amounts.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">5. DELIVERY, TITLE, AND RISK OF LOSS</h2>
				<p className="text-justify">Delivery shall be FOB Origin from ESK&#39;s facility in Sacramento, California, or its distribution hub in Dallas, Texas, unless otherwise stated. Title and risk of loss transfer to Buyer upon delivery to the carrier. Delivery dates provided by ESK are estimates only and not guaranteed. ESK is not liable for any delay in delivery or failure to perform due to causes beyond its reasonable control, including carrier delays, material shortages, strikes, labor disputes, natural disasters, force majeure events, or governmental actions.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">6. RETURNS, CLAIMS, AND DEFECTIVE GOODS</h2>
				<p className="text-justify">No goods may be returned to ESK without prior written authorization and issuance of a Return Material Authorization (RMA) number. Returns must be initiated within thirty (30) days of receipt and must reference the RMA number on all packaging and documentation. Returned goods must be in new, unused, and resalable condition in their original packaging. Unauthorized returns will be refused.</p>
				<p className="mt-2 text-justify">Claims for shortages, visible damage, or nonconforming products must be made in writing to ESK within forty-eight (48) hours of delivery and must include photographic evidence and documentation. Failure to notify ESK within this timeframe constitutes unqualified acceptance of the goods.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">7. LIMITED WARRANTY AND DISCLAIMER</h2>
				<p className="text-justify">ESK warrants solely that the goods sold will conform to the specifications set forth in the applicable invoice or product documentation at the time of shipment. This limited warranty extends for thirty (30) days from delivery.</p>
				<p className="mt-2 font-semibold">THIS WARRANTY IS EXPRESSLY MADE IN LIEU OF ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, WHICH ARE HEREBY DISCLAIMED TO THE MAXIMUM EXTENT PERMITTED BY LAW.</p>
				<p className="mt-2 text-justify">Buyer&#39;s sole and exclusive remedy for breach of this warranty shall be, at ESK&#39;s option, repair or replacement of the defective goods, or credit not exceeding the original purchase price. Under no circumstances will ESK be liable for consequential, incidental, special, exemplary, or punitive damages of any kind.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">8. ONLINE ACCOUNTS, SECURITY, AND CONDUCT</h2>
				<p className="text-justify">If you register for an account on our website, you are responsible for maintaining the confidentiality of your login credentials and for all activity conducted under your account. You agree to notify ESK immediately of any unauthorized access or use.</p>
				<p className="mt-2 text-justify">You agree not to access or use the website for any unlawful, malicious, or disruptive activity, including introducing viruses or malware, attempting to access other user data, or interfering with website performance. ESK reserves the right to suspend or terminate accounts at any time for violation of these Terms or applicable law.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">9. INTELLECTUAL PROPERTY RIGHTS</h2>
				<p className="text-justify">All content, materials, trade dress, logos, product designs, specifications, technical documentation, software code, and other intellectual property displayed or distributed via the website are the exclusive property of ESK or its licensors. No license is granted to use any intellectual property except as required for standard purchasing or informational activities.</p>
				<p className="mt-2 text-justify">Reproduction, modification, distribution, or commercial exploitation of any content on this website without prior written authorization from ESK is strictly prohibited and may result in civil or criminal liability.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">10. INDEMNIFICATION</h2>
				<p className="text-justify">You agree to indemnify, defend, and hold harmless ESK, its officers, directors, employees, affiliates, and agents from and against any liabilities, losses, damages, claims, demands, costs, and expenses (including reasonable attorneys&#39; fees) arising from your breach of this Agreement, your use of our website, or your misuse of our goods.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">11. FORCE MAJEURE</h2>
				<p className="text-justify">ESK shall not be liable for any failure or delay in performing its obligations under this Agreement arising from acts, events, omissions, or accidents beyond its reasonable control, including strikes, lockouts, labor disturbances, natural disasters, pandemics, equipment failures, cyberattacks, supplier delays, or transportation breakdowns.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">12. SEVERABILITY AND WAIVER</h2>
				<p className="text-justify">If any provision of this Agreement is held invalid or unenforceable by a court of competent jurisdiction, such provision shall be severed from the Agreement, and the remainder shall remain in full force and effect. No waiver of any breach or default shall be deemed a waiver of any subsequent breach or default.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">13. ENTIRE AGREEMENT</h2>
				<p className="text-justify">This Agreement constitutes the entire understanding between the parties and supersedes all prior discussions, agreements, or representations, whether oral or written. Any additional terms provided by Buyer on purchase orders or other documents are rejected unless separately negotiated and accepted in writing by an authorized officer of ESK.</p>
			</section>
			<section className="mb-8">
				<h2 className="text-xl font-bold mb-2">14. NOTICES</h2>
				<p className="text-justify">All notices required under this Agreement shall be in writing and shall be deemed given when delivered by hand, certified mail, or email with confirmation, to:</p>
				<ul className="list-none mt-2">
					<li><strong>ESK Packaging LLC</strong></li>
					<li>📍 Head Office: Sacramento, CA</li>
					<li>📦 Warehouse: Dallas, TX</li>
					<li>📧 Email: <a href="mailto:info@eskpackaging.com" className="text-blue-600 hover:underline">info@eskpackaging.com</a></li>
				</ul>
			</section>
		</main>
	</div>
	);
};

export default Page;