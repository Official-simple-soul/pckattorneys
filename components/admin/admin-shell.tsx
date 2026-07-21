"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppShell, Burger, Group, NavLink, ScrollArea, Text } from "@mantine/core";
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
          <Group gap="sm">
            <NavLink
              component={Link}
              href="/"
              label="View site"
              leftSection={<IconExternalLink size={16} />}
              style={{ borderRadius: "var(--mantine-radius-sm)" }}
              target="_blank"
            />
            <form action={logoutAction}>
              <NavLink
                component="button"
                type="submit"
                label="Logout"
                leftSection={<IconLogout size={16} />}
                style={{ borderRadius: "var(--mantine-radius-sm)" }}
              />
            </form>
          </Group>
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
