"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { Alert, Button, Card, Group, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { updateHomePage } from "@/lib/actions/content";
import { ListEditor } from "./list-editor";
import { TitleBodyListEditor } from "./title-body-list-editor";
import type { HomePage } from "@prisma/client";

export function HomepageForm({
  home,
}: {
  home: HomePage & { trustBarItems: string[]; valuePropBody: string[]; whyChooseUsItems: { title: string; body: string }[] };
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      heroEyebrow: home.heroEyebrow,
      heroHeadline: home.heroHeadline,
      heroSubheadline: home.heroSubheadline,
      heroPrimaryCta: home.heroPrimaryCta,
      heroSecondaryCta: home.heroSecondaryCta,
      trustBarItems: home.trustBarItems,
      valuePropTitle: home.valuePropTitle,
      valuePropBody: home.valuePropBody,
      practiceOverviewTitle: home.practiceOverviewTitle,
      practiceOverviewCta: home.practiceOverviewCta,
      whyChooseUsTitle: home.whyChooseUsTitle,
      whyChooseUsIntro: home.whyChooseUsIntro,
      whyChooseUsItems: home.whyChooseUsItems,
      aboutPreviewTitle: home.aboutPreviewTitle,
      aboutPreviewBody: home.aboutPreviewBody,
      aboutPreviewCta: home.aboutPreviewCta,
      finalCtaTitle: home.finalCtaTitle,
      finalCtaBody: home.finalCtaBody,
      finalCtaPrimary: home.finalCtaPrimary,
      finalCtaSecondary: home.finalCtaSecondary,
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setPending(true);
    setError(null);
    const result = await updateHomePage(values);
    setPending(false);
    if (result.success) {
      notifications.show({ title: "Saved", message: "Homepage updated.", color: "green", icon: <IconCheck size={18} /> });
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
            Hero Section
          </Title>
          <Stack gap="sm">
            <TextInput label="Eyebrow text" {...form.getInputProps("heroEyebrow")} />
            <Textarea label="Headline" autosize minRows={2} {...form.getInputProps("heroHeadline")} />
            <Textarea label="Subheadline" autosize minRows={3} {...form.getInputProps("heroSubheadline")} />
            <Group grow>
              <TextInput label="Primary button label" {...form.getInputProps("heroPrimaryCta")} />
              <TextInput label="Secondary button label" {...form.getInputProps("heroSecondaryCta")} />
            </Group>
            <ListEditor label="Trust bar items" value={form.values.trustBarItems} onChange={(v) => form.setFieldValue("trustBarItems", v)} />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Value Proposition
          </Title>
          <Stack gap="sm">
            <TextInput label="Section title" {...form.getInputProps("valuePropTitle")} />
            <ListEditor label="Paragraphs" value={form.values.valuePropBody} onChange={(v) => form.setFieldValue("valuePropBody", v)} />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Practice Areas Overview
          </Title>
          <Stack gap="sm">
            <TextInput label="Section title" {...form.getInputProps("practiceOverviewTitle")} />
            <TextInput label="Button label" {...form.getInputProps("practiceOverviewCta")} />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Why Choose Us
          </Title>
          <Stack gap="sm">
            <TextInput label="Section title" {...form.getInputProps("whyChooseUsTitle")} />
            <Textarea label="Intro" autosize minRows={2} {...form.getInputProps("whyChooseUsIntro")} />
            <TitleBodyListEditor
              label="Reasons"
              value={form.values.whyChooseUsItems}
              onChange={(v) => form.setFieldValue("whyChooseUsItems", v)}
            />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            About Preview
          </Title>
          <Stack gap="sm">
            <TextInput label="Title" {...form.getInputProps("aboutPreviewTitle")} />
            <Textarea label="Body" autosize minRows={3} {...form.getInputProps("aboutPreviewBody")} />
            <TextInput label="Button label" {...form.getInputProps("aboutPreviewCta")} />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Final Call to Action
          </Title>
          <Stack gap="sm">
            <TextInput label="Title" {...form.getInputProps("finalCtaTitle")} />
            <Textarea label="Body" autosize minRows={3} {...form.getInputProps("finalCtaBody")} />
            <Group grow>
              <TextInput label="Primary button label" {...form.getInputProps("finalCtaPrimary")} />
              <TextInput label="Secondary button label" {...form.getInputProps("finalCtaSecondary")} />
            </Group>
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
