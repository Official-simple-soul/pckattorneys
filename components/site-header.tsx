import { SITE } from "@/content/site";
import { PRACTICE_AREAS } from "@/content/practice-areas";
import { ENERGY_SECTORS, ENERGY_SLUG } from "@/lib/energy-sectors";
import { HeaderNav } from "./header-nav";

export async function SiteHeader() {
  const settings = SITE;
  const practiceAreas = PRACTICE_AREAS;

  return (
    <HeaderNav
      firmName={settings.firmName}
      logoText={settings.logoText}
      logoUrl={settings.logoUrl}
      practiceAreas={practiceAreas.map((p) => ({
        slug: p.slug,
        shortTitle: p.shortTitle,
        // The energy page covers several sectors; list them under it so visitors can jump straight in.
        children:
          p.slug === ENERGY_SLUG
            ? ENERGY_SECTORS.map((s) => ({ label: s.navLabel, href: `/practice-areas/${ENERGY_SLUG}#${s.id}` }))
            : undefined,
      }))}
    />
  );
}
