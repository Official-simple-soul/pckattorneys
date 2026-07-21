import { Container, Stack, Text, Title } from "@mantine/core";
import { getHomePage } from "@/lib/content";
import { asStringArray, asTitleBodyArray } from "@/lib/types";
import { HomepageForm } from "@/components/admin/homepage-form";

export default async function AdminHomepagePage() {
  const home = await getHomePage();

  const shaped = {
    ...home,
    trustBarItems: asStringArray(home.trustBarItems),
    valuePropBody: asStringArray(home.valuePropBody),
    whyChooseUsItems: asTitleBodyArray(home.whyChooseUsItems),
  };

  return (
    <Container size="md" py="md">
      <Stack gap={4} mb="xl">
        <Title order={2} ff="var(--mantine-heading-font-family)">
          Homepage
        </Title>
        <Text c="dimmed">Edit every section of the homepage.</Text>
      </Stack>
      <HomepageForm home={shaped} />
    </Container>
  );
}
