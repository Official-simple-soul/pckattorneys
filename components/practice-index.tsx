import Link from "next/link";
import { Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { PracticeIcon } from "@/lib/practice-icons";

type PracticeAreaSummary = { slug: string; shortTitle: string; tagline: string };

/** Ruled list of practice areas, each row linking to its page. */
export function PracticeIndex({ areas }: { areas: PracticeAreaSummary[] }) {
  return (
    <nav aria-label="Practice areas" className="practice-list">
      {areas.map((area) => (
        <Link key={area.slug} href={`/practice-areas/${area.slug}`} className="practice-row">
          <span className="practice-row-ring">
            <PracticeIcon slug={area.slug} size={20} stroke={1.5} aria-hidden />
          </span>
          <span>
            <Text
              component="span"
              display="block"
              className="practice-row-title"
              fz={{ base: 20, md: 24 }}
              ff="var(--mantine-heading-font-family)"
              c="brand.9"
              lh={1.3}
              mb={6}
            >
              {area.shortTitle}
            </Text>
            <Text component="span" display="block" c="dark.5" lh={1.55}>
              {area.tagline}
            </Text>
          </span>
          <IconChevronRight className="practice-row-go" size={20} stroke={1.5} aria-hidden />
        </Link>
      ))}
    </nav>
  );
}
