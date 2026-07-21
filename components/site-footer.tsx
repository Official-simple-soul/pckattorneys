import { Box, Divider, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { getSiteSettings, getPracticeAreas } from "@/lib/content";
import { LinkText } from "@/components/ui/link-text";

export async function SiteFooter() {
  const [settings, practiceAreas] = await Promise.all([getSiteSettings(), getPracticeAreas()]);
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      style={{ backgroundColor: "var(--mantine-color-ink-9)", color: "var(--mantine-color-gray-4)" }}
      py={64}
    >
      <div className="section-container">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={40}>
          <Stack gap="sm">
            <Text ff="var(--mantine-heading-font-family)" fw={700} size="lg" c="white">
              {settings.firmName}
            </Text>
            <Text size="sm" c="gray.5" maw={280}>
              {settings.tagline}
            </Text>
          </Stack>

          <Stack gap="xs">
            <Text fw={600} size="sm" c="white" mb={4}>
              Practice Areas
            </Text>
            {practiceAreas.slice(0, 6).map((area) => (
              <LinkText
                key={area.slug}
                href={`/practice-areas/${area.slug}`}
                size="sm"
                c="gray.5"
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
              <LinkText key={link.href} href={link.href} size="sm" c="gray.5" style={{ textDecoration: "none" }}>
                {link.label}
              </LinkText>
            ))}
          </Stack>

          <Stack gap="xs">
            <Text fw={600} size="sm" c="white" mb={4}>
              Contact
            </Text>
            <Text size="sm" c="gray.5">
              {settings.address}
              <br />
              {settings.city}, {settings.country}
            </Text>
            <Text size="sm" c="gray.5">
              {settings.phone}
            </Text>
            <Text size="sm" c="gray.5">
              {settings.email}
            </Text>
          </Stack>
        </SimpleGrid>

        <Divider my={40} color="dark.6" />

        <Group justify="space-between" wrap="wrap">
          <Text size="xs" c="gray.6">
            © {year} {settings.firmName}. All rights reserved.
          </Text>
          <Text size="xs" c="gray.6">
            {settings.city}, {settings.country} · {settings.officeHours}
          </Text>
        </Group>
      </div>
    </Box>
  );
}
