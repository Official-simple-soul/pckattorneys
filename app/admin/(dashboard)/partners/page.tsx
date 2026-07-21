import { Avatar, Card, Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { getPartners } from "@/lib/content";
import { LinkCard } from "@/components/ui/link-card";
import { LinkButton } from "@/components/ui/link-button";

export default async function AdminPartnersPage() {
  const partners = await getPartners();

  return (
    <Container size="md" py="md">
      <Group justify="space-between" mb="xl">
        <Stack gap={4}>
          <Title order={2} ff="var(--mantine-heading-font-family)">
            Partners
          </Title>
          <Text c="dimmed">Add, edit, or remove partner profiles.</Text>
        </Stack>
        <LinkButton href="/admin/partners/new" leftSection={<IconPlus size={16} />} radius="sm">
          Add Partner
        </LinkButton>
      </Group>

      <Stack gap="sm">
        {partners.map((partner) => (
          <LinkCard key={partner.id} href={`/admin/partners/${partner.id}`} padding="lg" radius="md" withBorder>
            <Group>
              {partner.photoUrl ? (
                <Avatar size={48} radius="md" src={partner.photoUrl} />
              ) : (
                <Avatar size={48} radius="md">
                  {partner.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </Avatar>
              )}
              <Stack gap={2}>
                <Text fw={600}>{partner.name}</Text>
                <Text size="sm" c="dimmed">
                  {partner.title}
                </Text>
              </Stack>
            </Group>
          </LinkCard>
        ))}
        {partners.length === 0 && (
          <Card padding="xl" radius="md" withBorder>
            <Text c="dimmed" ta="center">
              No partners added yet.
            </Text>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
