import { notFound } from "next/navigation";
import { Container, Stack, Text, Title } from "@mantine/core";
import { prisma } from "@/lib/db";
import { HeroSlideForm } from "@/components/admin/hero-slide-form";

export default async function EditHeroSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slide = await prisma.heroSlide.findUnique({ where: { id } });
  if (!slide) notFound();

  return (
    <Container size="md" py="md">
      <Stack gap={4} mb="xl">
        <Title order={2} ff="var(--mantine-heading-font-family)">
          Edit Slide
        </Title>
        <Text c="dimmed">{slide.label}</Text>
      </Stack>
      <HeroSlideForm
        mode="edit"
        id={slide.id}
        initialValues={{
          label: slide.label,
          eyebrow: slide.eyebrow,
          headline: slide.headline,
          body: slide.body,
          imageUrl: slide.imageUrl,
          imageAlt: slide.imageAlt,
          ctaLabel: slide.ctaLabel,
          ctaHref: slide.ctaHref,
          order: slide.order,
          published: slide.published,
        }}
      />
    </Container>
  );
}
