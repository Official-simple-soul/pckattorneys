import { Badge, Box, Card, Grid, GridCol, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { getAboutPage } from "@/lib/content";
import { asStringArray, asTitleBodyArray } from "@/lib/types";
import { Reveal } from "@/components/reveal";
import { GradientMesh } from "@/components/decorative";
import { LinkButton } from "@/components/ui/link-button";

export default async function AboutPage() {
  const about = await getAboutPage();

  const introParas = about.intro.split("\n\n");
  const storyParas = about.storyBody.split("\n\n");
  const philosophyParas = about.philosophyBody.split("\n\n");
  const philosophyQuestions = asStringArray(about.philosophyQuestions);
  const approachItems = asTitleBodyArray(about.approachItems);
  const whoWeServeItems = asTitleBodyArray(about.whoWeServeItems);
  const globalPoints = asStringArray(about.globalPoints);
  const standardPoints = asStringArray(about.standardPoints);

  return (
    <>
      {/* HERO */}
      <Box
        component="section"
        style={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(160deg, var(--mantine-color-ink-9) 0%, var(--mantine-color-brand-9) 60%, var(--mantine-color-ink-8) 100%)",
        }}
        pt={{ base: 130, md: 160 }}
        pb={{ base: 70, md: 90 }}
      >
        <GradientMesh variant="hero" />
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <Badge variant="light" color="gold" size="lg" radius="sm" mb="md" styles={{ root: { textTransform: "none" } }}>
              About the Firm
            </Badge>
            <Title order={1} c="white" fz={{ base: 32, md: 48 }} ff="var(--mantine-heading-font-family)" maw={800} lh={1.15}>
              {about.heroSubtitle}
            </Title>
          </Reveal>
        </div>
      </Box>

      {/* INTRO */}
      <Box py={{ base: 56, md: 88 }}>
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

      {/* OUR STORY */}
      <Box py={{ base: 56, md: 88 }} style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
        <div className="section-container">
          <Grid gap={{ base: 32, md: 64 }}>
            <GridCol span={{ base: 12, md: 4 }}>
              <Reveal>
                <Text tt="uppercase" fw={600} size="sm" c="brand.7">
                  Our Story
                </Text>
                <Title order={2} fz={{ base: 26, md: 32 }} ff="var(--mantine-heading-font-family)" c="ink.9" mt={4}>
                  {about.storyTitle}
                </Title>
              </Reveal>
            </GridCol>
            <GridCol span={{ base: 12, md: 8 }}>
              <Stack gap="md">
                {storyParas.map((para, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <Text c="dark.4" fz="md" lh={1.75}>
                      {para}
                    </Text>
                  </Reveal>
                ))}
              </Stack>
            </GridCol>
          </Grid>
        </div>
      </Box>

      {/* MISSION / VISION */}
      <Box py={{ base: 56, md: 88 }}>
        <div className="section-container">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Reveal>
              <Card padding="xl" radius="md" withBorder h="100%">
                <Text tt="uppercase" fw={600} size="sm" c="brand.7" mb="sm">
                  Our Mission
                </Text>
                <Text fz="lg" c="ink.9" lh={1.6} fw={500}>
                  {about.missionText}
                </Text>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card padding="xl" radius="md" withBorder h="100%">
                <Text tt="uppercase" fw={600} size="sm" c="brand.7" mb="sm">
                  Our Vision
                </Text>
                <Text fz="lg" c="ink.9" lh={1.6} fw={500}>
                  {about.visionText}
                </Text>
              </Card>
            </Reveal>
          </SimpleGrid>
        </div>
      </Box>

      {/* PHILOSOPHY */}
      <Box py={{ base: 56, md: 88 }} style={{ backgroundColor: "var(--mantine-color-ink-9)" }}>
        <div className="section-container">
          <Grid gap={{ base: 32, md: 64 }} align="center">
            <GridCol span={{ base: 12, md: 6 }}>
              <Reveal>
                <Text tt="uppercase" fw={600} size="sm" c="gold.5" mb="xs">
                  Our Philosophy
                </Text>
                <Title order={2} fz={{ base: 26, md: 32 }} ff="var(--mantine-heading-font-family)" c="white" mb="md">
                  {about.philosophyTitle}
                </Title>
                <Stack gap="sm">
                  {philosophyParas.map((para, i) => (
                    <Text key={i} c="gray.3" fz="md" lh={1.75}>
                      {para}
                    </Text>
                  ))}
                </Stack>
              </Reveal>
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <Reveal delay={0.1}>
                <Stack gap="sm">
                  {philosophyQuestions.map((q) => (
                    <Group
                      key={q}
                      p="md"
                      style={{ border: "1px solid color-mix(in srgb, white 14%, transparent)", borderRadius: "var(--mantine-radius-md)" }}
                      wrap="nowrap"
                    >
                      <IconCheck size={18} color="var(--mantine-color-gold-5)" style={{ flexShrink: 0 }} />
                      <Text c="gray.2" size="sm" fw={500}>
                        {q}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Reveal>
            </GridCol>
          </Grid>
        </div>
      </Box>

      {/* APPROACH */}
      <Box py={{ base: 56, md: 88 }}>
        <div className="section-container">
          <Reveal>
            <Title order={2} fz={{ base: 26, md: 32 }} ff="var(--mantine-heading-font-family)" c="ink.9" mb={40}>
              Our Approach
            </Title>
          </Reveal>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
            {approachItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <Box>
                  <Box style={{ width: 36, height: 2, backgroundColor: "var(--mantine-color-gold-6)", marginBottom: 16 }} />
                  <Text fw={600} fz="md" c="ink.9" mb={8} ff="var(--mantine-heading-font-family)">
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

      {/* WHO WE SERVE */}
      <Box py={{ base: 56, md: 88 }} style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
        <div className="section-container">
          <Reveal>
            <Title order={2} fz={{ base: 26, md: 32 }} ff="var(--mantine-heading-font-family)" c="ink.9" mb={40}>
              Who We Serve
            </Title>
          </Reveal>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {whoWeServeItems.map((item, i) => (
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

      {/* GLOBAL PERSPECTIVE */}
      <Box py={{ base: 56, md: 88 }}>
        <div className="section-container">
          <Grid gap={{ base: 32, md: 64 }}>
            <GridCol span={{ base: 12, md: 5 }}>
              <Reveal>
                <Title order={2} fz={{ base: 26, md: 32 }} ff="var(--mantine-heading-font-family)" c="ink.9" mb="md">
                  {about.globalTitle}
                </Title>
                <Text c="dark.4" fz="md" lh={1.75}>
                  {about.globalBody}
                </Text>
              </Reveal>
            </GridCol>
            <GridCol span={{ base: 12, md: 7 }}>
              <Reveal delay={0.1}>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  {globalPoints.map((point) => (
                    <Group key={point} align="flex-start" wrap="nowrap" gap="sm">
                      <IconCheck size={18} color="var(--mantine-color-brand-6)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <Text size="sm" c="dark.4" lh={1.6}>
                        {point}
                      </Text>
                    </Group>
                  ))}
                </SimpleGrid>
              </Reveal>
            </GridCol>
          </Grid>
        </div>
      </Box>

      {/* STANDARD */}
      <Box py={{ base: 56, md: 88 }} style={{ backgroundColor: "var(--mantine-color-ink-9)" }}>
        <div className="section-container">
          <Grid gap={{ base: 32, md: 64 }}>
            <GridCol span={{ base: 12, md: 6 }}>
              <Reveal>
                <Title order={2} fz={{ base: 26, md: 32 }} ff="var(--mantine-heading-font-family)" c="white" mb="md">
                  {about.standardTitle}
                </Title>
                <Text c="gray.3" fz="md" lh={1.75}>
                  {about.standardIntro}
                </Text>
              </Reveal>
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <Reveal delay={0.1}>
                <Stack gap="sm">
                  {standardPoints.map((point) => (
                    <Group key={point} wrap="nowrap" gap="sm">
                      <Box
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "var(--mantine-color-gold-5)",
                          flexShrink: 0,
                        }}
                      />
                      <Text c="gray.2" fz="md" fw={500}>
                        {point}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Reveal>
            </GridCol>
          </Grid>
        </div>
      </Box>

      {/* CLOSING CTA */}
      <Box py={{ base: 56, md: 80 }} style={{ background: "linear-gradient(135deg, var(--mantine-color-brand-8), var(--mantine-color-brand-9))" }}>
        <div className="section-container">
          <Stack align="center" ta="center" gap="lg" maw={720} mx="auto">
            <Text c="gray.3" fz="md" lh={1.7}>
              {about.closingBody}
            </Text>
            <LinkButton href="/contact" size="lg" radius="sm" color="gold" c="ink.9">
              Schedule a Confidential Consultation
            </LinkButton>
          </Stack>
        </div>
      </Box>
    </>
  );
}
