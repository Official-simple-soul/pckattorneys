import { Badge, Box, Card, Grid, GridCol, Group, Stack, Text, Title } from "@mantine/core";
import { IconClock, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { getContactPage, getPracticeAreas, getSiteSettings } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { GradientMesh } from "@/components/decorative";
import { ContactForm } from "@/components/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const [contact, settings, practiceAreas] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
    getPracticeAreas(),
  ]);

  const infoItems = [
    { icon: IconMapPin, label: "Office", value: `${settings.address}, ${settings.city}, ${settings.country}` },
    { icon: IconPhone, label: "Phone", value: settings.phone },
    { icon: IconMail, label: "Email", value: settings.email },
    { icon: IconClock, label: "Office Hours", value: settings.officeHours },
  ];

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
              Get In Touch
            </Badge>
            <Title order={1} c="white" fz={{ base: 32, md: 48 }} ff="var(--mantine-heading-font-family)" maw={720} lh={1.15}>
              {contact.heroTitle}
            </Title>
            <Text c="gray.3" fz="md" maw={640} mt="md" lh={1.7}>
              {contact.heroSubtitle}
            </Text>
          </Reveal>
        </div>
      </Box>

      <Box py={{ base: 56, md: 88 }}>
        <div className="section-container">
          <Grid gap={{ base: 32, md: 64 }}>
            <GridCol span={{ base: 12, md: 7 }}>
              <Reveal>
                <Card padding="xl" radius="md" withBorder>
                  <Text fw={600} fz="lg" c="ink.9" mb={4} ff="var(--mantine-heading-font-family)">
                    Schedule a Confidential Consultation
                  </Text>
                  <Text size="sm" c="dark.3" mb="lg">
                    {contact.formIntro}
                  </Text>
                  <ContactForm practiceAreaOptions={practiceAreas.map((a) => a.shortTitle)} />
                </Card>
              </Reveal>
            </GridCol>
            <GridCol span={{ base: 12, md: 5 }}>
              <Reveal delay={0.1}>
                <Stack gap="lg">
                  <Text fw={600} fz="lg" c="ink.9" ff="var(--mantine-heading-font-family)">
                    Contact the Firm
                  </Text>
                  {infoItems.map((item) => (
                    <Group key={item.label} align="flex-start" wrap="nowrap" gap="md">
                      <Box
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "var(--mantine-radius-sm)",
                          backgroundColor: "var(--mantine-color-brand-0)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <item.icon size={20} color="var(--mantine-color-brand-7)" stroke={1.5} />
                      </Box>
                      <Box>
                        <Text size="xs" tt="uppercase" fw={600} c="dark.3">
                          {item.label}
                        </Text>
                        <Text size="sm" c="ink.9" fw={500}>
                          {item.value}
                        </Text>
                      </Box>
                    </Group>
                  ))}
                </Stack>
              </Reveal>
            </GridCol>
          </Grid>
        </div>
      </Box>
    </>
  );
}
