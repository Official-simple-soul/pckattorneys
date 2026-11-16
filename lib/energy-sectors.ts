// Content for the Energy & Infrastructure page, condensed from the firm's investor proposal
// (November 2026). It lives in code rather than the admin, like the history timeline on About.

import { ENERGY_IMAGES } from "@/lib/legal-images";

export const ENERGY_SLUG = "energy-natural-resources";

export const ENERGY_STATS = [
  { value: "215+", unit: "Tcf", label: "Natural gas reserves reported by NUPRC in September 2026" },
  { value: "4,000", unit: "km", label: "Proposed high-speed rail network linking Lagos, Abuja, Kano and Port Harcourt" },
  { value: "3,500", unit: "MW", label: "Power generation proposed for the rail programme's first phase" },
  { value: "44+", unit: "", label: "Commercially viable solid minerals in more than 500 locations" },
];

export const ENERGY_INTRO = [
  "Nigeria offers significant opportunities for local and international investors across gas, oil, power, rail and mining. Realising them takes advisers who understand the legal and regulatory framework and the commercial realities behind each investment decision.",
  "We help investors, asset holders, developers, financiers and technical partners identify opportunities, assess risk, structure transactions and put in place the contracts and governance that projects need, from first assessment through to operation.",
];

export const ENERGY_OBJECTIVE =
  "Our objective is to help investors translate credible opportunities into carefully structured projects, each progressing through feasibility assessment, due diligence, the necessary approvals and agreed definitive arrangements.";

export type EnergySector = {
  id: string;
  number: string;
  title: string;
  /** Short name used in the header's Practice Areas menu. */
  navLabel: string;
  short: string;
  image: { src: string; alt: string };
  overview: string[];
  framework: string;
  opportunities: { title: string; body: string }[];
};

