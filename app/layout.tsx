import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "./globals.css";
import { ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { getSiteSettings } from "@/lib/content";
import { ALL_FONT_VARIABLES } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
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
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={ALL_FONT_VARIABLES} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider settings={settings}>
          <Notifications position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
