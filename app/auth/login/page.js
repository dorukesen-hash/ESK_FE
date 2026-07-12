import Head from 'next/head';
import LoginForm from '@/components/auth/LoginForm';
import Image from "next/image";
import image from "@/assets/login-image.jpg";
import React from "react";

const Page = () => {
	return (
		<>
			<Head>
				<title>Register - ESK Packaging</title>
				<meta name="description" content="register page"/>
			</Head>
			<div className=" relative w-full h-full min-h-[980px] flex items-center justify-center text-text-dark">
				<Image
					src={image}
					alt="login"
					fill
					className="fixed -z-10 object-cover w-full h-full"
				/>
				<LoginForm/>
			</div>
		</>
	);
};

export default Page;
