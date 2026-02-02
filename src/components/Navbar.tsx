"use client";
import { useState, useRef } from "react";
import Socials from "./Socials";

export default function Navbar() {
	// Config
	const [contractAddress] = useState("CONTRACT_ADDRESS"); // Default empty
	const buyBaseUrl = "https://letsbonk.fun";

	// UI State for CA
	const [caText, setCaText] = useState(
		contractAddress ? `CA: ${contractAddress}` : "CA: Coming Soon",
	);
	const caTextRef = useRef<HTMLSpanElement>(null);

	const isCASet = contractAddress && contractAddress.trim() !== "";

	// Logic for links
	const buyLink = "#";

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
		<nav className="navbar">
			<style jsx>{`
				.navbar {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					padding: 20px 40px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					z-index: 999;
					pointer-events: none; /* Allow clicking through empty space */
				}

				.nav-left,
				.nav-right {
					pointer-events: auto; /* Re-enable clicks on buttons */
					display: flex;
					align-items: center;
					gap: 20px;
				}

				/* Reuse existing styles from globals but ensure they work here */
				.ca-text-container,
				.buy-button {
					margin: 0;
					position: relative;
					height: 50px;
					padding: 0 30px;
					background: #000000;
					border-radius: 10px;
					border: 4px solid #000;
					box-shadow: 8px 8px 0 #d14149;
					cursor: pointer;
					overflow: hidden;
					transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
					display: flex;
					align-items: center;
					justify-content: center;
					text-decoration: none;
				}

				.ca-text-container:hover,
				.buy-button:hover {
					transform: translate(-2px, -2px);
					box-shadow: 5px 5px 0 #d14149;
				}

				.ca-text,
				.button-text {
					color: #ffffff;
					font-weight: 800;
					font-size: 1.2rem;
					text-transform: uppercase;
					letter-spacing: 2px;
					z-index: 2;
				}

				/* Hide global icons for now to match text style */
				.buy-button .icons-container {
					display: none;
				}

				/* Override globals that might interfere */
				.ca-text-container {
					background: #000000 !important;
					border-color: #000000 !important;
				}

				.buy-button {
					background: #000000 !important;
					border-color: #000000 !important;
				}

				@media (max-width: 768px) {
					.navbar {
						padding: 10px 15px;
						flex-direction: column;
						gap: 15px;
						/* Removed gradient as requested implicitly or just cleaner look */
						background: transparent;
					}

					.nav-left {
						transform: scale(0.85);
						width: 100%;
						justify-content: center;
					}

					.nav-right {
						transform: scale(0.85);
					}
				}

				/* Force Socials to be relative/static inside Navbar */
				:global(.navbar .social-container) {
					position: relative !important;
					left: auto !important;
					top: auto !important;
					padding: 0 !important;
					z-index: 10 !important;
					width: auto !important; /* Allow it to shrink/grow */
					height: auto !important;
				}

				/* Adjust social button size if needed in navbar */
				:global(.navbar .social-button) {
					transform: scale(0.8); /* Make it slightly smaller in navbar */
					transform-origin: right center;
				}
			`}</style>

			{/* Left Side: CA & Buy */}
			<div className="nav-left">
				<div
					className="ca-text-container"
					title="Click to copy"
					onClick={handleCAClick}>
					<span className="ca-text" ref={caTextRef}>
						{caText}
					</span>
					<div className="tooltip">Click to copy</div>
				</div>

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

			{/* Right Side: Socials */}
			<div className="nav-right">
				{/* Wrap Socials to control layout/styling if needed */}
				<Socials />
			</div>
		</nav>
	);
}
