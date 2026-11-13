"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Popover,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";

type PracticeAreaLink = { slug: string; shortTitle: string };

export function HeaderNav({
  firmName,
  logoText,
  logoUrl,
  practiceAreas,
}: {
  firmName: string;
  logoText: string;
  logoUrl: string;
  practiceAreas: PracticeAreaLink[];
}) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const pathname = usePathname();
  // The dropdown remembers the page it was opened on, so it is closed on any other page
  // (link clicks, back/forward) without relying on mouseleave firing.
  const [practiceOpenOn, setPracticeOpenOn] = useState<string | null>(null);
  const practiceOpen = practiceOpenOn === pathname;
  const setPracticeOpen = (open: boolean | ((current: boolean) => boolean)) => {
    const next = typeof open === "function" ? open(practiceOpen) : open;
    setPracticeOpenOn(next ? pathname : null);
  };

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/partners", label: "Partners" },
    { href: "/contact", label: "Contact" },
  ];

  // A section counts as current on its own page and on any page beneath it.
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const practiceCurrent = isCurrent("/practice-areas");

  return (
    <Box
      component="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(10px)",
        backgroundColor: "color-mix(in srgb, var(--mantine-color-body) 88%, transparent)",
        borderBottom: "1px solid var(--mantine-color-gray-2)",
      }}
    >
      <div className="section-container">
        <Group justify="space-between" h={76} wrap="nowrap">
          <Link href="/" style={{ textDecoration: "none" }} onClick={closeDrawer}>
            <Group gap="xs" wrap="nowrap">
              <Box
                style={{
                  position: "relative",
                  width: 40,
                  height: 40,
                  borderRadius: "var(--mantine-radius-sm)",
                  overflow: "hidden",
                  background: logoUrl ? undefined : "var(--mantine-color-brand-9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {logoUrl ? (
                  <Image src={logoUrl} alt={firmName} fill style={{ objectFit: "contain" }} />
                ) : (
                  <Text c="white" fw={700} size="sm" ff="var(--mantine-heading-font-family)">
                    {logoText}
                  </Text>
                )}
              </Box>
              <Text size="lg" c="brand.9" ff="var(--mantine-heading-font-family)" visibleFrom="sm" lineClamp={1}>
                {firmName}
              </Text>
            </Group>
          </Link>

          <Group gap={32} visibleFrom="md" wrap="nowrap">
            <Popover
              width={620}
              position="bottom-start"
              shadow="md"
              radius="md"
              opened={practiceOpen}
              onChange={setPracticeOpen}
              trapFocus={false}
            >
              <Popover.Target>
                <UnstyledButton
                  onMouseEnter={() => setPracticeOpen(true)}
                  onMouseLeave={() => setPracticeOpen(false)}
                  onClick={() => setPracticeOpen((o) => !o)}
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                  className="nav-link"
                  data-active={practiceCurrent || undefined}
                >
                  <Text size="sm" fw={practiceCurrent ? 600 : 500} c={practiceCurrent ? "brand.9" : "dark.6"}>
                    Practice Areas
                  </Text>
                  <IconChevronDown size={14} />
                </UnstyledButton>
              </Popover.Target>
              <Popover.Dropdown onMouseEnter={() => setPracticeOpen(true)} onMouseLeave={() => setPracticeOpen(false)}>
                <SimpleGrid cols={2} spacing="xs">
                  {practiceAreas.map((area) => {
                    const current = pathname === `/practice-areas/${area.slug}`;
                    return (
                      <UnstyledButton
                        key={area.slug}
                        component={Link}
                        href={`/practice-areas/${area.slug}`}
                        onClick={() => setPracticeOpen(false)}
                        p="xs"
                        style={{ borderRadius: "var(--mantine-radius-sm)" }}
                        className="hover-bg"
                        aria-current={current ? "page" : undefined}
                        data-active={current || undefined}
                      >
                        <Text size="sm" fw={current ? 600 : 500} c={current ? "brand.9" : "dark.7"}>
                          {area.shortTitle}
                        </Text>
                      </UnstyledButton>
                    );
                  })}
                </SimpleGrid>
                <Divider my="xs" />
                <UnstyledButton component={Link} href="/practice-areas" onClick={() => setPracticeOpen(false)}>
                  <Text size="sm" fw={600} c="brand.7">
                    View all practice areas
                  </Text>
                </UnstyledButton>
              </Popover.Dropdown>
            </Popover>

            {navLinks.map((link) => {
              const current = isCurrent(link.href);
              return (
                <Text
                  key={link.href}
                  component={Link}
                  href={link.href}
                  size="sm"
                  fw={current ? 600 : 500}
                  c={current ? "brand.9" : "dark.6"}
                  className="nav-link"
                  data-active={current || undefined}
                  aria-current={current ? "page" : undefined}
                  style={{ textDecoration: "none" }}
                >
                  {link.label}
                </Text>
              );
            })}
          </Group>

          <Group visibleFrom="md">
            <Button component={Link} href="/contact" radius="sm">
              Schedule a Consultation
            </Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" aria-label="Toggle navigation" />
        </Group>
      </div>

      <Drawer opened={drawerOpened} onClose={closeDrawer} position="right" size="xs" hiddenFrom="md" title={firmName}>
        <Stack gap="lg">
          <Text fw={600} size="sm" c="dimmed" tt="uppercase">
            Practice Areas
          </Text>
          <Stack gap="sm">
            {practiceAreas.map((area) => {
              const current = pathname === `/practice-areas/${area.slug}`;
              return (
                <Text
                  key={area.slug}
                  component={Link}
                  href={`/practice-areas/${area.slug}`}
                  onClick={closeDrawer}
                  size="sm"
                  style={{ textDecoration: "none" }}
                  c={current ? "brand.9" : "dark.7"}
                  fw={current ? 600 : 400}
                  className="drawer-link"
                  data-active={current || undefined}
                  aria-current={current ? "page" : undefined}
                >
                  {area.shortTitle}
                </Text>
              );
            })}
          </Stack>
          <Divider />
          {navLinks.map((link) => {
            const current = isCurrent(link.href);
            return (
              <Text
                key={link.href}
                component={Link}
                href={link.href}
                onClick={closeDrawer}
                fw={current ? 600 : 500}
                style={{ textDecoration: "none" }}
                c={current ? "brand.9" : "dark.7"}
                className="drawer-link"
                data-active={current || undefined}
                aria-current={current ? "page" : undefined}
              >
                {link.label}
              </Text>
            );
          })}
          <Button component={Link} href="/contact" onClick={closeDrawer} fullWidth mt="md">
            Schedule a Consultation
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
