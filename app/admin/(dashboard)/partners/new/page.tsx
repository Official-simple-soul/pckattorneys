import { Container, Stack, Text, Title } from "@mantine/core";
import { PartnerForm } from "@/components/admin/partner-form";

export default function NewPartnerPage() {
  return (
    <Container size="md" py="md">
      <Stack gap={4} mb="xl">
        <Title order={2} ff="var(--mantine-heading-font-family)">
          Add Partner
        </Title>
        <Text c="dimmed">Add a new partner profile to the Partners page.</Text>
      </Stack>
      <PartnerForm
        mode="create"
        initialValues={{
          name: "",
          credentials: "Esq.",
          title: "",
          photoUrl: "",
          quote: "",
          bio: "",
          practiceFocus: [],
        }}
      />
    </Container>
  );
}
