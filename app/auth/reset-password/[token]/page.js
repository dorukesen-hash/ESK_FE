'use client';

import Head from 'next/head';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import Image from 'next/image';
import image from '@/assets/login-image.jpg';

const ResetPasswordPage = ({ params }) => {
	const { token } = params;

	return (
		<>
			<Head>
				<title>Reset Password - ESK Packaging</title>
				<meta name="description" content="Reset your password for ESK Packaging." />
			</Head>
			<div className=" relative w-full h-full min-h-[980px] flex items-center justify-center text-text-dark">
				<Image
					src={image}
					alt="reset-password"
					fill
					className="fixed -z-10 object-cover w-full h-full"
				/>
				{token && typeof token === 'string' ? (
					<ResetPasswordForm token={token} />
				) : (
					<div className="flex h-full justify-center p-20 gap-8 rounded-2xl backdrop-blur-lg bg-white/20">
						<div className="max-w-[1200px]">
							<h1 className="text-[48px] font-semibold text-red-600">Invalid Link</h1>
							<hr className="mb-8 border-button-gray" />
							<p className="text-text-dark">The password reset link is either invalid or missing a token. Please request a new one.</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ResetPasswordPage;
