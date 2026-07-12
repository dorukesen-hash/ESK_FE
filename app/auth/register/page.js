import RegisterForm from '@/components/auth/RegisterFrom';
import BreadCrumbs from "@/components/pageLayouts/BreadCrumbs";

const Page = () => {
	return (
		<div className="w-full h-full bg-white min-h-screen flex justify-center">
			<div className="max-w-[1440px] flex flex-col">
				<BreadCrumbs/>
				<RegisterForm/>
			</div>
		</div>
	);
};

export default Page;
