"use client";

import React, {useContext, useState, useEffect} from "react";
import {useForm} from "react-hook-form";

import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import api, {googleAuthUrl} from "@/hooks/Api";
import {AppContext} from "@/Context/AppContext";
import google from "/assets/google_icon.png"
import {successNote} from "@/utils/ToastNotify";
import {toast} from "react-toastify";


const schema = yup.object().shape({
	email: yup.string().email("Enter a valid email").required("Email is required!"),
	password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required!"),
});

const LoginPage = () => {
	const router = useRouter();
	const {state, checkAuth} = useContext(AppContext);
	const {user} = state;

	const [rememberMe, setRememberMe] = useState(false);
	const [serverError, setServerError] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const {
		register,
		handleSubmit,
		setValue,
		formState: {errors, isSubmitting},
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: { email: '' }
	});

	useEffect(() => {
		if ( user ) {
			router.push("/auth/my-account");
		}
		const savedEmail = localStorage.getItem("rememberedEmail");
		if (savedEmail) {
			setRememberMe(true);
			setValue('email', savedEmail, { shouldValidate: false });
		}
	}, [user, router, setValue]);

	const handleRememberToggle = (checked) => {
		setRememberMe(checked);
		if (!checked) {
			localStorage.removeItem('rememberedEmail');
		}
	};

	const onSubmit = async (data) => {
		const payload = {
			email: data.email.trim().toLowerCase(),
			password: data.password,
		};
		setServerError('');
		try {
			const response = await api.post("/auth/login", payload);
			if (response.status === 200) {
				if (rememberMe) {
					localStorage.setItem('rememberedEmail', payload.email);
				}
				await checkAuth();
				toast.success(`Logged in successfully!`);
			}
		} catch (err) {
			console.error("Login error:", err?.response?.status);
			setServerError(err?.response?.data?.message || "Login failed.");
		} finally {
			setSuccessMessage(null);
		}
	};

	return (
		<div className="flex h-full justify-center p-20 gap-8 rounded-2xl backdrop-blur-lg bg-white/20">
			<div className="max-w-[1200px]">
				<h1 className="text-[48px] font-semibold">Login</h1>
				<hr className="mb-8 border-button-gray"/>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					{successMessage &&
						<div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}
					{serverError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{serverError}</div>}
					<div className="mb-4">
						<input
							type="email"
							autoComplete="email"
							{...register("email")}
							placeholder="Email"
							className={`bg-white w-full h-[50px] text-[18px] px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-[6px]`}
						/>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
					</div>
					<div className="mb-[16px]">
						<input
							type="password"
							placeholder="Password"
							autoComplete="current-password"
							{...register("password")}
							className={`bg-white w-full h-[50px] px-3 py-2 text-[18px] border ${errors.password ? "border-red-500" : "border-gray-300"} rounded`}
						/>
						{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
					</div>
					<div className="flex items-center mb-[16px] relative">
						<label htmlFor="remember" className="flex items-center relative cursor-pointer select-none">
							<input
								id="remember"
								type="checkbox"
								checked={rememberMe}
								onChange={(e) => handleRememberToggle(e.target.checked)}
								className="appearance-none w-[25px] h-[25px] border-[2px] border-border-gray rounded-[4px] mr-[12px]
                                    checked:bg-custom-blue checked:border-custom-blue transition duration-150"
							/>
							{rememberMe && (
								<svg
									className="absolute left-[4px] top-[4px] w-[16px] h-[16px] text-white pointer-events-none"
									fill="none"
									stroke="currentColor"
									strokeWidth="4"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
								</svg>
							)}
							<span className="text-[14px] text-text-dark font-semibold">
                        Remember me
                    </span>
						</label>
					</div>
					{/* Botlar için honeypot alan (gizli) */}
					<input
						type="text"
						name="company" /* backend bu alan doluysa isteği reddedebilir */
						style={{display:'none'}}
						tabIndex={-1}
						autoComplete="off"
						aria-hidden="true"
					/>
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full h-[50px] rounded-[6px] bg-custom-blue text-white text-[18px] font-semibold py-2 hover:bg-custom-button-green transition duration-200 cursor-pointer"
					>
						{isSubmitting ? "Singing in..." : "Sign in"}
					</button>
				</form>

				<p className="text-start my-[20px]">
					<Link href={"/auth/forgot-password"}
					      className="w-full text-[16px] text-text-dark font-semibold">
						Forgot Password
					</Link>
				</p>

				<svg width="432" height="22" viewBox="0 0 432 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0 11H196" stroke="#ECECEC" strokeMiterlimit="10"/>
					<path d="M236 11H432" stroke="#ECECEC" strokeMiterlimit="10"/>
					<path
						d="M211.796 17.126C210.812 17.126 209.936 16.916 209.168 16.496C208.4 16.064 207.794 15.476 207.35 14.732C206.906 13.988 206.684 13.142 206.684 12.194C206.684 11.234 206.906 10.388 207.35 9.656C207.794 8.912 208.4 8.33 209.168 7.91C209.936 7.49 210.812 7.28 211.796 7.28C212.792 7.28 213.674 7.49 214.442 7.91C215.222 8.33 215.828 8.906 216.26 9.638C216.704 10.37 216.926 11.222 216.926 12.194C216.926 13.142 216.704 13.988 216.26 14.732C215.828 15.476 215.222 16.064 214.442 16.496C213.674 16.916 212.792 17.126 211.796 17.126ZM211.796 15.2C212.348 15.2 212.84 15.08 213.272 14.84C213.704 14.6 214.04 14.252 214.28 13.796C214.532 13.34 214.658 12.806 214.658 12.194C214.658 11.57 214.532 11.036 214.28 10.592C214.04 10.136 213.704 9.788 213.272 9.548C212.84 9.308 212.354 9.188 211.814 9.188C211.262 9.188 210.77 9.308 210.338 9.548C209.918 9.788 209.582 10.136 209.33 10.592C209.078 11.036 208.952 11.57 208.952 12.194C208.952 12.806 209.078 13.34 209.33 13.796C209.582 14.252 209.918 14.6 210.338 14.84C210.77 15.08 211.256 15.2 211.796 15.2ZM219.078 17V7.388H221.22V10.034L220.968 9.26C221.256 8.612 221.706 8.12 222.318 7.784C222.942 7.448 223.716 7.28 224.64 7.28V9.422C224.544 9.398 224.454 9.386 224.37 9.386C224.286 9.374 224.202 9.368 224.118 9.368C223.266 9.368 222.588 9.62 222.084 10.124C221.58 10.616 221.328 11.354 221.328 12.338V17H219.078Z"
						fill="#182434"/>
				</svg>

				<button
					onClick={() => {
						if (typeof window !== 'undefined') {
							window.location.href = googleAuthUrl;
						}
					}}
					className="w-full h-[50px] mt-[30px] bg-white text-text-dark font-semibold rounded-[25px] hover:bg-custom-button-green hover:text-white relative border-[1px] border-border-gray cursor-pointer"
				>
					<Image width={18} height={18} src={google} alt="Google"
					       className="absolute top-[15px] left-[16px]"></Image>
					<p className="w-full">
						Continue with Google
					</p>
				</button>

			</div>
		</div>
	);
};

export default LoginPage;
