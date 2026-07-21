"use client";

import { ActionIcon, Button, Card, Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export type TitleBodyItem = { title: string; body: string };

export function TitleBodyListEditor({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: TitleBodyItem[];
  onChange: (next: TitleBodyItem[]) => void;
}) {
  function update(index: number, patch: Partial<TitleBodyItem>) {
    const copy = [...value];
    copy[index] = { ...copy[index], ...patch };
    onChange(copy);
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...value, { title: "", body: "" }]);
  }

  return (
    <Stack gap="sm">
      {label && (
        <Text size="sm" fw={500}>
          {label}
        </Text>
      )}
      {value.map((item, i) => (
        <Card key={i} padding="sm" radius="sm" withBorder>
          <Group justify="space-between" mb="xs" wrap="nowrap">
            <TextInput
              value={item.title}
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
            value={item.body}
            onChange={(e) => update(i, { body: e.currentTarget.value })}
            placeholder="Description"
            autosize
            minRows={2}
            size="sm"
          />
        </Card>
      ))}
      <Button variant="light" size="xs" leftSection={<IconPlus size={14} />} onClick={add} style={{ alignSelf: "flex-start" }}>
        Add item
      </Button>
    </Stack>
  );
}
