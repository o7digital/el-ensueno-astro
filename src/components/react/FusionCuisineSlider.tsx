import { useState } from "react";

const dishes = [
  { name: "Mushroom Arancini", image: "/images/cuisines/9.webp" },
  { name: "Caviar Blinis", image: "/images/cuisines/10.webp" },
  { name: "Lobster Bisque", image: "/images/cuisines/cuisine5.webp" },
  { name: "Beef Carpaccio", image: "/images/cuisines/cuisine6.webp" },
  { name: "Seared Sea Bass", image: "/images/cuisines/cusine2.webp" },
  { name: "Filet Mignon", image: "/images/cuisines/luxury-hotel-ixtapa-zihuatanejo-mexico-1.webp" },
];

export default function FusionCuisineSlider() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate dishes EXACTLY 2 times for seamless infinite loop
  const allDishes = [...dishes, ...dishes];

  return (
    <section id="fusion-cuisine" className="relative py-12 md:py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Grid Layout: Texte à gauche, Slider à droite */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Texte à gauche */}
          <div className="max-w-xl px-4 sm:px-0 lg:-ml-40">
            <span className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic text-ink/20 block mb-2">
              Fusion Cuisine
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink mb-4 md:mb-6 leading-tight">
              Harvest Inspired
              <br />
              Fine Dining
            </h2>
            <p className="text-sm sm:text-base text-ink/70 leading-relaxed mb-6 md:mb-8">
              Savor the fresh regional dishes prepared instantly with high quality products illustrating our Mexican gastronomy with European influences.
            </p>
          </div>

          {/* Slider horizontal à droite */}
          <div className="relative -mx-4 sm:-mx-6 md:-ml-12 md:-mr-16 lg:-ml-80 lg:-mr-96 overflow-hidden">
            <div
              className="flex gap-3 sm:gap-4 md:gap-6"
              style={{ animation: isPaused ? 'none' : 'scroll 10s linear infinite' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {allDishes.map((dish, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[450px] group"
                >
                  <div className="relative h-[380px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden rounded-lg shadow-xl">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable="false"
                      loading="lazy"
                    />
                    {/* Overlay avec titre */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent flex items-end p-4 sm:p-6 md:p-8">
                      <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl lg:text-4xl text-sand">
                        {dish.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
