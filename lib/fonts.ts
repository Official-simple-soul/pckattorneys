import {
  Playfair_Display,
  Merriweather,
  Libre_Baskerville,
  Sora,
  Inter,
  Work_Sans,
  Source_Sans_3,
  Lora,
} from "next/font/google";

// Heading font candidates
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

// Body font candidates
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-lora",
  display: "swap",
});

export const HEADING_FONTS = {
  playfair: { label: "Playfair Display", variable: "--font-playfair", font: playfair, css: "var(--font-playfair)" },
  merriweather: { label: "Merriweather", variable: "--font-merriweather", font: merriweather, css: "var(--font-merriweather)" },
  libreBaskerville: { label: "Libre Baskerville", variable: "--font-libre-baskerville", font: libreBaskerville, css: "var(--font-libre-baskerville)" },
  sora: { label: "Sora (modern sans)", variable: "--font-sora", font: sora, css: "var(--font-sora)" },
} as const;

export const BODY_FONTS = {
  inter: { label: "Inter", variable: "--font-inter", font: inter, css: "var(--font-inter)" },
  workSans: { label: "Work Sans", variable: "--font-work-sans", font: workSans, css: "var(--font-work-sans)" },
  sourceSans: { label: "Source Sans 3", variable: "--font-source-sans", font: sourceSans, css: "var(--font-source-sans)" },
  lora: { label: "Lora (serif)", variable: "--font-lora", font: lora, css: "var(--font-lora)" },
} as const;

export type HeadingFontKey = keyof typeof HEADING_FONTS;
export type BodyFontKey = keyof typeof BODY_FONTS;

export const ALL_FONT_VARIABLES = [
  ...Object.values(HEADING_FONTS).map((f) => f.font.variable),
  ...Object.values(BODY_FONTS).map((f) => f.font.variable),
].join(" ");

export function headingFontCss(key: string): string {
  return HEADING_FONTS[key as HeadingFontKey]?.css ?? HEADING_FONTS.playfair.css;
}

export function bodyFontCss(key: string): string {
  return BODY_FONTS[key as BodyFontKey]?.css ?? BODY_FONTS.inter.css;
}
