import {
  Badge,
  Box,
  Grid,
  GridCol,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { getHomePage, getPracticeAreas, getSiteSettings } from "@/lib/content";
import { asStringArray, asTitleBodyArray } from "@/lib/types";
import { getPracticeIcon } from "@/lib/practice-icons";
import { Reveal } from "@/components/reveal";
import { GradientMesh, SkylineSilhouette } from "@/components/decorative";
import { LinkButton } from "@/components/ui/link-button";
import { LinkCard } from "@/components/ui/link-card";

export default async function HomePage() {
  const [home, settings, practiceAreas] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getPracticeAreas(),
  ]);

  const trustBarItems = asStringArray(home.trustBarItems);
  const valuePropBody = asStringArray(home.valuePropBody);
  const whyChooseUsItems = asTitleBodyArray(home.whyChooseUsItems);

  return (
    <>
      {/* HERO */}
      <Box
        component="section"
        style={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(160deg, var(--mantine-color-ink-9) 0%, var(--mantine-color-brand-9) 55%, var(--mantine-color-ink-8) 100%)",
        }}
        pt={{ base: 140, md: 170 }}
        pb={{ base: 90, md: 40 }}
      >
        <GradientMesh variant="hero" />
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <Stack gap="xl" maw={820}>
            <Reveal>
              <Badge
                variant="light"
                color="gold"
                size="lg"
                radius="sm"
                styles={{ root: { textTransform: "none" } }}
              >
                {home.heroEyebrow}
              </Badge>
            </Reveal>
            <Reveal delay={0.08}>
              <Title
                order={1}
                c="white"
                fw={700}
                lh={1.1}
                fz={{ base: 34, sm: 46, md: 56 }}
                ff="var(--mantine-heading-font-family)"
              >
                {home.heroHeadline}
              </Title>
            </Reveal>
            <Reveal delay={0.16}>
              <Text c="gray.3" fz={{ base: "md", md: "lg" }} maw={680} lh={1.6}>
                {home.heroSubheadline}
              </Text>
            </Reveal>
            <Reveal delay={0.24}>
              <Group gap="md" mt="sm">
                <LinkButton
                  href="/contact"
                  size="lg"
                  radius="sm"
                  color="gold"
                  c="ink.9"
                  rightSection={<IconArrowRight size={18} />}
                >
                  {home.heroPrimaryCta}
                </LinkButton>
                <LinkButton
                  href="/partners"
                  size="lg"
                  radius="sm"
                  variant="outline"
                  color="gray.1"
                  c="white"
                >
                  {home.heroSecondaryCta}
                </LinkButton>
              </Group>
            </Reveal>
          </Stack>
        </div>

        <Box
          c="gray.2"
          style={{ position: "relative", zIndex: 1, marginTop: 64, opacity: 0.5 }}
        >
          <SkylineSilhouette />
        </Box>

        {/* TRUST BAR */}
        <Box
          style={{
            position: "relative",
            zIndex: 1,
            borderTop: "1px solid color-mix(in srgb, white 12%, transparent)",
            background: "color-mix(in srgb, var(--mantine-color-ink-9) 55%, transparent)",
          }}
          py="lg"
        >
          <div className="section-container">
            <Group justify="center" gap={24} wrap="wrap">
              {trustBarItems.map((item, i) => (
                <Text key={item} size="sm" c="gray.3" fw={500} ta="center">
                  {item}
                  {i < trustBarItems.length - 1 && (
                    <Box component="span" ml={{ base: 16, md: 40 }} c="gray.6" visibleFrom="sm">
                      ·
                    </Box>
                  )}
                </Text>
              ))}
            </Group>
          </div>
        </Box>
      </Box>

      {/* VALUE PROPOSITION */}
      <Box py={{ base: 64, md: 96 }}>
        <div className="section-container">
          <Grid gap={{ base: 32, md: 64 }}>
            <GridCol span={{ base: 12, md: 5 }}>
              <Reveal>
                <Title
                  order={2}
                  fz={{ base: 28, md: 34 }}
                  ff="var(--mantine-heading-font-family)"
                  c="ink.9"
                  lh={1.2}
                >
                  {home.valuePropTitle}
                </Title>
              </Reveal>
            </GridCol>
            <GridCol span={{ base: 12, md: 7 }}>
              <Stack gap="md">
                {valuePropBody.map((para, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <Text c="dark.4" fz="md" lh={1.7}>
                      {para}
                    </Text>
                  </Reveal>
                ))}
              </Stack>
            </GridCol>
          </Grid>
        </div>
      </Box>

      {/* PRACTICE AREAS OVERVIEW */}
      <Box py={{ base: 64, md: 96 }} style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
        <div className="section-container">
          <Reveal>
            <Stack gap="xs" maw={640} mb={48}>
              <Text tt="uppercase" fw={600} size="sm" c="brand.7">
                What We Do
              </Text>
              <Title order={2} fz={{ base: 28, md: 34 }} ff="var(--mantine-heading-font-family)" c="ink.9">
                {home.practiceOverviewTitle}
              </Title>
            </Stack>
          </Reveal>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {practiceAreas.map((area, i) => {
              const Icon = getPracticeIcon(area.slug);
              return (
                <Reveal key={area.id} delay={(i % 3) * 0.08}>
                  <LinkCard
                    href={`/practice-areas/${area.slug}`}
                    padding="xl"
                    radius="md"
                    withBorder
                    style={{ height: "100%", textDecoration: "none", transition: "transform 150ms ease" }}
                    className="practice-card"
                  >
                    <Box
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "var(--mantine-radius-sm)",
                        backgroundColor: "var(--mantine-color-brand-0)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Icon size={24} color="var(--mantine-color-brand-7)" stroke={1.5} />
                    </Box>
                    <Text fw={600} fz="lg" c="ink.9" mb={8} ff="var(--mantine-heading-font-family)">
                      {area.shortTitle}
                    </Text>
                    <Text size="sm" c="dark.3" lh={1.6} lineClamp={3}>
                      {area.tagline}
                    </Text>
                    <Group gap={4} mt="md" c="brand.7">
                      <Text size="sm" fw={600}>
                        Learn more
                      </Text>
                      <IconArrowUpRight size={16} />
                    </Group>
                  </LinkCard>
                </Reveal>
              );
            })}
          </SimpleGrid>

          <Group justify="center" mt={48}>
            <LinkButton href="/practice-areas" size="md" variant="outline" radius="sm">
              {home.practiceOverviewCta}
            </LinkButton>
          </Group>
        </div>
      </Box>

      {/* WHY CHOOSE US */}
      <Box py={{ base: 64, md: 96 }}>
        <div className="section-container">
          <Reveal>
            <Stack gap="xs" maw={720} mb={48}>
              <Text tt="uppercase" fw={600} size="sm" c="brand.7">
                Why Choose Us
              </Text>
              <Title order={2} fz={{ base: 28, md: 34 }} ff="var(--mantine-heading-font-family)" c="ink.9">
                {home.whyChooseUsTitle}
              </Title>
              <Text c="dark.3" fz="md" lh={1.6}>
                {home.whyChooseUsIntro}
              </Text>
            </Stack>
          </Reveal>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            {whyChooseUsItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <Box>
                  <Box
                    style={{
                      width: 36,
                      height: 2,
                      backgroundColor: "var(--mantine-color-gold-6)",
                      marginBottom: 16,
                    }}
                  />
                  <Text fw={600} fz="lg" c="ink.9" mb={8} ff="var(--mantine-heading-font-family)">
                    {item.title}
                  </Text>
                  <Text size="sm" c="dark.3" lh={1.7}>
                    {item.body}
                  </Text>
                </Box>
              </Reveal>
            ))}
          </SimpleGrid>
        </div>
      </Box>

      {/* ABOUT PREVIEW */}
      <Box py={{ base: 64, md: 96 }} style={{ backgroundColor: "var(--mantine-color-ink-9)" }}>
        <div className="section-container">
          <Grid gap={{ base: 32, md: 64 }} align="center">
            <GridCol span={{ base: 12, md: 7 }}>
              <Reveal>
                <Text tt="uppercase" fw={600} size="sm" c="gold.5" mb="xs">
                  About the Firm
                </Text>
                <Title
                  order={2}
                  fz={{ base: 26, md: 32 }}
                  ff="var(--mantine-heading-font-family)"
                  c="white"
                  mb="md"
                  lh={1.25}
                >
                  {home.aboutPreviewTitle}
                </Title>
                <Text c="gray.3" fz="md" lh={1.7} mb="xl">
                  {home.aboutPreviewBody}
                </Text>
                <LinkButton
                  href="/about"
                  radius="sm"
                  variant="outline"
                  color="gray.1"
                  c="white"
                  rightSection={<IconArrowRight size={16} />}
                >
                  {home.aboutPreviewCta}
                </LinkButton>
              </Reveal>
            </GridCol>
            <GridCol span={{ base: 12, md: 5 }}>
              <Reveal delay={0.1}>
                <Stack gap="md">
                  {["Corporate Governance", "Cross-Border Transactions", "Regulatory Strategy"].map(
                    (label) => (
                      <Group
                        key={label}
                        p="md"
                        style={{
                          border: "1px solid color-mix(in srgb, white 14%, transparent)",
                          borderRadius: "var(--mantine-radius-md)",
                        }}
                        justify="space-between"
                      >
                        <Text c="gray.2" size="sm" fw={500}>
                          {label}
                        </Text>
                        <IconArrowUpRight size={16} color="var(--mantine-color-gold-5)" />
                      </Group>
                    )
                  )}
                </Stack>
              </Reveal>
            </GridCol>
          </Grid>
        </div>
      </Box>

      {/* FINAL CTA */}
      <Box
        py={{ base: 64, md: 90 }}
        style={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, var(--mantine-color-brand-8), var(--mantine-color-brand-9))",
        }}
      >
        <GradientMesh variant="cta" />
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <Stack align="center" ta="center" gap="lg" maw={720} mx="auto">
            <Title order={2} fz={{ base: 26, md: 36 }} ff="var(--mantine-heading-font-family)" c="white">
              {home.finalCtaTitle}
            </Title>
            <Text c="gray.3" fz="md" lh={1.7}>
              {home.finalCtaBody}
            </Text>
            <Group gap="md" mt="sm">
              <LinkButton href="/contact" size="lg" radius="sm" color="gold" c="ink.9">
                {home.finalCtaPrimary}
              </LinkButton>
              <LinkButton href="/contact" size="lg" radius="sm" variant="outline" color="gray.1" c="white">
                {home.finalCtaSecondary}
              </LinkButton>
            </Group>
            <Text c="gray.5" fz="sm" mt="md">
              {settings.firmName}
            </Text>
          </Stack>
        </div>
      </Box>
    </>
  );
}
