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
  { label: "Suites", href: "#suites", hasMegamenu: true },
  { label: "Embraced by the Sea", href: "#embraced-sea" },
  { label: "Fusion Cuisine", href: "#fusion-cuisine" },
  { label: "Activities", href: "#activities" },
  { label: "Contact", href: "#contact" },
];

const suites = [
  {
    title: "Sra. Tentación",
    image: "/images/suites/sra-tentacion/exclusive-boutique-villa-hotel-zihuatanejo-ixtapa-mexico-01.jpg",
    size: "55 m²",
    guests: "2-3 guests",
  },
  {
    title: "Garden Suite",
    image: "/images/suites/garden-suite/garden-1.jpg",
    size: "45 m²",
    guests: "2 guests",
  },
  {
    title: "Junior Suite Señorita Surena",
    image: "/images/suites/junior-suite-senerata-surena/junior-suite1.jpg",
    size: "38 m²",
    guests: "2 guests",
  },
  {
    title: "Junior Suite Señorita Sonrisa",
    image: "/images/suites/junior-suite-senorita-sonrisa/suite-1.jpg",
    size: "40 m²",
    guests: "2 guests",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSuitesMegamenu, setShowSuitesMegamenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at the top - show header
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide header
        setVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      {/* Header - Blanc avec effet de disparition au scroll */}
      <div className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}>
        <header className="container mx-auto flex items-center justify-between px-6 py-4 sm:px-10 sm:py-5">
          {/* Logo et Navigation - Alignés à gauche */}
          <div className="flex items-center gap-10">
            <img 
              src="/logo/logo.jpg" 
              alt="Murmullo Logo" 
              className="h-12 w-auto object-contain"
            />
            <nav className="hidden items-center gap-8 text-sm font-bold lg:flex ml-20">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.hasMegamenu && setShowSuitesMegamenu(true)}
                  onMouseLeave={() => link.hasMegamenu && setShowSuitesMegamenu(false)}
                >
                  <a
                    href={link.href}
                    className="group relative pb-1 uppercase tracking-wider transition-colors text-ink hover:text-ink/70"
                  >
                    {link.label}
                    <span className="absolute inset-x-0 -bottom-1 h-[1px] scale-x-0 transition group-hover:scale-x-100 bg-ink/70"></span>
                  </a>
                  
                  {/* Megamenu pour Suites */}
                  {link.hasMegamenu && showSuitesMegamenu && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-screen max-w-[1600px]">
                      <div className="bg-white rounded-2xl shadow-2xl p-12 mx-6 border border-dusk/10">
                        <div className="grid grid-cols-4 gap-8">
                          {suites.map((suite) => (
                            <a
                              key={suite.title}
                              href={`/suites/${suite.title.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')}`}
                              className="group relative overflow-hidden rounded-2xl bg-ink shadow-lg"
                            >
                              <div className="aspect-[4/3] relative overflow-hidden">
                                <img
                                  src={suite.image}
                                  alt={suite.title}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"></div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-[1.0625rem] font-serif mb-2 uppercase text-white min-h-[3.5rem]">
                                  {suite.title}
                                </h3>
                                <div className="flex gap-3 text-sm text-white/80">
                                  <span>{suite.size}</span>
                                  <span>•</span>
                                  <span>{suite.guests}</span>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          
          {/* Bouton Contact à droite */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold uppercase transition-all hover:-translate-y-0.5 bg-white text-ink hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
