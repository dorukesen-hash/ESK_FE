const Page = () => {
	return (
		<>

			<div className="bg-white text-text-dark px-6 md:px-20 py-16 w-full">
				<section className="max-w-5xl mx-auto">
					<h1 className="text-4xl md:text-5xl font-bold mb-8">Shipping Policy</h1>

					<div className="mb-10">
						<h2 className="text-2xl font-semibold mb-4">Privacy</h2>
						<p className="text-lg leading-relaxed">
							We are committed to safeguarding your personal data. Any information collected, such as your
							name, email address, or phone number, is used solely to provide services, respond to
							inquiries, or improve your experience with us.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
						<ul className="list-disc pl-6 text-lg leading-loose">
							<li>To process and respond to your requests.</li>
							<li>To improve our services and offerings.</li>
							<li>To comply with legal obligations.</li>
						</ul>
						<p className="text-lg leading-relaxed mt-4">
							We do not sell or share your personal information with third parties without your explicit
							consent, except as required by law.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-semibold mb-4">Data Security</h2>
						<p className="text-lg leading-relaxed">
							We employ robust security measures to protect your data from unauthorized access,
							alteration, or disclosure.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
						<p className="text-lg leading-relaxed">
							You have the right to access, update, or delete your personal data. If you wish to exercise
							your rights or have any concerns about your data, please contact us at [Insert Contact
							Information].
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
						<p className="text-lg leading-relaxed">
							We may update this policy from time to time. Any changes will be posted on this page, and we
							encourage you to review it periodically.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
						<p className="text-lg leading-relaxed">
							For any questions or concerns about our Cookies and Privacy Policy, please reach out to us
							at{" "}
							<a href="mailto:support@eskpackaging.com"
							   className="underline text-blue-600">support@eskpackaging.com</a>.
						</p>
					</div>
				</section>
			</div>
		</>
	);
};

export default Page;