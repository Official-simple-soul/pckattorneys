import Image from "next/image";
import { Anchor, Badge, Box, Divider, Grid, GridCol, Group, Stack, Text, Title } from "@mantine/core";
import { IconMail, IconPhone, IconQuote } from "@tabler/icons-react";
import { getPartners } from "@/lib/content";
import { asStringArray } from "@/lib/types";
import { Reveal } from "@/components/reveal";
import { GradientMesh } from "@/components/decorative";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners",
};

export default async function PartnersPage() {
  const partners = await getPartners();

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
              Leadership
            </Badge>
            <Title order={1} c="white" fz={{ base: 32, md: 48 }} ff="var(--mantine-heading-font-family)" maw={780} lh={1.15}>
              Leadership Built on Legal Excellence, Commercial Insight, and Global Perspective
            </Title>
            <Text c="gray.3" fz="md" maw={640} mt="md" lh={1.7}>
              Parah, Chen and King Attorneys is led by partners whose combined experience spans commercial
              law, regulatory advisory, corporate leadership, international development, finance, and
              cross-border engagement.
            </Text>
          </Reveal>
        </div>
      </Box>

      <Box py={{ base: 56, md: 88 }}>
        <div className="section-container">
          <Stack gap={72}>
            {partners.map((partner, i) => {
              const bioParas = partner.bio.split("\n\n");
              const focus = asStringArray(partner.practiceFocus);
              const reversed = i % 2 === 1;
              return (
                <Reveal key={partner.id} delay={i * 0.06}>
                  <Grid gap={40}>
                    <GridCol span={{ base: 12, md: 4 }} order={{ base: 1, md: reversed ? 2 : 1 }}>
                      <Box
                        style={{
                          position: "relative",
                          aspectRatio: "4 / 5",
                          borderRadius: "var(--mantine-radius-md)",
                          overflow: "hidden",
                          background: partner.photoUrl
                            ? undefined
                            : "linear-gradient(150deg, var(--mantine-color-brand-7), var(--mantine-color-ink-9))",
                          display: partner.photoUrl ? "block" : "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {partner.photoUrl ? (
                          <Image src={partner.photoUrl} alt={partner.name} fill style={{ objectFit: "cover" }} />
                        ) : (
                          <Text c="white" fz={48} fw={700} ff="var(--mantine-heading-font-family)">
                            {partner.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </Text>
                        )}
                      </Box>
                    </GridCol>
                    <GridCol span={{ base: 12, md: 8 }} order={{ base: 2, md: reversed ? 1 : 2 }}>
                      <Text tt="uppercase" fw={600} size="sm" c="brand.7">
                        {partner.title}
                      </Text>
                      <Title order={2} fz={{ base: 24, md: 30 }} ff="var(--mantine-heading-font-family)" c="ink.9" mt={4} mb="md">
                        {partner.name}, {partner.credentials}
                      </Title>

                      {(partner.email || partner.phone) && (
                        <Group gap="lg" mb="lg">
                          {partner.email && (
                            <Anchor href={`mailto:${partner.email}`} size="sm" fw={500} c="brand.7">
                              <Group gap={6} wrap="nowrap">
                                <IconMail size={16} stroke={1.5} aria-hidden />
                                {partner.email}
                              </Group>
                            </Anchor>
                          )}
                          {partner.phone && (
                            <Anchor href={`tel:${partner.phone.replace(/[^+\d]/g, "")}`} size="sm" fw={500} c="brand.7">
                              <Group gap={6} wrap="nowrap">
                                <IconPhone size={16} stroke={1.5} aria-hidden />
                                {partner.phone}
                              </Group>
                            </Anchor>
                          )}
                        </Group>
                      )}

                      {partner.quote && (
                        <Box
                          pl="md"
                          mb="lg"
                          style={{ borderLeft: "3px solid var(--mantine-color-gold-5)" }}
                        >
                          <Group gap={8} align="flex-start" wrap="nowrap">
                            <IconQuote size={20} color="var(--mantine-color-gold-6)" style={{ flexShrink: 0, marginTop: 2 }} />
                            <Text fz="lg" fs="italic" c="ink.8" lh={1.5}>
                              {partner.quote}
                            </Text>
                          </Group>
                        </Box>
                      )}

                      <Stack gap="sm" mb="lg">
                        {bioParas.map((para, pi) => (
                          <Text key={pi} c="dark.4" size="sm" lh={1.75}>
                            {para}
                          </Text>
                        ))}
                      </Stack>

                      {focus.length > 0 && (
                        <>
                          <Divider mb="sm" />
                          <Text fw={600} size="sm" c="ink.9" mb={8}>
                            Practice Focus
                          </Text>
                          <Group gap={8}>
                            {focus.map((f) => (
                              <Badge key={f} variant="light" color="brand" radius="sm" styles={{ root: { textTransform: "none" } }}>
                                {f}
                              </Badge>
                            ))}
                          </Group>
                        </>
                      )}
                    </GridCol>
                  </Grid>
                </Reveal>
              );
            })}
          </Stack>
        </div>
      </Box>
    </>
  );
}
