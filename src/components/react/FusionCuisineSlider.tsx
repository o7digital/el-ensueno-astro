import { useState, useEffect, useRef } from "react";
import { ui } from "@/i18n/ui";
import type { ResponsiveImageMap } from "@/types/images";

interface FusionCuisineSliderProps {
  lang?: 'en' | 'es';
  images: ResponsiveImageMap;
}

export const dishes = [
  {
    name: { en: "Local Breakfast", es: "Desayuno local" },
    image: "/images/cuisines/romantic-luxury-boutique-hotel-zihuatanejo-ixtapa-mexico-1.webp",
  },
  {
    name: { en: "Fresh Ingredients", es: "Ingredientes frescos" },
    image: "/images/cuisines/romantic-luxury-boutique-hotel-zihuatanejo-ixtapa-mexico-2.webp",
  },
  {
    name: { en: "Local Specialties", es: "Especialidades locales" },
    image: "/images/cuisines/romantic-luxury-boutique-hotel-zihuatanejo-ixtapa-mexico-3.webp",
  },
  {
    name: { en: "Traditional Dishes", es: "Platillos tradicionales" },
    image: "/images/cuisines/romantic-luxury-boutique-hotel-zihuatanejo-ixtapa-mexico-4.webp",
  },
  {
    name: { en: "Sunset Dinner", es: "Cena al atardecer" },
    image: "/images/cuisines/romantic-luxury-boutique-hotel-zihuatanejo-ixtapa-mexico-7.webp",
  },
  {
    name: { en: "Beach Dining", es: "Cena junto a la playa" },
    image: "/images/cuisines/romantic-luxury-boutique-hotel-zihuatanejo-ixtapa-mexico-8.webp",
  },
  {
    name: { en: "Mexican Flavors", es: "Sabores mexicanos" },
    image: "/images/cuisines/romantic-luxury-boutique-hotel-zihuatanejo-ixtapa-mexico-9.webp",
  },
  {
    name: { en: "Local Desserts", es: "Postres locales" },
    image: "/images/cuisines/romantic-luxury-boutique-hotel-zihuatanejo-ixtapa-mexico-10.webp",
  },
];

