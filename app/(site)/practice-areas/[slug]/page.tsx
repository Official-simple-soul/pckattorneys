import Link from "next/link";
import { notFound } from "next/navigation";
import { Grid, GridCol, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { getPartners, getPracticeAreaBySlug, getPracticeAreas } from "@/lib/content";
import { asExtraSections, asStringArray, asTitleBodyArray } from "@/lib/types";
import { PracticeIcon } from "@/lib/practice-icons";
import { ENERGY_SLUG } from "@/lib/energy-sectors";
import { anchorId } from "@/lib/anchor";
import { EnergyPage } from "@/components/energy-page";
import { PracticeBreadcrumb } from "@/components/practice-breadcrumb";
import { PageHero } from "@/components/page-hero";
import { ClosingCta } from "@/components/closing-cta";
import { LinkButton } from "@/components/ui/link-button";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const areas = await getPracticeAreas();
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = await getPracticeAreaBySlug(slug);
  if (!area) return {};
  return { title: area.title, description: area.tagline };
}

const HEADING_FONT = "var(--mantine-heading-font-family)";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Title order={2} fz={{ base: 28, md: 36 }} ff={HEADING_FONT} c="brand.9" lh={1.2}>
      {children}
    </Title>
  );
}

export default async function PracticeAreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [area, allAreas] = await Promise.all([getPracticeAreaBySlug(slug), getPracticeAreas()]);
  if (!area) notFound();

  if (area.slug === ENERGY_SLUG) {
    const partners = await getPartners();
    const principal = partners.find((p) => /principal/i.test(p.title) && p.email);
    return <EnergyPage area={area} partnerEmail={principal?.email} />;
  }

  const [introLead, ...introRest] = area.intro.split("\n\n").filter(Boolean);
  const services = asStringArray(area.services);
  const matters = asStringArray(area.matters);
  const whyItems = asTitleBodyArray(area.whyItems);
  const extraSections = asExtraSections(area.extraSections);
  const otherAreas = allAreas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <PageHero
        above={<PracticeBreadcrumb current={area.shortTitle} />}
        title={area.title}
        intro={area.tagline}
        art={
          <span className="practice-mark">
            <PracticeIcon slug={area.slug} stroke={1} aria-hidden />
          </span>
        }
      />

      {/* INTRO + NARRATIVE, with the other practice areas alongside */}
      <section className="page-section">
        <div className="section-container">
          <Grid gap={{ base: 56, md: 72 }}>
            <GridCol span={{ base: 12, md: 8 }}>
              <Stack gap="md" maw={720}>
                {introLead && (
                  <Text fz={{ base: 20, md: 23 }} ff={HEADING_FONT} c="brand.9" lh={1.5}>
                    {introLead}
                  </Text>
                )}
                {introRest.map((para, i) => (
                  <Text key={i} c="dark.5" fz="lg" lh={1.7}>
                    {para}
                  </Text>
                ))}
              </Stack>

              {extraSections.length > 0 && (
                <Stack gap={48} mt={64}>
                  {extraSections.map((section) => (
                    <div key={section.title} id={anchorId(section.title)} className="ruled-item anchored-section">
                      <Title order={2} fz={{ base: 22, md: 26 }} ff={HEADING_FONT} c="brand.9" lh={1.3} mb="sm">
                        {section.title}
                      </Title>
                      {section.body && (
                        <Text c="dark.5" lh={1.7} maw={720} mb={section.points.length ? "lg" : 0}>
                          {section.body}
                        </Text>
                      )}
                      {section.points.length > 0 && (
                        <ul className="dash-list dash-list-cols">
                          {section.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </Stack>
              )}
            </GridCol>

            <GridCol span={{ base: 12, md: 4 }}>
              <aside className="home-sticky">
                <Title order={2} fz="md" fw={600} ff="inherit" c="gold.8" mb="sm">
                  Other practice areas
                </Title>
                <nav aria-label="Other practice areas" className="side-links">
                  {otherAreas.map((other) => (
                    <Link key={other.id} href={`/practice-areas/${other.slug}`}>
                      {other.shortTitle}
                    </Link>
                  ))}
                </nav>
                <LinkButton href="/contact" variant="outline" size="md" mt="xl">
                  Discuss your matter
                </LinkButton>
              </aside>
            </GridCol>
          </Grid>
        </div>
      </section>

      {/* SERVICES + MATTERS */}
      {(services.length > 0 || matters.length > 0) && (
        <section className="page-section bg-tint">
          <div className="section-container">
            <Grid gap={{ base: 48, md: 72 }}>
              {services.length > 0 && (
                <GridCol span={{ base: 12, md: matters.length > 0 ? 6 : 12 }}>
                  <Stack gap="lg">
                    <SectionTitle>{area.servicesTitle}</SectionTitle>
                    <ul className={matters.length > 0 ? "dash-list" : "dash-list dash-list-cols"}>
                      {services.map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>
                  </Stack>
                </GridCol>
              )}
              {matters.length > 0 && (
                <GridCol span={{ base: 12, md: services.length > 0 ? 6 : 12 }}>
                  <Stack gap="lg">
                    <SectionTitle>{area.mattersTitle}</SectionTitle>
                    <ul className="dash-list">
                      {matters.map((matter) => (
                        <li key={matter}>{matter}</li>
                      ))}
                    </ul>
                  </Stack>
                </GridCol>
              )}
            </Grid>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US */}
      {whyItems.length > 0 && (
        <section className="page-section">
          <div className="section-container">
            <div style={{ marginBottom: 48 }}>
              <SectionTitle>{area.whyTitle}</SectionTitle>
            </div>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 32, md: 40 }}>
              {whyItems.map((item) => (
                <div key={item.title} className="ruled-item">
                  <Title order={3} fz={22} ff={HEADING_FONT} c="brand.9" lh={1.3} mb="sm">
                    {item.title}
                  </Title>
                  <Text c="dark.5" lh={1.65}>
                    {item.body}
                  </Text>
                </div>
              ))}
            </SimpleGrid>
          </div>
        </section>
      )}

      <ClosingCta title={area.closingTitle} body={area.closingBody}>
        <LinkButton href="/contact" size="md" className="wrap-button">
          {area.ctaLabel}
        </LinkButton>
      </ClosingCta>
    </>
  );
}
