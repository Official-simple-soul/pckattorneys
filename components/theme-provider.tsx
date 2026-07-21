"use client";

import { useMemo } from "react";
import { MantineProvider } from "@mantine/core";
import { buildTheme } from "@/lib/theme";
import type { SiteSettings } from "@prisma/client";

export function ThemeProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  const theme = useMemo(() => buildTheme(settings), [settings]);

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}
