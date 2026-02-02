/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		unoptimized: true, // For static export compatibility if needed, and simpler local dev
	},
};

export default nextConfig;
