"use client";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
	const [visible, setVisible] = useState(true);
	const preloaderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const preloader = preloaderRef.current;
		if (!preloader) return;

		const letterContainers = Array.from(
			preloader.querySelectorAll(".letter-container"),
		) as HTMLElement[];

		// Images to preload
		const imageUrls = [
			"/assets/masking/k.avif",
			"/assets/masking/o.avif",
			// A uses k.avif too
		];

		const loadImages = async () => {
			const promises = imageUrls.map((src) => {
				return new Promise<void>((resolve) => {
					const img = new Image();
					img.src = src;
					img.onload = () => resolve();
					img.onerror = () => resolve(); // Proceed even on error
				});
			});

			// Limit wait time to 1.5s max
			const timeout = new Promise<void>((resolve) => setTimeout(resolve, 1500));

			return Promise.race([Promise.all(promises), timeout]);
		};

		const startExitAnimation = () => {
			console.log("Starting exit animation");

			// Exit animation for B and K (slide up letters - using container transform)
			// Wait, previous code targeted .masked-image for exit OR .type-a-text
			// We want to animate the CONTENT out, or the CONTAINER?
			// Original code animated the content (target.style.animation).
			// If we replace animation, the loop stops and exit starts. Perfect.

			const slideUpLetters = [letterContainers[0], letterContainers[2]];
			slideUpLetters.forEach((container, index) => {
				if (container) {
					setTimeout(() => {
						const target = container.querySelector(
							".masked-image, .type-a-text",
						) as HTMLElement;
						if (target) {
							// Override the infinite loop with exit animation
							target.style.animation = "exitUp 0.8s ease-in forwards";
						}
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
					if (target) {
						target.style.animation = "exitDown 0.8s ease-in forwards";
					}
				}
			}, 100);

			// Hide preloader after exit animation
			setTimeout(() => {
				if (preloaderRef.current) {
					preloaderRef.current.classList.add("hidden");
					setTimeout(() => {
						setVisible(false);
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

			// Run loop for a set time (e.g., 3s) then exit
			// User wants "infinite loop style". This usually means until load is done.
			// Since this is a simulated preloader, let's give it a good loop time (e.g. 4s)
			// or just kept original timing (2s + delays).

			setTimeout(
				() => {
					startExitAnimation();
				},
				3500, // Slight increase to enjoy the loop
			);
		};

		// Force visible start if something goes wrong
		const safetyTimer = setTimeout(() => {
			if (preloaderRef.current) {
				console.log("Safety timer triggered");
				startPreloader();
			}
		}, 2000);

		loadImages().then(() => {
			clearTimeout(safetyTimer);
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
