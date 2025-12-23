import React, { useRef, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  detail: string;
};

const items: GalleryItem[] = [
  {
    src: "/images/beach-villa-hotel-ixtapa-zihuatanejo-01.webp",
    alt: "Chemin sablé bordé de palmiers menant à la mer.",
    title: "Sentier vers la mer",
    detail: "Une promenade à l’aube avec le sable encore frais.",
  },
  {
    src: "/images/beach-villa-hotel-ixtapa-zihuatanejo-02.webp",
    alt: "Piscine turquoise entourée de verdure et de terrasses.",
    title: "Piscine suspendue",
    detail: "De l’ombre, de l’eau tiède, le murmure discret des feuilles.",
  },
  {
    src: "/images/beach-villa-hotel-ixtapa-zihuatanejo-03.webp",
    alt: "Transats design face à une longue piscine.",
    title: "Lignes lentes",
    detail: "Design minimaliste pensé pour laisser de l’air entre chaque geste.",
  },
  {
    src: "/images/karl-callwood.webp",
    alt: "Vue intérieure sur un balcon ouvert face à la mer.",
    title: "Chambres ouvertes",
    detail: "Balcons profonds, rideaux légers, horizon dégagé.",
  },
  {
    src: "/images/hiroko-yoshii.webp",
    alt: "Petit-déjeuner sain servi sur une table en marbre.",
    title: "Cuisine attentive",
    detail: "Café filtré, fruits locaux, recettes solaires à partager.",
  },
  {
    src: "/images/jeremy-bishop-voilier.webp",
    alt: "Bain nordique entouré de pierre et de lumière dorée.",
    title: "Rituels d’eau",
    detail: "Spa discret, vapeurs d’agrumes, massages en plein air.",
  },
  {
    src: "/images/jeremy-bishop-surfing.webp",
    alt: "Salon cosy avec fauteuils et bibliothèque.",
    title: "Salon de lecture",
    detail: "Sélection de vinyles, bibliothèque bilingue, lumière tamisée.",
  },
  {
    src: "/images/robin-davies-diner.webp",
    alt: "Allée en bois traversant une jungle dense.",
    title: "Jungle domestiquée",
    detail: "Passerelles en bois clair et senteurs d’ylang.",
  },
  {
    src: "/images/yoga.webp",
    alt: "Piscine naturelle bordée de roches et de végétation.",
    title: "Eau vive",
    detail: "Des bassins à différentes températures pour ralentir.",
  },
];

type Props = {
  id?: string;
};

export default function ExperienceGallery({ id }: Props) {
  const defaultZoom = 2.5;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const lightboxRef = useRef<HTMLDivElement>(null);

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
    const currentIndex = items.findIndex(item => item.src === lightboxImage);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    }
    
    setLightboxImage(items[newIndex].src);
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

  const scrollBy = (delta: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <>
    <div className="section-shell" id={id}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-sm uppercase tracking-[0.14em] text-dusk/70">Galerie immersive</p>
          <h2 className="text-3xl sm:text-4xl">Moments à ressentir avant d’arriver</h2>
          <p className="text-base text-ink/80">
            Un parcours horizontal, à faire défiler au doigt ou au clavier. Chaque image est chargée paresseusement
            pour préserver la fluidité.
          </p>
        </div>
        <div className="flex gap-3 text-sm">
          <button
            type="button"
            onClick={() => scrollBy(-320)}
            className="rounded-full bg-dusk px-4 py-2 text-sand shadow-soft transition hover:-translate-y-0.5 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusk"
            aria-label="Faire défiler vers la gauche"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => scrollBy(320)}
            className="rounded-full bg-dusk px-4 py-2 text-sand shadow-soft transition hover:-translate-y-0.5 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusk"
            aria-label="Faire défiler vers la droite"
          >
            Next
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8"
        aria-label="Galerie des expériences Murmullo"
      >
        {items.map((item, index) => (
          <figure
            key={item.src}
            className="group relative w-72 shrink-0 snap-start overflow-hidden rounded-3xl bg-mist/60 shadow-soft sm:w-80 md:w-[22rem] cursor-pointer"
            onClick={() => openLightbox(item.src)}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-95 sm:h-64"
            />
            <figcaption className="flex items-center justify-between px-4 py-4">
              <div>
                <p className="text-base font-semibold text-dusk">{item.title}</p>
                <p className="text-sm text-ink/70">{item.detail}</p>
              </div>
              <span className="text-xl text-clay transition group-hover:translate-x-1">·</span>
            </figcaption>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-sand/70 via-sand/30 to-transparent" />
          </figure>
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
          aria-label="Close"
          title="Fermer (Échap)"
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
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl hover:text-gray-300 z-10 bg-white/10 hover:bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
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
            src={lightboxImage}
            alt="Lightbox"
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
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl hover:text-gray-300 z-10 bg-white/10 hover:bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
          aria-label="Next"
        >
          ›
        </button>

        {/* Miniatures en bas */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw]">
          {items.map((item, index) => (
            <div
              key={index}
              className={`w-12 h-12 sm:w-16 sm:h-16 cursor-pointer rounded overflow-hidden flex-shrink-0 ${
                lightboxImage === item.src ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(item.src);
                setZoom(defaultZoom);
                setPosition({ x: 0, y: 0 });
              }}
            >
              <img src={item.src} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    )}
    </>
  );
}
