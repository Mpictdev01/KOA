"use client";
import Socials from "./Socials";
import Slideshow from "./Slideshow";
import { useState, useRef } from "react";

export default function OverlapSection() {
	// Config
	const [contractAddress] = useState(""); // Default empty, can change this string or fetch it
	const buyBaseUrl = "https://letsbonk.fun";
	// const dexscreenerBaseUrl = "https://dexscreener.com/solana"; // Used in Socials if dynamic

	// UI State
	const [caText, setCaText] = useState(
		contractAddress ? `CA: ${contractAddress}` : "CA: Coming Soon",
	);
	const caTextRef = useRef<HTMLSpanElement>(null);

	const isCASet = contractAddress && contractAddress.trim() !== "";

	// Logic for links
	const buyLink = isCASet
		? `${buyBaseUrl}/token/${contractAddress}`
		: buyBaseUrl;

	const handleCAClick = async () => {
		if (!isCASet) {
			// Coming soon animation
			if (caTextRef.current) {
				const originalColor = caTextRef.current.style.color;
				setCaText("CA: Coming Soon...");
				caTextRef.current.style.color = "#d14149";

				setTimeout(() => {
					setCaText("CA: Coming Soon");
					if (caTextRef.current)
						caTextRef.current.style.color = originalColor || "";
				}, 2000);
			}
		} else {
			// Copy
			try {
				await navigator.clipboard.writeText(contractAddress);
				if (caTextRef.current) {
					const originalColor = caTextRef.current.style.color;
					setCaText("CA: Copied!");
					caTextRef.current.style.color = "#10b981";

					setTimeout(() => {
						setCaText(`CA: ${contractAddress}`);
						if (caTextRef.current)
							caTextRef.current.style.color = originalColor || "";
					}, 2000);
				}
			} catch (err) {
				console.error("Failed to copy", err);
			}
		}
	};

	return (
		<section id="overlap-section" className="overlap-section">
			{/* Floating Logo */}
			<div className="floating-logo">
				<img src="/assets/logo/float.png" alt="KOA Float Logo" />
			</div>

			<div className="overlap-content">
				<img src="/assets/paralax/over.png" alt="Overlap Content" />
			</div>

			{/* Main Container for all elements */}
			<div className="main-container">
				{/* CA Box Section */}
				<div className="ca-box-section">
					<div
						className="ca-text-container"
						title="Click to copy"
						onClick={handleCAClick}>
						<span className="ca-text" ref={caTextRef}>
							{caText}
						</span>
						<div className="tooltip">Click to copy</div>
					</div>

					{/* Buy Button */}
					<a
						href={buyLink}
						target="_blank"
						rel="noopener noreferrer"
						className="buy-button"
						title="Buy KOA">
						<div className="button-face">
							<span className="button-text">BUY</span>
						</div>
						<div className="icons-container">
							<i className="fas fa-shopping-cart"></i>
						</div>
					</a>
				</div>

				{/* Slideshow Container */}
				<div className="slideshow-container">
					{/* Socials */}
					<Socials />
					{/* Slideshow */}
					<Slideshow />
				</div>
			</div>
		</section>
	);
}
