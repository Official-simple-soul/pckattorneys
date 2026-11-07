import { createTheme, type MantineThemeOverride } from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";
import { headingFontCss, bodyFontCss } from "./fonts";
import type { SiteSettings } from "@prisma/client";

export function buildTheme(settings: SiteSettings): MantineThemeOverride {
  return createTheme({
    primaryColor: "brand",
    primaryShade: { light: 7, dark: 5 },
    colors: {
      brand: generateColors(settings.primaryColor),
      gold: generateColors(settings.secondaryColor),
      ink: generateColors(settings.accentColor),
    },
    fontFamily: bodyFontCss(settings.bodyFont),
    fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, monospace",
    headings: {
      fontFamily: headingFontCss(settings.headingFont),
      fontWeight: "400",
    },
    defaultRadius: settings.radius || "md",
    other: {
      neutralColor: settings.neutralColor,
      accentColor: settings.accentColor,
    },
    components: {
      Button: {
        defaultProps: {
          radius: "sm",
          // Exact brand navy: the generated scale puts the configured colour at shade 9.
          color: "brand.9",
        },
      },
    },
  });
}
