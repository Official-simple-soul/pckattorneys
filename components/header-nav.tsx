"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [practiceOpen, setPracticeOpen] = useState(false);
  const pathname = usePathname();

  // Force-close the practice areas dropdown whenever the route changes
  // (covers link clicks, back/forward nav) since it can't rely on mouseleave firing.
  useEffect(() => {
    setPracticeOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/partners", label: "Partners" },
    { href: "/contact", label: "Contact" },
  ];

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
                  background: logoUrl
                    ? undefined
                    : "linear-gradient(135deg, var(--mantine-color-brand-7), var(--mantine-color-brand-9))",
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
              <Text
                fw={600}
                size="lg"
                c="dark.7"
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
                  onMouseEnter={() => setPracticeOpen(true)}
                  onMouseLeave={() => setPracticeOpen(false)}
                  onClick={() => setPracticeOpen((o) => !o)}
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <Text size="sm" fw={500} c="dark.6">
                    Practice Areas
                  </Text>
                  <IconChevronDown size={14} />
                </UnstyledButton>
              </Popover.Target>
              <Popover.Dropdown
                onMouseEnter={() => setPracticeOpen(true)}
                onMouseLeave={() => setPracticeOpen(false)}
              >
                <SimpleGrid cols={2} spacing="xs">
                  {practiceAreas.map((area) => (
                    <UnstyledButton
                      key={area.slug}
                      component={Link}
                      href={`/practice-areas/${area.slug}`}
                      onClick={() => setPracticeOpen(false)}
                      p="xs"
                      style={{ borderRadius: "var(--mantine-radius-sm)" }}
                      className="hover-bg"
                    >
                      <Text size="sm" fw={500} c="dark.7">
                        {area.shortTitle}
                      </Text>
                    </UnstyledButton>
                  ))}
                </SimpleGrid>
                <Divider my="xs" />
                <UnstyledButton component={Link} href="/practice-areas" onClick={() => setPracticeOpen(false)}>
                  <Text size="sm" fw={600} c="brand.7">
                    View all practice areas →
                  </Text>
                </UnstyledButton>
              </Popover.Dropdown>
            </Popover>

            {navLinks.map((link) => (
              <Text
                key={link.href}
                component={Link}
                href={link.href}
                size="sm"
                fw={500}
                c="dark.6"
                style={{ textDecoration: "none" }}
              >
                {link.label}
              </Text>
            ))}
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
            {practiceAreas.map((area) => (
              <Text
                key={area.slug}
                component={Link}
                href={`/practice-areas/${area.slug}`}
                onClick={closeDrawer}
                size="sm"
                style={{ textDecoration: "none" }}
                c="dark.7"
              >
                {area.shortTitle}
              </Text>
            ))}
          </Stack>
          <Divider />
          {navLinks.map((link) => (
            <Text
              key={link.href}
              component={Link}
              href={link.href}
              onClick={closeDrawer}
              fw={500}
              style={{ textDecoration: "none" }}
              c="dark.7"
            >
              {link.label}
            </Text>
          ))}
          <Button component={Link} href="/contact" onClick={closeDrawer} fullWidth mt="md">
            Schedule a Consultation
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
