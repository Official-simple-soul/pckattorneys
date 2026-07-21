"use client";

import { useState } from "react";
import { ActionIcon, Box, Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import { SortableList, SortableRow, arrayMove } from "./sortable-list";

type Row = { id: string; value: string };

function makeId() {
  return Math.random().toString(36).slice(2);
}

export function ListEditor({
  label,
  value,
  onChange,
  placeholder,
}: {
  label?: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [rows, setRows] = useState<Row[]>(() => value.map((v) => ({ id: makeId(), value: v })));

  function commit(next: Row[]) {
    setRows(next);
    onChange(next.map((r) => r.value));
  }

  function updateItem(index: number, next: string) {
    const copy = [...rows];
    copy[index] = { ...copy[index], value: next };
    commit(copy);
  }

  function removeItem(index: number) {
    commit(rows.filter((_, i) => i !== index));
  }

  function addItem() {
    commit([...rows, { id: makeId(), value: "" }]);
  }

  function reorder(from: number, to: number) {
    commit(arrayMove(rows, from, to));
  }

  return (
    <Stack gap="xs">
      {label && (
        <Text size="sm" fw={500}>
          {label}
        </Text>
      )}
      <SortableList ids={rows.map((r) => r.id)} onReorder={reorder}>
        <Stack gap="xs">
          {rows.map((row, i) => (
            <SortableRow key={row.id} id={row.id}>
              {({ attributes, listeners }) => (
                <Group gap="xs" wrap="nowrap">
                  <Box
                    {...attributes}
                    {...listeners}
                    style={{ cursor: "grab", touchAction: "none", display: "flex", flexShrink: 0 }}
                  >
                    <IconGripVertical size={16} color="var(--mantine-color-gray-5)" />
                  </Box>
                  <TextInput
                    value={row.value}
                    onChange={(e) => updateItem(i, e.currentTarget.value)}
                    placeholder={placeholder}
                    style={{ flex: 1 }}
                  />
                  <ActionIcon color="red" variant="subtle" onClick={() => removeItem(i)} aria-label="Remove">
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              )}
            </SortableRow>
          ))}
        </Stack>
      </SortableList>
      <Button
        variant="light"
        size="xs"
        leftSection={<IconPlus size={14} />}
        onClick={addItem}
        style={{ alignSelf: "flex-start" }}
      >
        Add item
      </Button>
    </Stack>
  );
}
