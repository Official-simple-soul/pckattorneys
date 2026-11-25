import { Anchor, Box, Divider, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { SITE } from "@/content/site";
import { PRACTICE_AREAS } from "@/content/practice-areas";
import { OFFICES } from "@/content/offices";
import { LinkText } from "@/components/ui/link-text";

export async function SiteFooter() {
  const settings = SITE;
  const practiceAreas = PRACTICE_AREAS;
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

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={40}>
          {OFFICES.map((office) => (
            <div key={office.name}>
              <Text fw={600} size="sm" c="white" mb={4}>
                {office.name}
                {office.note && (
                  <Text span inherit fw={400} c="gold.4">
                    {` (${office.note.toLowerCase()})`}
                  </Text>
                )}
              </Text>
              {office.lines.map((line) => (
                <Text key={line} size="sm" c="gray.4">
                  {line}
                </Text>
              ))}
            </div>
          ))}
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
