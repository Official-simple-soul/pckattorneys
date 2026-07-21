"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { Alert, Button, Card, Group, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { updateContactPage } from "@/lib/actions/content";
import type { ContactPage } from "@prisma/client";

export function ContactPageForm({ contact }: { contact: ContactPage }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      heroTitle: contact.heroTitle,
      heroSubtitle: contact.heroSubtitle,
      formIntro: contact.formIntro,
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setPending(true);
    setError(null);
    const result = await updateContactPage(values);
    setPending(false);
    if (result.success) {
      notifications.show({ title: "Saved", message: "Contact page updated.", color: "green", icon: <IconCheck size={18} /> });
    } else {
      setError(result.error ?? "Something went wrong.");
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="xl">
        {error && (
          <Alert icon={<IconAlertCircle size={18} />} color="red" radius="md">
            {error}
          </Alert>
        )}
        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Contact Page Copy
          </Title>
          <Stack gap="sm">
            <TextInput label="Hero title" {...form.getInputProps("heroTitle")} />
            <Textarea label="Hero subtitle" autosize minRows={2} {...form.getInputProps("heroSubtitle")} />
            <Textarea label="Form intro text" autosize minRows={2} {...form.getInputProps("formIntro")} />
          </Stack>
        </Card>
        <Group justify="flex-end">
          <Button type="submit" size="md" radius="sm" loading={pending}>
            Save Changes
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
