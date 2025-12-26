export type SuiteDetail = {
  label: string;
  copy: string;
  image: string;
};

export type Suite = {
  title: string;
  displayTitle?: string;
  tagline: string;
  description: string;
  size: string;
  guests: string;
  bed: string;
  view: string;
  rate: string;
  rateOriginal?: string;
  bookingUrl?: string;
  heroImage: string;
  highlights: string[];
  details: SuiteDetail[];
  gallery: string[];
  amenities: string[];
};

export const suites: Suite[] = [
  {
    title: "Inspiración",
    tagline: "Master suite with magnificent bay views and luxurious space.",
    description:
      "Large windows, a touch of oriental design with the warmth of native building materials gives our master room a cozy and unique atmosphere. Its luxurious bathroom features a semi-open shower with beautiful views, double-sinks, lots of space and light.",
    size: "285 m² / 3,045 ft²",
    guests: "2 guests",
    bed: "King bed",
    view: "Ocean view",
    rate: "$990",
    bookingUrl:
      "https://be.synxis.com/?adult=1&arrive=2025-12-26&chain=22402&child=0&currency=USD&depart=2025-12-27&hotel=78821&level=hotel&locale=en-US&productcurrency=USD&room=SNI&rooms=1&src=24C",
    heroImage: "/images/suites/Insp/1.webp",
    highlights: [
      "Two level terrace with living room",
      "Plunge pool with magnificent bay views",
      "Semi-open shower with ocean views",
      "Double-sink luxury bathroom",
    ],
    details: [
      {
        label: "Terrace",
        copy: "Double level terrace has a living room and a plunge pool with magnificent bay views.",
        image: "/images/suites/Insp/2.webp",
      },
      {
        label: "Bathroom",
        copy: "Luxurious bathroom features a semi-open shower with beautiful views and double-sinks.",
        image: "/images/suites/Insp/3.webp",
      },
      {
        label: "Bedroom",
        copy: "Large windows and oriental design create a cozy and unique atmosphere.",
        image: "/images/suites/Insp/4.webp",
      },
      {
        label: "View",
        copy: "Stunning bay views from the plunge pool and terrace.",
        image: "/images/suites/Insp/5.webp",
      },
    ],
    gallery: [
      "/images/suites/Insp/1.webp",
      "/images/suites/Insp/2.webp",
      "/images/suites/Insp/3.webp",
      "/images/suites/Insp/4.webp",
      "/images/suites/Insp/5.webp",
      "/images/suites/Insp/6.webp",
      "/images/suites/Insp/7.webp",
      "/images/suites/Insp/8.webp",
      "/images/suites/Insp/9.webp",
    ],
    amenities: [
      "Housekeeping twice a day",
      "Luxury herbal toiletries",
      "Cotton piqué bathrobes",
      "Double-sink bathrooms",
      "Flat screen TV, DVD and SKY TV",
      "Plunge pool",
      "Two level terrace",
      "Ocean view",
    ],
  },
  {
    title: "Romance",
    tagline: "Bright suite with unique Mexican character and enchanting views.",
    description:
      "Bright and with a unique Mexican character. This suite offers an enchanting aura with original chuspata decorations made by Pátzcuaro artisans, cozy furnishings and a wonderful view to the heart of the bay.",
    size: "165 m² / 1,775 ft²",
    guests: "2 guests",
    bed: "King bed",
    view: "Ocean view",
    rate: "$890",
    bookingUrl:
      "https://be.synxis.com/?adult=1&arrive=2025-12-26&chain=22402&child=0&currency=USD&depart=2025-12-27&hotel=78821&level=hotel&locale=en-US&productcurrency=USD&room=RMS&rooms=1&src=24C",
    heroImage: "/images/suites/roma/1.webp",
    highlights: [
      "Original chuspata decorations by Pátzcuaro artisans",
      "Wonderful view to the heart of the bay",
      "Plunge pool on two level terrace",
      "Authentic Mexican character",
    ],
    details: [
      {
        label: "Decor",
        copy: "Original chuspata decorations made by Pátzcuaro artisans create an enchanting atmosphere.",
        image: "/images/suites/roma/2.webp",
      },
      {
        label: "Terrace",
        copy: "Two level terrace with plunge pool and cozy furnishings.",
        image: "/images/suites/roma/3.webp",
      },
      {
        label: "Bedroom",
        copy: "Bright interior with unique Mexican character and wonderful bay views.",
        image: "/images/suites/roma/4.webp",
      },
      {
        label: "View",
        copy: "Wonderful view to the heart of Zihuatanejo bay.",
        image: "/images/suites/roma/5.webp",
      },
    ],
    gallery: [
      "/images/suites/roma/1.webp",
      "/images/suites/roma/2.webp",
      "/images/suites/roma/3.webp",
      "/images/suites/roma/4.webp",
      "/images/suites/roma/5.webp",
      "/images/suites/roma/6.webp",
    ],
    amenities: [
      "Housekeeping twice a day",
      "Luxury herbal toiletries",
      "Cotton piqué bathrobes",
      "Double-sink bathrooms",
      "Flat screen TV, DVD and SKY TV",
      "Plunge pool",
      "Two level terrace",
      "Ocean view",
    ],
  },
  {
    title: "Crepúsculo",
    tagline: "Charming suite with Indian design and plunge pool terrace.",
    description:
      "Inspired in traditional Indian design and indigenous Mexican textile patterns, this charming and spacious suite offers great views from its terrace plunge pool. Its large ceilings and original furniture blend with the beautiful surroundings.",
    size: "125 m² / 1,350 ft²",
    guests: "2 guests",
    bed: "King bed",
    view: "Ocean view",
    rate: "$790",
    bookingUrl:
      "https://be.synxis.com/?adult=1&arrive=2025-12-26&chain=22402&child=0&currency=USD&depart=2025-12-27&hotel=78821&level=hotel&locale=en-US&productcurrency=USD&room=CRE&rooms=1&src=24C",
    heroImage: "/images/suites/Crep/1.webp",
    highlights: [
      "Traditional Indian design inspiration",
      "Indigenous Mexican textile patterns",
      "Terrace plunge pool with great views",
      "Large ceilings and original furniture",
    ],
    details: [
      {
        label: "Design",
        copy: "Traditional Indian design blended with indigenous Mexican textile patterns.",
        image: "/images/suites/Crep/2.webp",
      },
      {
        label: "Terrace",
        copy: "Two level terrace with plunge pool offering great ocean views.",
        image: "/images/suites/Crep/3.webp",
      },
      {
        label: "Interior",
        copy: "Large ceilings and original furniture create a charming atmosphere.",
        image: "/images/suites/Crep/4.webp",
      },
      {
        label: "View",
        copy: "Great views from the terrace plunge pool blend with beautiful surroundings.",
        image: "/images/suites/Crep/5.webp",
      },
    ],
    gallery: [
      "/images/suites/Crep/1.webp",
      "/images/suites/Crep/2.webp",
      "/images/suites/Crep/3.webp",
      "/images/suites/Crep/4.webp",
      "/images/suites/Crep/5.webp",
      "/images/suites/Crep/6.webp",
    ],
    amenities: [
      "Housekeeping twice a day",
      "Luxury herbal toiletries",
      "Cotton piqué bathrobes",
      "Double-sink bathrooms",
      "Flat screen TV, DVD and SKY TV",
      "Plunge pool",
      "Two level terrace",
      "Ocean view",
      "Safe box",
      "Room service",
    ],
  },
  {
    title: "Talismán",
    tagline: "Quiet garden suite with peaceful ambience and ocean views.",
    description:
      "This quiet garden suite has peaceful ambience and great ocean views. Its terrace offers a covered plunge pool and a comfortable seating area with plenty of light to enjoy a romantic getaway.",
    size: "110 m² / 1,170 ft²",
    guests: "2 guests",
    bed: "King bed",
    view: "Ocean view",
    rate: "$690",
    bookingUrl:
      "https://be.synxis.com/?adult=1&arrive=2025-12-26&chain=22402&child=0&currency=USD&depart=2025-12-27&hotel=78821&level=hotel&locale=en-US&productcurrency=USD&room=TAL&rooms=1&src=24C",
    heroImage: "/images/suites/Talis/1.webp",
    highlights: [
      "Quiet garden suite atmosphere",
      "Covered plunge pool on terrace",
      "Great ocean views",
      "Peaceful romantic setting",
    ],
    details: [
      {
        label: "Terrace",
        copy: "Covered plunge pool with comfortable seating area and plenty of light.",
        image: "/images/suites/Talis/2.webp",
      },
      {
        label: "Garden",
        copy: "Quiet garden setting with peaceful ambience.",
        image: "/images/suites/Talis/3.webp",
      },
      {
        label: "Interior",
        copy: "Comfortable bedroom with great ocean views.",
        image: "/images/suites/Talis/4.webp",
      },
      {
        label: "View",
        copy: "Great ocean views from the garden suite terrace.",
        image: "/images/suites/Talis/5.webp",
      },
    ],
    gallery: [
      "/images/suites/Talis/1.webp",
      "/images/suites/Talis/2.webp",
      "/images/suites/Talis/3.webp",
      "/images/suites/Talis/4.webp",
      "/images/suites/Talis/5.webp",
    ],
    amenities: [
      "Housekeeping twice a day",
      "Luxury herbal toiletries",
      "Cotton piqué bathrobes",
      "Double-sink bathrooms",
      "Flat screen TV, DVD and SKY TV",
      "Plunge pool",
      "Covered terrace",
      "Ocean view",
      "In-room dining",
      "Safe box",
      "Ambient lighting",
    ],
  },
];
