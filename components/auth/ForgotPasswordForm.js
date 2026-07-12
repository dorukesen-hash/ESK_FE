'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '@/hooks/Api';
import Link from 'next/link';

const schema = yup.object().shape({
	email: yup.string().email('Enter a valid email').required('Email is required!'),
});

const ForgotPasswordForm = () => {
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmitHandler = async (data) => {
		setMessage('');
		setError('');

		try {
			await api.post('/auth/forgot-password', { email: data.email });
			// Güvenlik nedeniyle, e-posta mevcut olmasa bile genel bir başarı mesajı gösterin.
			setMessage(`A password reset link has been sent to ${data.email}.`);
			reset();
		} catch (err) {
			console.error('Forgot password error:', err);
			setMessage('An error occurred while processing your request. Please try again later.');
		}
	};

	return (
		<div className="flex h-full justify-center p-20 gap-8 rounded-2xl backdrop-blur-lg bg-white/20">
			<div className="max-w-[1200px]">
				<h1 className="text-[48px] font-semibold">Forgot Password</h1>
				<hr className="mb-8 border-button-gray" />
				<form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
					{message && (
						<div className="mb-4 p-3 text-lg text-text-dark rounded">{message}</div>
					)}
					{error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
					<div className="mb-4">
						<input
							id="email"
							type="email"
							placeholder="Email"
							autoComplete="email"
							{...register('email')}
							className={`bg-white w-full h-[50px] text-[18px] px-3 py-2 border ${
								errors.email ? 'border-red-500' : 'border-gray-300'
							} rounded-[6px]`}
						/>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full h-[50px] rounded-[6px] bg-custom-blue text-white text-[18px] font-semibold py-2 hover:bg-custom-button-green transition duration-200 cursor-pointer"
					>
						{isSubmitting ? 'Sending...' : 'Send Reset Link'}
					</button>

					<p className="text-start my-[20px]">
						<Link href="/auth/login" className="w-full text-[16px] text-text-dark font-semibold hover:underline">
							Back to Login
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default ForgotPasswordForm;
