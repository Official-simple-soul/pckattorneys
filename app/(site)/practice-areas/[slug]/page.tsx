import { notFound } from "next/navigation";
import { Box, Card, Grid, GridCol, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { getPracticeAreaBySlug, getPracticeAreas } from "@/lib/content";
import { asExtraSections, asStringArray, asTitleBodyArray } from "@/lib/types";
import { getPracticeIcon } from "@/lib/practice-icons";
import { Reveal } from "@/components/reveal";
import { GradientMesh } from "@/components/decorative";
import { LinkButton } from "@/components/ui/link-button";
import { LinkText } from "@/components/ui/link-text";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const areas = await getPracticeAreas();
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = await getPracticeAreaBySlug(slug);
  if (!area) return {};
  return { title: area.title, description: area.tagline };
}

export default async function PracticeAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = await getPracticeAreaBySlug(slug);
  if (!area) notFound();

  const Icon = getPracticeIcon(area.slug);
  const introParas = area.intro.split("\n\n");
  const services = asStringArray(area.services);
  const matters = asStringArray(area.matters);
  const whyItems = asTitleBodyArray(area.whyItems);
  const extraSections = asExtraSections(area.extraSections);

  return (
    <>
      {/* HERO */}
      <Box
        component="section"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(160deg, var(--mantine-color-ink-9) 0%, var(--mantine-color-brand-9) 60%, var(--mantine-color-ink-8) 100%)",
        }}
        pt={{ base: 130, md: 160 }}
        pb={{ base: 70, md: 90 }}
      >
        <GradientMesh variant="hero" />
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <Group gap="xs" mb="sm">
              <LinkText href="/practice-areas" size="sm" c="gray.4" style={{ textDecoration: "none" }}>
                Practice Areas
              </LinkText>
              <Text size="sm" c="gray.6">
                /
              </Text>
              <Text size="sm" c="gold.5">
                {area.shortTitle}
              </Text>
            </Group>
            <Box
              style={{
                width: 56,
                height: 56,
                borderRadius: "var(--mantine-radius-sm)",
                backgroundColor: "color-mix(in srgb, var(--mantine-color-gold-5) 18%, transparent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <Icon size={28} color="var(--mantine-color-gold-5)" stroke={1.5} />
            </Box>
            <Title order={1} c="white" fz={{ base: 30, md: 44 }} ff="var(--mantine-heading-font-family)" maw={780} lh={1.15}>
              {area.title}
            </Title>
            <Text c="gray.3" fz={{ base: "md", md: "lg" }} maw={700} mt="md" lh={1.6}>
              {area.tagline}
            </Text>
          </Reveal>
        </div>
      </Box>

      {/* INTRO */}
      <Box py={{ base: 56, md: 80 }}>
        <div className="section-container">
          <Stack gap="md" maw={820}>
            {introParas.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <Text c="dark.4" fz="md" lh={1.75}>
                  {para}
                </Text>
              </Reveal>
            ))}
          </Stack>
        </div>
      </Box>

      {/* EXTRA SECTIONS (narrative blocks) */}
      {extraSections.length > 0 && (
        <Box pb={{ base: 8, md: 16 }}>
          <div className="section-container">
            <Stack gap={48}>
              {extraSections.map((section, i) => (
                <Reveal key={section.title} delay={i * 0.05}>
                  <Grid gap={{ base: 24, md: 48 }}>
                    <GridCol span={{ base: 12, md: 4 }}>
                      <Title order={3} fz={{ base: 20, md: 22 }} ff="var(--mantine-heading-font-family)" c="ink.9">
                        {section.title}
                      </Title>
                    </GridCol>
                    <GridCol span={{ base: 12, md: 8 }}>
                      {section.body && (
                        <Text c="dark.4" fz="md" lh={1.75} mb={section.points.length ? "md" : 0}>
                          {section.body}
                        </Text>
                      )}
                      {section.points.length > 0 && (
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                          {section.points.map((point) => (
                            <Group key={point} align="flex-start" wrap="nowrap" gap="sm">
                              <IconCheck size={16} color="var(--mantine-color-brand-6)" style={{ flexShrink: 0, marginTop: 4 }} />
                              <Text size="sm" c="dark.4" lh={1.6}>
                                {point}
                              </Text>
                            </Group>
                          ))}
                        </SimpleGrid>
                      )}
                    </GridCol>
                  </Grid>
                </Reveal>
              ))}
            </Stack>
          </div>
        </Box>
      )}

      {/* SERVICES + MATTERS */}
      {(services.length > 0 || matters.length > 0) && (
        <Box py={{ base: 56, md: 88 }} mt={40} style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
          <div className="section-container">
            <Grid gap={{ base: 32, md: 64 }}>
              {services.length > 0 && (
                <GridCol span={{ base: 12, md: 6 }}>
                  <Reveal>
                    <Title order={2} fz={{ base: 22, md: 26 }} ff="var(--mantine-heading-font-family)" c="ink.9" mb="md">
                      {area.servicesTitle}
                    </Title>
                    <Stack gap="xs">
                      {services.map((service) => (
                        <Group key={service} align="flex-start" wrap="nowrap" gap="sm">
                          <IconCheck size={16} color="var(--mantine-color-brand-6)" style={{ flexShrink: 0, marginTop: 4 }} />
                          <Text size="sm" c="dark.4" lh={1.6}>
                            {service}
                          </Text>
                        </Group>
                      ))}
                    </Stack>
                  </Reveal>
                </GridCol>
              )}
              {matters.length > 0 && (
                <GridCol span={{ base: 12, md: 6 }}>
                  <Reveal delay={0.08}>
                    <Title order={2} fz={{ base: 22, md: 26 }} ff="var(--mantine-heading-font-family)" c="ink.9" mb="md">
                      {area.mattersTitle}
                    </Title>
                    <Stack gap="xs">
                      {matters.map((matter) => (
                        <Group key={matter} align="flex-start" wrap="nowrap" gap="sm">
                          <IconCheck size={16} color="var(--mantine-color-gold-6)" style={{ flexShrink: 0, marginTop: 4 }} />
                          <Text size="sm" c="dark.4" lh={1.6}>
                            {matter}
                          </Text>
                        </Group>
                      ))}
                    </Stack>
                  </Reveal>
                </GridCol>
              )}
            </Grid>
          </div>
        </Box>
      )}

      {/* WHY CHOOSE US */}
      {whyItems.length > 0 && (
        <Box py={{ base: 56, md: 88 }}>
          <div className="section-container">
            <Reveal>
              <Title order={2} fz={{ base: 22, md: 26 }} ff="var(--mantine-heading-font-family)" c="ink.9" mb={40}>
                {area.whyTitle}
              </Title>
            </Reveal>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
              {whyItems.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <Card padding="lg" radius="md" withBorder h="100%">
                    <Text fw={600} fz="md" c="ink.9" mb={8}>
                      {item.title}
                    </Text>
                    <Text size="sm" c="dark.3" lh={1.7}>
                      {item.body}
                    </Text>
                  </Card>
                </Reveal>
              ))}
            </SimpleGrid>
          </div>
        </Box>
      )}

      {/* CLOSING CTA */}
      <Box
        py={{ base: 56, md: 80 }}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, var(--mantine-color-brand-8), var(--mantine-color-brand-9))",
        }}
      >
        <GradientMesh variant="cta" />
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <Stack align="center" ta="center" gap="lg" maw={760} mx="auto">
            <Title order={2} fz={{ base: 24, md: 32 }} ff="var(--mantine-heading-font-family)" c="white">
              {area.closingTitle}
            </Title>
            <Text c="gray.3" fz="md" lh={1.7}>
              {area.closingBody}
            </Text>
            <LinkButton href="/contact" size="lg" radius="sm" color="gold" c="ink.9" rightSection={<IconArrowRight size={18} />}>
              {area.ctaLabel}
            </LinkButton>
          </Stack>
        </div>
      </Box>
    </>
  );
}