export const ENERGY_SECTORS: EnergySector[] = [
  {
    id: "gas",
    navLabel: "Gas Development",
    number: "01",
    title: "Gas Development & Commercialisation",
    short: "Field development, CNG, LPG, LNG, gas-to-power and flare gas.",
    image: ENERGY_IMAGES.offshorePlatform,
    overview: [
      "Nigeria's natural gas sector offers investment across exploration, production, processing, transportation, storage, distribution, power generation and export. The national agenda, including the Federal Government's Decade of Gas programme, covers domestic use, CNG, LPG, LNG, gas-to-power and the commercialisation of gas that would otherwise be flared.",
      "For investors, the task is to connect a dependable gas source with suitable infrastructure, credible customers and an enforceable contractual framework. We translate the legal requirements into a project-specific roadmap: the approvals, contracts and conditions that must be in place before capital is committed.",
    ],
    framework:
      "The Petroleum Industry Act, 2021 (PIA) separates upstream regulation (NUPRC) from midstream and downstream regulation (NMDPRA). A project spanning production, processing, transport and supply may need several authorisations from both regulators, alongside the 2023 regulations on gas pricing and domestic demand, gas distribution systems, and gas flaring, venting and methane emissions.",
    opportunities: [
      {
        title: "Gas exploration, production and field development",
        body: "Partnerships with asset holders, licensing rounds and development financing. We review titles, ownership, encumbrances and compliance history, and negotiate governance, funding, milestones and exit rights.",
      },
      {
        title: "CNG conversion and refuelling infrastructure",
        body: "Conversion centres, compression and refuelling stations for commercial fleets and public transport, with NMDPRA permitting and Standards Organisation of Nigeria requirements handled as distinct workstreams.",
      },
      {
        title: "LPG storage and distribution",
        body: "Bulk storage, depots, bottling and refilling plants and distribution networks, with supply, haulage, insurance and incident responsibility clearly allocated.",
      },
      {
        title: "LNG production, liquefaction and export",
        body: "Feed gas, processing, EPC, operations and LNG sales agreements. Under section 129 of the PIA, LNG plants fall under an NMDPRA gas processing licence.",
      },
      {
        title: "Gas-to-power projects",
        body: "Gas supply and power purchase agreements aligned with generation capacity and payment security, under both petroleum regulation and the Electricity Act, 2023.",
      },
      {
        title: "Distribution, flare gas recovery and Nigerian content",
        body: "Pipeline and distribution licensing, flare gas access permits, environmental impact assessment and NCDMB Nigerian content obligations built into project documents from the outset.",
      },
    ],
  },
  {
    id: "oil-gas",
    navLabel: "Oil & Gas Infrastructure",
    number: "02",
    title: "Oil & Gas Infrastructure, Logistics & Trading",
    short: "Asset partnerships, modular refineries, jetties, vessels, rigs and trading.",
    image: ENERGY_IMAGES.refinerySkyline,
    overview: [
      "Nigeria's oil and gas value chain offers opportunities from asset development to refining, storage, marine services, transportation and product marketing. Each requires an integrated view: a refinery needs dependable feedstock and offtake, a jetty needs access and cargo demand, and a vessel or rig needs credible customers and enforceable contracts.",
    ],
    framework:
      "NUPRC regulates upstream activity and NMDPRA midstream and downstream activity under the PIA. Marine and waterfront projects also involve NIMASA (ship registration and cabotage), the NPA (jetties within its jurisdiction) and NIWA (inland waterways), so the approval pathway depends on the asset, its location and its use.",
    opportunities: [
      {
        title: "Investment partnerships for oil asset development",
        body: "Equity, joint ventures, acquisitions and development financing with asset holders. Section 95 of the PIA requires ministerial consent for specified transfers, so completion is aligned with consent.",
      },
      {
        title: "Modular refinery development",
        body: "Site due diligence, licensing, feedstock and offtake agreements, EPC and O&M contracts, with remedies for delay and underperformance.",
      },
      {
        title: "Jetty construction and terminal infrastructure",
        body: "Land and waterfront rights, NPA and NIWA approvals, construction and terminal operating agreements, berth access and throughput commitments.",
      },
      {
        title: "Vessel, tugboat and rig leasing",
        body: "Acquisition and finance, charterparties, rig leases and drilling contracts, including cabotage registration, crewing and allocation of downtime and pollution risk.",
      },
      {
        title: "Oil and gas logistics across Nigeria",
        body: "Road haulage, marine transport, depot access and storage agreements covering custody, measurement, losses and incident responsibility.",
      },
      {
        title: "Crude oil and refined product trading",
        body: "Verification of seller authority and product title, NMDPRA import and export permits, and sales contracts covering specification, inspection, title, risk and payment security.",
      },
    ],
  },
  {
    id: "power",
    navLabel: "Power & Energy Technologies",
    number: "03",
    title: "Power & Energy Technologies",
    short: "Gas-fired generation, power purchase, grid connection and energy-efficient systems.",
    image: ENERGY_IMAGES.powerTransmission,
    overview: [
      "Reliable power underpins every other sector on this page, from gas processing to rail traction and mineral processing. We support investment in gas-fired power generation, energy-efficient power systems and future-ready energy technologies for industrial facilities, commercial customers and other eligible markets.",
      "A power project has to work on both sides: a dependable fuel supply and a commercially credible electricity customer or market. We align fuel delivery obligations with generation capacity, electricity delivery commitments and payment security, so the project can be financed.",
    ],
    framework:
      "Power projects engage both petroleum and electricity regulation. Under the Electricity Act, 2023, the appropriate regulator depends on the project's configuration and jurisdiction: NERC retains responsibility for federally regulated activities, while state regulators exercise authority over intrastate activities where they have assumed regulatory responsibility. Gas supply remains subject to the PIA.",
    opportunities: [
      {
        title: "Gas-fired power generation",
        body: "Gas supply agreements and power purchase agreements that match fuel delivery to generation capacity, with clear remedies when either side falls short.",
      },
      {
        title: "Power for industrial and commercial customers",
        body: "Generation dedicated to factories, processing plants, estates and commercial sites, with supply terms, tariffs and payment security agreed directly with the customer.",
      },
      {
        title: "Energy-efficient systems and new technologies",
        body: "Equipment procurement, supply and installation contracts for efficient generation and future-ready energy technologies, including warranties and performance guarantees.",
      },
      {
        title: "Grid connection and transmission",
        body: "Connection arrangements, transmission interfaces and any separate electricity sales, coordinated with the regulator that has jurisdiction over the project.",
      },
      {
        title: "Power for the high-speed rail programme",
        body: "About 3,500 MW of generation proposed for the rail programme's first phase, with railway demand, generation phasing and transmission connections defined from the start.",
      },
      {
        title: "Project development and financing",
        body: "Project development agreements, construction contracts and financing documentation that allocate outage, delay and performance risk.",
      },
    ],
  },
  {
    id: "rail",
    navLabel: "High-Speed Rail",
    number: "04",
    title: "Railway Infrastructure & High-Speed Rail",
    short: "A proposed 4,000 km high-speed programme, freight, rolling stock and power.",
    image: ENERGY_IMAGES.highSpeedTrain,
    overview: [
      "Acting as legal representative of the project promoters, Parah, Chen and King Attorneys is seeking strategic partners and financiers for a proposed high-speed railway programme in Nigeria. The programme envisages about 4,000 km of high-speed railway, with an initial phase of about 1,700 km connecting Lagos, Abuja, Kano and Port Harcourt, integrated with gas, power generation and transmission infrastructure.",
      "Participation may cover project equity, long-term financing, construction, rolling stock, power infrastructure, operating systems and maintenance. In April 2026 the Office of the Secretary to the Government of the Federation announced a technical review committee to examine the programme's documentation and proposals.",
    ],
    framework:
      "The framework includes federal PPP processes, ICRC's stages from project development to Full Business Case approval and contract award, and the state railway powers introduced by the 2023 constitutional changes. A multi-state project needs a coordinated view of federal and state requirements.",
    opportunities: [
      {
        title: "High-speed passenger railway infrastructure",
        body: "Track, bridges, viaducts, stations, power, signalling and control systems, with corridor agreements, construction contracts and financing documentation.",
      },
      {
        title: "Freight infrastructure and intermodal connections",
        body: "Freight terminals, logistics parks, port connections and road-to-rail transfer, with freight demand assessed independently of passenger forecasts.",
      },
      {
        title: "Integrated gas, power and railway systems",
        body: "About 3,500 MW of proposed generation in the first phase, with gas supply, power purchase and interface agreements allocating outage and delay risk.",
      },
      {
        title: "Rolling stock and locomotive modernisation",
        body: "Procurement, financing, leasing and maintenance of high-speed trainsets, and technically appropriate upgrades of existing locomotives.",
      },
      {
        title: "Stations, digital systems and associated development",
        body: "Station facilities, retail, parking, ticketing, passenger information, telecommunications and cybersecurity.",
      },
      {
        title: "Partnership and financing",
        body: "We invite infrastructure investors, institutional lenders, development finance institutions, export credit agencies, contractors, operators, manufacturers and technology providers.",
      },
    ],
  },
  {
    id: "mining",
    navLabel: "Mining & Solid Minerals",
    number: "05",
    title: "Mining & Solid Minerals",
    short: "Title due diligence, joint ventures, financing, offtake and community agreements.",
    image: ENERGY_IMAGES.openPitMine,
    overview: [
      "Nigeria has one of Africa's most diverse mineral bases, with over 44 commercially viable solid minerals in more than 500 locations, including gold, lithium, limestone, iron ore, barite, tin, bitumen, coal, lead, zinc and critical minerals for the energy transition.",
      "Government reforms to formalise artisanal mining, improve geological data and promote critical minerals have accelerated investor interest across exploration, extraction, processing, logistics, financing and trading.",
    ],
    framework:
      "Mining is governed by the Nigerian Minerals and Mining Act, 2007 and the Nigerian Minerals and Mining Regulations, 2011, administered through the Ministry of Solid Minerals Development and the Mining Cadastre Office.",
    opportunities: [
      {
        title: "Mineral title due diligence",
        body: "Exploration licences, mining leases and quarry leases: ownership, corporate authority, licence conditions, renewals, filings and compliance history.",
      },
      {
        title: "Acquisitions, joint ventures and financing",
        body: "Ownership structures, governance rights, risk allocation, dispute resolution and exit arrangements that hold up over a long project life.",
      },
      {
        title: "Processing, offtake and trading",
        body: "Mining services, equipment supply and EPC contracts, mineral offtake and export transactions.",
      },
      {
        title: "Environment and host communities",
        body: "Environmental impact assessments, rehabilitation obligations, community development agreements and occupational health and safety.",
      },
    ],
  },
];

