import React, { useEffect, useRef, useState } from "react";
import { slugify } from "@/utils/slugify";
import type { ResponsiveImageMap } from "@/types/images";

interface HeaderProps {
  currentLang?: string;
  suiteImages: ResponsiveImageMap;
}

const getNavLinks = (lang: string) => {
  if (lang === "es") {
    return [
      { label: "Inicio", href: "/es#home" },
      { label: "Suites", href: "/es#suites", hasMegamenu: true },
      { label: "Palapa Beach Lounge", href: "/es#palapa-beach-lounge" },
      { label: "Planes de Comida", href: "/es#local-kitchen" },
      { label: "Contacto", href: "/es/contact" },
    ];
  }
  return [
    { label: "Home", href: "/#home" },
    { label: "Suites", href: "/#suites", hasMegamenu: true },
    { label: "Palapa Beach Lounge", href: "/#palapa-beach-lounge" },
    { label: "Meal Plans", href: "/#local-kitchen" },
    { label: "Contact", href: "/contact" },
  ];
};

export const headerSuites = [
  {
    title: "Inspiración",
    image: "/images/suites/Insp/1.webp",
    size: "285 m² / 3,045 ft²",
    guests: 2,
  },
  {
    title: "Romance",
    image: "/images/suites/roma/1.webp",
    size: "165 m² / 1,775 ft²",
    guests: 2,
  },
  {
    title: "Crepúsculo",
    image: "/images/suites/Crep/1.webp",
    size: "125 m² / 1,350 ft²",
    guests: 2,
  },
  {
    title: "Talismán",
    image: "/images/suites/Talis/1.webp",
    size: "110 m² / 1,170 ft²",
    guests: 2,
  },
];

