import { Badge, Box, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconArrowUpRight } from "@tabler/icons-react";
import { getPracticeAreas } from "@/lib/content";
import { getPracticeIcon } from "@/lib/practice-icons";
import { Reveal } from "@/components/reveal";
import { GradientMesh } from "@/components/decorative";
import { LinkCard } from "@/components/ui/link-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Areas",
};

export default async function PracticeAreasPage() {
  const practiceAreas = await getPracticeAreas();

  return (
    <>
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
            <Badge variant="light" color="gold" size="lg" radius="sm" mb="md" styles={{ root: { textTransform: "none" } }}>
              What We Do
            </Badge>
            <Title order={1} c="white" fz={{ base: 32, md: 48 }} ff="var(--mantine-heading-font-family)" maw={780} lh={1.15}>
              Full-Service Commercial Legal Solutions
            </Title>
            <Text c="gray.3" fz="md" maw={640} mt="md" lh={1.7}>
              Parah, Chen and King LLP advises clients across a broad range of legal disciplines,
              spanning corporate, finance, disputes, regulatory, and sector-specific matters.
            </Text>
          </Reveal>
        </div>
      </Box>

      <Box py={{ base: 56, md: 88 }}>
        <div className="section-container">
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
                    style={{ height: "100%", textDecoration: "none" }}
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
                    <Stack gap={6}>
                      <Text fw={600} fz="lg" c="ink.9" ff="var(--mantine-heading-font-family)">
                        {area.shortTitle}
                      </Text>
                      <Text size="sm" c="dark.3" lh={1.6}>
                        {area.tagline}
                      </Text>
                    </Stack>
                    <Box style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 16, color: "var(--mantine-color-brand-7)" }}>
                      <Text size="sm" fw={600}>
                        Learn more
                      </Text>
                      <IconArrowUpRight size={16} />
                    </Box>
                  </LinkCard>
                </Reveal>
              );
            })}
          </SimpleGrid>
        </div>
      </Box>
    </>
  );
}
