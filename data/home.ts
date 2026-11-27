export type HeroSlide = {
  id: string;
  image: string;
  imageAlt: string;
  /** When set, the hero shows these photos side by side. */
  photos?: { src: string; alt: string }[];
  /** Drop a file in /public and set this to play it instead of the still. */
  video?: string;
  /** CSS object-position for a portrait clip in the wide hero. */
  videoPosition?: string;
  title: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "amg",
    image: "/images/amg-gt-red.jpg",
    imageAlt: "Mercedes-AMG GT",
    photos: [
      { src: "/images/amg-gt-red.jpg", alt: "Red Mercedes-AMG GT on a forest road" },
      { src: "/images/amg-gt-dark.jpg", alt: "Black Mercedes-AMG GT by the harbour" },
    ],
    title: "AMG",
    subtitle: "In stock in Douala",
    primary: { label: "Order Now", href: "/quote?vehicle=gle-63-s-amg" },
    secondary: { label: "Learn More", href: "/amg" },
  },
  {
    id: "amg-cabin",
    image: "/images/amg-gt-dark.jpg",
    imageAlt: "Mercedes-AMG cabin from the driver's seat",
    video: "/videos/amg-cabin.mp4",
    videoPosition: "center 48%",
    title: "Inside AMG",
    subtitle: "From the driver's seat",
    primary: { label: "Order Now", href: "/quote?vehicle=gle-63-s-amg" },
    secondary: { label: "Learn More", href: "/amg" },
  },
  {
    id: "gla",
    image: "/images/gla-1.jpg",
    imageAlt: "Silver Mercedes-Benz GLA compact SUV",
    video: "/videos/gla-200d.mp4",
    videoPosition: "center 68%",
    title: "GLA 200d",
    subtitle: "From 28 796 512 FCFA",
    primary: { label: "Order Now", href: "/quote?vehicle=gla-200d" },
    secondary: { label: "Learn More", href: "/vehicles/gla-200d" },
  },
];

export const feature = {
  title: "AMG Performance",
  accent: "(In Stock)",
  kicker: "Five Mercedes-Benz ready in Douala",
  image: "/images/amg-gt-red.jpg",
  imageAlt: "Red Mercedes-AMG GT on a forest road",
  caption: "AMG · ready when you are",
  stats: [
    { value: "5", label: "Vehicles in stock" },
    { value: "28,8 M", label: "FCFA from, in Douala" },
  ],
  primary: { label: "Schedule Demo", href: "/quote?intent=demo&vehicle=g-63-amg" },
  secondary: { label: "Learn More", href: "/vehicles/g-63-amg" },
};

export type Promo = {
  id: string;
  title: string;
  body: string;
  href: string;
  image: string;
  imageAlt: string;
  variant: "float" | "bleed";
};

export const promos: Promo[] = [
  {
    id: "offers",
    title: "Current Offers",
    body: "Mercedes-Benz SUVs and the G-Class in Douala, from 28 796 512 FCFA.",
    href: "/shop",
    image: "/images/gla-1.jpg",
    imageAlt: "Silver Mercedes-Benz GLA",
    variant: "float",
  },
  {
    id: "amg-dark",
    title: "AMG After Dark",
    body: "The performance cars, in Cameroon. G 63 and GLE 63 S are at the Douala showroom.",
    href: "/amg",
    image: "/images/amg-gt-dark.jpg",
    imageAlt: "Matte black Mercedes-AMG GT by the harbour at dusk",
    variant: "bleed",
  },
  {
    id: "g-class",
    title: "The G-Class",
    body: "Ladder frame, three locks, and a 4.0 litre V8. The G 63 is in stock.",
    href: "/4x4",
    image: "/images/g63-black.jpg",
    imageAlt: "Black Mercedes-AMG G 63",
    variant: "float",
  },
  {
    id: "maybach",
    title: "Maybach Private",
    body: "GLS 680 Maybach, facelift, for buyers who ride in the second row.",
    href: "/maybach",
    image: "/images/gls-1-1.jpg",
    imageAlt: "Light blue Mercedes-Maybach GLS",
    variant: "bleed",
  },
];
