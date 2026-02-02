"use client";
import { useEffect, useRef } from "react";

export default function HeroParallax() {
	const layer2Ref = useRef<HTMLDivElement>(null);
	const layer3Ref = useRef<HTMLDivElement>(null);
	const layer4Ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Force visibility
		if (layer2Ref.current) layer2Ref.current.style.opacity = "1";
		if (layer3Ref.current) layer3Ref.current.style.opacity = "1";
		if (layer4Ref.current) layer4Ref.current.style.opacity = "1";

		const handleMouseMove = (e: MouseEvent) => {
			const mouseX = e.clientX;
			const mouseY = e.clientY;

			const centerX = window.innerWidth / 2;
			const centerY = window.innerHeight / 2;
			const moveX = (mouseX - centerX) / centerX;
			const moveY = (mouseY - centerY) / centerY;

			// Layer 3
			if (layer3Ref.current) {
				const moveX3 = moveX * 30;
				const moveY3 = moveY * 30;
				layer3Ref.current.style.transform = `translate(${moveX3}px, ${moveY3}px) scale(1.2)`;
			}

			// Layer 4
			if (layer4Ref.current) {
				const moveX4 = moveX * 50;
				const moveY4 = moveY * 50;
				layer4Ref.current.style.transform = `translate(${moveX4}px, ${moveY4}px) scale(1.2)`;
			}
		};

		const handleScroll = () => {
			const scrollY = window.scrollY;
			const maxScroll = 400;
			const progress = Math.min(scrollY / maxScroll, 1);
			const scale = 1.2 - progress * 0.6;

			if (layer2Ref.current) {
				layer2Ref.current.style.transform = `scale(${scale})`;
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("scroll", handleScroll);

		// Initial test / setup
		setTimeout(() => {
			if (layer3Ref.current)
				layer3Ref.current.style.transform = "translate(10px, 10px) scale(1.2)";
			if (layer4Ref.current)
				layer4Ref.current.style.transform =
					"translate(-10px, -10px) scale(1.2)";
			// Ensure layer 2 is initially scaled properly
			handleScroll();
		}, 500);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<section id="hero-parallax" className="hero-parallax">
			{/* Layer 4 (paling depan) */}
			<div className="parallax-layer layer-4" data-speed="0.3" ref={layer4Ref}>
				<img src="/assets/paralax/4.png" alt="Parallax Layer 4" />
			</div>

			{/* Layer 3 */}
			<div className="parallax-layer layer-3" data-speed="0.2" ref={layer3Ref}>
				<img src="/assets/paralax/3.png" alt="Parallax Layer 3" />
			</div>

			{/* Layer 2 (akan mengecil saat scroll) */}
			<div className="parallax-layer layer-2" data-speed="0.1" ref={layer2Ref}>
				<img src="/assets/paralax/2.png" alt="Parallax Layer 2" />
			</div>
		</section>
	);
}
