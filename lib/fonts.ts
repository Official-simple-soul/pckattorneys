import localFont from "next/font/local";

// Fonts are self-hosted from lib/font-files (Latin subset, downloaded from Google Fonts; all
// SIL Open Font License). The build server could not reliably download them from Google at
// build time, so nothing here touches the network. Variable fonts cover their whole weight
// range with one file.

// Heading font candidates
const playfair = localFont({
  src: [{ path: "./font-files/playfair-display-latin.woff2", weight: "500 800", style: "normal" }],
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const merriweather = localFont({
  src: [{ path: "./font-files/merriweather-latin.woff2", weight: "400 900", style: "normal" }],
  variable: "--font-merriweather",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const libreBaskerville = localFont({
  src: [{ path: "./font-files/libre-baskerville-latin.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-libre-baskerville",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const libreCaslon = localFont({
  src: [
    { path: "./font-files/libre-caslon-text-400.woff2", weight: "400", style: "normal" },
    { path: "./font-files/libre-caslon-text-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-libre-caslon",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const sora = localFont({
  src: [{ path: "./font-files/sora-latin.woff2", weight: "500 800", style: "normal" }],
  variable: "--font-sora",
  display: "swap",
});

// Body font candidates
const inter = localFont({
  src: [{ path: "./font-files/inter-latin.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
});

const workSans = localFont({
  src: [{ path: "./font-files/work-sans-latin.woff2", weight: "400 600", style: "normal" }],
  variable: "--font-work-sans",
  display: "swap",
});

const sourceSans = localFont({
  src: [{ path: "./font-files/source-sans-3-latin.woff2", weight: "400 600", style: "normal" }],
  variable: "--font-source-sans",
  display: "swap",
});

const lora = localFont({
  src: [{ path: "./font-files/lora-latin.woff2", weight: "400 600", style: "normal" }],
  variable: "--font-lora",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const HEADING_FONTS = {
  playfair: { label: "Playfair Display", variable: "--font-playfair", font: playfair, css: "var(--font-playfair)" },
  merriweather: { label: "Merriweather", variable: "--font-merriweather", font: merriweather, css: "var(--font-merriweather)" },
  libreBaskerville: { label: "Libre Baskerville", variable: "--font-libre-baskerville", font: libreBaskerville, css: "var(--font-libre-baskerville)" },
  libreCaslon: { label: "Libre Caslon", variable: "--font-libre-caslon", font: libreCaslon, css: "var(--font-libre-caslon)" },
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
