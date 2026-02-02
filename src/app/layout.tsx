import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "KOA",
	description: "KOA The Guardian",
	keywords: "KOA, crypto, community, blockchain, innovation, strength, success",
	authors: [{ name: "KOA" }],
	openGraph: {
		title: "KOA",
		type: "website",
		siteName: "KOA",
	},
	twitter: {
		card: "summary_large_image",
		title: "KOA",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="id">
			<head>
				<link
					rel="icon"
					type="image/png"
					href="/assets/favicon/favicon-32x32.png"
					sizes="32x32"
				/>
				<link
					rel="icon"
					type="image/png"
					href="/assets/favicon/favicon-16x16.png"
					sizes="16x16"
				/>
				<link
					rel="apple-touch-icon"
					href="/assets/favicon/apple-touch-icon.png"
				/>
				<link rel="manifest" href="/assets/favicon/site.webmanifest" />
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
				<meta name="robots" content="index, follow" />
			</head>
			<body className="text-white font-['Baby_Doll'] overflow-x-hidden">
				{children}
			</body>
		</html>
	);
}
