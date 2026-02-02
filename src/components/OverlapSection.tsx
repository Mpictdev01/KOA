"use client";
import Slideshow from "./Slideshow";

export default function OverlapSection() {
	return (
		<section id="overlap-section" className="overlap-section">
			{/* Floating Logo */}
			<div className="floating-logo">
				<img src="/assets/logo/float.png" alt="KOA Float Logo" />
			</div>

			<div className="overlap-content">
				<img src="/assets/paralax/over.png" alt="Overlap Content" />
			</div>

			{/* FULL WIDTH SLIDESHOW */}
			<div
				style={{
					position: "absolute",
					bottom: -50 /* Lowered by 50px to avoid covering float logo */,
					left: 0,
					width: "100%",
					zIndex: 40,
					pointerEvents: "none",
				}}>
				<div style={{ pointerEvents: "auto" }}>
					<Slideshow />
				</div>
			</div>
		</section>
	);
}
