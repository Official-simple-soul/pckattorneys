import Image from "next/image";
import Link from "next/link";
import { Box, Grid, GridCol, Stack, Text, Title } from "@mantine/core";
import { PRACTICE_AREAS } from "@/content/practice-areas";
import { LEGAL_IMAGES } from "@/lib/legal-images";
import { CORE_PRACTICE_AREAS } from "@/lib/core-practice-areas";
import { PageHero } from "@/components/page-hero";
import { PracticeIndex } from "@/components/practice-index";
import { ClosingCta } from "@/components/closing-cta";
import { LinkButton } from "@/components/ui/link-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Areas",
};

const HEADING_FONT = "var(--mantine-heading-font-family)";

export default async function PracticeAreasPage() {
  const practiceAreas = PRACTICE_AREAS;
  const { oldBaileyCourt, lawBooks } = LEGAL_IMAGES;
  const pageTitles = new Map(practiceAreas.map((a) => [a.slug, a.shortTitle]));

  return (
    <>
      <PageHero
        above={
          <Text c="gold.4" fw={500} size="sm">
            What we do
          </Text>
        }
        title="Full-Service Commercial Legal Solutions"
        intro="Parah, Chen and King Attorneys advises clients across a broad range of legal disciplines, spanning corporate, finance, disputes, regulatory, and sector-specific matters."
        image={oldBaileyCourt}
      />

      <section className="page-section">
        <div className="section-container">
          <Grid gap={{ base: 32, md: 72 }}>
            <GridCol span={{ base: 12, md: 4 }}>
              <div className="home-sticky">
                <Stack gap="lg">
                  <Title order={2} fz={{ base: 30, md: 38 }} ff={HEADING_FONT} c="brand.9" lh={1.18}>
                    {practiceAreas.length} practice groups, one firm
                  </Title>
                  <Text c="dark.5" fz="lg" lh={1.65}>
                    Most matters touch more than one discipline. Our practice groups work together, so a transaction,
                    a regulatory question and a dispute can be handled by one coordinated team.
                  </Text>
                  <Box visibleFrom="md" className="plate-frame" style={{ aspectRatio: "4 / 3" }}>
                    <Image src={lawBooks.src} alt={lawBooks.alt} fill sizes="30vw" style={{ objectFit: "cover" }} />
                  </Box>
                </Stack>
              </div>
            </GridCol>
            <GridCol span={{ base: 12, md: 8 }}>
              <PracticeIndex areas={practiceAreas} />
            </GridCol>
          </Grid>
        </div>
      </section>

      {/* ALL CORE PRACTICE AREAS: the full list from the firm's proposal, mapped to the pages above */}
      <section className="page-section bg-tint" aria-labelledby="core-areas-title">
        <div className="section-container">
          <Stack gap="md" maw={720} mb={48}>
            <Title id="core-areas-title" order={2} fz={{ base: 30, md: 38 }} ff={HEADING_FONT} c="brand.9" lh={1.18}>
              All {CORE_PRACTICE_AREAS.length} practice areas at a glance
            </Title>
            <Text c="dark.5" fz="lg" lh={1.65}>
              Our practice groups bring together {CORE_PRACTICE_AREAS.length} areas of law and sector expertise. Find the
              one you need and go straight to it.
            </Text>
          </Stack>
          <ol className="core-areas">
            {CORE_PRACTICE_AREAS.map((area, i) => {
              const pageTitle = pageTitles.get(area.slug);
              const number = String(i + 1).padStart(2, "0");
              const content = (
                <>
                  <span className="core-area-num" aria-hidden>
                    {number}
                  </span>
                  <span className="core-area-name">{area.name}</span>
                  <span className="core-area-scope">
                    {area.scope}
                    {area.section && pageTitle && <span className="core-area-where">Part of {pageTitle}</span>}
                  </span>
                </>
              );
              return (
                <li key={area.name}>
                  {pageTitle ? (
                    <Link
                      href={`/practice-areas/${area.slug}${area.section ? `#${area.section}` : ""}`}
                      className="core-area-row"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="core-area-row">{content}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <ClosingCta
        title="Not sure where your matter fits?"
        body="Tell us what you are dealing with. A partner will review it and bring in the right people from across the firm."
      >
        <LinkButton href="/contact" size="md">
          Schedule a Consultation
        </LinkButton>
      </ClosingCta>
    </>
  );
}
