"use client";
import { useEffect, useRef, useState } from "react";

export default function Slideshow() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const totalSlides = 10;
	const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
	const touchStartX = useRef(0);
	const touchEndX = useRef(0);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % totalSlides);
	};

	const previousSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
	};

	const handleSwipe = () => {
		const swipeThreshold = 50;
		const diff = touchStartX.current - touchEndX.current;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0) {
				nextSlide();
			} else {
				previousSlide();
			}
		}
	};

	const startAutoPlay = () => {
		stopAutoPlay();
		autoPlayRef.current = setInterval(() => {
			nextSlide();
		}, 4000);
	};

	const stopAutoPlay = () => {
		if (autoPlayRef.current) {
			clearInterval(autoPlayRef.current as NodeJS.Timeout);
		}
	};

	useEffect(() => {
		startAutoPlay();
		return () => stopAutoPlay();
	}, []);

	// Images 1 to 10
	const slides = Array.from({ length: totalSlides }, (_, i) => i + 1);

	return (
		<div
			className="slideshow-wrapper"
			onTouchStart={(e) => {
				touchStartX.current = e.changedTouches[0].screenX;
				stopAutoPlay();
			}}
			onTouchEnd={(e) => {
				touchEndX.current = e.changedTouches[0].screenX;
				handleSwipe();
				startAutoPlay();
			}}
			onMouseDown={(e) => {
				touchStartX.current = e.screenX;
				stopAutoPlay();
			}}
			onMouseUp={(e) => {
				touchEndX.current = e.screenX;
				handleSwipe();
				startAutoPlay();
			}}>
			{slides.map((num, index) => (
				<div
					key={num}
					className={`slide-card ${index === currentSlide ? "active" : ""}`}>
					<img src={`/assets/meme/images_${num}.avif`} alt={`Slide ${num}`} />
				</div>
			))}
		</div>
	);
}
