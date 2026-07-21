"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { Alert, Button, Card, Group, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { createPracticeArea, updatePracticeArea, deletePracticeArea } from "@/lib/actions/content";
import { ListEditor } from "./list-editor";
import { TitleBodyListEditor } from "./title-body-list-editor";
import { ExtraSectionsEditor } from "./extra-sections-editor";

type PracticeAreaValues = {
  slug: string;
  shortTitle: string;
  title: string;
  tagline: string;
  intro: string;
  servicesTitle: string;
  services: string[];
  mattersTitle: string;
  matters: string[];
  whyTitle: string;
  whyItems: { title: string; body: string }[];
  extraSections: { title: string; body: string; points: string[] }[];
  closingTitle: string;
  closingBody: string;
  ctaLabel: string;
};

export function PracticeAreaForm({
  mode,
  id,
  initialValues,
}: {
  mode: "create" | "edit";
  id?: string;
  initialValues: PracticeAreaValues;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({ initialValues });

  async function handleSubmit(values: typeof form.values) {
    setPending(true);
    setError(null);
    const result =
      mode === "create" ? await createPracticeArea(values) : await updatePracticeArea(id!, values);
    setPending(false);
    if (result?.success === false) {
      setError(result.error ?? "Something went wrong.");
    } else if (mode === "edit") {
      notifications.show({ title: "Saved", message: "Practice area updated.", color: "green", icon: <IconCheck size={18} /> });
    }
  }

  async function handleDelete() {
    if (!id) return;
    if (!confirm(`Delete "${initialValues.title}"? This cannot be undone.`)) return;
    await deletePracticeArea(id);
    router.push("/admin/practice-areas");
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
            Basics
          </Title>
          <Stack gap="sm">
            <Group grow>
              <TextInput label="Full title" required {...form.getInputProps("title")} />
              <TextInput label="Short title (nav/cards)" required {...form.getInputProps("shortTitle")} />
            </Group>
            <TextInput
              label="URL slug"
              description="Lowercase letters, numbers, and hyphens only"
              required
              {...form.getInputProps("slug")}
            />
            <Textarea label="Tagline" autosize minRows={1} {...form.getInputProps("tagline")} />
            <Textarea label="Intro (blank line = new paragraph)" autosize minRows={4} {...form.getInputProps("intro")} />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Services
          </Title>
          <Stack gap="sm">
            <TextInput label="Section title" {...form.getInputProps("servicesTitle")} />
            <ListEditor value={form.values.services} onChange={(v) => form.setFieldValue("services", v)} placeholder="Service" />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Representative Matters
          </Title>
          <Stack gap="sm">
            <TextInput label="Section title" {...form.getInputProps("mattersTitle")} />
            <ListEditor value={form.values.matters} onChange={(v) => form.setFieldValue("matters", v)} placeholder="Matter" />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Why Choose Us
          </Title>
          <Stack gap="sm">
            <TextInput label="Section title" {...form.getInputProps("whyTitle")} />
            <TitleBodyListEditor value={form.values.whyItems} onChange={(v) => form.setFieldValue("whyItems", v)} />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <ExtraSectionsEditor value={form.values.extraSections} onChange={(v) => form.setFieldValue("extraSections", v)} />
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Closing
          </Title>
          <Stack gap="sm">
            <TextInput label="Closing title" {...form.getInputProps("closingTitle")} />
            <Textarea label="Closing body" autosize minRows={2} {...form.getInputProps("closingBody")} />
            <TextInput label="Call-to-action button label" {...form.getInputProps("ctaLabel")} />
          </Stack>
        </Card>

        <Group justify="space-between">
          {mode === "edit" ? (
            <Button variant="subtle" color="red" leftSection={<IconTrash size={16} />} onClick={handleDelete}>
              Delete Practice Area
            </Button>
          ) : (
            <span />
          )}
          <Button type="submit" size="md" radius="sm" loading={pending}>
            {mode === "create" ? "Create Practice Area" : "Save Changes"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
