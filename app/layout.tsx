import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import { ColorSchemeScript } from "@mantine/core";
import { SITE } from "@/content/site";
import { ALL_FONT_VARIABLES } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";

export async function generateMetadata(): Promise<Metadata> {
  const settings = SITE;
  return {
    title: `${settings.firmName} | ${settings.tagline}`,
    description: settings.tagline,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = SITE;

  return (
    <html lang="en" className={ALL_FONT_VARIABLES} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider settings={settings}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
