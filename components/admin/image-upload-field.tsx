"use client";

import { useState } from "react";
import Image from "next/image";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { IconPhoto, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { uploadImage } from "@/lib/actions/upload";

export function ImageUploadField({
  label,
  description,
  value,
  onChange,
  aspectRatio = "16 / 10",
  previewWidth = 160,
}: {
  label?: string;
  description?: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: string;
  previewWidth?: number;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleDrop(files: File[]) {
    const file = files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImage(formData);
    setUploading(false);
    if (result.success && result.url) {
      onChange(result.url);
    } else {
      notifications.show({ title: "Upload failed", message: result.error ?? "Try again.", color: "red" });
    }
  }

  return (
    <Stack gap="xs">
      {label && (
        <Text size="sm" fw={500}>
          {label}
        </Text>
      )}
      {description && (
        <Text size="xs" c="dimmed" mt={-4}>
          {description}
        </Text>
      )}
      <Group align="flex-start" gap="lg">
        {value && (
          <Box
            style={{
              position: "relative",
              width: previewWidth,
              aspectRatio,
              borderRadius: "var(--mantine-radius-sm)",
              overflow: "hidden",
              flexShrink: 0,
              backgroundColor: "var(--mantine-color-gray-1)",
            }}
          >
            <Image src={value} alt={label ?? "Preview"} fill style={{ objectFit: "cover" }} />
          </Box>
        )}
        <Box style={{ flex: 1, minWidth: 240 }}>
          <Dropzone onDrop={handleDrop} accept={IMAGE_MIME_TYPE} maxSize={5 * 1024 * 1024} loading={uploading} radius="md">
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
                <Text size="sm">Drag an image here, or click to select</Text>
                <Text size="xs" c="dimmed">
                  JPEG, PNG, or WEBP, up to 5MB
                </Text>
              </Stack>
            </Group>
          </Dropzone>
          {value && (
            <Button
              variant="subtle"
              color="red"
              size="xs"
              mt="xs"
              leftSection={<IconTrash size={14} />}
              onClick={() => onChange("")}
            >
              Remove image
            </Button>
          )}
        </Box>
      </Group>
    </Stack>
  );
}
