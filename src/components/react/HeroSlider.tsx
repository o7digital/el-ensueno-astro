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
];

const SLIDE_DURATION = 6500;
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Suites", href: "#suites" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Header - Transparent avec effet au scroll comme Zotela */}
      <div className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}>
        <header className="container mx-auto flex items-center justify-between px-6 py-4 sm:px-10 sm:py-5">
          {/* Logo et Navigation - Alignés à gauche */}
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <img 
                src="/logo/logo.jpg" 
                alt="Murmullo Logo" 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="leading-tight">
                <p className={`text-base uppercase tracking-[0.18em] font-semibold transition-colors ${
                  scrolled ? "text-ink" : "text-white"
                }`}>Murmullo</p>
                <p className={`text-xs transition-colors ${
                  scrolled ? "text-ink/70" : "text-white/70"
                }`}>Casa entre jungle & mer</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative pb-1 uppercase tracking-wider transition-colors ${
                    scrolled ? "text-ink/85 hover:text-ink" : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className={`absolute inset-x-0 -bottom-1 h-[1px] scale-x-0 transition group-hover:scale-x-100 ${
                    scrolled ? "bg-ink/70" : "bg-white/70"
                  }`}></span>
                </a>
              ))}
            </nav>
          </div>
          
          {/* Bouton Contact à droite */}
          <a
            href="#contact"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              scrolled 
                ? "bg-ink text-white hover:bg-ink/90 focus-visible:outline-ink" 
                : "bg-white text-ink hover:bg-white/90 focus-visible:outline-white"
            }`}
          >
            Book Now
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
          <h1 className="text-5xl leading-[1.1] sm:text-6xl lg:text-7xl xl:text-8xl font-display font-medium text-white">
            {slides[activeIndex].title}
          </h1>
          <p className="max-w-xl text-base sm:text-lg text-white/90 font-light leading-relaxed">
            {slides[activeIndex].caption}
          </p>
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-none border border-white/30 bg-transparent px-6 py-3 text-sm font-medium text-white uppercase tracking-wider transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                index === activeIndex ? "bg-white w-12" : "bg-white/40 w-1.5"
              }`}
              aria-label={`Voir le visuel ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
