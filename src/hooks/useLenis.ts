"use client";
import { useEffect, useState } from "react";
import Lenis from "lenis";

export default function useLenis() {
	const [lenis, setLenis] = useState<Lenis | null>(null);

	useEffect(() => {
		const lenisInstance = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: "vertical", // 'direction' is often 'orientation' in newer versions or just default
			gestureOrientation: "vertical",
			wheelMultiplier: 1,
			touchMultiplier: 2,
			infinite: false,
		});

		function raf(time: number) {
			lenisInstance.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
		setLenis(lenisInstance);

		return () => {
			lenisInstance.destroy();
		};
	}, []);

	return lenis;
}