export default function FusionCuisineSlider({ lang = 'en', images }: FusionCuisineSliderProps) {
  const t = ui[lang];
  const defaultZoom = 2.5;
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const lightboxRef = useRef<HTMLDivElement>(null);

  const resolveImage = (path: string) => images[path];

  const openLightbox = (imageKey: string) => {
    setLightboxImage(imageKey);
    setZoom(defaultZoom);
    setPosition({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!lightboxImage) return;
    const currentIndex = dishes.findIndex(dish => dish.image === lightboxImage);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? dishes.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === dishes.length - 1 ? 0 : currentIndex + 1;
    }
    
    setLightboxImage(dishes[newIndex].image);
    setZoom(defaultZoom);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (lightboxImage && lightboxRef.current) {
        e.preventDefault();
        if (e.deltaY < 0) {
          setZoom(prev => Math.min(prev + 0.5, 4));
        } else {
          setZoom(prev => {
            const newZoom = Math.max(prev - 0.5, 1);
            if (newZoom === 1) {
              setPosition({ x: 0, y: 0 });
            }
            return newZoom;
          });
        }
      }
    };

    const lightbox = lightboxRef.current;
    if (lightbox) {
      lightbox.addEventListener('wheel', handleWheel, { passive: false });
      return () => lightbox.removeEventListener('wheel', handleWheel);
    }
  }, [lightboxImage]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImage) {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;
    
    let animationId: number;
    let currentPosition = 0;
    const speed = 1.5; // pixels per frame (60fps = 90px/sec)
    
    const animate = () => {
      if (!scrollContainer) return;
      
      currentPosition += speed;
      const maxScroll = scrollContainer.scrollWidth / 2;
      
      if (currentPosition >= maxScroll) {
        currentPosition = 0;
      }
      
      scrollContainer.style.transform = `translateX(-${currentPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Duplicate dishes 2 times for seamless infinite loop
  const allDishes = [...dishes, ...dishes];

  return (
    <>
    <section id="local-kitchen" className="relative py-12 md:py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Grid Layout: Texte à gauche, Slider à droite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Texte à gauche */}
          <div className="max-w-xl px-2 sm:px-0 lg:col-span-5 lg:pr-6">
            <span className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic text-ink/20 block mb-2">
              {t['kitchen.title']}
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink mb-4 md:mb-6 leading-tight">
              {lang === 'es' ? (
                <>
                  Cocina Mexicana Tradicional
                  <br />
                  Cocina
                </>
              ) : (
                <>
                  Traditional Mexican
                  <br />
                  Cuisine
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-ink/70 leading-relaxed mb-6 md:mb-8">
              {lang === 'es' 
                ? 'Comienza el día con pan casero y fruta tropical fresca. Disfruta especialidades locales y platillos internacionales preparados con ingredientes frescos cuidadosamente seleccionados, y saborea los auténticos sabores de la cocina mexicana al atardecer.'
                : 'Begin your day with homemade bread and fresh tropical fruit. Enjoy local specialties and international dishes prepared with carefully selected fresh ingredients, and savor the authentic flavors of Mexican cuisine at sunset.'
              }
            </p>
          </div>

          {/* Slider horizontal à droite */}
          <div className="relative -mx-4 sm:-mx-6 lg:mx-0 lg:col-span-7 overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-3 sm:gap-4 md:gap-6 will-change-transform"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {allDishes.map((dish, index) => {
                const image = resolveImage(dish.image);
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[450px] group cursor-pointer"
                    onClick={() => openLightbox(dish.image)}
                  >
                    <div className="relative h-[380px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden rounded-lg shadow-xl">
                      <img
                        src={image.src}
                        alt={dish.name[lang]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        draggable="false"
                        loading="lazy"
                        decoding={image.decoding ?? "async"}
                        srcSet={image.srcSet}
                        sizes={image.sizes}
                        width={image.width}
                        height={image.height}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Lightbox */}
    {lightboxImage && (
      <div
        ref={lightboxRef}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center overflow-hidden"
        onClick={closeLightbox}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Bouton fermer avec croix visible */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            closeLightbox();
          }}
          className="absolute top-4 right-4 bg-white hover:bg-gray-200 text-black w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold z-20 transition-all shadow-lg hover:scale-110"
          aria-label={t["lightbox.close"]}
          title={t["lightbox.closeTitle"]}
        >
          ✕
        </button>

        {/* Barre de zoom verticale à droite */}
        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full p-3 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomIn();
            }}
            className="bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-all"
            aria-label={t["lightbox.zoomIn"]}
          >
            +
          </button>
          
          <div className="flex flex-col items-center gap-2">
            <div className="h-32 w-1 bg-white/20 rounded-full relative">
              <div 
                className="absolute bottom-0 w-full bg-white rounded-full transition-all"
                style={{ height: `${((zoom - 1) / 3) * 100}%` }}
              />
              <div 
                className="absolute w-4 h-4 bg-white rounded-full -left-1.5 transition-all"
                style={{ bottom: `calc(${((zoom - 1) / 3) * 100}% - 8px)` }}
              />
            </div>
            <div className="text-white text-xs font-semibold bg-white/20 px-2 py-1 rounded">
              {Math.round(zoom * 100)}%
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomOut();
            }}
            className="bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-all"
            aria-label={t["lightbox.zoomOut"]}
          >
            −
          </button>
        </div>

        {/* Bouton précédent */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateLightbox("prev");
          }}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl hover:text-gray-300 z-10 bg-white/10 hover:bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
          aria-label={t["lightbox.previous"]}
        >
          ‹
        </button>

        {/* Image */}
        <div 
          className="flex items-center justify-center w-full h-full"
          style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >
          {(() => {
            const image = resolveImage(lightboxImage as string);
            return (
              <img
                src={image.src}
                alt={t["lightbox.imageAlt"]}
                className="max-w-[90%] max-h-[90%] object-contain transition-transform"
                style={{
                  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  transformOrigin: 'center center'
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handleMouseDown}
                draggable={false}
              />
            );
          })()}
        </div>

        {/* Bouton suivant */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateLightbox("next");
          }}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl hover:text-gray-300 z-10 bg-white/10 hover:bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
          aria-label={t["lightbox.next"]}
        >
          ›
        </button>

        {/* Miniatures en bas */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw]">
          {dishes.map((dish, index) => {
            const image = resolveImage(dish.image);
            return (
              <div
                key={index}
                className={`w-12 h-12 sm:w-16 sm:h-16 cursor-pointer rounded overflow-hidden flex-shrink-0 ${
                  lightboxImage === dish.image ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(dish.image);
                  setZoom(defaultZoom);
                  setPosition({ x: 0, y: 0 });
                }}
              >
                <img
                  src={image.src}
                  alt={`${t["lightbox.thumbnail"]} ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding={image.decoding ?? "async"}
                  srcSet={image.srcSet}
                  sizes="64px"
                  width={image.width}
                  height={image.height}
                />
              </div>
            );
          })}
        </div>
      </div>
    )}
    </>
  );
}
