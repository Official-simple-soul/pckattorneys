"use client";

import { ActionIcon, Button, Card, Divider, Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { ListEditor } from "./list-editor";

export type ExtraSection = { title: string; body: string; points: string[] };

export function ExtraSectionsEditor({
  value,
  onChange,
}: {
  value: ExtraSection[];
  onChange: (next: ExtraSection[]) => void;
}) {
  function update(index: number, patch: Partial<ExtraSection>) {
    const copy = [...value];
    copy[index] = { ...copy[index], ...patch };
    onChange(copy);
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...value, { title: "", body: "", points: [] }]);
  }

  return (
    <Stack gap="md">
      <Text size="sm" fw={500}>
        Additional Sections
      </Text>
      <Text size="xs" c="dimmed" mt={-8}>
        Optional narrative blocks (e.g. &quot;ESG Considerations&quot;, &quot;Cross-Border Perspective&quot;) with an
        optional bullet list.
      </Text>
      {value.map((section, i) => (
        <Card key={i} padding="md" radius="sm" withBorder>
          <Group justify="space-between" mb="xs" wrap="nowrap">
            <TextInput
              value={section.title}
              onChange={(e) => update(i, { title: e.currentTarget.value })}
              placeholder="Section title"
              style={{ flex: 1 }}
              fw={600}
            />
            <ActionIcon color="red" variant="subtle" onClick={() => remove(i)} aria-label="Remove section">
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
          <Textarea
            value={section.body}
            onChange={(e) => update(i, { body: e.currentTarget.value })}
            placeholder="Section body text"
            autosize
            minRows={2}
            mb="sm"
          />
          <Divider mb="sm" label="Bullet points (optional)" labelPosition="left" />
          <ListEditor value={section.points} onChange={(points) => update(i, { points })} placeholder="Bullet point" />
        </Card>
      ))}
      <Button variant="light" size="xs" leftSection={<IconPlus size={14} />} onClick={add} style={{ alignSelf: "flex-start" }}>
        Add section
      </Button>
    </Stack>
  );
}
