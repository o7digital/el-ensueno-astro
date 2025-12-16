import React, { useRef } from "react";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  detail: string;
};

const items: GalleryItem[] = [
  {
    src: "/images/gallery-1.webp",
    alt: "Chemin sablé bordé de palmiers menant à la mer.",
    title: "Sentier vers la mer",
    detail: "Une promenade à l’aube avec le sable encore frais.",
  },
  {
    src: "/images/gallery-2.webp",
    alt: "Piscine turquoise entourée de verdure et de terrasses.",
    title: "Piscine suspendue",
    detail: "De l’ombre, de l’eau tiède, le murmure discret des feuilles.",
  },
  {
    src: "/images/gallery-3.webp",
    alt: "Transats design face à une longue piscine.",
    title: "Lignes lentes",
    detail: "Design minimaliste pensé pour laisser de l’air entre chaque geste.",
  },
  {
    src: "/images/gallery-4.webp",
    alt: "Vue intérieure sur un balcon ouvert face à la mer.",
    title: "Chambres ouvertes",
    detail: "Balcons profonds, rideaux légers, horizon dégagé.",
  },
  {
    src: "/images/gallery-5.webp",
    alt: "Petit-déjeuner sain servi sur une table en marbre.",
    title: "Cuisine attentive",
    detail: "Café filtré, fruits locaux, recettes solaires à partager.",
  },
  {
    src: "/images/gallery-6.webp",
    alt: "Bain nordique entouré de pierre et de lumière dorée.",
    title: "Rituels d’eau",
    detail: "Spa discret, vapeurs d’agrumes, massages en plein air.",
  },
  {
    src: "/images/gallery-7.webp",
    alt: "Salon cosy avec fauteuils et bibliothèque.",
    title: "Salon de lecture",
    detail: "Sélection de vinyles, bibliothèque bilingue, lumière tamisée.",
  },
  {
    src: "/images/gallery-8.webp",
    alt: "Allée en bois traversant une jungle dense.",
    title: "Jungle domestiquée",
    detail: "Passerelles en bois clair et senteurs d’ylang.",
  },
  {
    src: "/images/gallery-9.webp",
    alt: "Piscine naturelle bordée de roches et de végétation.",
    title: "Eau vive",
    detail: "Des bassins à différentes températures pour ralentir.",
  },
];

type Props = {
  id?: string;
};

export default function ExperienceGallery({ id }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (delta: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
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
            className="group relative w-72 shrink-0 snap-start overflow-hidden rounded-3xl bg-mist/60 shadow-soft sm:w-80 md:w-[22rem]"
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
  );
}
