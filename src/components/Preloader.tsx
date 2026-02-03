"use client";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
	const [visible, setVisible] = useState(true);
	const preloaderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const preloader = preloaderRef.current;
		if (!preloader) return;

		// Force sequence
		const runSequence = async () => {
			// Show Letters (Simulated)
			const containers = preloader.querySelectorAll(".letter-container");
			containers.forEach((c) => {
				const el = c as HTMLElement;
				el.style.opacity = "1";
				el.style.transform = "translateY(0)";
			});

			// Loop Time (2.5s)
			await new Promise((r) => setTimeout(r, 2500));

			// Exit Animation
			containers.forEach((c, i) => {
				const target = c.querySelector(
					".masked-image, .type-a-text",
				) as HTMLElement;
				// K (0) and A (2) Up, O (1) Down
				if (target) {
					target.style.animation =
						i === 1
							? "exitDown 0.8s ease-in forwards"
							: "exitUp 0.8s ease-in forwards";
				}
			});

			// Wait for Exit (0.8s) + Buffer
			await new Promise((r) => setTimeout(r, 1000));

			// Hide Component
			preloader.classList.add("hidden");
			await new Promise((r) => setTimeout(r, 500));

			setVisible(false);
			const mainContent = document.getElementById("main-content");
			if (mainContent) mainContent.classList.add("visible");
		};

		// Run immediately
		runSequence();

		// Safety Fallback (6s absolute max)
		const fallback = setTimeout(() => {
			setVisible(false);
			const mainContent = document.getElementById("main-content");
			if (mainContent) mainContent.classList.add("visible");
		}, 6000);

		return () => clearTimeout(fallback);
	};, []);

	if (!visible) return null;

	return (
		<div id="preloader" className="preloader" ref={preloaderRef}>
			<div className="preloader-content">
				<div className="letter-row">
					{/* Huruf K */}
					<div className="letter-container">
						<div className="mask-letter mask-k">
							{/* Replaced img with div for background scrolling */}
							<div className="masked-image" />
						</div>
					</div>

					{/* Huruf O */}
					<div className="letter-container">
						<div className="mask-letter mask-o">
							<div className="masked-image" />
						</div>
					</div>

					{/* Huruf A */}
					<div className="letter-container">
						<div className="type-a-container">
							<div className="type-a-text">A</div>
						</div>
					</div>
				</div>
			</div>
			{/* Filter untuk efek Grunge/Kasar */}
			<svg style={{ position: "absolute", width: 0, height: 0 }}>
				<defs>
					<filter id="grunge-filter">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.03"
							numOctaves="3"
							result="noise"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="noise"
							scale="10"
							xChannelSelector="R"
							yChannelSelector="G"
						/>
						<feComposite operator="in" in2="SourceGraphic" />
					</filter>
				</defs>
			</svg>
		</div>
	);
}
