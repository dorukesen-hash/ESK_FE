"use client"

import React, {useEffect, useState, useContext, useRef} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

import {AppContext} from "@/Context/AppContext";
import CartContainer from "@/components/cart/headerCart/CartContainer";
import LoginForm from "@/components/header/LoginForm";
import api from "@/hooks/Api";
import {successNote} from "@/utils/ToastNotify";


export default function ActionButtons() {
	const router = useRouter();
	const {state, dispatch, cartTotal, setCartTotal} = useContext(AppContext);
	const {user} = state;

	const [isSupportMenuOpen, setSupportMenuOpen] = useState(false);
	const [isUserMenuOpen, setUserMenuOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const userMenuRef = useRef(null);
	const cartMenuRef = useRef(null);

	const handleSignOut = async () => {
		try {
			const response = await api.post("/auth/logout");
			if (response.status === 200) {
				console.log("Logout successful!");
				dispatch({type: "LOGOUT"});
				dispatch({type: "SET_CART", payload: []});
				dispatch({type: "SET_DETAILED_CART", payload: []});
				setCartTotal(0);
				setUserMenuOpen(false)
				router.push("/")
				successNote(`Logged Out Successfully`)
			}
		} catch (error) {
			console.error("Error logging out");
		} finally {
			dispatch({type: "SET_USER", payload: null});
			dispatch({type: "SET_CART", payload: []});
			dispatch({type: "SET_DETAILED_CART", payload: []});
			setCartTotal(0);
		}
	};

	// Dışarı tıklanınca menüleri kapat
	useEffect(() => {
		function handleClickOutside(event) {
			if (isUserMenuOpen && userMenuRef.current && !userMenuRef.current.contains(event.target)) {
				setUserMenuOpen(false);
			}
			if (isCartOpen && cartMenuRef.current && !cartMenuRef.current.contains(event.target)) {
				setIsCartOpen(false);
			}
		}
		if (isUserMenuOpen || isCartOpen) {
			window.addEventListener("mousedown", handleClickOutside);
			return () => window.removeEventListener("mousedown", handleClickOutside);
		}
	}, [isUserMenuOpen, isCartOpen]);

	// Sayfa değişince menüleri kapat
	useEffect(() => {
		setSupportMenuOpen(false);
		setUserMenuOpen(false);
		setIsCartOpen(false);
	}, [router.pathname]);

	return (<div>
		<div className="hidden w-[450px] laptop:flex justify-between items-center">
			{/* Support Section */}
			<div className="relative z-10"
			     onMouseEnter={() => setSupportMenuOpen(true)}
			     onMouseLeave={() => setSupportMenuOpen(false)}>
				<button
					className={`flex h-[48px] items-center text-[16px] px-[12px] font-semibold border-b-[4px] cursor-pointer ${isSupportMenuOpen ? "bg-button-gray border-b-custom-blue" : "border-transparent hover:bg-button-gray hover:border-b-custom-blue"}`
					}>
					<svg className="mr-[8px]" width="32" height="32" viewBox="0 0 32 32" fill="none"
					     xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.2572 14.64C9.7772 15.9498 16.1872 22.4187 17.7572 23.1986C17.8572 23.0686 17.9671 22.9386 18.0571 22.7987C18.3271 22.3287 18.5972 21.8688 18.8372 21.3889C19.3372 20.3791 20.1671 20.2191 20.9571 20.4191C21.7971 20.639 22.6272 20.939 23.3972 21.3289C24.3872 21.8488 25.2972 22.5187 26.2672 23.0886C26.8772 23.4486 27.0471 23.9685 27.0671 24.6184C27.1371 27.008 25.9371 28.8377 23.6871 29.8176C21.6871 30.6974 19.6772 30.5874 17.6572 29.9275C15.3172 29.1676 13.2972 27.8679 11.3772 26.3681C8.37719 24.0185 5.87714 21.2189 3.94714 17.9294C2.97714 16.2797 2.22711 14.54 2.04711 12.6103C1.80711 10.1507 2.46711 7.99104 4.41711 6.3713C5.62711 5.37146 7.06715 5.1415 8.58715 5.44146C8.74715 5.47145 8.91721 5.58142 9.01721 5.7114C10.2572 7.34114 11.3872 9.05086 11.9672 11.0505C12.0572 11.3705 12.0771 11.7204 12.0771 12.0504C12.0771 12.6703 11.8172 13.1602 11.2572 13.4602C10.7172 13.7501 10.1872 14.0501 9.65722 14.35C9.50722 14.45 9.3872 14.56 9.2572 14.64Z"
							fill="#182434"/>
						<path
							d="M29.9574 15.1598C29.9574 15.4797 29.9774 15.8097 29.9574 16.1296C29.9274 16.5895 29.6074 16.8695 29.2074 16.8395C28.7874 16.8195 28.5374 16.5295 28.5474 16.0496C28.5974 13.45 27.9474 11.0504 26.4674 8.91076C24.3574 5.85125 21.4475 4.04153 17.7575 3.5516C17.0875 3.46162 16.4074 3.48163 15.7374 3.47163C15.2274 3.46163 14.9175 3.21168 14.9075 2.76175C14.8975 2.31183 15.1874 2.03187 15.7074 2.01187C22.4674 1.73192 28.4374 6.43116 29.7374 13.0701C29.8674 13.75 29.9175 14.4599 30.0075 15.1498C29.9775 15.1498 29.9674 15.1598 29.9574 15.1598Z"
							fill="#182434"/>
						<path
							d="M16.5171 5.82134C21.0871 5.93132 24.947 9.17079 25.817 13.6801C25.957 14.38 25.9571 15.1198 25.9871 15.8397C26.0071 16.1997 25.807 16.4696 25.447 16.5496C25.127 16.6296 24.827 16.5296 24.667 16.2397C24.577 16.0797 24.557 15.8597 24.557 15.6698C24.657 11.6004 21.657 8.30094 18.207 7.48108C17.497 7.3111 16.7571 7.28109 16.0171 7.24109C15.4771 7.2111 15.187 7.01114 15.167 6.56121C15.147 6.09129 15.4371 5.83134 15.9871 5.82134C16.1771 5.81134 16.3471 5.82134 16.5171 5.82134Z"
							fill="#182434"/>
						<path
							d="M22.3573 15.4396C22.3573 15.5996 22.3673 15.7696 22.3573 15.9295C22.3273 16.3595 22.0373 16.6194 21.6173 16.6094C21.2073 16.5994 20.9374 16.3095 20.9074 15.8896C20.8674 15.4296 20.8773 14.9597 20.7573 14.5198C20.2273 12.4701 18.4973 11.1303 16.3473 11.0703C15.9773 11.0603 15.6774 10.9803 15.5274 10.6104C15.3274 10.1105 15.6673 9.63055 16.2473 9.62055C17.6673 9.60056 18.9573 10.0205 20.0673 10.9104C21.5273 12.0602 22.2873 13.5899 22.3573 15.4396Z"
							fill="#182434"/>
					</svg>
					Support
				</button>
				{isSupportMenuOpen === true && (
					<div
						className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-[4px] w-[276px] h-[214px] shadow-custom flex flex-col items-center p-4">
						<Link href={"/pages/contact-us"}
						      className="w-full text-[16px] text-left pl-[20px] text-text-dark font-semibold py-[10px] border-r-[4px] border-transparent hover:bg-button-gray hover:border-r-custom-blue">
							Contact Us
						</Link>
						<Link href={"/pages/about-us"}
						      className="w-full text-[16px] text-left pl-[20px] text-text-dark font-semibold py-[10px] border-r-[4px] border-transparent hover:bg-button-gray hover:border-r-custom-blue">
							About Us
						</Link>
						<hr className="border-[1px] w-full my-[8px] border-button-gray"/>
						<Link href="tel:+18778269379"
						      className="w-full flex items-center justify-center hover:bg-button-gray p-[10px]">
							<svg width="28" height="29" viewBox="0 0 28 29" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<path
									d="M7.25707 12.6519C7.77707 13.9619 14.1871 20.4319 15.7571 21.2119C15.8571 21.0819 15.9671 20.952 16.0571 20.812C16.3271 20.342 16.5971 19.8819 16.8371 19.4019C17.3371 18.3919 18.1673 18.232 18.9573 18.432C19.7973 18.652 20.6272 18.9519 21.3972 19.3419C22.3872 19.8619 23.2971 20.5319 24.2671 21.1019C24.8771 21.4619 25.0471 21.982 25.0671 22.632C25.1371 25.022 23.9372 26.8519 21.6872 27.8319C19.6872 28.7119 17.6772 28.602 15.6572 27.942C13.3172 27.182 11.2972 25.882 9.37719 24.382C6.37719 22.032 3.87725 19.232 1.94725 15.942C0.977255 14.292 0.227108 12.552 0.047108 10.622C-0.192892 8.16196 0.467225 6.00197 2.41723 4.38197C3.62723 3.38197 5.06715 3.15197 6.58715 3.45197C6.74715 3.48197 6.91708 3.59193 7.01708 3.72193C8.25708 5.35193 9.38727 7.06196 9.96727 9.06196C10.0573 9.38196 10.0771 9.73196 10.0771 10.062C10.0771 10.682 9.81707 11.1719 9.25707 11.4719C8.71707 11.7619 8.18722 12.0619 7.65722 12.3619C7.50722 12.4619 7.37707 12.5619 7.25707 12.6519Z"
									fill="#5CA0E2"/>
								<path
									d="M27.9468 13.1618C27.9468 13.4818 27.9668 13.8119 27.9468 14.1319C27.9168 14.5919 27.5968 14.8718 27.1968 14.8418C26.7768 14.8218 26.5266 14.5319 26.5366 14.0519C26.5866 11.4519 25.9368 9.05184 24.4568 6.91184C22.3468 3.85184 19.4366 2.04185 15.7466 1.55185C15.0766 1.46185 14.3968 1.48184 13.7268 1.47184C13.2168 1.46184 12.9067 1.21188 12.8967 0.761876C12.8867 0.311876 13.1768 0.0318757 13.6968 0.0118757C20.4568 -0.268124 26.4268 4.43187 27.7268 11.0719C27.8568 11.7519 27.9066 12.4618 27.9966 13.1518C27.9766 13.1618 27.9568 13.1618 27.9468 13.1618Z"
									fill="#5CA0E2"/>
								<path
									d="M14.5168 3.8219C19.0868 3.9319 22.9469 7.17188 23.8169 11.6819C23.9569 12.3819 23.9571 13.1219 23.9871 13.8419C24.0071 14.2019 23.807 14.4719 23.447 14.5519C23.127 14.6319 22.837 14.5319 22.667 14.2419C22.577 14.0819 22.5569 13.8619 22.5569 13.6719C22.6569 9.60187 19.657 6.30187 16.207 5.48187C15.497 5.31187 14.7568 5.28188 14.0168 5.24188C13.4768 5.21188 13.187 5.01189 13.167 4.56189C13.147 4.09189 13.4371 3.8319 13.9871 3.8219C14.1671 3.8219 14.3368 3.8219 14.5168 3.8219Z"
									fill="#5CA0E2"/>
								<path
									d="M20.3474 13.4419C20.3474 13.6019 20.3574 13.7719 20.3474 13.9319C20.3174 14.3619 20.0274 14.6219 19.6174 14.6119C19.2074 14.6019 18.9375 14.3119 18.9075 13.8919C18.8675 13.4319 18.8773 12.9619 18.7573 12.5219C18.2273 10.4719 16.4974 9.13191 14.3474 9.07191C13.9774 9.06191 13.6774 8.98189 13.5274 8.61189C13.3274 8.11189 13.6673 7.6319 14.2473 7.6219C15.6673 7.6019 16.9574 8.02188 18.0674 8.91188C19.5274 10.0719 20.2774 11.5919 20.3474 13.4419Z"
									fill="#5CA0E2"/>
							</svg>
							<p className="text-custom-blue text-left ml-[18px] text-[14px] font-semibold">Call
								Us Now <br/> <span className="font-semibold text-[22px]">877-826-9379</span>
							</p>
						</Link>
					</div>
				)}
			</div>

			{/* User Section */}
			<div className="relative z-10" ref={userMenuRef}>
				<button
					onClick={() => setUserMenuOpen(!isUserMenuOpen)}
					className={`flex h-[48px] items-center text-[16px] px-[12px] font-semibold border-b-[4px] cursor-pointer ${
						isUserMenuOpen
							? "bg-button-gray border-b-custom-blue"
							: "border-transparent hover:bg-button-gray hover:border-b-custom-blue"
					}`}
				>
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M16.0101 30.9952C7.73005 31.0052 1.02004 24.2963 1.00004 16.0176C0.980045 7.73892 7.69001 1.01001 15.96 1.00001C24.27 0.990013 31 7.70894 31 15.9976C31 24.2763 24.2901 30.9952 16.0101 30.9952ZM24.5201 26.7459C28.2401 24.0363 31.01 18.2472 29.21 12.1382C27.45 6.15917 21.7801 2.01985 15.6501 2.24981C9.22007 2.47977 3.90008 6.89905 2.54008 13.168C1.25008 19.1371 4.24005 24.4762 7.51005 26.7459C10.8301 18.6372 21.5501 18.9971 24.5201 26.7459Z"
							fill="#182434"/>
						<path
							d="M10.5596 13.9784C10.5596 10.9689 12.9896 8.5293 15.9996 8.5293C19.0296 8.5293 21.4696 10.9889 21.4596 14.0184C21.4496 17.0179 18.9996 19.4375 15.9796 19.4275C12.9696 19.4275 10.5596 17.0079 10.5596 13.9784Z"
							fill="#182434"/>
					</svg>
					<p className="ml-[8px]">{user ? user.name : "Sign In"}</p>
				</button>
				{isUserMenuOpen === true && !user && (
					<div
						className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-[4px] w-[520px] shadow-custom flex flex-col items-center px-[38px]">

						<button onClick={() => setUserMenuOpen(false)}
						        className="cursor-pointer absolute top-2 right-2 text-2xl font-bold hover:text-red-500">
							<svg width="34" height="34" viewBox="0 0 34 34" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<path
									d="M17 33C25.8366 33 33 25.8366 33 17C33 8.16344 25.8366 1 17 1C8.16344 1 1 8.16344 1 17C1 25.8366 8.16344 33 17 33Z"
									fill="#5CA0E2" stroke="white" strokeWidth="2"/>
								<path d="M11.6104 22.3904L22.3904 11.6104" stroke="white" strokeWidth="3"
								      strokeMiterlimit="10"
								      strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M11.6104 11.6104L22.3904 22.3904" stroke="white" strokeWidth="3"
								      strokeMiterlimit="10"
								      strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</button>

						<h2 className="text-[26px] mt-[24px] mb-[20px] font-semibold text-text-blue">Sign In</h2>
						<hr className="border-[1px] w-full border-button-gray m-0"/>
						<p className="text-[18px] mt-[30px] mb-[14px] text-text-dark font-bold text-left w-full">Existing
							Customers</p>
						<LoginForm setUserMenuOpen={setUserMenuOpen}/>

						{/* Register Section */}
						<h2 className="text-[26px] mt-[100px] mb-[20px] font-semibold text-text-blue">Register</h2>
						<hr className="border-[1px] w-full border-button-gray m-0"/>
						<Link
							href="/auth/register"
							className="w-full h-[50px] my-[30px] rounded-[6px] bg-custom-blue text-center text-white text-[18px] font-semibold py-2 hover:bg-custom-button-green transition duration-200"
							onClick={() => setUserMenuOpen(false)}
						>
							Create an Account
						</Link>
					</div>
				)}
				{isUserMenuOpen === true && user && (
					<div
						className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-[4px] w-[316px] shadow-custom flex flex-col items-center px-[38px]">

						<button onClick={() => setUserMenuOpen(false)}
						        className="cursor-pointer absolute top-2 right-2 text-2xl font-bold hover:text-red-500">
							<svg width="34" height="34" viewBox="0 0 34 34" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<path
									d="M17 33C25.8366 33 33 25.8366 33 17C33 8.16344 25.8366 1 17 1C8.16344 1 1 8.16344 1 17C1 25.8366 8.16344 33 17 33Z"
									fill="#5CA0E2" stroke="white" strokeWidth="2"/>
								<path d="M11.6104 22.3904L22.3904 11.6104" stroke="white" strokeWidth="3"
								      strokeMiterlimit="10"
								      strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M11.6104 11.6104L22.3904 22.3904" stroke="white" strokeWidth="3"
								      strokeMiterlimit="10"
								      strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</button>

						<Link href="/auth/my-account"
						      className="flex items-center gap-[12px] text-[16px] mt-[30px] mb-[19px] text-text-dark font-semibold text-left w-full"
						      onClick={() => setUserMenuOpen(false)}
						>
							<svg width="26" height="26" viewBox="0 0 32 32" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<path
									d="M16.0101 30.9952C7.73005 31.0052 1.02004 24.2963 1.00004 16.0176C0.980045 7.73892 7.69001 1.01001 15.96 1.00001C24.27 0.990013 31 7.70894 31 15.9976C31 24.2763 24.2901 30.9952 16.0101 30.9952ZM24.5201 26.7459C28.2401 24.0363 31.01 18.2472 29.21 12.1382C27.45 6.15917 21.7801 2.01985 15.6501 2.24981C9.22007 2.47977 3.90008 6.89905 2.54008 13.168C1.25008 19.1371 4.24005 24.4762 7.51005 26.7459C10.8301 18.6372 21.5501 18.9971 24.5201 26.7459Z"
									fill="#5CA0E2"/>
								<path
									d="M10.5596 13.9784C10.5596 10.9689 12.9896 8.5293 15.9996 8.5293C19.0296 8.5293 21.4696 10.9889 21.4596 14.0184C21.4496 17.0179 18.9996 19.4375 15.9796 19.4275C12.9696 19.4275 10.5596 17.0079 10.5596 13.9784Z"
									fill="#5CA0E2"/>
							</svg>
							My Account</Link>
						<Link href="/auth/my-account/order-history"
						      className="flex items-center gap-[12px] text-[16px] mb-[19px] text-text-dark font-semibold text-left w-full"
						      onClick={() => setUserMenuOpen(false)}
						>
							<svg width="26" height="26" viewBox="0 0 26 26" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<path
									d="M17.6061 23H8.39394C6.55151 23 5 21.4158 5 19.5347V6.46535C5 4.58416 6.55151 3 8.39394 3H17.6061C19.4485 3 21 4.58416 21 6.46535V19.5347C21 21.4158 19.4485 23 17.6061 23Z"
									stroke="#5CA0E2" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
									strokeLinejoin="round"/>
								<path d="M9.6543 8.54297H16.3452" stroke="#5CA0E2" strokeWidth="2"
								      strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M9.6543 12.998H16.3452" stroke="#5CA0E2" strokeWidth="2"
								      strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M9.6543 17.4531H16.3452" stroke="#5CA0E2" strokeWidth="2"
								      strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							Order History</Link>
						<Link href="/auth/my-account/payments"
						      className="flex items-center gap-[12px] text-[16px] mb-[19px] text-text-dark font-semibold text-left w-full"
						      onClick={() => setUserMenuOpen(false)}
						>
							<svg width="26" height="26" viewBox="0 0 26 26" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<path
									d="M23 9.45395V17.5461C23 19.4211 21.4158 21 19.5347 21H6.46535C4.58416 21 3 19.4211 3 17.5461V9.45395C3 7.57895 4.58416 6 6.46535 6H19.5347C21.4158 6 23 7.57895 23 9.45395Z"
									stroke="#5CA0E2" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
									strokeLinejoin="round"/>
								<path d="M3.29688 11.7246H22.4058" stroke="#5CA0E2" strokeWidth="3.24"
								      strokeMiterlimit="10" strokeLinejoin="round"/>
							</svg>
							Payments</Link>
						<Link href="/auth/my-account/track-orders"
						      className="flex items-center gap-[12px] text-[16px] mb-[19px] text-text-dark font-semibold text-left w-full"
						      onClick={() => setUserMenuOpen(false)}
						>
							<svg width="26" height="26" viewBox="0 0 26 26" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<path
									d="M6 10.1923C6 6.25129 9.06829 3 12.9995 3C16.8349 3 19.9991 6.15277 19.9991 10.1923"
									stroke="#5CA0E2" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
									strokeLinejoin="round"/>
								<path d="M12.9013 23.0013C12.9013 23.0013 5.99902 16.7943 5.99902 9.99609"
								      stroke="#5CA0E2" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
								      strokeLinejoin="round"/>
								<path d="M13.0957 23.0013C13.0957 23.0013 19.998 16.7943 19.998 9.99609"
								      stroke="#5CA0E2" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
								      strokeLinejoin="round"/>
								<path
									d="M12.9033 13.3446C14.5978 13.3446 15.9715 11.9331 15.9715 10.1918C15.9715 8.45061 14.5978 7.03906 12.9033 7.03906C11.2087 7.03906 9.83496 8.45061 9.83496 10.1918C9.83496 11.9331 11.2087 13.3446 12.9033 13.3446Z"
									fill="#5CA0E2"/>
							</svg>

							Track Orders</Link>

						<hr className="border-[1px] w-full border-button-gray m-0"/>

						<button
							onClick={() => handleSignOut()}
							className="flex items-center gap-[12px] text-[16px] mt-[28px] mb-[19px] text-text-dark font-semibold text-left w-full cursor-pointer">
							<svg width="26" height="26" viewBox="0 0 26 26" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<path
									d="M11.6074 21H20.8301C22.5594 21 24.0004 19.4485 24.0004 17.6061V8.39394C24.0004 6.55152 22.5594 5 20.8301 5H11.6074"
									stroke="#5CA0E2" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
									strokeLinejoin="round"/>
								<path d="M16.4105 13.0488H2" stroke="#5CA0E2" strokeWidth="2" strokeMiterlimit="10"
								      strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M7.18777 18.2852L2 13.0489L7.18777 7.8125" stroke="#5CA0E2" strokeWidth="2"
								      strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							Sign Out
						</button>

					</div>
				)}
			</div>

			{/* Cart Section */}
			<div className="relative" ref={cartMenuRef}>
				<button
					className=" flex cursor-pointer h-[48px] min-w-[160px] items-center text-[16px] px-[12px] font-semibold hover:bg-button-gray border-b-[4px] border-b-transparent hover:border-b-[4px] hover:border-b-custom-blue"
					onClick={() => setIsCartOpen(true)}
				>
					<svg className="mr-[8px]" width="32" height="32" viewBox="0 0 32 32" fill="none"
					     xmlns="http://www.w3.org/2000/svg">
						<path
							d="M24.9569 31.0031C24.3969 30.8631 23.8568 30.7031 23.3768 30.3632C22.1668 29.4833 21.707 27.9635 22.267 26.6037C22.807 25.274 24.2569 24.4241 25.6969 24.5741C27.2569 24.744 28.4469 25.8339 28.6869 27.2936C28.9569 29.0234 27.7669 30.6331 25.9769 30.9431C25.9169 30.9531 25.867 30.9831 25.807 30.9931C25.527 31.0031 25.2469 31.0031 24.9569 31.0031ZM11.6769 31.0031C11.7469 30.9831 11.8068 30.9531 11.8768 30.9431C13.4468 30.6531 14.617 29.2933 14.597 27.7536C14.577 26.2238 13.4068 24.874 11.8868 24.6241C10.2668 24.3541 8.71684 25.164 8.13684 26.6037C7.54684 28.0635 8.09694 29.7033 9.48694 30.5031C9.89694 30.7331 10.387 30.8431 10.837 31.0031C11.107 31.0031 11.3969 31.0031 11.6769 31.0031ZM30.517 6.94693C23.297 6.84694 16.0868 6.74694 8.86682 6.64696C8.65682 6.64696 8.57696 6.57696 8.50696 6.38699C8.16696 5.37715 7.83692 4.36731 7.46692 3.35747C6.97692 2.00769 6.00697 1.17783 4.51697 1.04785C3.57697 0.96786 2.62689 1.00786 1.68689 1.02786C1.51689 1.02786 1.3269 1.15784 1.1969 1.27782C0.986901 1.46779 0.947018 1.72776 1.06702 1.97772C1.19702 2.25768 1.41695 2.42763 1.74695 2.42763C2.51695 2.43763 3.28701 2.42764 4.05701 2.43764C5.08701 2.44764 5.75703 2.90755 6.07703 3.85739C7.51703 8.05672 8.94686 12.2661 10.4069 16.4554C10.6269 17.0853 10.7468 17.6552 10.3768 18.2551C10.3468 18.2951 10.347 18.3451 10.327 18.3951C9.56703 20.6847 11.1969 22.8444 13.6969 22.8444C18.3869 22.8444 23.077 22.8444 27.767 22.8444C27.897 22.8444 28.0369 22.8444 28.1569 22.8144C28.4769 22.7344 28.6669 22.5244 28.7169 22.2245C28.7669 21.9345 28.6468 21.6845 28.3868 21.5546C28.1968 21.4646 27.967 21.4146 27.757 21.4146C23.067 21.4046 18.3769 21.3846 13.6869 21.4246C12.2269 21.4346 11.227 20.0548 11.787 18.775C11.857 18.615 11.9069 18.4451 11.9869 18.2851C12.2569 17.7852 12.357 17.2753 12.057 16.7554C12.047 16.7454 12.067 16.7254 12.077 16.6954C12.137 16.6854 12.207 16.6754 12.277 16.6654C13.947 16.5054 15.607 16.3454 17.277 16.1754C20.527 15.8555 23.777 15.5255 27.027 15.2056C28.327 15.0756 29.1669 14.3857 29.4669 13.1559C29.8069 11.7961 30.1469 10.4264 30.4869 9.06658C30.6569 8.37669 30.827 7.68679 30.997 6.9569C30.8169 6.94691 30.667 6.94693 30.517 6.94693Z"
							fill="#182434"/>
					</svg>
					{`Cart $${cartTotal.toFixed(0)}`}
				</button>
				{/* Cart Dropdown (Absolute inside this div) */}
				{isCartOpen && <CartContainer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}/>}
			</div>
		</div>
	</div>)
}

