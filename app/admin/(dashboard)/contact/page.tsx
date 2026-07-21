import { Container, Stack, Text, Title } from "@mantine/core";
import { getContactPage } from "@/lib/content";
import { ContactPageForm } from "@/components/admin/contact-page-form";

export default async function AdminContactPage() {
  const contact = await getContactPage();

  return (
    <Container size="md" py="md">
      <Stack gap={4} mb="xl">
        <Title order={2} ff="var(--mantine-heading-font-family)">
          Contact Page
        </Title>
        <Text c="dimmed">
          Edit the contact page copy. Office address, phone, and email are managed under{" "}
          <strong>Theme &amp; Branding</strong>.
        </Text>
      </Stack>
      <ContactPageForm contact={contact} />
    </Container>
  );
}
