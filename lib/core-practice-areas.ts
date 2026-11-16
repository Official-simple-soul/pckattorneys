// The 19 core practice areas from the firm's proposal (November 2026), in the proposal's order.
// The site groups them into fewer pages; each entry points at the page, or the section of a
// page, that covers it. Section anchors come from the section titles (see lib/anchor.ts).

import { anchorId } from "@/lib/anchor";
import { ENERGY_SLUG } from "@/lib/energy-sectors";

export type CoreArea = {
  name: string;
  scope: string;
  /** Practice area page that covers this area. */
  slug: string;
  /** Section on that page, if the area shares the page with others. */
  section?: string;
};

export const CORE_PRACTICE_AREAS: CoreArea[] = [
  {
    name: "Corporate & Commercial Law",
    scope: "Company formation, restructuring, mergers and acquisitions, joint ventures, shareholders' agreements, commercial contracts and corporate governance.",
    slug: "corporate-commercial-law",
  },
  {
    name: "Banking, Finance & Investment Advisory",
    scope: "Project finance, secured and syndicated lending, debt restructuring, investment structuring and cross-border financing, and support in identifying and assessing investment opportunities.",
    slug: "banking-finance",
  },
  {
    name: "Energy & Natural Resources",
    scope: "Legal, regulatory and investment consultancy across oil, gas, power, mining and associated infrastructure, with particular emphasis on natural gas.",
    slug: ENERGY_SLUG,
  },
  {
    name: "Gas Development & Commercialisation",
    scope: "Gas exploration, production and field development; CNG, LPG and LNG infrastructure; gas-to-power projects.",
    slug: ENERGY_SLUG,
    section: "gas",
  },
  {
    name: "Oil & Gas Infrastructure, Logistics & Trading",
    scope: "Oil asset partnerships, modular refineries, jetties, vessel, tugboat and rig leasing, logistics, and crude and refined product trading.",
    slug: ENERGY_SLUG,
    section: "oil-gas",
  },
  {
    name: "Power & Energy Technologies",
    scope: "Gas-fired power generation, energy-efficient power systems and future-ready energy technologies.",
    slug: ENERGY_SLUG,
    section: "power",
  },
  {
    name: "Railway Infrastructure & Locomotive Modernisation",
    scope: "High-speed passenger and freight rail, locomotive upgrading and retrofitting, procurement, maintenance and financing.",
    slug: ENERGY_SLUG,
    section: "rail",
  },
  {
    name: "Mining & Solid Minerals",
    scope: "Mineral title due diligence, licensing, joint ventures, financing, processing, offtake, trading and host-community agreements.",
    slug: ENERGY_SLUG,
    section: "mining",
  },
  {
    name: "Regulatory Compliance & Corporate Governance",
    scope: "Regulatory advisory, licensing and permits, compliance audits, governance frameworks, corporate secretarial support and statutory filings.",
    slug: "regulatory-tax-esg",
    section: anchorId("Regulatory Compliance & Corporate Governance"),
  },
  {
    name: "Tax Advisory",
    scope: "Transaction structuring, tax compliance and fiscal advisory, including the tax implications of acquisitions, investments and financing.",
    slug: "regulatory-tax-esg",
    section: anchorId("Tax Advisory"),
  },
  {
    name: "Litigation & Dispute Resolution",
    scope: "Commercial litigation, arbitration, mediation, regulatory disputes, debt recovery and contract enforcement.",
    slug: "dispute-resolution-litigation",
  },
  {
    name: "Insurance",
    scope: "Insurance regulatory compliance, policy advisory, claims management, risk allocation, insurance transactions and disputes.",
    slug: "ip-wealth-insurance",
    section: anchorId("Insurance"),
  },
  {
    name: "Admiralty & Maritime Law",
    scope: "Shipping transactions, carriage of goods, marine insurance, vessel financing and leasing, tugboat charters and maritime compliance.",
    slug: "admiralty-maritime-law",
  },
  {
    name: "Environmental Law & ESG",
    scope: "Environmental compliance and impact assessments, permitting, ESG, pollution control, rehabilitation and climate-related requirements.",
    slug: "regulatory-tax-esg",
    section: anchorId("Environmental Law & ESG"),
  },
  {
    name: "Real Estate & Infrastructure",
    scope: "Land acquisition, property development, infrastructure investment, construction contracts and public-private partnerships.",
    slug: "real-estate-infrastructure",
  },
  {
    name: "Employment & Immigration",
    scope: "Employment contracts, labour law compliance, executive employment, workforce restructuring and expatriate employment.",
    slug: "employment-immigration",
  },
  {
    name: "Intellectual Property",
    scope: "Trademark, copyright and patent protection, licensing, technology transfer, portfolio management and enforcement.",
    slug: "ip-wealth-insurance",
    section: anchorId("Intellectual Property"),
  },
  {
    name: "Wealth & Asset Management",
    scope: "Estate planning, trusts, succession planning, wealth preservation, private client advisory and asset protection.",
    slug: "ip-wealth-insurance",
    section: anchorId("Wealth & Asset Management"),
  },
  {
    name: "Restructuring & Insolvency",
    scope: "Reorganisations, distressed asset transactions, creditor negotiations, debt workouts and insolvency advisory and representation.",
    slug: "restructuring-insolvency",
  },
];
