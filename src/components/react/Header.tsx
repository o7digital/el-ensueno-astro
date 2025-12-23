import React, { useEffect, useState } from "react";
import { slugify } from "@/utils/slugify";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Suites", href: "#suites", hasMegamenu: true },
  { label: "Embraced by the Sea", href: "#embraced-sea" },
  { label: "Fusion Cuisine", href: "#fusion-cuisine" },
  { label: "Contact", href: "/contact" },
];

const suites = [
  {
    title: "Sra. Tentación",
    image: "/images/suites/sra-tentacion/exclusive-boutique-villa-hotel-zihuatanejo-ixtapa-mexico-01.webp",
    size: "55 m²",
    guests: "2-3 guests",
  },
  {
    title: "Garden Suite",
    image: "/images/suites/garden-suite/garden-1.webp",
    size: "45 m²",
    guests: "2 guests",
  },
  {
    title: "Junior Suite Señorita Surena",
    image: "/images/suites/junior-suite-senerata-surena/junior-suite1.webp",
    size: "38 m²",
    guests: "2 guests",
  },
  {
    title: "Junior Suite Señorita Sonrisa",
    image: "/images/suites/junior-suite-senorita-sonrisa/suite-1.webp",
    size: "40 m²",
    guests: "2 guests",
  },
];

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSuitesMegamenu, setShowSuitesMegamenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            aria-label="Menu"
          >
            <span className={`w-6 h-0.5 bg-ink transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-ink transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-ink transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Logo - Centre sur mobile, gauche sur desktop */}
          <div className="flex items-center gap-10 lg:flex-1">
            <img 
              src="/logo/logo.webp" 
              alt="Murmullo Logo" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
            {/* Navigation Desktop */}
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
                              href={`/suites/${slugify(suite.title)}`}
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
          
          {/* Bouton Book Now - Toujours visible à droite */}
          <a
            href="https://be.synxis.com/?adult=1&arrive=2025-12-22&chain=22402&child=0&currency=USD&depart=2025-12-23&hotel=78821&level=hotel&locale=en-US&productcurrency=USD&room=MUR&rooms=1&src=24C"
            className="inline-flex items-center gap-2 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold uppercase transition-all hover:-translate-y-0.5 bg-ink text-white hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink whitespace-nowrap"
          >
            Book Now
          </a>
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
                onClick={() => setMobileMenuOpen(false)}
                className="block py-4 text-lg font-semibold uppercase tracking-wider text-ink hover:text-ink/70 transition-colors"
              >
                {link.label}
              </a>
              {/* Sous-menu Suites pour mobile */}
              {link.hasMegamenu && (
                <div className="pl-4 pb-4 space-y-3">
                  {suites.map((suite) => (
                    <a
                      key={suite.title}
                      href={`/suites/${slugify(suite.title)}`}
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
                        <div className="text-xs text-ink/60">{suite.size} • {suite.guests}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
