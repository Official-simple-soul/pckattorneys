import { Container, Stack, Text, Title } from "@mantine/core";
import { prisma } from "@/lib/db";
import { MessagesList } from "@/components/admin/messages-list";

export default async function AdminMessagesPage() {
  const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <Container size="md" py="md">
      <Stack gap={4} mb="xl">
        <Title order={2} ff="var(--mantine-heading-font-family)">
          Messages
        </Title>
        <Text c="dimmed">Consultation requests submitted through the contact form.</Text>
      </Stack>
      <MessagesList submissions={submissions} />
    </Container>
  );
}
