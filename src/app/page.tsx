"use client";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroParallax from "@/components/HeroParallax";
import OverlapSection from "@/components/OverlapSection";
import useLenis from "@/hooks/useLenis";

export default function Home() {
	useLenis();

	return (
		<>
			<Preloader />
			<Navbar />
			<div id="main-content" className="main-content">
				<HeroParallax />
				<OverlapSection />
			</div>
		</>
	);
}
