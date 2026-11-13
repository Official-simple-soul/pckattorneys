import { Anchor, Grid, GridCol, Group, Stack, Text, Title } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import { getContactPage, getPartners, getPracticeAreas, getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/page-hero";
import { ScalesArt } from "@/components/legal-art";
import { ContactForm } from "@/components/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

const HEADING_FONT = "var(--mantine-heading-font-family)";

function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export default async function ContactPage() {
  const [contact, settings, practiceAreas, partners] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
    getPracticeAreas(),
    getPartners(),
  ]);

  const reachablePartners = partners.filter((p) => p.email || p.phone);

  return (
    <>
      <PageHero title={contact.heroTitle} intro={contact.heroSubtitle} art={<ScalesArt />} />

      <section className="page-section bg-tint">
        <div className="section-container">
          <Grid gap={{ base: 48, md: 72 }}>
            <GridCol span={{ base: 12, md: 7 }}>
              <div className="form-panel">
                <Group gap={10} wrap="nowrap" align="flex-start" mb="xl">
                  <IconLock
                    size={18}
                    stroke={1.5}
                    color="var(--mantine-color-gold-7)"
                    style={{ flexShrink: 0, marginTop: 3 }}
                    aria-hidden
                  />
                  <Text c="dark.5" lh={1.55}>
                    {contact.formIntro}
                  </Text>
                </Group>
                <ContactForm practiceAreaOptions={practiceAreas.map((a) => a.shortTitle)} />
              </div>
            </GridCol>

            <GridCol span={{ base: 12, md: 5 }}>
              <Stack gap={56}>
                <div>
                  <Title order={2} fz={{ base: 26, md: 30 }} ff={HEADING_FONT} c="brand.9" mb="lg">
                    Contact the firm
                  </Title>
                  <dl className="detail-list">
                    <div>
                      <dt>Office</dt>
                      <dd>
                        {settings.address}
                        <br />
                        {settings.city}, {settings.country}
                      </dd>
                    </div>
                    <div>
                      <dt>Phone</dt>
                      <dd>
                        <Anchor href={telHref(settings.phone)} c="brand.9" fw={500}>
                          {settings.phone}
                        </Anchor>
                      </dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>
                        <Anchor href={`mailto:${settings.email}`} c="brand.9" fw={500}>
                          {settings.email}
                        </Anchor>
                      </dd>
                    </div>
                    <div>
                      <dt>Office hours</dt>
                      <dd>{settings.officeHours}</dd>
                    </div>
                  </dl>
                </div>

                {reachablePartners.length > 0 && (
                  <div>
                    <Title order={2} fz={{ base: 26, md: 30 }} ff={HEADING_FONT} c="brand.9" mb="lg">
                      Speak directly with a partner
                    </Title>
                    <div className="ruled-list ruled-list-tight">
                      {reachablePartners.map((partner) => (
                        <div key={partner.id}>
                          <Text fz={20} ff={HEADING_FONT} c="brand.9" lh={1.3}>
                            {partner.name}
                          </Text>
                          <Text c="gold.8" fw={600} size="sm" mb={8}>
                            {partner.title}
                          </Text>
                          <Stack gap={2}>
                            {partner.email && (
                              <Anchor
                                href={`mailto:${partner.email}`}
                                c="brand.9"
                                fw={500}
                                style={{ overflowWrap: "anywhere" }}
                              >
                                {partner.email}
                              </Anchor>
                            )}
                            {partner.phone && (
                              <Anchor href={telHref(partner.phone)} c="brand.9" fw={500}>
                                {partner.phone}
                              </Anchor>
                            )}
                          </Stack>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Stack>
            </GridCol>
          </Grid>
        </div>
      </section>
    </>
  );
}
