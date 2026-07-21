"use client";

import { useState } from "react";
import { ActionIcon, Box, Button, Card, Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import { SortableList, SortableRow, arrayMove } from "./sortable-list";

export type TitleBodyItem = { title: string; body: string };
type Row = { id: string } & TitleBodyItem;

function makeId() {
  return Math.random().toString(36).slice(2);
}

export function TitleBodyListEditor({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: TitleBodyItem[];
  onChange: (next: TitleBodyItem[]) => void;
}) {
  const [rows, setRows] = useState<Row[]>(() => value.map((v) => ({ id: makeId(), ...v })));

  function commit(next: Row[]) {
    setRows(next);
    onChange(next.map(({ id: _id, ...rest }) => rest));
  }

  function update(index: number, patch: Partial<TitleBodyItem>) {
    const copy = [...rows];
    copy[index] = { ...copy[index], ...patch };
    commit(copy);
  }

  function remove(index: number) {
    commit(rows.filter((_, i) => i !== index));
  }

  function add() {
    commit([...rows, { id: makeId(), title: "", body: "" }]);
  }

  function reorder(from: number, to: number) {
    commit(arrayMove(rows, from, to));
  }

  return (
    <Stack gap="sm">
      {label && (
        <Text size="sm" fw={500}>
          {label}
        </Text>
      )}
      <SortableList ids={rows.map((r) => r.id)} onReorder={reorder}>
        <Stack gap="sm">
          {rows.map((row, i) => (
            <SortableRow key={row.id} id={row.id}>
              {({ attributes, listeners }) => (
                <Card padding="sm" radius="sm" withBorder>
                  <Group justify="space-between" mb="xs" wrap="nowrap">
                    <Box
                      {...attributes}
                      {...listeners}
                      style={{ cursor: "grab", touchAction: "none", display: "flex", flexShrink: 0 }}
                    >
                      <IconGripVertical size={16} color="var(--mantine-color-gray-5)" />
                    </Box>
                    <TextInput
                      value={row.title}
                      onChange={(e) => update(i, { title: e.currentTarget.value })}
                      placeholder="Title"
                      style={{ flex: 1 }}
                      size="sm"
                    />
                    <ActionIcon color="red" variant="subtle" onClick={() => remove(i)} aria-label="Remove">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                  <Textarea
                    value={row.body}
                    onChange={(e) => update(i, { body: e.currentTarget.value })}
                    placeholder="Description"
                    autosize
                    minRows={2}
                    size="sm"
                  />
                </Card>
              )}
            </SortableRow>
          ))}
        </Stack>
      </SortableList>
      <Button variant="light" size="xs" leftSection={<IconPlus size={14} />} onClick={add} style={{ alignSelf: "flex-start" }}>
        Add item
      </Button>
    </Stack>
  );
}
