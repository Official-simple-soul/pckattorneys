import type { HeroSlide } from "./types";

// Home carousel slides shown after the firm slide, in order.
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "energy",
    label: "Energy",
    eyebrow: "Energy & Infrastructure",
    headline: "Counsel for Nigeria's gas, oil and power projects",
    body: "From CNG, LPG and LNG to gas-to-power, modular refineries and jetties, we structure, document and protect energy investments from first assessment to operation.",
    imageUrl: "/images/energy/offshore-platform.webp",
    imageAlt: "Offshore oil and gas platform lit up at dusk",
    ctaLabel: "Explore our energy practice",
    ctaHref: "/practice-areas/energy-natural-resources",
  },
  {
    id: "high-speed-rail",
    label: "High-speed rail",
    eyebrow: "Railway Infrastructure",
    headline: "Partners and financiers for a 4,000 km high-speed rail programme",
    body: "Acting for the project promoters, we are engaging strategic partners and financiers for a proposed high-speed railway connecting Lagos, Abuja, Kano and Port Harcourt.",
    imageUrl: "/images/energy/high-speed-train.webp",
    imageAlt: "High-speed passenger train at a station platform",
    ctaLabel: "See the rail opportunity",
    ctaHref: "/practice-areas/energy-natural-resources#rail",
  },
  {
    id: "mining",
    label: "Mining",
    eyebrow: "Mining & Solid Minerals",
    headline: "Securing title and value in Nigeria's solid minerals",
    body: "Mineral title due diligence, joint ventures, financing, offtake and host-community agreements for investors across more than 44 commercially viable minerals.",
    imageUrl: "/images/energy/open-pit-mine.webp",
    imageAlt: "Aerial view of a terraced open-pit mine",
    ctaLabel: "Our mining practice",
    ctaHref: "/practice-areas/energy-natural-resources#mining",
  },
];
