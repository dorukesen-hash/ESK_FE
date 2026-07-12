/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "https://www.eskpackaging.com/"
			},
			{
				protocol: "https",
				hostname: "eskpackagingapi-production.up.railway.app"
			},
			{
				protocol: "https",
				hostname: "images-na.ssl-images-amazon.com"
			},
			{
				protocol: "https",
				hostname: "m.media-amazon.com"
			},
			{
				protocol: "https",
				hostname: "cdn.enesdorukesen.com.tr"
			},
			{
				protocol: "https",
				hostname: "placehold.co"
			}],
	}
};
export default nextConfig;
