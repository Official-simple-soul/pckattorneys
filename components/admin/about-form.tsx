"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { Alert, Button, Card, Group, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { updateAboutPage } from "@/lib/actions/content";
import { ListEditor } from "./list-editor";
import { TitleBodyListEditor } from "./title-body-list-editor";
import type { AboutPage } from "@prisma/client";

type ShapedAbout = AboutPage & {
  philosophyQuestions: string[];
  approachItems: { title: string; body: string }[];
  whoWeServeItems: { title: string; body: string }[];
  globalPoints: string[];
  standardPoints: string[];
};

export function AboutForm({ about }: { about: ShapedAbout }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      heroTitle: about.heroTitle,
      heroSubtitle: about.heroSubtitle,
      intro: about.intro,
      storyTitle: about.storyTitle,
      storyBody: about.storyBody,
      missionText: about.missionText,
      visionText: about.visionText,
      philosophyTitle: about.philosophyTitle,
      philosophyBody: about.philosophyBody,
      philosophyQuestions: about.philosophyQuestions,
      approachItems: about.approachItems,
      whoWeServeItems: about.whoWeServeItems,
      globalTitle: about.globalTitle,
      globalBody: about.globalBody,
      globalPoints: about.globalPoints,
      standardTitle: about.standardTitle,
      standardIntro: about.standardIntro,
      standardPoints: about.standardPoints,
      closingBody: about.closingBody,
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setPending(true);
    setError(null);
    const result = await updateAboutPage(values);
    setPending(false);
    if (result.success) {
      notifications.show({ title: "Saved", message: "About page updated.", color: "green", icon: <IconCheck size={18} /> });
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
            Hero &amp; Introduction
          </Title>
          <Stack gap="sm">
            <TextInput label="Hero subtitle" {...form.getInputProps("heroSubtitle")} />
            <Textarea
              label="Intro paragraphs (separate paragraphs with a blank line)"
              autosize
              minRows={5}
              {...form.getInputProps("intro")}
            />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Our Story
          </Title>
          <Stack gap="sm">
            <TextInput label="Section title" {...form.getInputProps("storyTitle")} />
            <Textarea label="Story (blank line = new paragraph)" autosize minRows={5} {...form.getInputProps("storyBody")} />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Mission &amp; Vision
          </Title>
          <Stack gap="sm">
            <Textarea label="Mission" autosize minRows={2} {...form.getInputProps("missionText")} />
            <Textarea label="Vision" autosize minRows={2} {...form.getInputProps("visionText")} />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Philosophy
          </Title>
          <Stack gap="sm">
            <TextInput label="Title" {...form.getInputProps("philosophyTitle")} />
            <Textarea label="Body (blank line = new paragraph)" autosize minRows={3} {...form.getInputProps("philosophyBody")} />
            <ListEditor
              label="Guiding questions"
              value={form.values.philosophyQuestions}
              onChange={(v) => form.setFieldValue("philosophyQuestions", v)}
            />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Our Approach
          </Title>
          <TitleBodyListEditor value={form.values.approachItems} onChange={(v) => form.setFieldValue("approachItems", v)} />
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Who We Serve
          </Title>
          <TitleBodyListEditor value={form.values.whoWeServeItems} onChange={(v) => form.setFieldValue("whoWeServeItems", v)} />
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Global Perspective
          </Title>
          <Stack gap="sm">
            <TextInput label="Title" {...form.getInputProps("globalTitle")} />
            <Textarea label="Body" autosize minRows={2} {...form.getInputProps("globalBody")} />
            <ListEditor label="Strength points" value={form.values.globalPoints} onChange={(v) => form.setFieldValue("globalPoints", v)} />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            The Standard We Hold Ourselves To
          </Title>
          <Stack gap="sm">
            <TextInput label="Title" {...form.getInputProps("standardTitle")} />
            <Textarea label="Intro" autosize minRows={2} {...form.getInputProps("standardIntro")} />
            <ListEditor label="Commitments" value={form.values.standardPoints} onChange={(v) => form.setFieldValue("standardPoints", v)} />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Closing
          </Title>
          <Textarea label="Closing statement" autosize minRows={2} {...form.getInputProps("closingBody")} />
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
