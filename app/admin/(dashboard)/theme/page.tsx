import { Container, Stack, Text, Title } from "@mantine/core";
import { getSiteSettings } from "@/lib/content";
import { ThemeForm } from "@/components/admin/theme-form";

export default async function AdminThemePage() {
  const settings = await getSiteSettings();

  return (
    <Container size="md" py="md">
      <Stack gap={4} mb="xl">
        <Title order={2} ff="var(--mantine-heading-font-family)">
          Theme & Branding
        </Title>
        <Text c="dimmed">
          Change colors, fonts, and firm identity. Updates apply across the entire site immediately.
        </Text>
      </Stack>
      <ThemeForm settings={settings} />
    </Container>
  );
}
