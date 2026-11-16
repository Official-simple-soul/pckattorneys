import { Container, Stack, Text, Title } from "@mantine/core";
import { prisma } from "@/lib/db";
import { HeroSlideForm } from "@/components/admin/hero-slide-form";

export default async function NewHeroSlidePage() {
  const last = await prisma.heroSlide.findFirst({ orderBy: { order: "desc" } });

  return (
    <Container size="md" py="md">
      <Stack gap={4} mb="xl">
        <Title order={2} ff="var(--mantine-heading-font-family)">
          Add Slide
        </Title>
        <Text c="dimmed">Add a slide to the homepage banner.</Text>
      </Stack>
      <HeroSlideForm
        mode="create"
        initialValues={{
          label: "",
          eyebrow: "",
          headline: "",
          body: "",
          imageUrl: "",
          imageAlt: "",
          ctaLabel: "",
          ctaHref: "",
          order: (last?.order ?? 0) + 1,
          published: true,
        }}
      />
    </Container>
  );
}
