import HomeHero from "@/components/home/HomeHero";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import ProductGuidance from "@/components/home/ProductGuidance";
import Industries from "@/components/home/Industries";
import QuoteSection from "@/components/home/QuoteSection";

export default function Home() {
	return (
		<main className="flex flex-col bg-white w-full">
			<HomeHero/>
			<CategoryGrid/>
			<FeaturedGrid/>
			<ProductGuidance/>
			<Industries/>
			<QuoteSection/>
		</main>
	);
}
