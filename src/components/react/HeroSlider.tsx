import React, { useEffect, useState } from "react";

type Slide = {
  src: string;
  title: string;
  caption: string;
  alt: string;
};

const slides: Slide[] = [
  {
    src: "/images/hero/el-murmullo0.jpg",
    title: "Luxury Living In Every Detail",
    caption: "Experience unmatched comfort with our exclusive luxurious stays",
    alt: "Murmullo luxury hotel view",
  },
  {
    src: "/images/hero/el-murmullo1.jpg",
    title: "The Essence Of Hospitality",
    caption: "Immerse yourself in the finest hospitality, with special deals on our luxury suites",
    alt: "Murmullo hotel architecture",
  },
  {
    src: "/images/hero/el-murmullo2.jpg",
    title: "Rooted In Timeless Traditions",
    caption: "Limited-time offers on premium rooms and suites",
    alt: "Murmullo hotel interior",
  },
  {
    src: "/images/hero/el-murmullo3.jpg",
    title: "Exceptional Care Awaiting",
    caption: "Book now and immerse yourself in the finest hospitality",
    alt: "Murmullo hotel experience",
  },
  {
    src: "/images/hero/el-murmullo4.jpg",
    title: "The Heart Of Hospitality",
    caption: "Experience unmatched comfort with our exclusive stays",
    alt: "Murmullo hotel luxury",
  },
  {
    src: "/images/hero/el-murmullo5.jpg",
    title: "Luxury Living In Every Detail",
    caption: "Discover the perfect blend of luxury and comfort",
    alt: "Murmullo hotel view",
  },
  {
    src: "/images/hero/el-murmullo6.jpg",
    title: "The Essence Of Hospitality",
    caption: "Your haven for relaxation and rejuvenation",
    alt: "Murmullo hotel relaxation",
  },
  {
    src: "/images/hero/el-murmullo7.jpg",
    title: "Rooted In Timeless Traditions",
    caption: "Experience the finest luxury hospitality",
    alt: "Murmullo hotel tradition",
  },
  {
    src: "/images/hero/el-murmullo8.jpg",
    title: "Exceptional Care Awaiting",
    caption: "Limited-time offers on premium rooms",
    alt: "Murmullo hotel rooms",
  },
  {
    src: "/images/hero/el-murmullo9.jpg",
    title: "The Heart Of Hospitality",
    caption: "Immerse yourself in luxury and comfort",
    alt: "Murmullo hotel hospitality",
  },
  {
    src: "/images/hero/el-murmullo10.jpg",
    title: "Luxury Living In Every Detail",
    caption: "Book now for exclusive deals on luxury suites",
    alt: "Murmullo hotel luxury suites",
  },
];

const SLIDE_DURATION = 6500;
const navLinks = [
  { label: "Maison", href: "#maison" },
  { label: "Suites", href: "#suites" },
  { label: "Galerie", href: "#galerie" },
  { label: "Contact", href: "#contact" },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || paused) return undefined;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(id);
  }, [paused, prefersReducedMotion]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-ink/80 text-sand"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header - Logo et Menu en haut à gauche */}
      <div className="absolute inset-x-0 top-0 z-20 px-6 py-6 sm:px-10 sm:py-8">
        <header className="flex items-center justify-between">
          {/* Logo et Navigation - Alignés à gauche */}
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-ink font-semibold tracking-[0.14em] text-lg">
                M
              </div>
              <div className="leading-tight">
                <p className="text-base uppercase tracking-[0.18em] text-sand font-semibold">Murmullo</p>
                <p className="text-xs text-sand/70">Casa entre jungle & mer</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm font-medium text-sand/85 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative pb-1 transition hover:text-sand uppercase tracking-wider"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-1 h-[1px] scale-x-0 bg-sand/70 transition group-hover:scale-x-100"></span>
                </a>
              ))}
            </nav>
          </div>
          
          {/* Bouton Contact à droite */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-sand px-5 py-2.5 text-sm font-semibold text-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
          >
            Réserver
          </a>
        </header>
      </div>

      {/* Images du slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <picture
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </picture>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Texte du slider - En bas à gauche comme Zotela */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
        <div className="max-w-4xl space-y-4">
          <h1 className="text-5xl leading-[1.1] sm:text-6xl lg:text-7xl xl:text-8xl font-display font-medium">
            {slides[activeIndex].title}
          </h1>
          <p className="max-w-xl text-base sm:text-lg text-sand/90 font-light leading-relaxed">
            {slides[activeIndex].caption}
          </p>
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-none border border-sand/30 bg-transparent px-6 py-3 text-sm font-medium text-sand uppercase tracking-wider transition hover:bg-sand hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
            >
              View Rooms
            </a>
          </div>
        </div>
        
        {/* Navigation dots en bas */}
        <div className="mt-8 flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              onClick={() => handleSelect(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "bg-sand w-12" : "bg-sand/40 w-1.5"
              }`}
              aria-label={`Voir le visuel ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
