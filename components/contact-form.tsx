"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { Alert, Button, Group, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { submitContactForm } from "@/lib/actions/contact";

export function ContactForm({ practiceAreaOptions }: { practiceAreaOptions: string[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      practiceArea: "",
      message: "",
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? "Please enter your name" : null),
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Please enter a valid email address"),
      message: (value) => (value.trim().length < 10 ? "Please tell us a little more about your matter" : null),
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setPending(true);
    setServerError(null);
    try {
      const result = await submitContactForm(values);
      if (result.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setServerError(result.error ?? "Something went wrong. Please try again.");
        if (result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            form.setFieldError(field, message);
          }
        }
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <Alert icon={<IconCheck size={18} />} color="green" radius="sm" title="Request sent">
        Thank you for reaching out. A member of our team will respond promptly to arrange your
        consultation.
      </Alert>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        {serverError && (
          <Alert icon={<IconAlertCircle size={18} />} color="red" radius="md">
            {serverError}
          </Alert>
        )}
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <TextInput label="Full name" placeholder="Jane Doe" required {...form.getInputProps("name")} />
          <TextInput label="Email address" placeholder="jane@company.com" required {...form.getInputProps("email")} />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <TextInput label="Phone number" placeholder="+234..." {...form.getInputProps("phone")} />
          <TextInput label="Company / Organization" placeholder="Optional" {...form.getInputProps("company")} />
        </SimpleGrid>
        <Select
          label="Practice area of interest"
          placeholder="Select a practice area"
          data={practiceAreaOptions}
          clearable
          {...form.getInputProps("practiceArea")}
        />
        <Textarea
          label="Tell us about your matter"
          placeholder="Briefly describe what you need help with..."
          minRows={5}
          autosize
          required
          {...form.getInputProps("message")}
        />
        <Group justify="flex-end" mt="sm">
          <Button type="submit" size="md" loading={pending}>
            Send request
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
