export type SuiteDetail = {
  label: string;
  copy: string;
  image: string;
};

export type Suite = {
  title: string;
  tagline: string;
  description: string;
  size: string;
  guests: string;
  bed: string;
  view: string;
  rate: string;
  rateOriginal?: string;
  heroImage: string;
  highlights: string[];
  details: SuiteDetail[];
  gallery: string[];
  amenities: string[];
};

export const suites: Suite[] = [
  {
    title: "Sra. Tentación",
    tagline: "Signature suite with panoramic sea breezes and intimate light.",
    description:
      "The ultimate luxury suite with premium finishes, curated textures, and a private terrace designed for slow mornings and golden-hour rituals.",
    size: "55 m²",
    guests: "2-3 guests",
    bed: "King bed + lounge area",
    view: "Pacific panorama",
    rate: "$1,490",
    rateOriginal: "$1,690",
    heroImage: "/images/suites/sra-tentacion/exclusive-boutique-villa-hotel-zihuatanejo-ixtapa-mexico-01.jpg",
    highlights: [
      "Private terrace with ocean horizon",
      "Handcrafted wood and stone finishes",
      "Signature minibar and coffee ritual",
      "Evening turndown and curated playlists",
    ],
    details: [
      {
        label: "Bed",
        copy: "Oversized king bed with linen canopy and handcrafted headboard.",
        image: "/images/suites/sra-tentacion/suite-2.jpg",
      },
      {
        label: "Bathroom",
        copy: "Spa-style rain shower with natural stone and soft lighting.",
        image: "/images/suites/sra-tentacion/suite-3.jpg",
      },
      {
        label: "Amenities",
        copy: "Designer bath set, in-room dining, and premium sound system.",
        image: "/images/suites/sra-tentacion/suite-4.jpg",
      },
      {
        label: "View",
        copy: "Uninterrupted ocean vista framed by the jungle canopy.",
        image: "/images/suites/sra-tentacion/suite-5.jpg",
      },
    ],
    gallery: [
      "/images/suites/sra-tentacion/suite-4.jpg",
      "/images/suites/sra-tentacion/suite-5.jpg",
      "/images/suites/sra-tentacion/suite-6.jpg",
    ],
    amenities: [
      "Private terrace",
      "Ocean view",
      "High-speed Wi-Fi",
      "Climate control",
      "Nespresso & tea ritual",
      "In-room dining",
      "Luxury bath amenities",
      "Daily housekeeping",
      "Safe box",
    ],
  },
  {
    title: "Garden Suite",
    tagline: "A calm hideaway wrapped in tropical greens and soft shade.",
    description:
      "Immerse yourself in nature with a serene terrace, warm textures, and breezy interiors designed to slow the pace of your stay.",
    size: "45 m²",
    guests: "2 guests",
    bed: "Queen bed",
    view: "Garden sanctuary",
    rate: "$890",
    rateOriginal: "$1,050",
    heroImage: "/images/suites/garden-suite/garden-1.jpg",
    highlights: [
      "Garden-facing private terrace",
      "Natural light all day long",
      "Handwoven textiles and wood",
      "Morning tea and coffee service",
    ],
    details: [
      {
        label: "Bed",
        copy: "Queen bed with organic linens and soft ambient lighting.",
        image: "/images/suites/garden-suite/garden-2.jpg",
      },
      {
        label: "Bathroom",
        copy: "Limestone bathroom with rain shower and lush views.",
        image: "/images/suites/garden-suite/garden-3.jpg",
      },
      {
        label: "Amenities",
        copy: "In-room refreshments, yoga mats, and curated books.",
        image: "/images/suites/garden-suite/garden-4.jpg",
      },
      {
        label: "View",
        copy: "Tropical garden framed by palms and flowering vines.",
        image: "/images/suites/garden-suite/garden-5.jpg",
      },
    ],
    gallery: [
      "/images/suites/garden-suite/garden-4.jpg",
      "/images/suites/garden-suite/garden-6.jpg",
      "/images/suites/garden-suite/garden-7.jpg",
    ],
    amenities: [
      "Private terrace",
      "Garden view",
      "High-speed Wi-Fi",
      "Air conditioning",
      "Mini bar",
      "Daily housekeeping",
      "In-room yoga kit",
      "Safe box",
      "Tea service",
    ],
  },
  {
    title: "Junior Suite Señorita Surena",
    tagline: "Soft ocean light meets an elegant, airy interior.",
    description:
      "Elegant and spacious junior suite with modern comforts and gentle ocean glimpses, perfect for slow afternoons and restful evenings.",
    size: "38 m²",
    guests: "2 guests",
    bed: "King bed",
    view: "Ocean glimpses",
    rate: "$990",
    rateOriginal: "$1,150",
    heroImage: "/images/suites/junior-suite-senerata-surena/junior-suite1.jpg",
    highlights: [
      "Panoramic windows with sea breeze",
      "Curated art and handpicked decor",
      "Private lounge corner",
      "Evening tea ritual",
    ],
    details: [
      {
        label: "Bed",
        copy: "King bed with handcrafted headboard and soft lighting.",
        image: "/images/suites/junior-suite-senerata-surena/junior-suite2.jpg",
      },
      {
        label: "Bathroom",
        copy: "Elegant stone bathroom with rain shower and vanity.",
        image: "/images/suites/junior-suite-senerata-surena/junior-suite3.jpg",
      },
      {
        label: "Amenities",
        copy: "Signature bath set, curated minibar, and premium audio.",
        image: "/images/suites/junior-suite-senerata-surena/junior-suite4.jpg",
      },
      {
        label: "View",
        copy: "Soft ocean glimpses framed by warm interiors.",
        image: "/images/suites/junior-suite-senerata-surena/junior-suite5.jpg",
      },
    ],
    gallery: [
      "/images/suites/junior-suite-senerata-surena/junior-suite4.jpg",
      "/images/suites/junior-suite-senerata-surena/junior-suite5.jpg",
      "/images/suites/junior-suite-senerata-surena/junior-suite6.jpg",
    ],
    amenities: [
      "Ocean glimpses",
      "High-speed Wi-Fi",
      "Climate control",
      "Mini bar",
      "Premium linens",
      "Daily housekeeping",
      "Work corner",
      "Safe box",
      "Room service",
    ],
  },
  {
    title: "Junior Suite Señorita Sonrisa",
    tagline: "Warm light, soft textures, and a playful sense of ease.",
    description:
      "A bright and welcoming suite designed for comfort and relaxation, balancing artisanal details with a relaxed coastal mood.",
    size: "40 m²",
    guests: "2 guests",
    bed: "Queen bed",
    view: "Coastal outlook",
    rate: "$1,050",
    rateOriginal: "$1,200",
    heroImage: "/images/suites/junior-suite-senorita-sonrisa/suite-1.jpg",
    highlights: [
      "Golden-hour light and airy interiors",
      "Private balcony seating",
      "Artisanal textiles and decor",
      "Signature in-room fragrance",
    ],
    details: [
      {
        label: "Bed",
        copy: "Queen bed with soft linen layers and artisanal textiles.",
        image: "/images/suites/junior-suite-senorita-sonrisa/suite-2.jpg",
      },
      {
        label: "Bathroom",
        copy: "Warm stone finishes with rain shower and terrace light.",
        image: "/images/suites/junior-suite-senorita-sonrisa/suite-3.jpg",
      },
      {
        label: "Amenities",
        copy: "Designer bath set, curated minibar, and in-room dining.",
        image: "/images/suites/junior-suite-senorita-sonrisa/suite-4.jpg",
      },
      {
        label: "View",
        copy: "Soft coastal outlook with glowing sunset tones.",
        image: "/images/suites/junior-suite-senorita-sonrisa/suite-1.jpg",
      },
    ],
    gallery: [
      "/images/suites/junior-suite-senorita-sonrisa/suite-2.jpg",
      "/images/suites/junior-suite-senorita-sonrisa/suite-3.jpg",
      "/images/suites/junior-suite-senorita-sonrisa/suite-4.jpg",
    ],
    amenities: [
      "Private balcony",
      "Coastal view",
      "High-speed Wi-Fi",
      "Air conditioning",
      "Mini bar",
      "Daily housekeeping",
      "In-room dining",
      "Safe box",
      "Ambient lighting",
    ],
  },
];
