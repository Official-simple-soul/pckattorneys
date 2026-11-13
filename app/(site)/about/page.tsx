import Image from "next/image";
import { Grid, GridCol, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { getAboutPage } from "@/lib/content";
import { asStringArray, asTitleBodyArray } from "@/lib/types";
import { LEGAL_IMAGES } from "@/lib/legal-images";
import { LEGAL_HISTORY } from "@/lib/legal-history";
import { PageHero } from "@/components/page-hero";
import { ClosingCta } from "@/components/closing-cta";
import { LinkButton } from "@/components/ui/link-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const HEADING_FONT = "var(--mantine-heading-font-family)";

function SectionTitle({ children, onNavy = false }: { children: React.ReactNode; onNavy?: boolean }) {
  return (
    <Title order={2} fz={{ base: 30, md: 40 }} ff={HEADING_FONT} c={onNavy ? "white" : "brand.9"} lh={1.18}>
      {children}
    </Title>
  );
}

function Paragraphs({ text, onNavy = false }: { text: string; onNavy?: boolean }) {
  return (
    <Stack gap="md" maw={680}>
      {text
        .split("\n\n")
        .filter(Boolean)
        .map((para, i) => (
          <Text key={i} c={onNavy ? "gray.3" : "dark.5"} fz="lg" lh={1.7}>
            {para}
          </Text>
        ))}
    </Stack>
  );
}

export default async function AboutPage() {
  const about = await getAboutPage();

  const [introLead, ...introRest] = about.intro.split("\n\n").filter(Boolean);
  const philosophyQuestions = asStringArray(about.philosophyQuestions);
  const approachItems = asTitleBodyArray(about.approachItems);
  const whoWeServeItems = asTitleBodyArray(about.whoWeServeItems);
  const globalPoints = asStringArray(about.globalPoints);
  const standardPoints = asStringArray(about.standardPoints);
  const { royalCourts, blackstone } = LEGAL_IMAGES;

  return (
    <>
      <PageHero
        above={
          <Text c="gold.4" fw={500} size="sm">
            {about.heroTitle}
          </Text>
        }
        title={about.heroSubtitle}
        image={royalCourts}
      />

      {/* INTRO */}
      <section className="page-section">
        <div className="section-container">
          <Grid gap={{ base: 40, md: 72 }} align="center">
            <GridCol span={{ base: 12, md: 7 }}>
              <Stack gap="md" maw={680}>
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
            </GridCol>
            <GridCol span={{ base: 12, md: 5 }}>
              <figure className="plate about-plate">
                <div className="plate-frame">
                  <Image
                    src={blackstone.src}
                    alt={blackstone.alt}
                    width={blackstone.width}
                    height={blackstone.height}
                    sizes="(min-width: 62em) 34vw, 100vw"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
                <figcaption className="plate-caption">{blackstone.caption}</figcaption>
              </figure>
            </GridCol>
          </Grid>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="page-section bg-tint">
        <div className="section-container">
          <Grid gap={{ base: 24, md: 72 }}>
            <GridCol span={{ base: 12, md: 4 }}>
              <SectionTitle>{about.storyTitle}</SectionTitle>
            </GridCol>
            <GridCol span={{ base: 12, md: 8 }}>
              <Paragraphs text={about.storyBody} />
            </GridCol>
          </Grid>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="page-section">
        <div className="section-container">
          <div className="statement-pair">
            <div>
              <Title order={2} fz="md" fw={600} ff="inherit" c="gold.8" mb="md">
                Our mission
              </Title>
              <Text fz={{ base: 22, md: 27 }} ff={HEADING_FONT} c="brand.9" lh={1.4}>
                {about.missionText}
              </Text>
            </div>
            <div>
              <Title order={2} fz="md" fw={600} ff="inherit" c="gold.8" mb="md">
                Our vision
              </Title>
              <Text fz={{ base: 22, md: 27 }} ff={HEADING_FONT} c="brand.9" lh={1.4}>
                {about.visionText}
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="page-section bg-navy">
        <div className="section-container">
          <Grid gap={{ base: 40, md: 72 }}>
            <GridCol span={{ base: 12, md: 6 }}>
              <Stack gap="lg">
                <SectionTitle onNavy>{about.philosophyTitle}</SectionTitle>
                <Paragraphs text={about.philosophyBody} onNavy />
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <ul className="question-list">
                {philosophyQuestions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </GridCol>
          </Grid>
        </div>
      </section>

      {/* APPROACH */}
      <section className="page-section">
        <div className="section-container">
          <div style={{ marginBottom: 48 }}>
            <SectionTitle>Our Approach</SectionTitle>
          </div>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: approachItems.length >= 4 ? 4 : 3 }} spacing={{ base: 32, md: 40 }}>
            {approachItems.map((item) => (
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

      {/* WHO WE SERVE */}
      <section className="page-section bg-tint">
        <div className="section-container">
          <Grid gap={{ base: 24, md: 72 }}>
            <GridCol span={{ base: 12, md: 4 }}>
              <SectionTitle>Who We Serve</SectionTitle>
            </GridCol>
            <GridCol span={{ base: 12, md: 8 }}>
              <div className="ruled-list">
                {whoWeServeItems.map((item) => (
                  <div key={item.title}>
                    <Title order={3} fz={{ base: 20, md: 22 }} ff={HEADING_FONT} c="brand.9" lh={1.3} mb={6}>
                      {item.title}
                    </Title>
                    <Text c="dark.5" lh={1.65}>
                      {item.body}
                    </Text>
                  </div>
                ))}
              </div>
            </GridCol>
          </Grid>
        </div>
      </section>

      {/* LEGAL HISTORY */}
      <section className="page-section">
        <div className="section-container">
          <Stack gap="md" maw={720} mb={56}>
            <SectionTitle>The Tradition We Practise In</SectionTitle>
            <Text c="dark.5" fz="lg" lh={1.65}>
              Nigeria&apos;s legal system draws on the English common law alongside customary and Islamic law. These are
              some of the moments that shaped the profession our lawyers belong to.
            </Text>
          </Stack>
          <ol className="timeline">
            {LEGAL_HISTORY.map((entry) => (
              <li key={entry.year} className="timeline-entry">
                <p className="timeline-year">{entry.year}</p>
                <div className="timeline-body">
                  <div>
                    <Title order={3} fz={{ base: 20, md: 24 }} ff={HEADING_FONT} c="brand.9" lh={1.3} mb={6}>
                      {entry.title}
                    </Title>
                    <Text c="dark.5" lh={1.65} maw={560}>
                      {entry.body}
                    </Text>
                  </div>
                  {entry.image && (
                    <div className="timeline-image plate-frame">
                      <Image
                        src={entry.image.src}
                        alt={entry.image.alt}
                        fill
                        sizes="(min-width: 62em) 240px, 40vw"
                        style={{ objectFit: "cover", objectPosition: "left top" }}
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* GLOBAL PERSPECTIVE */}
      <section className="page-section bg-tint">
        <div className="section-container">
          <Grid gap={{ base: 32, md: 72 }}>
            <GridCol span={{ base: 12, md: 5 }}>
              <Stack gap="lg">
                <SectionTitle>{about.globalTitle}</SectionTitle>
                <Text c="dark.5" fz="lg" lh={1.7}>
                  {about.globalBody}
                </Text>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 7 }}>
              <ul className="dash-list dash-list-cols about-points">
                {globalPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </GridCol>
          </Grid>
        </div>
      </section>

      {/* STANDARD */}
      <section className="page-section bg-navy">
        <div className="section-container">
          <Grid gap={{ base: 32, md: 72 }}>
            <GridCol span={{ base: 12, md: 6 }}>
              <Stack gap="lg">
                <SectionTitle onNavy>{about.standardTitle}</SectionTitle>
                <Text c="gray.3" fz="lg" lh={1.7}>
                  {about.standardIntro}
                </Text>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <ul className="standard-list">
                {standardPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </GridCol>
          </Grid>
        </div>
      </section>

      <ClosingCta body={about.closingBody}>
        <LinkButton href="/contact" size="md">
          Schedule a Confidential Consultation
        </LinkButton>
      </ClosingCta>
    </>
  );
}
