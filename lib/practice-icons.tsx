import {
  IconBriefcase,
  IconBuildingBank,
  IconBolt,
  IconBuildingSkyscraper,
  IconGavel,
  IconShieldCheck,
  IconDiamond,
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
};

export function getPracticeIcon(slug: string) {
  return PRACTICE_ICONS[slug] ?? IconBriefcase;
}
