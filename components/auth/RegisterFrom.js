"use client"

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '@/hooks/Api';
import {useRouter} from 'next/navigation';
import {useContext, useEffect} from "react";
import {AppContext} from "@/Context/AppContext";

// form validation
const schema = yup.object().shape({
	name: yup.string().required('Name is required!'),
	email: yup.string().email('Enter a valid email').required('Email address is required!'),
	confirmEmail: yup
		.string()
		.oneOf([yup.ref('email'), null], 'Emails must match'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(20, 'Password must be at most 20 characters')
		.matches(/[A-Za-z]/, 'Password must contain at least one letter')
		.matches(/\d/, 'Password must contain at least one number')
		.required('Password is required!'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Confirm Password is required!'),
});

const RegisterForm = () => {
	const router = useRouter();
	const {state} = useContext(AppContext);
	const {user} = state
	const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (user) {
			router.push("/");
		}
	}, [user, router]);

	const onSubmit = async (data) => {

		try {
			let {confirmPassword, ...payload} = data;
			payload = {...payload, surname: "doe"};
			const response = await api.post('/auth/register', payload);
			console.log('User created successfully:', response.data);
			setTimeout(() => {
				router.push('/auth/login');
			}, 2000);
		} catch (error) {
			console.log(error.response?.data?.message || 'Error creating new user!');
		}
	};

	return (
		<div className="w-[1132px] bg-white text-text-dark mb-[164px]">
			<h1 className="text-[30px] font-bold text-text-dark">Create an Account</h1>
			<hr className="text-border-gray my-[40px]"/>
			{Object.keys(errors).length > 0 && (
				<div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
					{Object.entries(errors).map(([key, error]) => (
						<p key={key}>{error.message}</p>
					))}
				</div>
			)}
			<div className="w-full h-full flex gap-[126px]">
				<form onSubmit={handleSubmit(onSubmit)} className="w-full">
					<div className="flex flex-col">
						<h3 className="text-[22px] font-bold text-text-dark mb-[26px]">Billing Address</h3>

						<label className="indent-4 block text-text-dark font-medium">Full Name <span
							className="text-red-500">*</span></label>
						<input
							type="text"
							{...register('name')}
							className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
						/>

						<label className="indent-4 block text-text-dark font-medium mt-2">Company</label>
						<input
							type="text"
							{...register('company')}
							className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
						/>

						<label className="indent-4 block text-text-dark font-medium mt-2">Line Address 1 <span
							className="text-red-500">*</span></label>
						<input
							type="text"
							{...register('firstLine')}
							className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
						/>

						<label className="indent-4 block text-text-dark font-medium mt-2">Line Address 2 <span
							className="text-red-500">*</span></label>
						<input
							type="text"
							{...register('secondLine')}
							className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
						/>

						<label className="indent-4 block text-text-dark font-medium mt-2">Zip Code <span
							className="text-red-500">*</span></label>
						<input
							type="text"
							{...register('zip')}
							className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
						/>

						<label className="indent-4 block text-text-dark font-medium mt-2">City <span
							className="text-red-500">*</span></label>
						<input
							type="text"
							{...register('city')}
							className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
						/>

						<label className="indent-4 block text-text-dark font-medium mt-2">State/Province <span
							className="text-red-500">*</span></label>
						<input
							type="text"
							{...register('state')}
							className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
						/>

						<label className="indent-4 block text-text-dark font-medium mt-2">Country</label>
						<input
							type="text"
							{...register('country')}
							className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
						/>

						<label className="indent-4 block text-text-dark font-medium mt-2">Phone Number <span
							className="text-red-500">*</span></label>
						<input
							type="text"
							{...register('phone')}
							className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
						/>
					</div>

					<div className="flex w-full mt-[60px] items-end">
						<div className="w-full">

							<h3 className="text-[22px] font-bold text-text-dark mb-[26px]">Account Settings</h3>

							<label className="indent-4 block text-text-dark font-medium mt-2">Email <span
								className="text-red-500">*</span></label>
							<input
								type="email"
								{...register('email')}
								className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
							/>
							<label className="indent-4 block text-text-dark font-medium mt-2">Confirm Email <span
								className="text-red-500">*</span></label>
							<input
								type="email"
								{...register('confirmEmail')}
								className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
							/>

							<label className="indent-4 block text-text-dark font-medium mt-2">Password <span
								className="text-red-500">*</span></label>
							<input
								type="password"
								{...register('password')}
								className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
							/>
							<ul className="list-disc pl-[40px] text-text-dark font-medium mt-2">
								<li>6-20 characters</li>
								<li>1 letter</li>
								<li>1 number</li>
							</ul>


							<label className="indent-4 block text-text-dark font-medium mt-2">Confirm Password <span
								className="text-red-500">*</span></label>
							<input
								type="password"
								{...register('confirmPassword')}
								className={`w-full px-3 py-2 border border-border-gray rounded-[8px]`}
							/>
						</div>
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-[152px] h-[40px] bg-custom-blue text-white py-2 rounded-[8px] hover:bg-custom-button-green transition duration-200 cursor-pointer ml-[16px]"
						>
							{isSubmitting ? 'Submitting...' : 'Submit'}
						</button>
					</div>
				</form>
				<div className="">
					<svg width="303" height="415" viewBox="0 0 303 415" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M164.824 299.101V311.36V415L258.403 340.78V238.477L164.824 299.101Z"
						      fill="url(#paint0_linear_0_1)"/>
						<g opacity="0.5">
							<path
								d="M257.51 312.246L258.403 242.93L257.286 239.141L164.824 299.096V302.217L194.082 358.383L257.51 312.246Z"
								fill="#A67043"/>
						</g>
						<path d="M33.9482 257.42V367.97L164.824 414.999V311.358V299.099L33.9482 257.42Z"
						      fill="url(#paint1_linear_0_1)"/>
						<g opacity="0.48">
							<path
								d="M164.824 302.218V299.097L118.817 284.387L38.8617 269.677L33.9482 277.032V325.398L138.694 365.294L164.824 302.218Z"
								fill="#A67043"/>
						</g>
						<path d="M0.670015 267.226L0 266.334L39.3075 247.835L41.9876 256.082L0.670015 267.226Z"
						      fill="url(#paint2_linear_0_1)"/>
						<path d="M33.9482 257.416L123.284 286.613V200.357L33.9482 257.416Z"
						      fill="url(#paint3_linear_0_1)"/>
						<path d="M33.9474 257.416L0 266.331L93.3554 210.164L123.283 200.357L33.9474 257.416Z"
						      fill="url(#paint4_linear_0_1)"/>
						<path d="M258.403 238.471L123.283 200.357V286.613L164.824 299.095L258.403 238.471Z"
						      fill="url(#paint5_linear_0_1)"/>
						<path d="M258.403 238.473L123.283 200.36L157.231 190.999L295.03 226.66L258.403 238.473Z"
						      fill="url(#paint6_linear_0_1)"/>
						<path
							d="M210.162 291.07L164.824 299.094L165.048 300.431L209.045 350.134L211.725 340.55L210.162 291.07Z"
							fill="url(#paint7_linear_0_1)"/>
						<path d="M210.161 291.07L211.724 340.551L209.044 350.135L302.399 274.8L210.161 291.07Z"
						      fill="url(#paint8_linear_0_1)"/>
						<path d="M164.824 299.101L209.492 349.027L302.401 274.807L258.403 238.477L164.824 299.101Z"
						      fill="url(#paint9_linear_0_1)"/>
						<path
							d="M2.2334 306.678L2.45674 307.347L134.45 355.267L90.2286 302.443C47.3477 304.449 2.2334 306.678 2.2334 306.678Z"
							fill="url(#paint10_linear_0_1)"/>
						<path
							d="M164.825 299.101C164.825 299.101 128.421 300.884 90.2305 302.444L134.451 355.267L165.049 300.438L164.825 299.101Z"
							fill="url(#paint11_linear_0_1)"/>
						<path d="M33.9474 257.42L2.2334 306.677L133.78 354.151L164.824 299.099L33.9474 257.42Z"
						      fill="url(#paint12_linear_0_1)"/>
						<path
							d="M137.915 247.099C203.139 247.099 256.014 194.224 256.014 129C256.014 63.7759 203.139 10.9014 137.915 10.9014C72.6909 10.9014 19.8164 63.7759 19.8164 129C19.8164 194.224 72.6909 247.099 137.915 247.099Z"
							fill="#A3CEF9"/>
						<path
							d="M113.023 198.042L101.94 206.945C100.305 208.217 97.943 208.035 96.4894 206.4L69.5993 171.697C68.3275 170.062 68.5091 167.7 70.1444 166.246L80.8641 157.525C82.4993 156.253 84.8613 156.435 86.3148 158.07L113.75 192.591C115.022 194.408 114.658 196.77 113.023 198.042Z"
							fill="#5CA0E2"/>
						<path
							d="M228.034 139.901C224.763 136.085 219.131 135.54 215.134 138.811L185.7 164.065L185.518 164.247C186.427 163.157 187.153 161.703 187.335 160.25C187.88 156.253 185.336 152.619 181.339 151.711L138.097 141.899C129.921 140.082 121.563 142.081 115.022 147.35L97.5801 161.522L119.565 190.592L122.835 188.412C128.467 184.596 135.372 183.143 141.912 184.778L171.165 191.864C177.705 193.499 184.428 191.682 189.334 187.14L227.307 152.437C230.941 149.167 231.304 143.534 228.034 139.901Z"
							fill="#FFC6AE"/>
						<path
							d="M100.123 118.098C115.877 118.098 128.648 105.326 128.648 89.5722C128.648 73.8181 115.877 61.0469 100.123 61.0469C84.3689 61.0469 71.5977 73.8181 71.5977 89.5722C71.5977 105.326 84.3689 118.098 100.123 118.098Z"
							fill="white"/>
						<path
							d="M194.966 117.917C210.72 117.917 223.491 105.146 223.491 89.3916C223.491 73.6374 210.72 60.8662 194.966 60.8662C179.212 60.8662 166.44 73.6374 166.44 89.3916C166.44 105.146 179.212 117.917 194.966 117.917Z"
							fill="white"/>
						<path
							d="M147.908 133.723C164.464 133.723 177.886 120.301 177.886 103.744C177.886 87.1876 164.464 73.7656 147.908 73.7656C131.351 73.7656 117.929 87.1876 117.929 103.744C117.929 120.301 131.351 133.723 147.908 133.723Z"
							fill="white"/>
						<path
							d="M154.267 247.099C219.491 247.099 272.365 194.224 272.365 129C272.365 63.7759 219.491 10.9014 154.267 10.9014C89.0425 10.9014 36.168 63.7759 36.168 129C36.168 194.224 89.0425 247.099 154.267 247.099Z"
							stroke="#20517C" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round"
							strokeLinejoin="round"/>
						<path
							d="M120.654 198.588L111.569 205.674C109.934 206.946 107.572 206.764 106.118 205.129L79.2282 170.426C77.9564 168.791 78.1381 166.429 79.7733 164.975L88.4944 158.071C90.1296 156.799 92.4916 156.981 93.9451 158.616L121.38 193.137C122.652 194.954 122.289 197.316 120.654 198.588Z"
							stroke="#20517C" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round"
							strokeLinejoin="round"/>
						<path
							d="M97.5791 161.521L115.021 147.349C121.562 142.08 129.92 140.082 138.096 141.899L181.338 151.71C185.154 152.618 187.879 156.252 187.334 160.249C186.789 164.428 182.973 167.335 178.976 166.79L147.544 161.885"
							stroke="#20517C" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round"
							strokeLinejoin="round"/>
						<path
							d="M185.7 164.065L215.133 138.811C218.949 135.54 224.763 136.085 228.033 139.901C231.122 143.534 230.941 149.167 227.307 152.437L189.333 187.14C184.428 191.682 177.705 193.318 171.164 191.864L141.912 184.778C135.371 183.143 128.286 184.415 122.835 188.412L119.564 190.592"
							stroke="#20517C" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round"
							strokeLinejoin="round"/>
						<path
							d="M134.282 78.8533C130.83 67.0434 119.747 58.3223 106.847 58.3223C91.0396 58.3223 78.3213 71.0406 78.3213 86.8476C78.3213 102.655 91.0396 115.373 106.847 115.373C113.933 115.373 120.473 112.829 125.561 108.469"
							stroke="#20517C" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round"
							strokeLinejoin="round"/>
						<path d="M94.8535 89.2103L104.301 97.023L119.018 77.0371" stroke="#20517C" strokeWidth="4"
						      strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path
							d="M190.425 82.305C190.425 75.7641 195.694 70.4951 202.235 70.4951C208.776 70.4951 214.045 75.7641 214.045 82.305"
							stroke="#20517C" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round"
							strokeLinejoin="round"/>
						<path d="M202.052 103.381C202.052 103.381 190.424 93.2062 190.424 81.9414" stroke="#20517C"
						      strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M202.415 103.381C202.415 103.381 214.043 93.2062 214.043 81.9414" stroke="#20517C"
						      strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path
							d="M183.882 109.378C188.788 113.194 194.966 115.556 201.688 115.556C217.495 115.556 230.213 102.837 230.213 87.0302C230.213 71.2232 217.495 58.5049 201.688 58.5049C188.97 58.5049 178.068 66.8626 174.435 78.4908"
							stroke="#20517C" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round"
							strokeLinejoin="round"/>
						<path
							d="M154.631 131.18C171.188 131.18 184.61 117.758 184.61 101.202C184.61 84.6447 171.188 71.2227 154.631 71.2227C138.074 71.2227 124.652 84.6447 124.652 101.202C124.652 117.758 138.074 131.18 154.631 131.18Z"
							stroke="#20517C" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round"
							strokeLinejoin="round"/>
						<path
							d="M162.443 119.551H146.818C143.366 119.551 140.459 116.644 140.459 113.192V89.2088C140.459 85.7567 143.366 82.8496 146.818 82.8496H162.443C165.896 82.8496 168.803 85.7567 168.803 89.2088V113.192C168.803 116.644 165.896 119.551 162.443 119.551Z"
							stroke="#20517C" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round"
							strokeLinejoin="round"/>
						<path d="M149.18 93.0234H160.081" stroke="#20517C" strokeWidth="4" strokeMiterlimit="10"
						      strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M149.18 101.199H160.081" stroke="#20517C" strokeWidth="4" strokeMiterlimit="10"
						      strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M149.18 109.375H160.081" stroke="#20517C" strokeWidth="4" strokeMiterlimit="10"
						      strokeLinecap="round" strokeLinejoin="round"/>
						<path
							d="M202.233 87.5751C205.143 87.5751 207.502 85.2161 207.502 82.3061C207.502 79.3961 205.143 77.0371 202.233 77.0371C199.323 77.0371 196.964 79.3961 196.964 82.3061C196.964 85.2161 199.323 87.5751 202.233 87.5751Z"
							fill="#20517C"/>
						<defs>
							<linearGradient id="paint0_linear_0_1" x1="182.091" y1="437.935" x2="223.165" y2="273.306"
							                gradientUnits="userSpaceOnUse">
								<stop offset="0.1611" stopColor="#CE9865"/>
								<stop offset="0.4604" stopColor="#C28B57"/>
								<stop offset="0.8773" stopColor="#AC733C"/>
							</linearGradient>
							<linearGradient id="paint1_linear_0_1" x1="91.268" y1="450.794" x2="103.698" y2="274.63"
							                gradientUnits="userSpaceOnUse">
								<stop offset="0.2077" stopColor="#DEAE79"/>
								<stop offset="0.4518" stopColor="#DCAB76"/>
								<stop offset="0.6224" stopColor="#D6A26E"/>
								<stop offset="0.7437" stopColor="#CE9662"/>
							</linearGradient>
							<linearGradient id="paint2_linear_0_1" x1="-40.3943" y1="257.539" x2="38.4282" y2="257.539"
							                gradientUnits="userSpaceOnUse">
								<stop offset="0.1606" stopColor="#DEB389"/>
								<stop offset="0.2452" stopColor="#D9AC81"/>
								<stop offset="0.6485" stopColor="#C29061"/>
								<stop offset="0.8712" stopColor="#BA8555"/>
							</linearGradient>
							<linearGradient id="paint3_linear_0_1" x1="69.3824" y1="206.134" x2="107.71" y2="300.685"
							                gradientUnits="userSpaceOnUse">
								<stop stopColor="#CE9865"/>
								<stop offset="0.5706" stopColor="#AC733C"/>
								<stop offset="0.9141" stopColor="#976333"/>
							</linearGradient>
							<linearGradient id="paint4_linear_0_1" x1="26.0622" y1="190.732" x2="129.487" y2="315.071"
							                gradientUnits="userSpaceOnUse">
								<stop offset="0.1606" stopColor="#DEB389"/>
								<stop offset="0.2452" stopColor="#D9AC81"/>
								<stop offset="0.6485" stopColor="#C29061"/>
								<stop offset="0.8712" stopColor="#BA8555"/>
							</linearGradient>
							<linearGradient id="paint5_linear_0_1" x1="197.906" y1="183.151" x2="171.067" y2="322.859"
							                gradientUnits="userSpaceOnUse">
								<stop offset="0.0950818" stopColor="#CE9865"/>
								<stop offset="0.4708" stopColor="#BC844F"/>
								<stop offset="0.7546" stopColor="#AC733C"/>
							</linearGradient>
							<linearGradient id="paint6_linear_0_1" x1="191.431" y1="236.386" x2="257.516" y2="150.864"
							                gradientUnits="userSpaceOnUse">
								<stop offset="0.4756" stopColor="#CE9865"/>
								<stop offset="0.6381" stopColor="#C8915D"/>
								<stop offset="0.8858" stopColor="#B67E48"/>
								<stop offset="1" stopColor="#AC733C"/>
							</linearGradient>
							<linearGradient id="paint7_linear_0_1" x1="197.82" y1="342.546" x2="173.292" y2="230.007"
							                gradientUnits="userSpaceOnUse">
								<stop offset="0.0950818" stopColor="#CE9865"/>
								<stop offset="0.4708" stopColor="#BC844F"/>
								<stop offset="0.7546" stopColor="#AC733C"/>
							</linearGradient>
							<linearGradient id="paint8_linear_0_1" x1="259.348" y1="323.664" x2="248.84" y2="290.473"
							                gradientUnits="userSpaceOnUse">
								<stop offset="0.0950818" stopColor="#CE9865"/>
								<stop offset="0.4708" stopColor="#BC844F"/>
								<stop offset="0.7546" stopColor="#AC733C"/>
							</linearGradient>
							<linearGradient id="paint9_linear_0_1" x1="110.847" y1="308.533" x2="369.762" y2="277.331"
							                gradientUnits="userSpaceOnUse">
								<stop offset="0.1507" stopColor="#E5B785"/>
								<stop offset="0.5232" stopColor="#DEAE79"/>
								<stop offset="0.5664" stopColor="#DCAC77"/>
								<stop offset="1" stopColor="#CE9662"/>
							</linearGradient>
							<linearGradient id="paint10_linear_0_1" x1="-84.0859" y1="251.944" x2="142.923" y2="344.563"
							                gradientUnits="userSpaceOnUse">
								<stop offset="0.2077" stopColor="#DEAE79"/>
								<stop offset="0.4518" stopColor="#DCAB76"/>
								<stop offset="0.6224" stopColor="#D6A26E"/>
								<stop offset="0.7437" stopColor="#CE9662"/>
							</linearGradient>
							<linearGradient id="paint11_linear_0_1" x1="122.707" y1="351.074" x2="130.687" y2="269.523"
							                gradientUnits="userSpaceOnUse">
								<stop offset="0.1611" stopColor="#CE9865"/>
								<stop offset="0.4604" stopColor="#C28B57"/>
								<stop offset="0.8773" stopColor="#AC733C"/>
							</linearGradient>
							<linearGradient id="paint12_linear_0_1" x1="57.3416" y1="338.561" x2="121.384" y2="258.944"
							                gradientUnits="userSpaceOnUse">
								<stop offset="0.1507" stopColor="#E5B785"/>
								<stop offset="0.4531" stopColor="#DEAE79"/>
								<stop offset="0.674" stopColor="#DBA975"/>
								<stop offset="0.9236" stopColor="#D29C67"/>
								<stop offset="1" stopColor="#CE9662"/>
							</linearGradient>
						</defs>
					</svg>
					<div>
						<h4 className="text-text-blue font-bold text-[30px] mt-[24px]">Account Benefits</h4>
						<div className="flex gap-[14px] text-text-dark font-semibold text-[20px]">
							<svg width="26" height="26" viewBox="0 0 26 26" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<path
									d="M23.4322 8.47943L21.536 10.7164C21.7715 11.5282 21.9017 12.3834 21.9017 13.2695C21.9017 18.3261 17.787 22.4407 12.7304 22.4407C7.67389 22.4407 3.55926 18.3261 3.55926 13.2695C3.55926 8.21296 7.67389 4.09832 12.7304 4.09832C14.354 4.09832 15.8846 4.52589 17.2107 5.2695L18.89 3.29273C17.0992 2.18352 14.9861 1.53906 12.7304 1.53906C6.26104 1.53906 1 6.8001 1 13.2695C1 19.7389 6.26104 24.9999 12.7304 24.9999C19.1999 24.9999 24.4609 19.7389 24.4609 13.2695C24.4609 11.5654 24.0953 9.94186 23.4322 8.47943Z"
									fill="#5CA0E2"/>
								<path
									d="M14.0195 17.3842L8.22559 11.5902L11.0451 8.77073L13.7778 11.5097L22.695 1L25.7314 3.57785L14.0195 17.3842Z"
									fill="#5CA0E2"/>
							</svg>
							Customized Checkout
						</div>
						<div className="flex gap-[14px] text-text-dark font-semibold text-[20px]">
							<svg width="26" height="26" viewBox="0 0 26 26" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<path
									d="M23.4322 8.47943L21.536 10.7164C21.7715 11.5282 21.9017 12.3834 21.9017 13.2695C21.9017 18.3261 17.787 22.4407 12.7304 22.4407C7.67389 22.4407 3.55926 18.3261 3.55926 13.2695C3.55926 8.21296 7.67389 4.09832 12.7304 4.09832C14.354 4.09832 15.8846 4.52589 17.2107 5.2695L18.89 3.29273C17.0992 2.18352 14.9861 1.53906 12.7304 1.53906C6.26104 1.53906 1 6.8001 1 13.2695C1 19.7389 6.26104 24.9999 12.7304 24.9999C19.1999 24.9999 24.4609 19.7389 24.4609 13.2695C24.4609 11.5654 24.0953 9.94186 23.4322 8.47943Z"
									fill="#5CA0E2"/>
								<path
									d="M14.0195 17.3842L8.22559 11.5902L11.0451 8.77073L13.7778 11.5097L22.695 1L25.7314 3.57785L14.0195 17.3842Z"
									fill="#5CA0E2"/>
							</svg>
							Order History
						</div>
						<div className="flex gap-[14px] text-text-dark font-semibold text-[20px]">
							<svg width="26" height="26" viewBox="0 0 26 26" fill="none"
							     xmlns="http://www.w3.org/2000/svg">
								<path
									d="M23.4322 8.47943L21.536 10.7164C21.7715 11.5282 21.9017 12.3834 21.9017 13.2695C21.9017 18.3261 17.787 22.4407 12.7304 22.4407C7.67389 22.4407 3.55926 18.3261 3.55926 13.2695C3.55926 8.21296 7.67389 4.09832 12.7304 4.09832C14.354 4.09832 15.8846 4.52589 17.2107 5.2695L18.89 3.29273C17.0992 2.18352 14.9861 1.53906 12.7304 1.53906C6.26104 1.53906 1 6.8001 1 13.2695C1 19.7389 6.26104 24.9999 12.7304 24.9999C19.1999 24.9999 24.4609 19.7389 24.4609 13.2695C24.4609 11.5654 24.0953 9.94186 23.4322 8.47943Z"
									fill="#5CA0E2"/>
								<path
									d="M14.0195 17.3842L8.22559 11.5902L11.0451 8.77073L13.7778 11.5097L22.695 1L25.7314 3.57785L14.0195 17.3842Z"
									fill="#5CA0E2"/>
							</svg>
							Quick Tracking
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;