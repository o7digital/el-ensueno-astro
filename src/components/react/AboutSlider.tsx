import React, { useEffect, useState, useRef } from "react";
import { ui } from "@/i18n/ui";
import type { ResponsiveImageMap } from "@/types/images";

export const aboutImages = [
  "/images/hero/sous-hero/luxury-beach-villa-boutique-hotel-zihuatanejo-ixtapa-mexico-1.webp",
  "/images/hero/sous-hero/luxury-beach-villa-boutique-hotel-zihuatanejo-ixtapa-mexico-2.webp",
  "/images/hero/sous-hero/luxury-beach-villa-boutique-hotel-zihuatanejo-ixtapa-mexico-3.webp",
  "/images/hero/sous-hero/luxury-beach-villa-boutique-hotel-zihuatanejo-ixtapa-mexico-4.webp",
  "/images/hero/sous-hero/luxury-beach-villa-boutique-hotel-zihuatanejo-ixtapa-mexico-5.webp",
  "/images/hero/sous-hero/luxury-beach-villa-boutique-hotel-zihuatanejo-ixtapa-mexico-6.webp",
  "/images/hero/sous-hero/luxury-beach-villa-boutique-hotel-zihuatanejo-ixtapa-mexico-7.webp",
  "/images/hero/sous-hero/luxury-beach-villa-boutique-hotel-zihuatanejo-ixtapa-mexico-8.webp",
  "/images/hero/sous-hero/luxury-beach-villa-boutique-hotel-zihuatanejo-ixtapa-mexico-9.webp",
  "/images/hero/sous-hero/luxury-beach-villa-boutique-hotel-zihuatanejo-ixtapa-mexico-10.webp",
];

const SLIDE_DURATION = 5000;

interface AboutSliderProps {
  lang?: "en" | "es";
  images: ResponsiveImageMap;
}

export default function AboutSlider({ lang = "en", images }: AboutSliderProps) {
  const labels = ui[lang];
  const slideAlt = lang === "es" ? "Imagen de El Ensueño" : "El Ensueño image";
  const defaultZoom = 2.5;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const lightboxRef = useRef<HTMLDivElement>(null);
  const imageKeys = aboutImages;
  const resolveImage = (path: string) => images[path];

  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl);
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
    const currentIndex = imageKeys.findIndex(img => img === lightboxImage);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? imageKeys.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === imageKeys.length - 1 ? 0 : currentIndex + 1;
    }
    
    setLightboxImage(imageKeys[newIndex]);
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

  useEffect(() => {
    if (paused) return undefined;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imageKeys.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <>
    <div
      className="relative h-full w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Images du slider */}
      <div className="relative h-full w-full cursor-pointer" onClick={() => openLightbox(imageKeys[activeIndex])}>
        {imageKeys.map((src, index) => {
          const image = resolveImage(src);
          return (
            <img
              key={src}
              src={image.src}
              alt={`${slideAlt} ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding={image.decoding ?? "async"}
              srcSet={image.srcSet}
              sizes={image.sizes}
              width={image.width}
              height={image.height}
            />
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {imageKeys.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex ? "bg-white w-8" : "bg-white/50 w-2"
            }`}
            aria-label={`${labels["slider.slideLabel"]} ${index + 1}`}
          />
        ))}
      </div>
    </div>

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
          aria-label={labels["lightbox.close"]}
          title={labels["lightbox.closeTitle"]}
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
            aria-label={labels["lightbox.zoomIn"]}
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
            aria-label={labels["lightbox.zoomOut"]}
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
          aria-label={labels["lightbox.previous"]}
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
                alt={labels["lightbox.imageAlt"]}
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
          aria-label={labels["lightbox.next"]}
        >
          ›
        </button>

        {/* Miniatures en bas */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw]">
          {imageKeys.map((img, index) => {
            const image = resolveImage(img);
            return (
              <div
                key={index}
                className={`w-12 h-12 sm:w-16 sm:h-16 cursor-pointer rounded overflow-hidden flex-shrink-0 ${
                  lightboxImage === img ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(img);
                  setZoom(defaultZoom);
                  setPosition({ x: 0, y: 0 });
                }}
              >
                <img
                  src={image.src}
                  alt={`${labels["lightbox.thumbnail"]} ${index + 1}`}
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
