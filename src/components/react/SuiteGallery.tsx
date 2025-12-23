import { useState, useEffect, useRef } from "react";

interface SuiteGalleryProps {
  images: string[];
  title: string;
}

export default function SuiteGallery({ images, title }: SuiteGalleryProps) {
  const defaultZoom = 2.5;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(images[0]);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const lightboxRef = useRef<HTMLDivElement>(null);

  const openLightbox = (image: string) => {
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
      <div className="relative w-full h-[700px] lg:h-[900px] cursor-pointer" onClick={() => openLightbox(mainImage)}>
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover rounded-lg shadow-xl"
        />
      </div>

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
            aria-label="Close"
            title="Fermer (Échap)"
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
              aria-label="Zoom in"
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
              aria-label="Zoom out"
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
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Image */}
          <div 
            className="flex items-center justify-center w-full h-full"
            style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            <img
              src={selectedImage}
              alt={title}
              className="max-w-[90%] max-h-[90%] object-contain transition-transform"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                transformOrigin: 'center center'
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleMouseDown}
              draggable={false}
            />
          </div>

          {/* Bouton suivant */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10"
            aria-label="Next"
          >
            ›
          </button>

          {/* Miniatures en bas */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={`w-16 h-16 cursor-pointer rounded overflow-hidden ${
                  selectedImage === image ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(image);
                  setZoom(defaultZoom);
                  setPosition({ x: 0, y: 0 });
                }}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
