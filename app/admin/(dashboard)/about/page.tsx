import { Container, Stack, Text, Title } from "@mantine/core";
import { getAboutPage } from "@/lib/content";
import { asStringArray, asTitleBodyArray } from "@/lib/types";
import { AboutForm } from "@/components/admin/about-form";

export default async function AdminAboutPage() {
  const about = await getAboutPage();

  const shaped = {
    ...about,
    philosophyQuestions: asStringArray(about.philosophyQuestions),
    approachItems: asTitleBodyArray(about.approachItems),
    whoWeServeItems: asTitleBodyArray(about.whoWeServeItems),
    globalPoints: asStringArray(about.globalPoints),
    standardPoints: asStringArray(about.standardPoints),
  };

  return (
    <Container size="md" py="md">
      <Stack gap={4} mb="xl">
        <Title order={2} ff="var(--mantine-heading-font-family)">
          About Page
        </Title>
        <Text c="dimmed">Edit the firm&apos;s story, mission, values, and approach.</Text>
      </Stack>
      <AboutForm about={shaped} />
    </Container>
  );
}
