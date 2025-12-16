import React, { useEffect, useState } from "react";

const images = [
  "/images/robin-davies-diner.webp",
  "/images/jeremy-bishop-surfing.webp",
  "/images/karl-callwood.webp",
  "/images/jeremy-bishop-voilier.webp",
  "/images/hiroko-yoshii.webp",
  "/images/yoga.webp",
  "/images/langosta.webp",
  "/images/mexicana.webp",
];

const SLIDE_DURATION = 4000;

export default function ActivitiesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Images du slider */}
      <div className="relative h-full w-full">
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Activities ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex ? "bg-white w-8" : "bg-white/50 w-2"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