export default function Header({ currentLang = "en", suiteImages }: HeaderProps) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSuitesMegamenu, setShowSuitesMegamenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const suites = headerSuites;
  const resolveImage = (path: string) => suiteImages[path];

  const navLinks = getNavLinks(currentLang);
  const bookingUrl =
    currentLang === "es"
      ? "https://be.synxis.com/?adult=1&arrive=2025-12-26&chain=22402&child=0&currency=USD&depart=2025-12-27&hotel=78821&level=hotel&locale=es-MX&productcurrency=USD&room=ENS&rooms=1&src=24C"
      : "https://be.synxis.com/?adult=1&arrive=2025-12-26&chain=22402&child=0&currency=USD&depart=2025-12-27&hotel=78821&level=hotel&locale=en-US&productcurrency=USD&room=ENS&rooms=1&src=24C";
  const suiteBasePath = currentLang === "es" ? "/es/suites" : "/suites";
  const closeTimeoutRef = useRef<number | null>(null);

  const getLanguageSwitchUrl = () => {
    if (typeof window === "undefined") return "/";
    const currentPath = window.location.pathname;
    
    if (currentLang === "en") {
      // Switch to Spanish
      if (currentPath === "/") return "/es";
      return `/es${currentPath}`;
    } else {
      // Switch to English
      const newPath = currentPath.replace(/^\/es/, "");
      return newPath || "/";
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) {
      setMobileMenuOpen(false);
      return;
    }

    const hash = href.slice(hashIndex);
    const element = document.querySelector(hash);
    if (!element) {
      setMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    setMobileMenuOpen(false);

    setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const openSuitesMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setShowSuitesMegamenu(true);
  };

  const scheduleCloseSuitesMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setShowSuitesMegamenu(false);
      closeTimeoutRef.current = null;
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Header - Blanc avec effet de disparition au scroll */}
      <div className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}>
        <header className="container mx-auto flex items-center justify-between px-6 py-4 sm:px-10 sm:py-5">
          {/* Menu Hamburger Mobile - À gauche */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center z-60"
            aria-label={currentLang === "es" ? "Menú" : "Menu"}
          >
            <span className={`w-6 h-0.5 bg-ink transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-ink transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-ink transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Navigation Desktop */}
          <div className="flex items-center lg:flex-1 lg:ml-24">
            <nav className="hidden items-center gap-8 text-sm font-bold lg:flex">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={link.hasMegamenu ? openSuitesMenu : undefined}
                  onMouseLeave={link.hasMegamenu ? scheduleCloseSuitesMenu : undefined}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group relative pb-1 uppercase tracking-wider transition-colors text-ink hover:text-ink/70"
                  >
                    {link.label}
                    <span className="absolute inset-x-0 -bottom-1 h-[1px] scale-x-0 transition group-hover:scale-x-100 bg-ink/70"></span>
                  </a>
                  
                  {/* Megamenu pour Suites */}
                  {link.hasMegamenu && showSuitesMegamenu && (
                    <div
                      className="fixed left-0 right-0 top-[88px] pt-4 flex justify-center lg:translate-x-24 xl:translate-x-28"
                      onMouseEnter={openSuitesMenu}
                      onMouseLeave={scheduleCloseSuitesMenu}
                    >
                      <div className="bg-white rounded-2xl shadow-2xl p-12 mx-6 border border-dusk/10 max-w-[1200px] w-full">
                        <div className="grid grid-cols-4 gap-8">
                          {suites.map((suite) => {
                            const guestLabel =
                              currentLang === "es"
                                ? suite.guests === 1
                                  ? "huésped"
                                  : "huéspedes"
                                : suite.guests === 1
                                ? "guest"
                                : "guests";
                            return (
                              <a
                                key={suite.title}
                                href={`${suiteBasePath}/${slugify(suite.title)}`}
                                className="group relative overflow-hidden rounded-2xl bg-ink shadow-lg"
                              >
                                <div className="aspect-[4/3] relative overflow-hidden">
                                  <img
                                    src={resolveImage(suite.image).src}
                                    alt={suite.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                    decoding={resolveImage(suite.image).decoding ?? "async"}
                                    srcSet={resolveImage(suite.image).srcSet}
                                    sizes="300px"
                                    width={resolveImage(suite.image).width}
                                    height={resolveImage(suite.image).height}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end" style={{ minHeight: '120px' }}>
                                  <h3 className="text-[0.8rem] font-serif mb-2 uppercase text-white">
                                    {suite.title}
                                  </h3>
                                  <div className="flex gap-3 text-[0.65rem] text-white/80">
                                    <span>{suite.size}</span>
                                    <span>•</span>
                                    <span>{suite.guests} {guestLabel}</span>
                                  </div>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          
          {/* Language Switch & Book Now */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
          <a
            href={getLanguageSwitchUrl()}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold uppercase transition-all hover:text-ink/70 text-ink whitespace-nowrap"
            aria-label={currentLang === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
          >
              {currentLang === "en" ? "EN" : "ES"}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            {/* Bouton Book Now */}
          <a
            href={bookingUrl}
            className="inline-flex items-center gap-2 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold uppercase transition-all hover:-translate-y-0.5 bg-ink text-white hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink whitespace-nowrap"
          >
            {currentLang === "en" ? "Book Now" : "Reservar"}
          </a>
          </div>
        </header>
      </div>

      {/* Menu Mobile - En dehors du header */}
      <div className={`lg:hidden fixed inset-0 bg-white z-[100] transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ top: '72px' }}>
        <nav className="flex flex-col p-6 gap-1 bg-white h-full overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.href} className="border-b border-ink/10">
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block py-4 text-lg font-semibold uppercase tracking-wider text-ink hover:text-ink/70 transition-colors"
              >
                {link.label}
              </a>
              {/* Sous-menu Suites pour mobile */}
              {link.hasMegamenu && (
                <div className="pl-4 pb-4 space-y-3">
                  {suites.map((suite) => {
                    const guestLabel =
                      currentLang === "es"
                        ? suite.guests === 1
                          ? "huésped"
                          : "huéspedes"
                        : suite.guests === 1
                        ? "guest"
                        : "guests";
                    return (
                    <a
                      key={suite.title}
                      href={`${suiteBasePath}/${slugify(suite.title)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-sand/30 transition-colors"
                    >
                      <img
                        src={suite.image}
                        alt={suite.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div>
                        <div className="text-sm font-medium text-ink">{suite.title}</div>
                        <div className="text-xs text-ink/60">{suite.size} • {suite.guests} {guestLabel}</div>
                      </div>
                    </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
