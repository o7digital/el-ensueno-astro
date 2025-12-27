import { useState, useEffect, useRef } from "react";
import { ui } from "@/i18n/ui";
import type { ResponsiveImageMap } from "@/types/images";

interface SuiteGalleryProps {
  images: string[];
  imageMap: ResponsiveImageMap;
  title: string;
  lang?: "en" | "es";
}

export default function SuiteGallery({ images, imageMap, title, lang = "en" }: SuiteGalleryProps) {
  const labels = ui[lang];
  const defaultZoom = 2.5;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mainIndex, setMainIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const lightboxRef = useRef<HTMLDivElement>(null);
  const resolveImage = (path: string) => imageMap[path];
  const mainImageKey = images[mainIndex];
  const mainImage = resolveImage(mainImageKey);
  const hasMultipleImages = images.length > 1;

  const openLightbox = (image: string) => {
    const imageIndex = images.indexOf(image);
    if (imageIndex >= 0) {
      setMainIndex(imageIndex);
    }
    setSelectedImage(image);
    setZoom(defaultZoom);
    setPosition({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedImage) return;
    const currentIndex = images.indexOf(selectedImage);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(images[newIndex]);
    setMainIndex(newIndex);
    setZoom(defaultZoom);
    setPosition({ x: 0, y: 0 });
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMainIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMainIndex((prev) => (prev + 1) % images.length);
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
      if (selectedImage && lightboxRef.current) {
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
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

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
      {/* Image principale grande - pleine hauteur */}
      <div className="relative w-full h-[700px] lg:h-[900px]">
        <img
          src={mainImage.src}
          alt={title}
          className="w-full h-full object-cover rounded-lg shadow-xl cursor-pointer"
          onClick={() => openLightbox(mainImageKey)}
          loading={mainImage.loading ?? "lazy"}
          decoding={mainImage.decoding ?? "async"}
          srcSet={mainImage.srcSet}
          sizes={mainImage.sizes}
          width={mainImage.width}
          height={mainImage.height}
        />
        <button
          type="button"
          className="absolute top-4 right-4 bg-white/90 text-ink text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg hover:bg-white transition"
          onClick={() => openLightbox(mainImageKey)}
          aria-label={labels["suite.viewGallery"]}
        >
          {labels["suite.viewGallery"]}
        </button>
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition hover:bg-black/70"
              aria-label={labels["lightbox.previous"]}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition hover:bg-black/70"
              aria-label={labels["lightbox.next"]}
            >
              ›
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
          {images.map((image, index) => {
            const thumbImage = resolveImage(image);
            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setMainIndex(index)}
                className={`group relative aspect-[4/3] rounded overflow-hidden border transition-all ${
                  index === mainIndex 
                    ? "border-ink ring-1 ring-ink/30 shadow-md" 
                    : "border-transparent opacity-70 hover:opacity-100 hover:border-ink/20"
                }`}
                aria-label={`${labels["lightbox.thumbnail"]} ${index + 1}`}
              >
                <img 
                  src={thumbImage.src} 
                  alt={`${labels["lightbox.thumbnail"]} ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                  decoding={thumbImage.decoding ?? "async"}
                  srcSet={thumbImage.srcSet}
                  sizes="96px"
                  width={thumbImage.width}
                  height={thumbImage.height}
                />
                {index === mainIndex && (
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent flex items-end justify-center pb-1">
                    <span className="text-white text-[0.6rem] font-semibold bg-ink/70 px-1.5 py-0.5 rounded">
                      {index + 1}/{images.length}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
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
            className="absolute top-4 right-4 bg-white hover:bg-gray-200 text-black w-14 h-14 rounded-full flex items-center justify-center text-3xl font-bold z-20 transition-all shadow-lg hover:scale-110"
            aria-label={labels["lightbox.close"]}
            title={labels["lightbox.closeTitle"]}
          >
            ✕
          </button>

          {/* Barre de zoom verticale à droite */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full p-3 z-10">
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
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10"
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
              const image = resolveImage(selectedImage as string);
              return (
                <img
                  src={image.src}
                  alt={title}
                  className="max-w-[90%] max-h-[90%] object-contain transition-transform"
                  style={{
                    transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                    transformOrigin: 'center center'
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={handleMouseDown}
                  draggable={false}
                  decoding={image.decoding ?? "async"}
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
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10"
            aria-label={labels["lightbox.next"]}
          >
            ›
          </button>

          {/* Miniatures en bas */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((image, index) => {
            const thumbImage = resolveImage(image);
            return (
              <div
                key={index}
                className={`w-16 h-16 cursor-pointer rounded overflow-hidden ${
                  selectedImage === image ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(image);
                  setMainIndex(index);
                  setZoom(defaultZoom);
                  setPosition({ x: 0, y: 0 });
                }}
              >
                <img
                  src={thumbImage.src}
                  alt={`${labels["lightbox.thumbnail"]} ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding={thumbImage.decoding ?? "async"}
                  srcSet={thumbImage.srcSet}
                  sizes="64px"
                  width={thumbImage.width}
                  height={thumbImage.height}
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
