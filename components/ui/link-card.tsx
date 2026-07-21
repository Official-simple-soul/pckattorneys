"use client";

import Link from "next/link";
import { Card, type CardProps } from "@mantine/core";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = CardProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "color"> & {
    href: string;
    className?: string;
    children: ReactNode;
  };

export function LinkCard({ href, children, ...props }: Props) {
  return (
    <Card component={Link} href={href} {...props}>
      {children}
    </Card>
  );
}
