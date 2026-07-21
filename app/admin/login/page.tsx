"use client";

import { useActionState } from "react";
import { Alert, Box, Button, Center, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { loginAction, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, var(--mantine-color-ink-9) 0%, var(--mantine-color-brand-9) 100%)",
      }}
    >
      <Center style={{ minHeight: "100vh" }} p="md">
        <Paper radius="md" p="xl" withBorder w={420} maw="100%">
          <Stack gap="xs" mb="lg">
            <Text tt="uppercase" fw={600} size="sm" c="brand.7">
              Admin
            </Text>
            <Title order={2} ff="var(--mantine-heading-font-family)">
              Sign in to manage your site
            </Title>
          </Stack>
          <form action={formAction}>
            <Stack gap="md">
              {state.error && (
                <Alert icon={<IconAlertCircle size={18} />} color="red" radius="md">
                  {state.error}
                </Alert>
              )}
              <TextInput name="email" label="Email" placeholder="you@firm.com" required autoComplete="username" />
              <PasswordInput name="password" label="Password" required autoComplete="current-password" />
              <Button type="submit" fullWidth radius="sm" loading={pending} mt="sm">
                Sign In
              </Button>
            </Stack>
          </form>
        </Paper>
      </Center>
    </Box>
  );
}
