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
import { IconArrowRight, IconChevronDown } from "@tabler/icons-react";

type PracticeAreaLink = {
  slug: string;
  shortTitle: string;
  /** Sections of the area's page, listed beneath it in the menu. */
  children?: { label: string; href: string }[];
};

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
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const pathname = usePathname();
  // The dropdown remembers the page it was opened on, so it is closed on any other page
  // (link clicks, back/forward) without relying on mouseleave firing.
  const [practiceOpenOn, setPracticeOpenOn] = useState<string | null>(null);
  const practiceOpen = practiceOpenOn === pathname;
  const setPracticeOpen = (open: boolean | ((current: boolean) => boolean)) => {
    const next = typeof open === "function" ? open(practiceOpen) : open;
    setPracticeOpenOn(next ? pathname : null);
  };
  // After a menu choice the pointer is usually still over the menu, and a same-page jump to
  // an Energy section doesn't change the path, so the menu must not reopen from hovering
  // its own dropdown. Only pointing at "Practice Areas" again reopens it.
  const [hoverPaused, setHoverPaused] = useState(false);
  const targetEnter = () => {
    setHoverPaused(false);
    setPracticeOpen(true);
  };
  const dropdownEnter = () => {
    if (!hoverPaused) setPracticeOpen(true);
  };
  const hoverClose = () => setPracticeOpen(false);
  const choosePractice = () => {
    setHoverPaused(true);
    setPracticeOpen(false);
  };

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/partners", label: "Partners" },
    { href: "/contact", label: "Contact" },
  ];

  // A section counts as current on its own page and on any page beneath it.
  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const practiceCurrent = isCurrent("/practice-areas");
  // Areas with sub-sections (Energy) lead the menu as a featured group; the rest follow in a grid.
  const featuredAreas = practiceAreas.filter((a) => a.children?.length);
  const otherAreas = practiceAreas.filter((a) => !a.children?.length);

  return (
    <Box
      component="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(10px)",
        backgroundColor:
          "color-mix(in srgb, var(--mantine-color-body) 88%, transparent)",
        borderBottom: "1px solid var(--mantine-color-gray-2)",
      }}
    >
      <div className="section-container">
        <Group justify="space-between" h={76} wrap="nowrap">
          <Link
            href="/"
            style={{ textDecoration: "none" }}
            onClick={closeDrawer}
          >
            <Group gap="xs" wrap="nowrap">
              <Box
                style={{
                  position: "relative",
                  width: 40,
                  height: 40,
                  borderRadius: "var(--mantine-radius-sm)",
                  overflow: "hidden",
                  background: logoUrl
                    ? undefined
                    : "var(--mantine-color-brand-9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={firmName}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <Text
                    c="white"
                    fw={700}
                    size="sm"
                    ff="var(--mantine-heading-font-family)"
                  >
                    {logoText}
                  </Text>
                )}
              </Box>
              <Text
                size="lg"
                c="brand.9"
                ff="var(--mantine-heading-font-family)"
                visibleFrom="sm"
                lineClamp={1}
              >
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
                  onMouseEnter={targetEnter}
                  onMouseLeave={hoverClose}
                  onClick={() => setPracticeOpen((o) => !o)}
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                  className="nav-link"
                  data-active={practiceCurrent || undefined}
                >
                  <Text
                    size="sm"
                    fw={practiceCurrent ? 600 : 500}
                    c={practiceCurrent ? "brand.9" : "dark.6"}
                  >
                    Practice Areas
                  </Text>
                  <IconChevronDown size={14} />
                </UnstyledButton>
              </Popover.Target>
              <Popover.Dropdown
                onMouseEnter={dropdownEnter}
                onMouseLeave={hoverClose}
              >
                {featuredAreas.map((area) => {
                  const current = pathname === `/practice-areas/${area.slug}`;
                  return (
                    <Box key={area.slug} className="nav-featured">
                      <UnstyledButton
                        component={Link}
                        href={`/practice-areas/${area.slug}`}
                        onClick={choosePractice}
                        p="xs"
                        className="hover-bg nav-featured-title"
                        aria-current={current ? "page" : undefined}
                      >
                        <Text size="sm" fw={600} c="brand.9">
                          {area.shortTitle}
                        </Text>
                        <IconArrowRight size={14} aria-hidden />
                      </UnstyledButton>
                      <SimpleGrid
                        cols={2}
                        spacing={0}
                        component="ul"
                        className="nav-sublist"
                      >
                        {area.children!.map((child) => (
                          <li key={child.href}>
                            <UnstyledButton
                              component={Link}
                              href={child.href}
                              onClick={choosePractice}
                              className="hover-bg nav-sublink"
                            >
                              <Text size="sm" c="dark.6">
                                {child.label}
                              </Text>
                            </UnstyledButton>
                          </li>
                        ))}
                      </SimpleGrid>
                    </Box>
                  );
                })}
                {featuredAreas.length > 0 && <Divider my="xs" />}
                <SimpleGrid cols={2} spacing="xs">
                  {otherAreas.map((area) => {
                    const current = pathname === `/practice-areas/${area.slug}`;
                    return (
                      <UnstyledButton
                        key={area.slug}
                        component={Link}
                        href={`/practice-areas/${area.slug}`}
                        onClick={choosePractice}
                        p="xs"
                        style={{ borderRadius: "var(--mantine-radius-sm)" }}
                        className="hover-bg"
                        aria-current={current ? "page" : undefined}
                        data-active={current || undefined}
                      >
                        <Text
                          size="sm"
                          fw={current ? 600 : 500}
                          c={current ? "brand.9" : "dark.7"}
                        >
                          {area.shortTitle}
                        </Text>
                      </UnstyledButton>
                    );
                  })}
                </SimpleGrid>
                <Divider my="xs" />
                <UnstyledButton
                  component={Link}
                  href="/practice-areas"
                  onClick={choosePractice}
                >
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

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="md"
            aria-label="Toggle navigation"
          />
        </Group>
      </div>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        position="right"
        size="xs"
        hiddenFrom="md"
        title={firmName}
      >
        <Stack gap="lg">
          <Text fw={600} size="sm" c="dimmed" tt="uppercase">
            Practice Areas
          </Text>
          <Stack gap="sm">
            {practiceAreas.map((area) => {
              const current = pathname === `/practice-areas/${area.slug}`;
              return (
                <Stack key={area.slug} gap={6}>
                  <Text
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
                  {area.children?.map((child) => (
                    <Text
                      key={child.href}
                      component={Link}
                      href={child.href}
                      onClick={closeDrawer}
                      size="sm"
                      c="dimmed"
                      className="drawer-sublink"
                      style={{ textDecoration: "none" }}
                    >
                      {child.label}
                    </Text>
                  ))}
                </Stack>
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
          <Button
            component={Link}
            href="/contact"
            onClick={closeDrawer}
            fullWidth
            mt="md"
          >
            Schedule a Consultation
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
