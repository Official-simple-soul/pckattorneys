"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "@mantine/core";
import type { ComponentPropsWithoutRef } from "react";

type Props = ButtonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "color"> & {
    href: string;
  };

export function LinkButton({ href, ...props }: Props) {
  return <Button component={Link} href={href} {...props} />;
}
