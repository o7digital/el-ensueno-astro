import { useState } from "react";

const seaFeatures = [
  {
    url: "/images/embraced/embraced1.jpg",
    title: "Vues Océaniques",
    description: "Admirez les vues imprenables sur l'océan Pacifique depuis chaque coin de notre propriété.",
  },
  {
    url: "/images/embraced/embraced2.jpg",
    title: "Accès Plage Privée",
    description: "Profitez d'un accès direct à des plages vierges et des eaux cristallines.",
  },
  {
    url: "/images/embraced/embraced3.jpg",
    title: "Terrasses Panoramiques",
    description: "Détendez-vous sur nos terrasses privées avec des couchers de soleil à couper le souffle.",
  },
];

export default function EmbracedBySeaSlider() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl);
    setZoom(2.5);
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
    setZoom(1);
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

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
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

  return (
    <>
      <section id="embraced-sea" className="relative py-6 md:py-8 bg-sand">
        <div className="container mx-auto px-6">
          {/* En-tête de section */}
          <div className="max-w-4xl mx-auto text-center mb-8">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-ink/60 block mb-4">
              Surrounded by the sea
            </span>
            <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-ink mb-6">
              Embraced by the Sea
            </h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Experience the luxury of this Mexican home with Mediterranean nautical touches, ideal setting to admire the peaceful climate and panoramic views of the picturesque bay of Zihuatanejo.
            </p>
          </div>

          {/* Grille de contenu inspirée de Zotela */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seaFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative cursor-pointer"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => openLightbox(feature.url)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <img
                    src={feature.url}
                    alt={feature.title}
                    className={`h-full w-full object-cover transition-all duration-700 ${
                      activeIndex === index ? "scale-110" : "scale-100"
                    }`}
                    loading="lazy"
                  />
                </div>

                {/* Titre et description */}
                <div className="text-center">
                  <h3 className="font-editorial text-2xl text-ink mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-ink/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Texte additionnel */}
          <div className="mt-8 max-w-3xl mx-auto text-center">
            <p className="text-ink/70 leading-relaxed">
              Our privileged location offers direct access to pristine beaches and stunning ocean vistas. 
              Wake up to the sound of waves and enjoy breathtaking sunsets from your private terrace.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center overflow-hidden"
          onClick={closeLightbox}
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Bouton fermer avec croix visible */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold z-20 transition-all"
            aria-label="Close"
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
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10"
            aria-label="Next"
          >
            ›
          </button>

          {/* Miniatures en bas */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {seaFeatures.map((feature, index) => (
              <div
                key={index}
                className={`w-16 h-16 cursor-pointer rounded overflow-hidden ${
                  lightboxImage === feature.url ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(feature.url);
                }}
              >
                <img src={feature.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
