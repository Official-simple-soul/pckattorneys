"use client";

import { ActionIcon, Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";

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
  function updateItem(index: number, next: string) {
    const copy = [...value];
    copy[index] = next;
    onChange(copy);
  }

  function removeItem(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...value, ""]);
  }

  return (
    <Stack gap="xs">
      {label && (
        <Text size="sm" fw={500}>
          {label}
        </Text>
      )}
      {value.map((item, i) => (
        <Group key={i} gap="xs" wrap="nowrap">
          <IconGripVertical size={16} color="var(--mantine-color-gray-5)" style={{ flexShrink: 0 }} />
          <TextInput
            value={item}
            onChange={(e) => updateItem(i, e.currentTarget.value)}
            placeholder={placeholder}
            style={{ flex: 1 }}
          />
          <ActionIcon color="red" variant="subtle" onClick={() => removeItem(i)} aria-label="Remove">
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      ))}
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
