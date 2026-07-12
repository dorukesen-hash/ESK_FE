import Head from 'next/head';
import LoginForm from '@/components/auth/LoginForm';


const Page = () => {

	return (
		<>
			<Head>
				<title>Login - ESK Packaging </title>
				<meta name="description" content="Login Page"/>
			</Head>
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<LoginForm/>
			</div>
		</>
	);
};

export default Page;
