'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '@/hooks/Api';
import { toast } from 'react-toastify';
import Link from 'next/link';

const schema = yup.object().shape({
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters')
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Confirm Password is required'),
});

const ResetPasswordForm = ({ token }) => {
	const router = useRouter();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		setError('');
		setSuccess('');

		try {
			const response = await api.post(`/auth/reset-password/${token}`, {
				password: data.password,
			});
			setSuccess(response.data.message || 'Your password has been reset successfully. You can now log in.');
			toast.success('Password reset successfully!');
			setTimeout(() => {
				router.push('/auth/login');
			}, 3000);
		} catch (err) {
			setError(err.response?.data?.message || 'Failed to reset password. The link may be invalid or expired.');
			console.error('Reset password error:', err);
		}
	};

	return (
		<div className="flex h-full justify-center p-20 gap-8 rounded-2xl backdrop-blur-lg bg-white/20">
			<div className="max-w-[1200px]">
				<h1 className="text-[48px] font-semibold">Reset Password</h1>
				<hr className="mb-8 border-button-gray" />
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					{success && (
						<div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>
					)}
					{error && (
						<div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
					)}

					<div className="mb-4">
						<input
							id="password"
							type="password"
							placeholder="New Password"
							{...register('password')}
							className={`bg-white w-full h-[50px] text-[18px] px-3 py-2 border ${
								errors.password ? 'border-red-500' : 'border-gray-300'
							} rounded-[6px]`}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
						)}
					</div>

					<div className="mb-4">
						<input
							id="confirmPassword"
							type="password"
							placeholder="Confirm New Password"
							{...register('confirmPassword')}
							className={`bg-white w-full h-[50px] text-[18px] px-3 py-2 border ${
								errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
							} rounded-[6px]`}
						/>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
						)}
					</div>

					<button
						type="submit"
						disabled={isSubmitting || !!success}
						className="w-full h-[50px] rounded-[6px] bg-custom-blue text-white text-[18px] font-semibold py-2 hover:bg-custom-button-green transition duration-200 cursor-pointer"
					>
						{isSubmitting ? 'Resetting...' : 'Reset Password'}
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

export default ResetPasswordForm;
