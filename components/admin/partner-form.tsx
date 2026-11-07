"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { isEmail, useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Alert, Box, Button, Card, Group, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconPhoto, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { createPartner, updatePartner, deletePartner } from "@/lib/actions/content";
import { uploadImage } from "@/lib/actions/upload";
import { ListEditor } from "./list-editor";

type PartnerValues = {
  name: string;
  credentials: string;
  title: string;
  photoUrl: string;
  email: string;
  phone: string;
  quote: string;
  bio: string;
  practiceFocus: string[];
};

export function PartnerForm({
  mode,
  id,
  initialValues,
}: {
  mode: "create" | "edit";
  id?: string;
  initialValues: PartnerValues;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues,
    validate: {
      email: (value) => (value.trim() ? isEmail("Enter a valid email address.")(value.trim()) : null),
    },
    transformValues: (values) => ({ ...values, email: values.email.trim(), phone: values.phone.trim() }),
  });

  async function handleDrop(files: File[]) {
    const file = files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImage(formData);
    setUploading(false);
    if (result.success && result.url) {
      form.setFieldValue("photoUrl", result.url);
    } else {
      notifications.show({ title: "Upload failed", message: result.error ?? "Try again.", color: "red" });
    }
  }

  async function handleSubmit(values: PartnerValues) {
    setPending(true);
    setError(null);
    const result = mode === "create" ? await createPartner(values) : await updatePartner(id!, values);
    setPending(false);
    if (result?.success === false) {
      setError(result.error ?? "Something went wrong.");
    } else if (mode === "edit") {
      notifications.show({ title: "Saved", message: "Partner updated.", color: "green", icon: <IconCheck size={18} /> });
    }
  }

  async function handleDelete() {
    if (!id) return;
    if (!confirm(`Remove ${initialValues.name} from the site?`)) return;
    await deletePartner(id);
    router.push("/admin/partners");
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
            Photo
          </Title>
          <Group align="flex-start" gap="lg">
            {form.values.photoUrl && (
              <Box style={{ position: "relative", width: 120, height: 120, borderRadius: "var(--mantine-radius-md)", overflow: "hidden" }}>
                <Image src={form.values.photoUrl} alt="Partner photo" fill style={{ objectFit: "cover" }} />
              </Box>
            )}
            <Box style={{ flex: 1 }}>
              <Dropzone onDrop={handleDrop} accept={IMAGE_MIME_TYPE} maxSize={5 * 1024 * 1024} loading={uploading} radius="md">
                <Group justify="center" gap="md" style={{ minHeight: 100, pointerEvents: "none" }}>
                  <Dropzone.Accept>
                    <IconUpload size={28} color="var(--mantine-color-brand-6)" />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={28} color="var(--mantine-color-red-6)" />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto size={28} color="var(--mantine-color-gray-5)" />
                  </Dropzone.Idle>
                  <Stack gap={0}>
                    <Text size="sm">Drag a photo here, or click to select</Text>
                    <Text size="xs" c="dimmed">
                      JPEG, PNG, or WEBP, up to 5MB
                    </Text>
                  </Stack>
                </Group>
              </Dropzone>
            </Box>
          </Group>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Profile
          </Title>
          <Stack gap="sm">
            <Group grow>
              <TextInput label="Full name" required {...form.getInputProps("name")} />
              <TextInput label="Credentials (e.g. Esq.)" {...form.getInputProps("credentials")} />
            </Group>
            <TextInput label="Title" required placeholder="Managing Partner" {...form.getInputProps("title")} />
            <Group grow align="flex-start">
              <TextInput
                label="Email (shown publicly)"
                type="email"
                placeholder="name@pckattorneys.com"
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Phone (shown publicly)"
                type="tel"
                placeholder="+234 800 000 0000"
                {...form.getInputProps("phone")}
              />
            </Group>
            <Textarea label="Quote (optional)" autosize minRows={2} {...form.getInputProps("quote")} />
            <Textarea label="Biography (blank line = new paragraph)" autosize minRows={6} {...form.getInputProps("bio")} />
            <ListEditor
              label="Practice focus areas"
              value={form.values.practiceFocus}
              onChange={(v) => form.setFieldValue("practiceFocus", v)}
              placeholder="e.g. Corporate & Commercial Law"
            />
          </Stack>
        </Card>

        <Group justify="space-between">
          {mode === "edit" ? (
            <Button variant="subtle" color="red" leftSection={<IconTrash size={16} />} onClick={handleDelete}>
              Remove Partner
            </Button>
          ) : (
            <span />
          )}
          <Button type="submit" size="md" radius="sm" loading={pending}>
            {mode === "create" ? "Add Partner" : "Save Changes"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
