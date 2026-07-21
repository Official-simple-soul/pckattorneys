import { getSiteSettings, getPracticeAreas } from "@/lib/content";
import { HeaderNav } from "./header-nav";

export async function SiteHeader() {
  const [settings, practiceAreas] = await Promise.all([getSiteSettings(), getPracticeAreas()]);

  return (
    <HeaderNav
      firmName={settings.firmName}
      logoText={settings.logoText}
      logoUrl={settings.logoUrl}
      practiceAreas={practiceAreas.map((p) => ({ slug: p.slug, shortTitle: p.shortTitle }))}
    />
  );
}
