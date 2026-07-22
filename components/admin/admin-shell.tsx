"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppShell, Avatar, Burger, Group, Menu, NavLink, ScrollArea, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLayoutDashboard,
  IconPalette,
  IconHome,
  IconInfoCircle,
  IconBriefcase,
  IconUsers,
  IconMail,
  IconLogout,
  IconExternalLink,
  IconChevronDown,
  IconUserCircle,
} from "@tabler/icons-react";
import { logoutAction } from "@/lib/actions/auth";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: IconLayoutDashboard, exact: true },
  { href: "/admin/theme", label: "Theme & Branding", icon: IconPalette },
  { href: "/admin/homepage", label: "Homepage", icon: IconHome },
  { href: "/admin/about", label: "About Page", icon: IconInfoCircle },
  { href: "/admin/practice-areas", label: "Practice Areas", icon: IconBriefcase },
  { href: "/admin/partners", label: "Partners", icon: IconUsers },
  { href: "/admin/contact", label: "Contact Page", icon: IconMail },
  { href: "/admin/messages", label: "Messages", icon: IconMail },
];

export function AdminShell({
  firmName,
  children,
}: {
  firmName: string;
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text fw={700} ff="var(--mantine-heading-font-family)">
              {firmName} · Admin
            </Text>
          </Group>
          <Menu shadow="md" width={190} position="bottom-end" offset={8}>
            <Menu.Target>
              <UnstyledButton
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 10px",
                  borderRadius: "var(--mantine-radius-sm)",
                }}
              >
                <Avatar size={28} radius="xl" color="brand">
                  <IconUserCircle size={18} />
                </Avatar>
                <Text size="sm" fw={500} visibleFrom="xs">
                  Admin
                </Text>
                <IconChevronDown size={14} color="var(--mantine-color-dimmed)" />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component={Link} href="/" target="_blank" leftSection={<IconExternalLink size={16} />}>
                View site
              </Menu.Item>
              <Menu.Divider />
              <form action={logoutAction}>
                <Menu.Item component="button" type="submit" color="red" leftSection={<IconLogout size={16} />}>
                  Logout
                </Menu.Item>
              </form>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <ScrollArea>
          {NAV_ITEMS.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.href}
                component={Link}
                href={item.href}
                label={item.label}
                leftSection={<item.icon size={18} />}
                active={active}
                variant="light"
                mb={4}
                style={{ borderRadius: "var(--mantine-radius-sm)" }}
              />
            );
          })}
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>{children}</AppShell.Main>
    </AppShell>
  );
}
