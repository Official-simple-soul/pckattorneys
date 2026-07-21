"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  Alert,
  Box,
  Button,
  Card,
  ColorInput,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconCheck, IconAlertCircle, IconPhoto, IconUpload, IconX, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { updateSiteSettings } from "@/lib/actions/settings";
import { uploadImage } from "@/lib/actions/upload";
import { HEADING_FONT_OPTIONS, BODY_FONT_OPTIONS, RADIUS_OPTIONS } from "@/lib/font-options";
import type { SiteSettings } from "@prisma/client";

export function ThemeForm({ settings }: { settings: SiteSettings }) {
  const [pending, setPending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      firmName: settings.firmName,
      shortName: settings.shortName,
      tagline: settings.tagline,
      logoText: settings.logoText,
      logoUrl: settings.logoUrl,
      primaryColor: settings.primaryColor,
      secondaryColor: settings.secondaryColor,
      accentColor: settings.accentColor,
      neutralColor: settings.neutralColor,
      radius: settings.radius,
      headingFont: settings.headingFont,
      bodyFont: settings.bodyFont,
      phone: settings.phone,
      email: settings.email,
      address: settings.address,
      city: settings.city,
      country: settings.country,
      linkedinUrl: settings.linkedinUrl,
      twitterUrl: settings.twitterUrl,
      officeHours: settings.officeHours,
    },
  });

  async function handleLogoDrop(files: File[]) {
    const file = files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImage(formData);
    setUploading(false);
    if (result.success && result.url) {
      form.setFieldValue("logoUrl", result.url);
    } else {
      notifications.show({ title: "Upload failed", message: result.error ?? "Try again.", color: "red" });
    }
  }

  async function handleSubmit(values: typeof form.values) {
    setPending(true);
    setError(null);
    const result = await updateSiteSettings(values);
    setPending(false);
    if (result.success) {
      notifications.show({
        title: "Saved",
        message: "Theme and site settings updated across the whole site.",
        color: "green",
        icon: <IconCheck size={18} />,
      });
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
          <Title order={4} mb="xs">
            Colors
          </Title>
          <Text size="sm" c="dimmed" mb="md">
            Pick your brand colors. These generate full color shades automatically and apply
            everywhere on the site instantly &mdash; buttons, links, backgrounds, and more.
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <ColorInput label="Primary color" description="Main brand color" {...form.getInputProps("primaryColor")} />
            <ColorInput label="Secondary / accent color" description="Used for highlights & CTAs" {...form.getInputProps("secondaryColor")} />
            <ColorInput label="Dark / ink color" description="Used for dark sections & footer" {...form.getInputProps("accentColor")} />
            <ColorInput label="Neutral background" description="Light background tint" {...form.getInputProps("neutralColor")} />
          </SimpleGrid>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="xs">
            Typography
          </Title>
          <Text size="sm" c="dimmed" mb="md">
            Choose fonts for headings and body text from our curated, professional selection.
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <Select label="Heading font" data={HEADING_FONT_OPTIONS} {...form.getInputProps("headingFont")} />
            <Select label="Body font" data={BODY_FONT_OPTIONS} {...form.getInputProps("bodyFont")} />
          </SimpleGrid>
          <Select label="Corner roundness" data={RADIUS_OPTIONS} mt="md" maw={300} {...form.getInputProps("radius")} />
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="xs">
            Logo
          </Title>
          <Text size="sm" c="dimmed" mb="md">
            Upload an image logo to replace the text-initials badge shown in the header. Remove it
            to fall back to the initials below.
          </Text>
          <Group align="flex-start" gap="lg">
            <Box
              style={{
                position: "relative",
                width: 72,
                height: 72,
                borderRadius: "var(--mantine-radius-sm)",
                overflow: "hidden",
                background: form.values.logoUrl
                  ? "var(--mantine-color-gray-1)"
                  : "linear-gradient(135deg, var(--mantine-color-brand-7), var(--mantine-color-brand-9))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {form.values.logoUrl ? (
                <Image src={form.values.logoUrl} alt="Logo" fill style={{ objectFit: "contain" }} />
              ) : (
                <Text c="white" fw={700} size="sm">
                  {form.values.logoText}
                </Text>
              )}
            </Box>
            <Box style={{ flex: 1, minWidth: 240 }}>
              <Dropzone
                onDrop={handleLogoDrop}
                accept={IMAGE_MIME_TYPE}
                maxSize={5 * 1024 * 1024}
                loading={uploading}
                radius="md"
              >
                <Group justify="center" gap="md" style={{ minHeight: 80, pointerEvents: "none" }}>
                  <Dropzone.Accept>
                    <IconUpload size={24} color="var(--mantine-color-brand-6)" />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={24} color="var(--mantine-color-red-6)" />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto size={24} color="var(--mantine-color-gray-5)" />
                  </Dropzone.Idle>
                  <Stack gap={0}>
                    <Text size="sm">Drag a logo here, or click to select</Text>
                    <Text size="xs" c="dimmed">
                      PNG or SVG with a transparent background works best
                    </Text>
                  </Stack>
                </Group>
              </Dropzone>
              {form.values.logoUrl && (
                <Button
                  variant="subtle"
                  color="red"
                  size="xs"
                  mt="xs"
                  leftSection={<IconTrash size={14} />}
                  onClick={() => form.setFieldValue("logoUrl", "")}
                >
                  Remove logo
                </Button>
              )}
            </Box>
          </Group>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="xs">
            Firm Identity
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput label="Firm name" {...form.getInputProps("firmName")} />
            <TextInput label="Short name" {...form.getInputProps("shortName")} />
            <TextInput label="Logo initials" description="Used when no logo image is set" maxLength={4} {...form.getInputProps("logoText")} />
            <TextInput label="Tagline" {...form.getInputProps("tagline")} />
          </SimpleGrid>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="xs">
            Contact Details
          </Title>
          <Text size="sm" c="dimmed" mb="md">
            Shown in the site footer and contact page.
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput label="Phone" {...form.getInputProps("phone")} />
            <TextInput label="Email" {...form.getInputProps("email")} />
            <TextInput label="Address" {...form.getInputProps("address")} />
            <TextInput label="City" {...form.getInputProps("city")} />
            <TextInput label="Country" {...form.getInputProps("country")} />
            <TextInput label="Office hours" {...form.getInputProps("officeHours")} />
            <TextInput label="LinkedIn URL" placeholder="Optional" {...form.getInputProps("linkedinUrl")} />
            <TextInput label="Twitter / X URL" placeholder="Optional" {...form.getInputProps("twitterUrl")} />
          </SimpleGrid>
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
