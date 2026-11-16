import Image from "next/image";
import { Grid, GridCol, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import type { PracticeArea } from "@prisma/client";
import { ENERGY_IMAGES } from "@/lib/legal-images";
import {
  ENERGY_INTRO,
  ENERGY_OBJECTIVE,
  ENERGY_SECTORS,
  ENERGY_STATS,
  REGULATORS,
  TRANSACTION_SERVICES,
} from "@/lib/energy-sectors";
import { PageHero } from "@/components/page-hero";
import { PracticeBreadcrumb } from "@/components/practice-breadcrumb";
import { ClosingCta } from "@/components/closing-cta";
import { LinkButton } from "@/components/ui/link-button";

const HEADING_FONT = "var(--mantine-heading-font-family)";

/** The Energy & Infrastructure practice area: every sector on one page. */
export function EnergyPage({ area, partnerEmail }: { area: PracticeArea; partnerEmail?: string }) {
  return (
    <>
      <PageHero
        above={<PracticeBreadcrumb current={area.shortTitle} />}
        title={area.title}
        intro={area.tagline}
        image={ENERGY_IMAGES.offshorePlatform}
      />

      {/* KEY FIGURES */}
      <section className="energy-stats-band">
        <div className="section-container">
          <dl className="energy-stats">
            {ENERGY_STATS.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>
                  {stat.value}
                  {stat.unit && <span>{stat.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* INTRO */}
      <section className="page-section">
        <div className="section-container">
          <Grid gap={{ base: 40, md: 72 }} align="center">
            <GridCol span={{ base: 12, md: 7 }}>
              <Stack gap="md" maw={680}>
                <Text fz={{ base: 20, md: 23 }} ff={HEADING_FONT} c="brand.9" lh={1.5}>
                  {ENERGY_INTRO[0]}
                </Text>
                {ENERGY_INTRO.slice(1).map((para) => (
                  <Text key={para} c="dark.5" fz="lg" lh={1.7}>
                    {para}
                  </Text>
                ))}
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 5 }}>
              <blockquote className="energy-objective">
                <p className="energy-objective-label">Our objective</p>
                <p>{ENERGY_OBJECTIVE}</p>
              </blockquote>
            </GridCol>
          </Grid>
        </div>
      </section>

      {/* SECTOR INDEX */}
      <section className="page-section bg-tint">
        <div className="section-container">
          <Title order={2} fz={{ base: 30, md: 40 }} ff={HEADING_FONT} c="brand.9" lh={1.18} mb={40}>
            Five sectors, one coordinated team
          </Title>
          <nav aria-label="Sectors on this page" className="sector-cards">
            {ENERGY_SECTORS.map((sector) => (
              <a key={sector.id} href={`#${sector.id}`} className="sector-card">
                <span className="sector-card-image">
                  <Image src={sector.image.src} alt="" fill sizes="(min-width: 80em) 20vw, (min-width: 62em) 33vw, (min-width: 36em) 50vw, 100vw" style={{ objectFit: "cover" }} />
                </span>
                <span className="sector-card-num">{sector.number}</span>
                <span className="sector-card-title">{sector.title}</span>
                <span className="sector-card-text">{sector.short}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* SECTORS */}
      {ENERGY_SECTORS.map((sector, i) => (
        <section key={sector.id} id={sector.id} className={`page-section energy-sector${i % 2 ? " bg-tint" : ""}`}>
          <div className="section-container">
            <Grid gap={{ base: 32, md: 72 }}>
              <GridCol span={{ base: 12, md: 5 }}>
                <div className="home-sticky">
                  <p className="energy-sector-num">{sector.number}</p>
                  <Title order={2} fz={{ base: 28, md: 36 }} ff={HEADING_FONT} c="brand.9" lh={1.2} mb="xl">
                    {sector.title}
                  </Title>
                  <div className="plate-frame" style={{ aspectRatio: "4 / 3" }}>
                    <Image
                      src={sector.image.src}
                      alt={sector.image.alt}
                      fill
                      sizes="(min-width: 62em) 36vw, 100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </GridCol>
              <GridCol span={{ base: 12, md: 7 }}>
                <Stack gap="md">
                  {sector.overview.map((para) => (
                    <Text key={para} c="dark.5" fz="lg" lh={1.7}>
                      {para}
                    </Text>
                  ))}
                </Stack>
                <aside className="framework-note">
                  <p className="framework-note-label">Legal and regulatory framework</p>
                  <p>{sector.framework}</p>
                </aside>
                <Title order={3} fz={{ base: 22, md: 26 }} ff={HEADING_FONT} c="brand.9" mt={48} mb="md">
                  Where we advise
                </Title>
                <ol className="opportunity-list">
                  {sector.opportunities.map((item) => (
                    <li key={item.title}>
                      <Text fz={{ base: 18, md: 20 }} ff={HEADING_FONT} c="brand.9" lh={1.3} mb={6}>
                        {item.title}
                      </Text>
                      <Text c="dark.5" lh={1.65}>
                        {item.body}
                      </Text>
                    </li>
                  ))}
                </ol>
              </GridCol>
            </Grid>
          </div>
        </section>
      ))}

      {/* TRANSACTION ADVISORY SERVICES */}
      <section className="page-section bg-navy">
        <div className="section-container">
          <Stack gap="md" maw={720} mb={56}>
            <Title order={2} fz={{ base: 30, md: 40 }} ff={HEADING_FONT} c="white" lh={1.18}>
              How we support every transaction
            </Title>
            <Text c="gray.3" fz="lg" lh={1.65}>
              The same six services run through each sector, from the first negotiation to continuing compliance.
            </Text>
          </Stack>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 32, md: 40 }} verticalSpacing={{ base: 32, md: 48 }}>
            {TRANSACTION_SERVICES.map((service) => (
              <div key={service.title} className="ruled-item ruled-item-on-navy">
                <Title order={3} fz={22} ff={HEADING_FONT} c="white" lh={1.3} mb="sm">
                  {service.title}
                </Title>
                <Text c="gray.3" lh={1.65}>
                  {service.body}
                </Text>
              </div>
            ))}
          </SimpleGrid>
        </div>
      </section>

      {/* REGULATORS */}
      <section className="page-section">
        <div className="section-container">
          <Grid gap={{ base: 32, md: 72 }}>
            <GridCol span={{ base: 12, md: 4 }}>
              <Stack gap="md">
                <Title order={2} fz={{ base: 28, md: 36 }} ff={HEADING_FONT} c="brand.9" lh={1.2}>
                  The authorities we work with
                </Title>
                <Text c="dark.5" lh={1.65}>
                  A single project can need approvals from several of these bodies. We map them at the start so nothing
                  holds up financial close or operations.
                </Text>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 8 }}>
              <dl className="regulator-list">
                {REGULATORS.map((r) => (
                  <div key={r.short}>
                    <dt>{r.short}</dt>
                    <dd>{r.name}</dd>
                  </div>
                ))}
              </dl>
            </GridCol>
          </Grid>
        </div>
      </section>

      <ClosingCta title={area.closingTitle} body={area.closingBody}>
        <LinkButton href="/contact" size="md" className="wrap-button">
          {area.ctaLabel}
        </LinkButton>
        {partnerEmail && (
          <LinkButton href={`mailto:${partnerEmail}`} size="md" variant="outline">
            Email the Principal Partner
          </LinkButton>
        )}
      </ClosingCta>
    </>
  );
}
