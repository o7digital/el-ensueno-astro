import { useState, useEffect, useRef } from "react";
import { ui } from "@/i18n/ui";
import type { ResponsiveImageMap } from "@/types/images";

interface EmbracedBySeaSliderProps {
  lang?: 'en' | 'es';
  images: ResponsiveImageMap;
}

export const seaFeatures = [
  {
    url: "/images/embraced/palapa-luxury-hotel-beach-lounge-zihuatanejo-ixtapa-1.webp",
    title: "",
    description: "",
  },
  {
    url: "/images/embraced/palapa-luxury-hotel-beach-lounge-zihuatanejo-ixtapa-2.webp",
    title: "",
    description: "",
  },
  {
    url: "/images/embraced/palapa-luxury-hotel-beach-lounge-zihuatanejo-ixtapa-3.webp",
    title: "",
    description: "",
  },
  {
    url: "/images/embraced/palapa-luxury-hotel-beach-lounge-zihuatanejo-ixtapa-4.webp",
    title: "",
    description: "",
  },
];

export default function EmbracedBySeaSlider({ lang = 'en', images }: EmbracedBySeaSliderProps) {
  const t = ui[lang];
  const defaultZoom = 2.5;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
    const currentIndex = seaFeatures.findIndex(f => f.url === lightboxImage);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? seaFeatures.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === seaFeatures.length - 1 ? 0 : currentIndex + 1;
    }
    
    setLightboxImage(seaFeatures[newIndex].url);
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

  return (
    <>
      <section id="palapa-beach-lounge" className="relative py-12 md:py-16 lg:py-20 bg-sand">
        <div className="container mx-auto px-4 sm:px-6">
          {/* En-tête de section */}
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-ink/60 block mb-3 md:mb-4">
              {lang === 'es' ? 'Experiencia de Playa' : 'Beach Experience'}
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink mb-4 md:mb-6">
              {t['palapa.title']}
            </h2>
            <p className="text-base sm:text-lg text-ink/70 max-w-2xl mx-auto px-4">
              {lang === 'es'
                ? 'Elegante y accesible directamente desde la villa, nuestro salón privado en la playa ofrece un amplio espacio para el ocio. Disfruta de uno de nuestros cócteles exclusivos mientras tomas el sol o das un paseo por la playa de arena de La Ropa.'
                : 'Stylish and accessible directly from the villa, our private beach lounge provides an ample space for leisure. Sip one of our signature cocktails while you take a sun bath or take a stroll along the sandy beach of La Ropa.'
              }
            </p>
          </div>

          {/* Grille de contenu inspirée de Zotela */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {seaFeatures.map((feature, index) => {
              const image = resolveImage(feature.url);
              return (
                <div
                  key={index}
                  className="group relative cursor-pointer"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() => openLightbox(feature.url)}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={t["palapa.title"]}
                      className={`h-full w-full object-cover transition-all duration-700 ${
                        activeIndex === index ? "scale-110" : "scale-100"
                      }`}
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

          {/* Texte additionnel */}
          <div className="mt-8 md:mt-12 max-w-3xl mx-auto text-center px-4">
            <h3 className="font-editorial text-2xl sm:text-3xl text-ink mb-4">
              {lang === 'es' ? 'Una Puerta a la Naturaleza' : 'A Doorway to Nature'}
            </h3>
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
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {seaFeatures.map((feature, index) => {
              const image = resolveImage(feature.url);
              return (
                <div
                  key={index}
                  className={`w-12 h-12 sm:w-16 sm:h-16 cursor-pointer rounded overflow-hidden ${
                    lightboxImage === feature.url ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage(feature.url);
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
