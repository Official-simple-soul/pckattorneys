import { createElement } from "react";
import {
  IconBriefcase,
  IconBuildingBank,
  IconBolt,
  IconBuildingSkyscraper,
  IconGavel,
  IconShieldCheck,
  IconDiamond,
  IconAnchor,
  IconUsers,
  IconLifebuoy,
} from "@tabler/icons-react";
import type { IconProps } from "@tabler/icons-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export const PRACTICE_ICONS: Record<
  string,
  ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
> = {
  "corporate-commercial-law": IconBriefcase,
  "banking-finance": IconBuildingBank,
  "energy-natural-resources": IconBolt,
  "real-estate-infrastructure": IconBuildingSkyscraper,
  "dispute-resolution-litigation": IconGavel,
  "regulatory-tax-esg": IconShieldCheck,
  "ip-wealth-insurance": IconDiamond,
  "admiralty-maritime-law": IconAnchor,
  "employment-immigration": IconUsers,
  "restructuring-insolvency": IconLifebuoy,
};

export function getPracticeIcon(slug: string) {
  return PRACTICE_ICONS[slug] ?? IconBriefcase;
}

/** The icon for a practice area. Looked up by slug, so pages don't pick a component during render. */
export function PracticeIcon({ slug, ...props }: IconProps & { slug: string }) {
  return createElement(getPracticeIcon(slug), props);
}
