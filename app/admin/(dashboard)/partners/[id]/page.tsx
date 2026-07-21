import { notFound } from "next/navigation";
import { Container, Stack, Text, Title } from "@mantine/core";
import { prisma } from "@/lib/db";
import { asStringArray } from "@/lib/types";
import { PartnerForm } from "@/components/admin/partner-form";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) notFound();

  return (
    <Container size="md" py="md">
      <Stack gap={4} mb="xl">
        <Title order={2} ff="var(--mantine-heading-font-family)">
          Edit Partner
        </Title>
        <Text c="dimmed">{partner.name}</Text>
      </Stack>
      <PartnerForm
        mode="edit"
        id={partner.id}
        initialValues={{
          name: partner.name,
          credentials: partner.credentials,
          title: partner.title,
          photoUrl: partner.photoUrl,
          quote: partner.quote,
          bio: partner.bio,
          practiceFocus: asStringArray(partner.practiceFocus),
        }}
      />
    </Container>
  );
}
