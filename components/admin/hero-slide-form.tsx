"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { Alert, Button, Card, Group, NumberInput, Stack, Switch, Textarea, TextInput, Title } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { createHeroSlide, deleteHeroSlide, updateHeroSlide } from "@/lib/actions/content";
import { ImageUploadField } from "./image-upload-field";

export type HeroSlideValues = {
  label: string;
  eyebrow: string;
  headline: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  order: number;
  published: boolean;
};

const LINK_PATTERN = /^(\/|#|https?:\/\/|mailto:|tel:)/;

export function HeroSlideForm({
  mode,
  id,
  initialValues,
}: {
  mode: "create" | "edit";
  id?: string;
  initialValues: HeroSlideValues;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues,
    validate: {
      label: (v) => (v.trim() ? null : "Give the slide a short label."),
      headline: (v) => (v.trim() ? null : "Add a headline."),
      body: (v) => (v.trim() ? null : "Add a short description."),
      imageAlt: (v, values) => (values.imageUrl && !v.trim() ? "Describe the image for screen readers." : null),
      ctaHref: (v, values) => {
        const href = v.trim();
        if (values.ctaLabel.trim() && !href) return "Add a link for the button.";
        if (href && !LINK_PATTERN.test(href)) return "Start with / for a page on this site, or https:// for another website.";
        return null;
      },
    },
  });

  async function handleSubmit(values: HeroSlideValues) {
    setPending(true);
    setError(null);
    const result = mode === "create" ? await createHeroSlide(values) : await updateHeroSlide(id!, values);
    setPending(false);
    if (result?.success === false) {
      setError(result.error ?? "Something went wrong.");
    } else if (mode === "edit") {
      notifications.show({ title: "Saved", message: "Slide updated.", color: "green", icon: <IconCheck size={18} /> });
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!id) return;
    if (!confirm(`Delete the "${initialValues.label}" slide?`)) return;
    await deleteHeroSlide(id);
    router.push("/admin/hero-slides");
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
            Text
          </Title>
          <Stack gap="sm">
            <TextInput
              label="Tab label"
              description="Short name shown under the hero, e.g. Energy or High-speed rail."
              required
              maxLength={24}
              {...form.getInputProps("label")}
            />
            <TextInput label="Eyebrow (small text above the headline)" {...form.getInputProps("eyebrow")} />
            <TextInput label="Headline" required {...form.getInputProps("headline")} />
            <Textarea label="Description" required autosize minRows={3} {...form.getInputProps("body")} />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Photo
          </Title>
          <Stack gap="sm">
            <ImageUploadField
              value={form.values.imageUrl}
              onChange={(url) => form.setFieldValue("imageUrl", url)}
              description="Landscape photos work best. Without a photo the slide shows the scales of justice drawing."
            />
            <TextInput
              label="Image description"
              description="What the photo shows, for visitors using screen readers."
              {...form.getInputProps("imageAlt")}
            />
          </Stack>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Button and display
          </Title>
          <Stack gap="sm">
            <Group grow align="flex-start">
              <TextInput label="Button text (optional)" {...form.getInputProps("ctaLabel")} />
              <TextInput
                label="Button link"
                placeholder="/practice-areas/energy-natural-resources"
                {...form.getInputProps("ctaHref")}
              />
            </Group>
            <Group grow align="flex-end">
              <NumberInput
                label="Position"
                description="Lower numbers show first. The firm's main slide is always first."
                min={0}
                allowDecimal={false}
                {...form.getInputProps("order")}
              />
              <Switch
                label="Show on the website"
                {...form.getInputProps("published", { type: "checkbox" })}
                mb={8}
              />
            </Group>
          </Stack>
        </Card>

        <Group justify="space-between">
          {mode === "edit" ? (
            <Button variant="subtle" color="red" leftSection={<IconTrash size={16} />} onClick={handleDelete}>
              Delete slide
            </Button>
          ) : (
            <span />
          )}
          <Button type="submit" size="md" radius="sm" loading={pending}>
            {mode === "create" ? "Add slide" : "Save changes"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
