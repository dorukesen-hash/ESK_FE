import Head from 'next/head';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Image from "next/image";
import image from "@/assets/login-image.jpg";
import React from "react";



const Page = () => {
	return (
		<>
			<div className=" relative w-full h-full min-h-[980px] flex items-center justify-center text-text-dark">
				<Image
					src={image}
					alt="forgot-password"
					fill
					className="fixed -z-10 object-cover w-full h-full"
				/>
				<ForgotPasswordForm />
			</div>
		</>
	);
};

export default Page;
