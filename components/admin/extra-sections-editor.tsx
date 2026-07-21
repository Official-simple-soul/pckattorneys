"use client";

import { useState } from "react";
import { ActionIcon, Box, Button, Card, Divider, Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import { ListEditor } from "./list-editor";
import { SortableList, SortableRow, arrayMove } from "./sortable-list";

export type ExtraSection = { title: string; body: string; points: string[] };
type Row = { id: string } & ExtraSection;

function makeId() {
  return Math.random().toString(36).slice(2);
}

export function ExtraSectionsEditor({
  value,
  onChange,
}: {
  value: ExtraSection[];
  onChange: (next: ExtraSection[]) => void;
}) {
  const [rows, setRows] = useState<Row[]>(() => value.map((v) => ({ id: makeId(), ...v })));

  function commit(next: Row[]) {
    setRows(next);
    onChange(next.map(({ id: _id, ...rest }) => rest));
  }

  function update(index: number, patch: Partial<ExtraSection>) {
    const copy = [...rows];
    copy[index] = { ...copy[index], ...patch };
    commit(copy);
  }

  function remove(index: number) {
    commit(rows.filter((_, i) => i !== index));
  }

  function add() {
    commit([...rows, { id: makeId(), title: "", body: "", points: [] }]);
  }

  function reorder(from: number, to: number) {
    commit(arrayMove(rows, from, to));
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
      <SortableList ids={rows.map((r) => r.id)} onReorder={reorder}>
        <Stack gap="md">
          {rows.map((section, i) => (
            <SortableRow key={section.id} id={section.id}>
              {({ attributes, listeners }) => (
                <Card padding="md" radius="sm" withBorder>
                  <Group justify="space-between" mb="xs" wrap="nowrap">
                    <Box
                      {...attributes}
                      {...listeners}
                      style={{ cursor: "grab", touchAction: "none", display: "flex", flexShrink: 0 }}
                    >
                      <IconGripVertical size={16} color="var(--mantine-color-gray-5)" />
                    </Box>
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
              )}
            </SortableRow>
          ))}
        </Stack>
      </SortableList>
      <Button variant="light" size="xs" leftSection={<IconPlus size={14} />} onClick={add} style={{ alignSelf: "flex-start" }}>
        Add section
      </Button>
    </Stack>
  );
}