/** The same six services run through every sector in the proposal. */
export const TRANSACTION_SERVICES = [
  {
    title: "Negotiations & transaction structuring",
    body: "Special purpose vehicles, joint ventures, equity and project finance, with ownership, governance, funding milestones, investor protections and exit agreed early.",
  },
  {
    title: "Due diligence",
    body: "Titles, licences, permits, security interests, litigation and counterparties verified, with findings turned into conditions precedent, warranties and indemnities.",
  },
  {
    title: "Regulatory compliance",
    body: "An approval matrix for each project, applications supported and continuing obligations tracked across every regulator involved.",
  },
  {
    title: "Foreign participation",
    body: "Nigerian subsidiaries and consortia, NIPC registration, capital importation, expatriate requirements and lawful repatriation of proceeds.",
  },
  {
    title: "Tax & fiscal advisory",
    body: "Income tax, royalties, VAT, duties and incentives under the Nigeria Tax Act, 2025, in force since 1 January 2026, with tax clearly allocated in the documents.",
  },
  {
    title: "Contract review & drafting",
    body: "Supply, offtake, EPC, O&M, charter, power purchase and financing agreements that work together, with clear risk allocation and dispute resolution.",
  },
];

export const REGULATORS = [
  { short: "NUPRC", name: "Nigerian Upstream Petroleum Regulatory Commission" },
  { short: "NMDPRA", name: "Nigerian Midstream and Downstream Petroleum Regulatory Authority" },
  { short: "NCDMB", name: "Nigerian Content Development and Monitoring Board" },
  { short: "NERC", name: "Nigerian Electricity Regulatory Commission" },
  { short: "NIMASA", name: "Nigerian Maritime Administration and Safety Agency" },
  { short: "NPA", name: "Nigerian Ports Authority" },
  { short: "NIWA", name: "National Inland Waterways Authority" },
  { short: "ICRC", name: "Infrastructure Concession Regulatory Commission" },
  { short: "MCO", name: "Mining Cadastre Office" },
  { short: "NIPC", name: "Nigerian Investment Promotion Commission" },
];
