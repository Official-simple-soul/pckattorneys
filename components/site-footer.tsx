import { Anchor, Box, Divider, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { getSiteSettings, getPracticeAreas } from "@/lib/content";
import { LinkText } from "@/components/ui/link-text";

export async function SiteFooter() {
  const [settings, practiceAreas] = await Promise.all([getSiteSettings(), getPracticeAreas()]);
  const year = new Date().getFullYear();

  return (
    <Box component="footer" style={{ backgroundColor: "var(--mantine-color-brand-9)" }} py={64}>
      <div className="section-container">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={40}>
          <Stack gap="sm">
            <Text ff="var(--mantine-heading-font-family)" size="xl" lh={1.3} c="white">
              {settings.firmName}
            </Text>
            <Text size="sm" c="gray.4" maw={280} lh={1.55}>
              {settings.tagline}
            </Text>
          </Stack>

          <Stack gap="xs">
            <Text fw={600} size="sm" c="white" mb={4}>
              Practice Areas
            </Text>
            {practiceAreas.map((area) => (
              <LinkText
                key={area.slug}
                href={`/practice-areas/${area.slug}`}
                size="sm"
                c="gray.4"
                style={{ textDecoration: "none" }}
              >
                {area.shortTitle}
              </LinkText>
            ))}
          </Stack>

          <Stack gap="xs">
            <Text fw={600} size="sm" c="white" mb={4}>
              Firm
            </Text>
            {[
              { href: "/about", label: "About the Firm" },
              { href: "/partners", label: "Partners" },
              { href: "/practice-areas", label: "Practice Areas" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <LinkText key={link.href} href={link.href} size="sm" c="gray.4" style={{ textDecoration: "none" }}>
                {link.label}
              </LinkText>
            ))}
          </Stack>

          <Stack gap="xs">
            <Text fw={600} size="sm" c="white" mb={4}>
              Contact
            </Text>
            <Text size="sm" c="gray.4">
              {settings.address}
              <br />
              {settings.city}, {settings.country}
            </Text>
            <Anchor href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`} size="sm" c="gray.4">
              {settings.phone}
            </Anchor>
            <Anchor href={`mailto:${settings.email}`} size="sm" c="gray.4">
              {settings.email}
            </Anchor>
            <Text size="sm" c="gray.4">
              {settings.officeHours}
            </Text>
          </Stack>
        </SimpleGrid>

        <Divider my={40} color="var(--pck-rule-on-navy)" />

        <Group justify="space-between" wrap="wrap">
          <Text size="xs" c="gray.4">
            © {year} {settings.firmName}. All rights reserved.
          </Text>
        </Group>
      </div>
    </Box>
  );
}
