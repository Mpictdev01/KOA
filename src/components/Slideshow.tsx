"use client";

// Image groups - ensure we have enough images to loop
const row1Images = [1, 2, 3, 4];
const row2Images = [5, 6, 7, 8];
const row3Images = [9, 10, 11, 12];

export default function Slideshow() {
    // Duplicate content enough times to ensure it covers 4K screens (approx 4000px needed)
    // 4 images * 250px = 1000px.
    // 3 repetitions = 3000px.
    // 4 repetitions = 4000px.
    // Let's use 6 repetitions in the "group" to be super safe and distinct.
    const makeGroup = (arr: number[]) => [...arr, ...arr, ...arr, ...arr, ...arr, ...arr];

	return (
		<div className="slideshow-marquee-container">
			<style jsx>{`
				.slideshow-marquee-container {
					width: 100%;
					position: relative;
					z-index: 1; /* Low z-index */
					display: flex;
					flex-direction: column;
					gap: 30px;
					padding-top: 40px;
                    padding-bottom: 100px;
					overflow: hidden;
                    pointer-events: auto;
				}
				
				.marquee-row {
					display: flex;
					width: 100%;
					overflow: hidden;
                    position: relative;
                    user-select: none;
				}

                /* Wrapper for the two groups */
				.marquee-track {
					display: flex;
					gap: 0; 
                    width: max-content;
				}

				.marquee-group {
					display: flex;
					gap: 20px;
                    padding-right: 20px;
					flex-shrink: 0;
                    width: max-content;
                    will-change: transform;
                    /* Force hardware acceleration */
                    transform: translate3d(0, 0, 0);
				}

				.marquee-card {
                    width: 250px;
                    height: 250px;
					flex-shrink: 0;
					border-radius: 12px;
					overflow: hidden;
                    position: relative;
                    opacity: 1;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                    border: 2px solid rgba(255,255,255,0.1);
                    background: #000;
				}

				.marquee-card img {
					width: 100%;
					height: 100%;
					object-fit: contain;
                    border-radius: 12px;
                    transition: transform 0.3s ease;
                    display: block;
				}
                
                .marquee-card:hover img {
                    transform: scale(1.1);
                }

                /* Mobile adjustments */
                @media (max-width: 768px) {
                    .marquee-card {
                        width: 140px;
                        height: 140px;
                    }
                    .slideshow-marquee-container {
                        gap: 15px;
                        padding: 20px 0;
                    }
                    .marquee-group {
                        gap: 15px;
                        padding-right: 15px;
                    }
                }
			`}</style>
            
            {/* GLOBAL STYLES FOR ANIMATION KEYFRAMES TO AVOID SCOPING FLAKINESS */}
            <style jsx global>{`
                .animate-left {
                    animation: globalScrollLeft 60s linear infinite !important;
                    animation-fill-mode: forwards;
                }

                .animate-right {
                    animation: globalScrollRight 60s linear infinite !important;
                    animation-fill-mode: forwards;
                }

                @keyframes globalScrollLeft {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-100%, 0, 0); }
                }

                @keyframes globalScrollRight {
                    0% { transform: translate3d(-100%, 0, 0); }
                    100% { transform: translate3d(0, 0, 0); }
                }
            `}</style>

			{/* Row 1: Right */}
			<div className="marquee-row">
                <div className="marquee-group animate-right">
					{makeGroup(row1Images).map((num, i) => (
						<div key={`r1-a-${i}`} className="marquee-card">
							<img src={`/assets/meme/images_${num}.avif`} alt={`Slide ${num}`} />
						</div>
					))}
                </div>
                <div className="marquee-group animate-right">
					{makeGroup(row1Images).map((num, i) => (
						<div key={`r1-b-${i}`} className="marquee-card">
							<img src={`/assets/meme/images_${num}.avif`} alt={`Slide ${num}`} />
						</div>
					))}
                </div>
			</div>

			{/* Row 2: Left */}
			<div className="marquee-row">
                <div className="marquee-group animate-left">
					{makeGroup(row2Images).map((num, i) => (
						<div key={`r2-a-${i}`} className="marquee-card">
							<img src={`/assets/meme/images_${num}.avif`} alt={`Slide ${num}`} />
						</div>
					))}
                </div>
                <div className="marquee-group animate-left">
					{makeGroup(row2Images).map((num, i) => (
						<div key={`r2-b-${i}`} className="marquee-card">
							<img src={`/assets/meme/images_${num}.avif`} alt={`Slide ${num}`} />
						</div>
					))}
                </div>
			</div>

			{/* Row 3: Right */}
			<div className="marquee-row">
                <div className="marquee-group animate-right">
					{makeGroup(row3Images).map((num, i) => (
						<div key={`r3-a-${i}`} className="marquee-card">
							<img src={`/assets/meme/images_${num}.avif`} alt={`Slide ${num}`} />
						</div>
					))}
                </div>
                <div className="marquee-group animate-right">
					{makeGroup(row3Images).map((num, i) => (
						<div key={`r3-b-${i}`} className="marquee-card">
							<img src={`/assets/meme/images_${num}.avif`} alt={`Slide ${num}`} />
						</div>
					))}
                </div>
			</div>
		</div>
	);
}
