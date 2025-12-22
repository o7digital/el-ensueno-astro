import { useEffect, useRef, useState } from "react";

const dishes = [
  { name: "Mushroom Arancini", image: "/images/cuisines/9.jpg" },
  { name: "Caviar Blinis", image: "/images/cuisines/10.jpg" },
  { name: "Lobster Bisque", image: "/images/cuisines/cuisine5.jpg" },
  { name: "Beef Carpaccio", image: "/images/cuisines/cuisine6.jpg" },
  { name: "Seared Sea Bass", image: "/images/cuisines/cusine2.jpg" },
  { name: "Filet Mignon", image: "/images/cuisines/luxury-hotel-ixtapa-zihuatanejo-mexico-1.jpg" },
  { name: "Mushroom Risotto", image: "/images/home/luxury-romantic-boutique-hotel-zihuatanejo-ixtapa-mexico-1.jpg" },
  { name: "Maple Glazed Duck", image: "/images/home/luxury-romantic-boutique-hotel-zihuatanejo-ixtapa-mexico-2.jpg" },
];

export default function FusionCuisineSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollSpeed = 10; // pixels per frame - vitesse augmentée
    let animationFrameId: number;

    const scroll = () => {
      if (isDragging) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      container.scrollLeft += scrollSpeed;
      
      // Reset scroll when reaching the end for seamless loop
      if (container.scrollLeft >= container.scrollWidth / 3) {
        container.scrollLeft = 0;
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Duplicate dishes for seamless loop
  const allDishes = [...dishes, ...dishes, ...dishes];

  return (
    <section id="fusion-cuisine" className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Grid Layout: Texte à gauche, Slider à droite */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texte à gauche */}
          <div className="max-w-xl -ml-56 lg:-ml-72">
            <span className="font-editorial text-5xl md:text-6xl lg:text-7xl italic text-ink/20 block mb-2">
              Fusion Cuisine
            </span>
            <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-ink mb-6 leading-tight">
              Harvest Inspired
              <br />
              Fine Dining
            </h2>
            <p className="text-base text-ink/70 leading-relaxed mb-8">
              Savor the fresh regional dishes prepared instantly with high quality products illustrating our Mexican gastronomy with European influences.
            </p>
            <button className="px-10 py-3.5 bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-sand transition-all duration-300 font-bold tracking-wider text-sm">
              BOOK NOW
            </button>
          </div>

          {/* Slider horizontal à droite */}
          <div className="relative -ml-56 -mr-64 lg:-ml-80 lg:-mr-96">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
            >
              {allDishes.map((dish, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[340px] md:w-[400px] lg:w-[450px] group"
                >
                  <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-xl">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable="false"
                      loading="lazy"
                    />
                    {/* Overlay avec titre */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent flex items-end p-8">
                      <h3 className="font-editorial text-3xl md:text-4xl text-sand">
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
    </section>
  );
}
