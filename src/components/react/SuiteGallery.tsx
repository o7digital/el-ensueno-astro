import { useState } from "react";

interface SuiteGalleryProps {
  images: string[];
  title: string;
}

export default function SuiteGallery({ images, title }: SuiteGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(images[0]);

  const openLightbox = (image: string) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
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
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 z-10"
            aria-label="Close"
          >
            ×
          </button>

          {/* Bouton précédent */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
            className="absolute left-6 text-white text-4xl hover:text-gray-300 z-10"
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Image */}
          <img
            src={selectedImage}
            alt={title}
            className="max-w-[90%] max-h-[90%] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Bouton suivant */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
            className="absolute right-6 text-white text-4xl hover:text-gray-300 z-10"
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
