"use client";

import { useTransition } from "react";
import { ActionIcon, Badge, Card, Group, Stack, Text } from "@mantine/core";
import { IconMailOpened, IconMail, IconTrash } from "@tabler/icons-react";
import { markSubmissionRead, deleteSubmission } from "@/lib/actions/content";
import type { ContactSubmission } from "@prisma/client";

export function MessagesList({ submissions }: { submissions: ContactSubmission[] }) {
  const [isPending, startTransition] = useTransition();

  if (submissions.length === 0) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        No messages yet. Submissions from the contact form will appear here.
      </Text>
    );
  }

  return (
    <Stack gap="sm">
      {submissions.map((sub) => (
        <Card key={sub.id} padding="lg" radius="md" withBorder opacity={sub.read ? 0.7 : 1}>
          <Group justify="space-between" align="flex-start" mb="xs">
            <Stack gap={2}>
              <Group gap="xs">
                <Text fw={600}>{sub.name}</Text>
                {!sub.read && (
                  <Badge size="xs" color="brand">
                    New
                  </Badge>
                )}
              </Group>
              <Text size="sm" c="dimmed">
                {sub.email}
                {sub.phone && ` · ${sub.phone}`}
                {sub.company && ` · ${sub.company}`}
              </Text>
              {sub.practiceArea && (
                <Badge size="sm" variant="light" color="gold" mt={4} styles={{ root: { textTransform: "none" } }}>
                  {sub.practiceArea}
                </Badge>
              )}
            </Stack>
            <Group gap="xs">
              <ActionIcon
                variant="subtle"
                onClick={() => startTransition(() => markSubmissionRead(sub.id, !sub.read))}
                disabled={isPending}
                aria-label={sub.read ? "Mark unread" : "Mark read"}
              >
                {sub.read ? <IconMail size={16} /> : <IconMailOpened size={16} />}
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => startTransition(() => deleteSubmission(sub.id))}
                disabled={isPending}
                aria-label="Delete"
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Group>
          <Text size="sm" mt="xs">
            {sub.message}
          </Text>
          <Text size="xs" c="dimmed" mt="sm">
            {new Date(sub.createdAt).toLocaleString()}
          </Text>
        </Card>
      ))}
    </Stack>
  );
}
