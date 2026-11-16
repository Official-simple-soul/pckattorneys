import { Badge, Card, Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { getAllHeroSlides, getHomePage } from "@/lib/content";
import { LinkCard } from "@/components/ui/link-card";
import { LinkButton } from "@/components/ui/link-button";

export default async function AdminHeroSlidesPage() {
  const [slides, home] = await Promise.all([getAllHeroSlides(), getHomePage()]);

  return (
    <Container size="md" py="md">
      <Group justify="space-between" mb="xl">
        <Stack gap={4}>
          <Title order={2} ff="var(--mantine-heading-font-family)">
            Hero Slides
          </Title>
          <Text c="dimmed">The rotating banner at the top of the homepage. Use it to highlight a sector, a matter or news.</Text>
        </Stack>
        <LinkButton href="/admin/hero-slides/new" leftSection={<IconPlus size={16} />} radius="sm">
          Add slide
        </LinkButton>
      </Group>

      <Stack gap="sm">
        <LinkCard href="/admin/homepage" padding="lg" radius="md" withBorder>
          <Group justify="space-between" wrap="nowrap">
            <Stack gap={2}>
              <Text fw={600}>{home.heroHeadline}</Text>
              <Text size="sm" c="dimmed">
                Main slide, always shown first. Edit it under Homepage.
              </Text>
            </Stack>
            <Badge variant="light">First</Badge>
          </Group>
        </LinkCard>

        {slides.map((slide) => (
          <LinkCard key={slide.id} href={`/admin/hero-slides/${slide.id}`} padding="lg" radius="md" withBorder>
            <Group justify="space-between" wrap="nowrap">
              <Stack gap={2}>
                <Text fw={600}>{slide.headline}</Text>
                <Text size="sm" c="dimmed">
                  {slide.label} · position {slide.order}
                </Text>
              </Stack>
              {!slide.published && (
                <Badge variant="light" color="gray">
                  Hidden
                </Badge>
              )}
            </Group>
          </LinkCard>
        ))}

        {slides.length === 0 && (
          <Card padding="xl" radius="md" withBorder>
            <Text c="dimmed" ta="center">
              No extra slides. The homepage shows only the main slide.
            </Text>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
