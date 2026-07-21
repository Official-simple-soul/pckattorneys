import { Badge, Card, Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { getPracticeAreas } from "@/lib/content";
import { asStringArray } from "@/lib/types";
import { LinkCard } from "@/components/ui/link-card";
import { LinkButton } from "@/components/ui/link-button";

export default async function AdminPracticeAreasPage() {
  const areas = await getPracticeAreas();

  return (
    <Container size="md" py="md">
      <Group justify="space-between" mb="xl">
        <Stack gap={4}>
          <Title order={2} ff="var(--mantine-heading-font-family)">
            Practice Areas
          </Title>
          <Text c="dimmed">Add, edit, or remove practice area pages.</Text>
        </Stack>
        <LinkButton href="/admin/practice-areas/new" leftSection={<IconPlus size={16} />} radius="sm">
          New Practice Area
        </LinkButton>
      </Group>

      <Stack gap="sm">
        {areas.map((area) => (
          <LinkCard key={area.id} href={`/admin/practice-areas/${area.id}`} padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <Stack gap={2}>
                <Text fw={600}>{area.title}</Text>
                <Text size="sm" c="dimmed">
                  /practice-areas/{area.slug}
                </Text>
              </Stack>
              <Badge variant="light" color="brand">
                {asStringArray(area.services).length} services
              </Badge>
            </Group>
          </LinkCard>
        ))}
        {areas.length === 0 && (
          <Card padding="xl" radius="md" withBorder>
            <Text c="dimmed" ta="center">
              No practice areas yet.
            </Text>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
