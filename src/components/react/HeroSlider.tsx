import React, { useEffect, useState } from "react";
import { ui } from "@/i18n/ui";
import type { ResponsiveImageMap } from "@/types/images";

type Slide = {
  src: string;
  titleKey: string;
  captionKey: string;
  alt: {
    en: string;
    es: string;
  };
};

export const slideData: Slide[] = [
  {
    src: "/images/hero/1.webp",
    titleKey: "hero.slide1.title",
    captionKey: "hero.slide1.caption",
    alt: {
      en: "El Ensueño luxury beach villa",
      es: "Villa de lujo frente al mar El Ensueño",
    },
  },
  {
    src: "/images/hero/2.webp",
    titleKey: "hero.slide2.title",
    captionKey: "hero.slide2.caption",
    alt: {
      en: "El Ensueño dining experience",
      es: "Experiencia gastronómica en El Ensueño",
    },
  },
  {
    src: "/images/hero/3.webp",
    titleKey: "hero.slide3.title",
    captionKey: "hero.slide3.caption",
    alt: {
      en: "El Ensueño suite with plunge pool",
      es: "Suite de El Ensueño con alberca privada",
    },
  },
  {
    src: "/images/hero/4.webp",
    titleKey: "hero.slide4.title",
    captionKey: "hero.slide4.caption",
    alt: {
      en: "El Ensueño palapa lounge",
      es: "Palapa lounge de El Ensueño",
    },
  },
  {
    src: "/images/hero/5.webp",
    titleKey: "hero.slide5.title",
    captionKey: "hero.slide5.caption",
    alt: {
      en: "El Ensueño infinity pool",
      es: "Alberca infinita en El Ensueño",
    },
  },
  {
    src: "/images/hero/6.webp",
    titleKey: "hero.slide6.title",
    captionKey: "hero.slide6.caption",
    alt: {
      en: "El Ensueño beachfront",
      es: "Frente de playa en El Ensueño",
    },
  },
];

const SLIDE_DURATION = 5000;

interface HeroSliderProps {
  lang?: 'en' | 'es';
  images: ResponsiveImageMap;
}

export default function HeroSlider({ lang = 'en', images }: HeroSliderProps) {
  const labels = ui[lang];
  const slides = slideData.map(slide => ({
    ...slide,
    title: ui[lang][slide.titleKey as keyof typeof ui.en],
    caption: ui[lang][slide.captionKey as keyof typeof ui.en],
    alt: slide.alt[lang],
  }));

  const resolveImage = (path: string) => images[path];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || paused || !hasInteracted) return undefined;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(id);
  }, [hasInteracted, paused, prefersReducedMotion]);

  useEffect(() => {
    const enableAutoplay = () => setHasInteracted(true);
    window.addEventListener("pointerdown", enableAutoplay, { once: true });
    window.addEventListener("keydown", enableAutoplay, { once: true });
    window.addEventListener("scroll", enableAutoplay, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", enableAutoplay);
      window.removeEventListener("keydown", enableAutoplay);
      window.removeEventListener("scroll", enableAutoplay);
    };
  }, []);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-ink/80 text-sand"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Images du slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          (() => {
            const image = resolveImage(slide.src);
            const isFirst = index === 0;
            return (
          <picture
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={image.src}
              alt={slide.alt}
              className="h-full w-full object-cover"
              srcSet={image.srcSet}
              sizes={image.sizes}
              width={image.width}
              height={image.height}
              loading={image.loading ?? (isFirst ? "eager" : "lazy")}
              fetchPriority={image.fetchPriority ?? (isFirst ? "high" : "auto")}
              decoding={image.decoding ?? "async"}
            />
          </picture>
            );
          })()
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Logo en overlay sous le menu */}
      <div className="pointer-events-none absolute left-4 top-20 z-20 sm:left-8 sm:top-24 lg:left-12 lg:top-28">
        <a
          href={lang === "es" ? "/es" : "/"}
          className="pointer-events-auto inline-flex rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-white"
          aria-label={lang === "es" ? "Volver al inicio" : "Back to home"}
        >
          <img
            src="/logo/logotipo%20el%20ensueno%20FONDO%20BLANCO.png"
            alt="El Ensueño"
            className="w-auto object-contain h-[68px] sm:h-[84px] md:h-[104px]"
            width={7096}
            height={1761}
            loading="eager"
            decoding="async"
          />
        </a>
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
              aria-label={`${labels['slider.dotLabel']} ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
