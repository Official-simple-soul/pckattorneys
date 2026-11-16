import Link from "next/link";
import { Group } from "@mantine/core";

/** "Practice Areas / {current}" trail shown above a practice area's title. */
export function PracticeBreadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <Group gap={8} component="ol" className="breadcrumb">
        <li>
          <Link href="/practice-areas">Practice Areas</Link>
        </li>
        <li aria-hidden>/</li>
        <li aria-current="page">{current}</li>
      </Group>
    </nav>
  );
}
