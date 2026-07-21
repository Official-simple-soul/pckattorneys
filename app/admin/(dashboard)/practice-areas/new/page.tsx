import { Container, Stack, Text, Title } from "@mantine/core";
import { PracticeAreaForm } from "@/components/admin/practice-area-form";

export default function NewPracticeAreaPage() {
  return (
    <Container size="md" py="md">
      <Stack gap={4} mb="xl">
        <Title order={2} ff="var(--mantine-heading-font-family)">
          New Practice Area
        </Title>
        <Text c="dimmed">Create a new practice area page.</Text>
      </Stack>
      <PracticeAreaForm
        mode="create"
        initialValues={{
          slug: "",
          shortTitle: "",
          title: "",
          tagline: "",
          intro: "",
          servicesTitle: "Our Services",
          services: [],
          mattersTitle: "Representative Matters",
          matters: [],
          whyTitle: "Why Clients Choose Us",
          whyItems: [],
          extraSections: [],
          closingTitle: "Let's Talk About Your Matter",
          closingBody: "",
          ctaLabel: "Schedule a Confidential Consultation",
        }}
      />
    </Container>
  );
}
