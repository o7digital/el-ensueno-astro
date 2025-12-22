import { useState } from "react";

const seaFeatures = [
  {
    url: "/images/home/luxury-romantic-boutique-hotel-zihuatanejo-ixtapa-mexico-1.jpg",
    title: "Vues Océaniques",
    description: "Admirez les vues imprenables sur l'océan Pacifique depuis chaque coin de notre propriété.",
  },
  {
    url: "/images/home/luxury-romantic-boutique-hotel-zihuatanejo-ixtapa-mexico-2.jpg",
    title: "Accès Plage Privée",
    description: "Profitez d'un accès direct à des plages vierges et des eaux cristallines.",
  },
  {
    url: "/images/home/luxury-romantic-boutique-hotel-zihuatanejo-ixtapa-mexico-3.jpg",
    title: "Terrasses Panoramiques",
    description: "Détendez-vous sur nos terrasses privées avec des couchers de soleil à couper le souffle.",
  },
];

export default function EmbracedBySeaSlider() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="embraced-sea" className="relative py-20 md:py-32 bg-sand">
      <div className="container mx-auto px-6">
        {/* En-tête de section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
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
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-6">
                <img
                  src={feature.url}
                  alt={feature.title}
                  className={`h-full w-full object-cover transition-all duration-700 ${
                    activeIndex === index ? "scale-110" : "scale-100"
                  }`}
                  loading="lazy"
                />
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent transition-opacity duration-500 ${
                    activeIndex === index ? "opacity-100" : "opacity-60"
                  }`}
                />
                
                {/* Overlay texte sur l'image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-sand transform transition-all duration-500">
                  <h3 className={`font-editorial text-2xl md:text-3xl mb-2 transition-all duration-500 ${
                    activeIndex === index ? "translate-y-0 opacity-100" : "translate-y-2 opacity-90"
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm text-sand/80 transition-all duration-500 ${
                    activeIndex === index ? "translate-y-0 opacity-100 max-h-40" : "translate-y-4 opacity-0 max-h-0"
                  } overflow-hidden`}>
                    {feature.description}
                  </p>
                </div>

                {/* Icône décorative */}
                <div className={`absolute top-6 right-6 w-8 h-8 transition-all duration-500 ${
                  activeIndex === index ? "rotate-90 opacity-100" : "rotate-0 opacity-60"
                }`}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-sand">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      fill={activeIndex === index ? "currentColor" : "none"}
                      className="transition-all duration-500"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Texte additionnel */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-ink/70 leading-relaxed">
            Our privileged location offers direct access to pristine beaches and stunning ocean vistas. 
            Wake up to the sound of waves and enjoy breathtaking sunsets from your private terrace.
          </p>
          <button 
            className="mt-8 px-8 py-3 bg-ink text-sand border border-ink hover:bg-transparent hover:text-ink transition-all duration-300 rounded-full font-bold tracking-wider text-sm"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </section>
  );
}
