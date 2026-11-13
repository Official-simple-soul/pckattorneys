import { Group, Stack, Text, Title } from "@mantine/core";
import type { ReactNode } from "react";
import { PorticoArt } from "@/components/legal-art";

/** Closing call to action with the courthouse drawing standing on the footer. */
export function ClosingCta({ title, body, children }: { title?: string; body: string; children: ReactNode }) {
  return (
    <section className="closing-cta">
      <div className="section-container">
        <Stack align="center" ta="center" gap="lg" maw={720} mx="auto">
          {title && (
            <Title order={2} fz={{ base: 30, md: 42 }} ff="var(--mantine-heading-font-family)" c="brand.9" lh={1.18}>
              {title}
            </Title>
          )}
          <Text c="dark.5" fz="lg" lh={1.65}>
            {body}
          </Text>
          <Group gap="md" justify="center" mt="xs">
            {children}
          </Group>
        </Stack>
        <PorticoArt className="closing-portico" background="var(--pck-tint)" />
      </div>
    </section>
  );
}
