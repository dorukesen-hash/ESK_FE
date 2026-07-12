import React from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {AppProvider} from '@/Context/AppContext'
import BackToTop from "@/components/BackToTop";
import {ToastContainer} from 'react-toastify';
import BottomNavBar from "@/components/BottomNavBar";
import PopUp from "@/components/popup/PopUp";

export const metadata = {
	title: "Esk Packaging",
	description: "...",
};

export default function RootLayout({children}) {

	const googleClientId = process.env.GOOGLE_CLIENT_ID


	return (
		<html lang="en">
		<head>
			<link rel="preconnect" href="https://fonts.googleapis.com"/>
			<link rel="preconnect" href="https://fonts.gstatic.com"/>
			<link
				href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
				rel="stylesheet"/>
			<title></title>
			<link rel="icon" href="/ESK_icon_mini.png" type="image/png"/>
		</head>
		<body>
			<GoogleOAuthProvider clientId={googleClientId}>
				<AppProvider >
					<Header/>
					{children}
					<BackToTop/>
					<BottomNavBar/>
					<Footer/>
					<PopUp/>
				</AppProvider>
			</GoogleOAuthProvider>
			<ToastContainer/>
		</body>
		</html>
	);
}
