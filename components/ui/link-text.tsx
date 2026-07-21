"use client";

import Link from "next/link";
import { Text, type TextProps } from "@mantine/core";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = TextProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "color"> & {
    href: string;
    children: ReactNode;
  };

export function LinkText({ href, children, ...props }: Props) {
  return (
    <Text component={Link} href={href} {...props}>
      {children}
    </Text>
  );
}
