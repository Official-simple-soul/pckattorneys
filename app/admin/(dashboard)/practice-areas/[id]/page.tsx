import { notFound } from "next/navigation";
import { Container, Stack, Text, Title } from "@mantine/core";
import { prisma } from "@/lib/db";
import { asExtraSections, asStringArray, asTitleBodyArray } from "@/lib/types";
import { PracticeAreaForm } from "@/components/admin/practice-area-form";

export default async function EditPracticeAreaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const area = await prisma.practiceArea.findUnique({ where: { id } });
  if (!area) notFound();

  return (
    <Container size="md" py="md">
      <Stack gap={4} mb="xl">
        <Title order={2} ff="var(--mantine-heading-font-family)">
          Edit Practice Area
        </Title>
        <Text c="dimmed">/practice-areas/{area.slug}</Text>
      </Stack>
      <PracticeAreaForm
        mode="edit"
        id={area.id}
        initialValues={{
          slug: area.slug,
          shortTitle: area.shortTitle,
          title: area.title,
          tagline: area.tagline,
          intro: area.intro,
          servicesTitle: area.servicesTitle,
          services: asStringArray(area.services),
          mattersTitle: area.mattersTitle,
          matters: asStringArray(area.matters),
          whyTitle: area.whyTitle,
          whyItems: asTitleBodyArray(area.whyItems),
          extraSections: asExtraSections(area.extraSections),
          closingTitle: area.closingTitle,
          closingBody: area.closingBody,
          ctaLabel: area.ctaLabel,
        }}
      />
    </Container>
  );
}
