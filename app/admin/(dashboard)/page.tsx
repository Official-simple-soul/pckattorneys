import { Container, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconBriefcase, IconMail, IconUsers, IconMailOpened } from "@tabler/icons-react";
import { prisma } from "@/lib/db";
import { LinkCard } from "@/components/ui/link-card";

export default async function AdminDashboardPage() {
  const [practiceAreaCount, partnerCount, submissionCount, unreadCount] = await Promise.all([
    prisma.practiceArea.count(),
    prisma.partner.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
  ]);

  const cards = [
    { label: "Practice Areas", value: practiceAreaCount, href: "/admin/practice-areas", icon: IconBriefcase },
    { label: "Partners", value: partnerCount, href: "/admin/partners", icon: IconUsers },
    { label: "Total Messages", value: submissionCount, href: "/admin/messages", icon: IconMail },
    { label: "Unread Messages", value: unreadCount, href: "/admin/messages", icon: IconMailOpened },
  ];

  return (
    <Container size="lg" py="md">
      <Stack gap={4} mb="xl">
        <Title order={2} ff="var(--mantine-heading-font-family)">
          Welcome back
        </Title>
        <Text c="dimmed">Manage your firm&apos;s website content, theme, and inquiries.</Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {cards.map((card) => (
          <LinkCard key={card.label} href={card.href} padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="sm">
              <card.icon size={22} color="var(--mantine-color-brand-6)" />
            </Group>
            <Text fz={28} fw={700}>
              {card.value}
            </Text>
            <Text size="sm" c="dimmed">
              {card.label}
            </Text>
          </LinkCard>
        ))}
      </SimpleGrid>

      <Title order={3} mt={48} mb="md" fz="lg" ff="var(--mantine-heading-font-family)">
        Quick Links
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {[
          { label: "Update theme colors & fonts", href: "/admin/theme" },
          { label: "Edit homepage copy", href: "/admin/homepage" },
          { label: "Edit about page", href: "/admin/about" },
          { label: "Manage practice areas", href: "/admin/practice-areas" },
          { label: "Manage partners", href: "/admin/partners" },
          { label: "Edit contact page", href: "/admin/contact" },
        ].map((link) => (
          <LinkCard key={link.href} href={link.href} padding="lg" radius="md" withBorder>
            <Text fw={500}>{link.label}</Text>
          </LinkCard>
        ))}
      </SimpleGrid>
    </Container>
  );
}
