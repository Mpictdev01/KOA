"use client";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
	const [visible, setVisible] = useState(true);
	const preloaderRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const preloader = preloaderRef.current;
		if (!preloader) return;

		const images = Array.from(
			preloader.querySelectorAll("img.masked-image"),
		) as HTMLImageElement[];
		const letterContainers = Array.from(
			preloader.querySelectorAll(".letter-container"),
		) as HTMLElement[];

		const loadImages = async () => {
			const promises = images.map((img) => {
				return new Promise<void>((resolve, reject) => {
					if (img.complete) {
						resolve();
					} else {
						img.onload = () => resolve();
						img.onerror = reject;
					}
				});
			});
			return Promise.all(promises);
		};

		const startExitAnimation = () => {
			console.log("Starting exit animation");

			// Exit animation for B and K (slide up letters)
			const slideUpLetters = [letterContainers[0], letterContainers[2]];
			slideUpLetters.forEach((container, index) => {
				if (container) {
					setTimeout(() => {
						const target = container.querySelector(
							".masked-image, .type-a-text",
						) as HTMLElement;
						if (target) target.style.animation = "exitUp 0.8s ease-in forwards";
					}, index * 100);
				}
			});

			// Exit animation for O (slide down letter)
			setTimeout(() => {
				const centerLetter = letterContainers[1];
				if (centerLetter) {
					const target = centerLetter.querySelector(
						".masked-image, .type-a-text",
					) as HTMLElement;
					if (target) target.style.animation = "exitDown 0.8s ease-in forwards";
				}
			}, 100);

			// Hide preloader after exit animation completes + 0.5s delay
			setTimeout(() => {
				if (preloaderRef.current) {
					preloaderRef.current.classList.add("hidden");
					// Allow removing from DOM after fade out
					setTimeout(() => {
						setVisible(false);
						// Signal to main content to show?
						// In React, we might just unmount.
						// But maintaining "visible" class on main content is handled by CSS transition usually
						const mainContent = document.getElementById("main-content");
						if (mainContent) mainContent.classList.add("visible");
					}, 500);
				}
			}, 1300);
		};

		const startPreloader = () => {
			console.log("Preloader started");

			letterContainers.forEach((container, index) => {
				setTimeout(() => {
					container.style.opacity = "1";
					container.style.transform = "translateY(0)";
					container.style.transition = "opacity 0.8s ease, transform 0.8s ease";
				}, index * 200);
			});

			setTimeout(
				() => {
					startExitAnimation();
				},
				2000 + letterContainers.length * 200,
			);
		};

		loadImages().then(() => {
			startPreloader();
		});
	}, []);

	if (!visible) return null;

	return (
		<div id="preloader" className="preloader" ref={preloaderRef}>
			<div className="preloader-content">
				<div className="letter-row">
					{/* Huruf K */}
					<div className="letter-container">
						<div className="mask-letter mask-k">
							<img
								src="/assets/masking/k.avif"
								alt="K"
								className="masked-image"
							/>
						</div>
					</div>

					{/* Huruf O */}
					<div className="letter-container">
						<div className="mask-letter mask-o">
							<img
								src="/assets/masking/o.avif"
								alt="O"
								className="masked-image"
							/>
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
