import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "abdurroheemsherifdeen@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "PckLLP-Admin-2026!";

async function main() {
  // --- Admin user ---
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await prisma.adminUser.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: { email: ADMIN_EMAIL, passwordHash, name: "Site Admin" },
  });

  // --- Site settings ---
  await prisma.siteSettings.upsert({
    where: { id: "settings" },
    update: {},
    create: {
      id: "settings",
      firmName: "Parah, Chen and King LLP",
      shortName: "PCK LLP",
      tagline:
        "Turning legal complexity into strategic advantage for businesses, investors, and governments worldwide.",
      logoText: "PCK",
      primaryColor: "#0B2545",
      secondaryColor: "#C9A227",
      accentColor: "#13315C",
      neutralColor: "#F7F5F0",
      headingFont: "playfair",
      bodyFont: "inter",
      phone: "+234 (0) 900 000 0000",
      email: "consult@pckllp.com",
      address: "Plot 1, Central Business District",
      city: "Abuja",
      country: "Nigeria",
      officeHours: "Monday – Friday, 9:00am – 5:00pm",
    },
  });

  // --- Homepage (schema defaults already carry the authored copy) ---
  await prisma.homePage.upsert({
    where: { id: "home" },
    update: {},
    create: {},
  });

  // --- About page (schema defaults already carry the authored copy) ---
  await prisma.aboutPage.upsert({
    where: { id: "about" },
    update: {},
    create: {},
  });

  // --- Contact page ---
  await prisma.contactPage.upsert({
    where: { id: "contact" },
    update: {},
    create: {},
  });

  // --- Practice areas ---
  const practiceAreas = [
    {
      order: 1,
      slug: "corporate-commercial-law",
      shortTitle: "Corporate & Commercial",
      title: "Corporate & Commercial Law",
      tagline: "Strategic Legal Counsel for Businesses at Every Stage of Growth",
      intro:
        "Parah, Chen and King LLP advises founders, growth companies, multinational corporations, investors, and public-sector entities on the legal and commercial decisions that shape business performance, investment readiness, and long-term enterprise value.\n\nFrom incorporation and governance to complex commercial transactions and cross-border expansion, we help clients structure opportunities, manage risk, and execute with confidence.",
      servicesTitle: "Our Corporate & Commercial Services",
      services: [
        "Company formation and corporate structuring",
        "Shareholder and founders' agreements",
        "Corporate governance and board advisory",
        "Joint ventures and strategic partnerships",
        "Mergers and acquisitions",
        "Commercial contracts and supply agreements",
        "Technology and digital business transactions",
        "Foreign investment structuring",
        "Corporate reorganizations",
        "Business expansion into Nigerian and international markets",
      ],
      mattersTitle: "Representative Matters",
      matters: [
        "Structuring investment-ready corporate vehicles",
        "Negotiating high-value commercial agreements",
        "Advising on acquisitions, divestments, and strategic transactions",
        "Conducting legal due diligence for investors and counterparties",
        "Designing governance frameworks for growing enterprises",
        "Supporting cross-border commercial relationships and market entry initiatives",
      ],
      whyTitle: "Why Businesses Choose Parah, Chen and King LLP",
      whyItems: [
        {
          title: "Commercially Intelligent Advice",
          body: "We understand that corporate decisions are not made in a legal vacuum. Our advice considers business objectives, investor expectations, operational practicality, and long-term strategic implications.",
        },
        {
          title: "Clarity for Decision-Makers",
          body: "Executives, founders, and investors need actionable guidance, not unnecessary complexity. We provide clear recommendations that support timely decision-making.",
        },
        {
          title: "Integrated Multidisciplinary Support",
          body: "Because our firm also advises on finance, taxation, regulatory compliance, disputes, ESG, infrastructure, and natural resources, clients benefit from coordinated advice across multiple legal disciplines.",
        },
      ],
      extraSections: [
        {
          title: "Legal Advice That Supports Commercial Objectives",
          body: "Modern businesses operate in an environment where regulatory requirements, investor expectations, contractual obligations, and operational realities intersect. A poorly structured transaction, shareholder arrangement, or commercial agreement can create significant financial and governance exposure.\n\nOur Corporate & Commercial practice is designed to provide practical, business-focused legal solutions that enable clients to move forward decisively while maintaining strong legal foundations.",
        },
        {
          title: "Cross-Border and Investment Perspective",
          body: "Headquartered in Abuja and operating globally, we regularly advise on matters involving foreign investors, international counterparties, cross-border transactions, and multinational business operations. We help clients navigate:",
          points: [
            "Foreign investment considerations",
            "Regulatory approvals",
            "Cross-border contractual arrangements",
            "International transaction structures",
            "Market entry and expansion strategies",
            "Multi-jurisdictional commercial relationships",
          ],
        },
        {
          title: "Who We Serve",
          body: "",
          points: [
            "Founders and startups",
            "Growth-stage companies",
            "Family businesses",
            "Private investors",
            "Venture and private equity participants",
            "Financial institutions",
            "Multinational corporations",
            "Government and public-sector entities",
          ],
        },
      ],
      closingTitle: "Build, Scale, and Transact with Confidence",
      closingBody:
        "Whether you are launching a new venture, negotiating a strategic partnership, raising capital, acquiring a business, or expanding into new markets, Parah, Chen and King LLP provides the legal and commercial guidance required to protect value and accelerate opportunity.",
      ctaLabel: "Schedule a confidential consultation with our Corporate & Commercial team.",
    },
    {
      order: 2,
      slug: "banking-finance",
      shortTitle: "Banking & Finance",
      title: "Banking & Finance",
      tagline:
        "Sophisticated Counsel for Financing Transactions, Financial Institutions, and Capital Deployment",
      intro:
        "Parah, Chen and King LLP advises banks, financial institutions, investors, corporates, sponsors, development finance stakeholders, and public-sector entities on complex financing transactions, regulatory obligations, security arrangements, and strategic capital deployment across Nigerian and international markets.\n\nIn today's financial environment, transactions are shaped by evolving regulation, cross-border capital flows, collateral considerations, investor expectations, and execution timelines. Our Banking & Finance practice is designed to help clients structure transactions efficiently, protect their interests, and move capital with confidence.",
      servicesTitle: "Our Banking & Finance Services",
      services: [
        "Corporate and commercial lending",
        "Syndicated and structured finance transactions",
        "Project and infrastructure finance",
        "Acquisition and leveraged finance",
        "Security creation and perfection",
        "Asset-backed and receivables financing",
        "Development finance and blended finance structures",
        "Debt restructuring and refinancing",
        "Banking regulatory compliance",
        "Financial institution advisory",
        "Cross-border financing transactions",
        "Enforcement of security and recovery strategies",
      ],
      mattersTitle: "Representative Matters",
      matters: [
        "Structuring secured lending transactions",
        "Conducting lender and borrower due diligence",
        "Negotiating financing documentation and security packages",
        "Advising on collateral perfection and enforcement considerations",
        "Supporting infrastructure and energy financing initiatives",
        "Assisting with refinancing, restructuring, and distressed debt scenarios",
        "Coordinating multi-stakeholder financing transactions involving banks, investors, sponsors, and public entities",
      ],
      whyTitle: "Why Clients Choose Parah, Chen and King LLP",
      whyItems: [
        {
          title: "Transaction-Focused Execution",
          body: "We understand that financing transactions are often time-sensitive. Our approach prioritizes efficiency, coordination, and practical solutions that keep transactions moving.",
        },
        {
          title: "Integrated Commercial Perspective",
          body: "Because our firm also advises on corporate, tax, regulatory, infrastructure, energy, real estate, and dispute matters, clients receive coordinated advice across the full transaction landscape.",
        },
        {
          title: "Strategic Risk Management",
          body: "We help clients assess not only legal enforceability, but also commercial exposure, regulatory implications, recovery pathways, and long-term financing sustainability.",
        },
      ],
      extraSections: [
        {
          title: "Commercially Focused Financial Legal Advisory",
          body: "Financing transactions require more than documentation. They require lawyers who understand the commercial drivers behind lending, borrowing, investment, restructuring, and project finance decisions. We work closely with clients to identify legal risks early, structure workable solutions, coordinate stakeholders, and support successful transaction execution.",
        },
        {
          title: "Project Finance and Infrastructure Capability",
          body: "Financing large-scale infrastructure, energy, transportation, industrial, and public-sector projects requires a multidisciplinary legal approach. Our ability to integrate finance, infrastructure, regulatory, and natural resources expertise provides a strong platform for complex project transactions.",
          points: [
            "Project structuring",
            "Sponsor and lender arrangements",
            "Government interface considerations",
            "Security packages",
            "Concession and project agreements",
            "Risk allocation frameworks",
            "Financing conditions precedent",
            "Regulatory approvals and compliance",
          ],
        },
        {
          title: "Cross-Border Financing Perspective",
          body: "Many financing transactions involve foreign lenders, offshore investors, international sponsors, development finance institutions, export credit agencies, and multinational counterparties.",
          points: [
            "Cross-border lending structures",
            "Foreign participation in Nigerian financing transactions",
            "Multi-jurisdictional documentation coordination",
            "International security considerations",
            "Regulatory interface for foreign capital deployment",
            "Transaction execution involving local and international stakeholders",
          ],
        },
      ],
      closingTitle: "Supporting Capital with Confidence",
      closingBody:
        "Whether you are a lender deploying capital, a borrower raising financing, an investor evaluating transaction risk, or a sponsor structuring a major project, Parah, Chen and King LLP provides the legal and commercial guidance required to execute financing transactions with clarity, protection, and strategic confidence.",
      ctaLabel: "Schedule a confidential consultation with our Banking & Finance team.",
    },
    {
      order: 3,
      slug: "energy-natural-resources",
      shortTitle: "Energy & Natural Resources",
      title: "Energy & Natural Resources",
      tagline: "Legal Counsel for High-Value Energy, Mining, and Resource Projects",
      intro:
        "Parah, Chen and King LLP advises investors, developers, operators, financiers, governments, and project stakeholders on the legal, regulatory, commercial, and transactional issues that arise across the energy and natural resources value chain.\n\nNigeria's extractive and infrastructure sectors present significant opportunity, but they also involve complex licensing regimes, regulatory oversight, land and environmental considerations, financing requirements, and multi-stakeholder negotiations. Our role is to help clients navigate that complexity with strategic clarity and execution-focused legal support.",
      servicesTitle: "Our Energy & Natural Resources Services",
      services: [
        "Mining and mineral rights transactions",
        "Energy project development",
        "Regulatory licensing and approvals",
        "Due diligence for acquisitions and investments",
        "Joint operating and project agreements",
        "Infrastructure and offtake arrangements",
        "Environmental and ESG compliance",
        "Government engagement and regulatory strategy",
        "Land access and project structuring",
        "Project-related disputes and enforcement matters",
      ],
      mattersTitle: "Representative Matters",
      matters: [
        "Evaluating mining and energy acquisition opportunities",
        "Conducting regulatory due diligence with relevant authorities",
        "Structuring project investments and commercial relationships",
        "Advising on compliance obligations throughout the project lifecycle",
        "Supporting negotiations among investors, operators, contractors, and public stakeholders",
        "Managing legal risk in complex infrastructure and natural resource transactions",
      ],
      whyTitle: "Why Clients Choose Us for Energy and Resource Matters",
      whyItems: [
        {
          title: "Integrated Sector Capability",
          body: "We combine corporate, finance, regulatory, environmental, tax, and dispute-resolution expertise within a single platform, enabling coordinated advice across the full project lifecycle.",
        },
        {
          title: "Strategic Regulatory Insight",
          body: "We help clients anticipate regulatory issues before they become transaction delays, financing obstacles, or operational disruptions.",
        },
        {
          title: "Investor-Oriented Execution",
          body: "Investors require timely due diligence, clear risk assessment, and commercially actionable recommendations. Our approach is designed around transaction efficiency and investment decision-making.",
        },
      ],
      extraSections: [
        {
          title: "Sector-Focused Legal and Commercial Advisory",
          body: "Energy and resource projects require lawyers who understand both the law and the commercial realities of project development. We work closely with clients from project inception through acquisition, financing, development, operation, restructuring, and dispute resolution.",
        },
        {
          title: "ESG and Sustainability Considerations",
          body: "Environmental, social, and governance considerations are now central to energy and resource projects. We advise clients on sustainability frameworks, stakeholder obligations, environmental compliance, governance standards, and risk mitigation strategies that align with evolving investor and regulatory expectations.",
        },
        {
          title: "Cross-Border Project Perspective",
          body: "Many energy and natural resource transactions involve international investors, foreign contractors, multinational operators, development finance institutions, and cross-border commercial arrangements. Our global operating perspective enables us to support clients on:",
          points: [
            "International investment structures",
            "Cross-border project documentation",
            "Foreign participation in Nigerian projects",
            "Multi-jurisdictional transaction coordination",
            "International counterpart negotiations",
          ],
        },
      ],
      closingTitle: "Positioning Projects for Long-Term Success",
      closingBody:
        "Successful energy and natural resource projects depend on more than obtaining a license. They require a legal strategy that aligns regulatory compliance, commercial viability, financing, stakeholder management, and long-term operational resilience. Parah, Chen and King LLP provides the integrated legal support required to move complex projects from opportunity to execution.",
      ctaLabel:
        "Speak with our Energy & Natural Resources team about your project, investment, or acquisition opportunity.",
    },
    {
      order: 4,
      slug: "real-estate-infrastructure",
      shortTitle: "Real Estate & Infrastructure",
      title: "Real Estate & Infrastructure",
      tagline:
        "Legal Solutions for High-Value Real Estate, Infrastructure, and Development Projects",
      intro:
        "Parah, Chen and King LLP advises developers, investors, corporations, financial institutions, governments, contractors, sponsors, and asset owners on the legal, regulatory, financing, and transactional issues that arise across the real estate and infrastructure lifecycle.\n\nReal estate and infrastructure projects are among the most capital-intensive and stakeholder-sensitive transactions in any economy. They require careful coordination of land rights, regulatory approvals, financing structures, construction arrangements, government interface, environmental considerations, and long-term operational risk.\n\nOur practice is built to provide integrated legal support from project conception through acquisition, development, financing, operation, restructuring, and dispute resolution.",
      servicesTitle: "Our Real Estate & Infrastructure Services",
      services: [
        "Commercial real estate acquisitions and disposals",
        "Land due diligence and title verification",
        "Development and joint venture structures",
        "Construction and EPC agreements",
        "Infrastructure concessions and PPP arrangements",
        "Project financing support",
        "Leasing and asset management",
        "Industrial, logistics, and mixed-use developments",
        "Government approvals and regulatory interface",
        "Environmental and ESG considerations",
        "Infrastructure-related disputes and claims",
        "Asset restructuring and portfolio optimization",
      ],
      mattersTitle: "Representative Matters",
      matters: [
        "Conducting land and title due diligence for major acquisitions",
        "Structuring development partnerships and investment vehicles",
        "Negotiating construction, concession, and project agreements",
        "Advising on infrastructure procurement and stakeholder arrangements",
        "Supporting financing transactions linked to real estate and infrastructure assets",
        "Managing legal risk across development, construction, and operational phases",
        "Assisting with disputes involving contractors, developers, investors, or public entities",
      ],
      whyTitle: "Why Clients Choose Parah, Chen and King LLP",
      whyItems: [
        {
          title: "Integrated Project Capability",
          body: "Real estate and infrastructure transactions rarely involve a single legal discipline. Our corporate, finance, regulatory, tax, ESG, dispute-resolution, and natural resources capabilities enable us to provide coordinated project advice under one platform.",
        },
        {
          title: "Government and Public-Sector Understanding",
          body: "Infrastructure projects often involve ministries, agencies, regulators, concession authorities, and public stakeholders. We understand the legal and procedural dynamics of government-facing transactions and public-private initiatives.",
        },
        {
          title: "Commercial and Bankability Focus",
          body: "Developers and financiers need projects that can attract capital and progress through execution milestones. Our advice is designed with bankability, risk allocation, and long-term asset value in mind.",
        },
      ],
      extraSections: [
        {
          title: "Strategic Counsel for Complex Projects",
          body: "We understand that successful projects depend on more than legal compliance. They depend on structuring transactions in a way that is commercially viable, bankable, and capable of withstanding regulatory and operational scrutiny. Our lawyers work closely with clients to identify risks early, preserve transaction momentum, and align legal strategy with development objectives.",
        },
        {
          title: "Public-Private Partnerships and Infrastructure Delivery",
          body: "Nigeria's infrastructure gap continues to create significant opportunities in transportation, power, utilities, housing, industrial development, logistics, and social infrastructure. Our role is to help clients navigate the intersection of public policy, regulation, financing, and commercial execution.",
          points: [
            "Public-private partnership (PPP) projects",
            "Concession arrangements",
            "Build-operate-transfer structures",
            "Infrastructure investment platforms",
            "Government procurement and project delivery frameworks",
            "Sponsor, contractor, and lender coordination",
          ],
        },
        {
          title: "Real Estate Investment and Asset Protection",
          body: "For institutional investors, family offices, corporations, and high-net-worth stakeholders, real estate is both an operational asset and a wealth-preservation vehicle.",
          points: [
            "Acquisition structuring",
            "Holding and SPV arrangements",
            "Portfolio optimization",
            "Lease and revenue structures",
            "Asset protection considerations",
            "Tax-sensitive transaction planning",
            "Cross-border ownership and investment issues",
          ],
        },
        {
          title: "ESG, Sustainability, and Long-Term Value",
          body: "Investors, lenders, and regulators increasingly expect infrastructure and real estate projects to meet environmental, social, governance, and sustainability standards. We help clients integrate ESG considerations into project planning, stakeholder engagement, compliance frameworks, financing discussions, and long-term operational strategy.",
        },
        {
          title: "Cross-Border Development Perspective",
          body: "Many major Nigerian real estate and infrastructure projects involve foreign investors, international contractors, development finance institutions, export credit agencies, and multinational project participants.",
          points: [
            "Foreign investment into Nigerian real estate and infrastructure",
            "Cross-border development structures",
            "International project documentation",
            "Multi-jurisdictional transaction coordination",
            "Regulatory interface for foreign participants",
            "Complex stakeholder negotiations across jurisdictions",
          ],
        },
      ],
      closingTitle: "From Land to Legacy",
      closingBody:
        "Whether you are acquiring strategic land, developing a commercial asset, structuring a PPP project, financing infrastructure, or managing a large-scale development portfolio, Parah, Chen and King LLP provides the integrated legal support required to move projects from opportunity to execution and from execution to enduring value.",
      ctaLabel:
        "Speak with our Real Estate & Infrastructure team about your project, investment, or development opportunity.",
    },
    {
      order: 5,
      slug: "dispute-resolution-litigation",
      shortTitle: "Disputes & Litigation",
      title: "Dispute Resolution & Litigation",
      tagline: "Strategic Advocacy for High-Stakes Commercial Disputes",
      intro:
        "Parah, Chen and King LLP represents businesses, investors, financial institutions, insurers, project stakeholders, and public-sector entities in complex commercial disputes, litigation, arbitration, and regulatory enforcement matters.\n\nWhen disputes threaten capital, operations, reputation, contractual relationships, or strategic objectives, clients need more than courtroom representation. They need counsel that understands the commercial consequences of every procedural and strategic decision.",
      servicesTitle: "Our Dispute Resolution Services",
      services: [
        "Commercial and contractual disputes",
        "Shareholder and partnership conflicts",
        "Banking and finance disputes",
        "Insurance claims and coverage disputes",
        "Construction and infrastructure disputes",
        "Energy and natural resource disputes",
        "Regulatory investigations and enforcement actions",
        "Debt recovery and asset tracing",
        "Insolvency-related litigation",
        "Arbitration and alternative dispute resolution",
      ],
      mattersTitle: "Representative Matters",
      matters: [
        "Enforcing commercial contracts and payment obligations",
        "Defending complex claims involving significant financial exposure",
        "Resolving disputes arising from investments, joint ventures, and project arrangements",
        "Managing urgent injunction and preservation proceedings",
        "Coordinating litigation strategy alongside restructuring, regulatory, or transaction objectives",
        "Pursuing negotiated resolutions where commercially advantageous",
      ],
      whyTitle: "Why Clients Trust Our Disputes Team",
      whyItems: [
        {
          title: "Strategic, Not Reactive",
          body: "We develop dispute strategies aligned with the client's broader commercial goals, including recovery, preservation of relationships, operational continuity, and long-term business positioning.",
        },
        {
          title: "Strong Advocacy, Practical Judgment",
          body: "Aggressive litigation is not always the best answer. We pursue the approach that delivers the strongest legal and commercial outcome for the client.",
        },
        {
          title: "Multidisciplinary Support",
          body: "Complex disputes often involve corporate, financial, tax, regulatory, insolvency, and sector-specific issues. Our full-service platform allows us to address those issues in a coordinated manner.",
        },
      ],
      extraSections: [
        {
          title: "A Business-Oriented Approach to Disputes",
          body: "Our dispute-resolution practice is built on the principle that litigation is a strategic business event, not merely a legal process. We help clients evaluate:",
          points: [
            "The strength of their legal position",
            "Commercial exposure and recovery potential",
            "Regulatory and reputational implications",
            "Settlement versus litigation strategy",
            "Enforcement considerations",
            "Cross-border dispute risks",
          ],
        },
        {
          title: "Arbitration and Alternative Dispute Resolution",
          body: "Many commercial relationships require confidential, efficient, and specialized dispute mechanisms. We advise clients on arbitration clauses, arbitral proceedings, mediation, negotiated settlements, and enforcement of arbitral awards.",
        },
        {
          title: "Cross-Border and Multi-Jurisdictional Disputes",
          body: "We regularly advise on disputes involving international counterparties, foreign investments, cross-border contractual arrangements, and multi-jurisdictional enforcement considerations. Our global operating perspective helps clients manage disputes that extend beyond a single legal system.",
        },
      ],
      closingTitle: "Protecting What Matters Most",
      closingBody:
        "Whether you are seeking to enforce a contract, defend a significant claim, resolve a shareholder conflict, recover assets, or manage a complex regulatory dispute, Parah, Chen and King LLP provides strategic advocacy designed to protect value, preserve leverage, and position clients for the strongest possible outcome.",
      ctaLabel: "Contact our Dispute Resolution & Litigation team for a confidential case assessment.",
    },
    {
      order: 6,
      slug: "regulatory-tax-esg",
      shortTitle: "Regulatory, Tax & ESG",
      title: "Regulatory, Tax & ESG",
      tagline: "Compliance, Taxation, Sustainability, and Public-Sector Obligations",
      intro:
        "Parah, Chen and King LLP advises clients on compliance, taxation, sustainability, governance, and public-sector obligations across Nigerian and international markets.",
      servicesTitle: "Our Services",
      services: [],
      mattersTitle: "Representative Matters",
      matters: [],
      whyTitle: "Why Clients Choose Us",
      whyItems: [],
      extraSections: [],
      closingTitle: "Let's Talk About Your Compliance Needs",
      closingBody:
        "Whether you are managing regulatory exposure, structuring a tax-efficient transaction, or building an ESG framework investors can trust, our team is ready to help.",
      ctaLabel: "Schedule a confidential consultation with our Regulatory, Tax & ESG team.",
    },
    {
      order: 7,
      slug: "ip-wealth-insurance",
      shortTitle: "IP, Wealth & Insurance",
      title: "IP, Wealth & Insurance",
      tagline: "Intellectual Property, Asset Protection, Wealth Management, and Insurance Advisory",
      intro:
        "Parah, Chen and King LLP advises clients on intellectual property, asset protection, wealth management, and insurance advisory matters across Nigerian and international markets.",
      servicesTitle: "Our Services",
      services: [],
      mattersTitle: "Representative Matters",
      matters: [],
      whyTitle: "Why Clients Choose Us",
      whyItems: [],
      extraSections: [],
      closingTitle: "Protect What You've Built",
      closingBody:
        "Whether you are protecting a brand, structuring wealth, or reviewing insurance exposure, our team is ready to help you safeguard what matters most.",
      ctaLabel: "Schedule a confidential consultation with our IP, Wealth & Insurance team.",
    },
  ];

  for (const area of practiceAreas) {
    await prisma.practiceArea.upsert({
      where: { slug: area.slug },
      update: area,
      create: area,
    });
  }

  // --- Partners ---
  const partners = [
    {
      order: 1,
      name: "David E. Umem",
      credentials: "Esq.",
      title: "Principal Partner",
      photoUrl: "",
      quote:
        "Human development is the highest form of development, and the greatest innovations emerge from the potential of the human mind.",
      bio: "David E. Umem provides strategic leadership and legal expertise across the firm's diverse practice areas. A seasoned lawyer and advocate, he combines a strong background in law, organisational management, financial administration, and international consultancy to deliver innovative solutions for clients, institutions, and communities.\n\nHe holds a Bachelor of Laws (LL.B) degree and a Diploma in Accounting, giving him a distinctive foundation in both legal practice and financial management. This interdisciplinary perspective enables him to approach complex commercial and regulatory matters with a balanced understanding of legal risk, operational realities, and strategic decision-making.\n\nDavid's professional journey extends beyond traditional legal practice. He has served in leadership roles within international organisations, including as Program Manager at WN International, Brazil, and as a Board Member of Land of Hope, Denmark, and Children Philanthropy, Singapore. These engagements have provided him with significant experience in governance, international collaboration, stakeholder management, and mission-driven leadership.\n\nHe is also widely recognised as the Founder and Executive Director of the African Children's Aid Education and Development Foundation (ACAEDF), home to the internationally known Land of Hope Children's Center. Through this work, he has led transformative initiatives focused on child welfare, education, community development, and social justice across Africa.\n\nHis contributions to the legal profession, humanitarian service, and community development have been acknowledged through numerous national and international awards and recognitions.\n\nAt Parah, Chen and King LLP, David's philosophy is rooted in the conviction that human development is the highest form of development, and that the greatest innovations emerge from the potential of the human mind. This philosophy informs his approach to legal practice, leadership, mentorship, and institutional growth.\n\nHis dual commitment to legal excellence and social impact continues to shape the firm's culture and strengthen its mission of using the law as a tool for sustainable progress.",
      practiceFocus: [
        "Corporate and Commercial Advisory",
        "Governance and Institutional Leadership",
        "International and Cross-Border Engagements",
        "Strategic Regulatory Advisory",
        "Public Interest and Development-Oriented Legal Matters",
      ],
    },
    {
      order: 2,
      name: "Grace Kalu",
      credentials: "Esq.",
      title: "Managing Partner",
      photoUrl: "",
      quote: "",
      bio: "Grace Kalu serves as the Managing Partner of Parah, Chen and King LLP, where she leads the firm's operations, strategy, and client engagement with a blend of legal precision, commercial intelligence, and transformative leadership.\n\nHer practice reflects a rare intersection of corporate law, regulatory compliance, intellectual property, technology, and digital strategy, positioning her as a trusted adviser to businesses, founders, investors, and institutions navigating complex legal and commercial environments.\n\nGrace is a First-Class graduate of the Nigerian Law School and holds a Master of Laws (LL.M). She is also pursuing an MBA at the Lagos Business School, further strengthening her ability to integrate sophisticated legal analysis with business strategy, financial decision-making, and organisational leadership.\n\nHer professional reputation has earned significant national and continental recognition. She has been named among the Top 15 Under 40 Lawyers in Nigeria, recognised as one of the 50 Leading Female Lawyers in Nigeria, and honoured as one of the 25 Africans Changing the Face of Education and Creating Sustainable Impact in Africa (2023).\n\nThese recognitions reflect not only her legal accomplishments, but also her broader influence in innovation, leadership, education, and sustainable development.\n\nAt Parah, Chen and King LLP, Grace channels this award-winning drive into advancing the firm's mission of delivering exceptional legal services while fostering innovation, equity, institutional excellence, and long-term impact for clients and communities alike.\n\nShe is particularly known for bringing a commercially strategic lens to legal advisory, helping clients translate regulatory complexity into practical business opportunities and actionable growth strategies.",
      practiceFocus: [
        "Corporate and Commercial Law",
        "Regulatory Compliance and Risk Management",
        "Intellectual Property and Technology Law",
        "Strategic Business Advisory",
        "Digital and Innovation-Focused Legal Solutions",
        "Cross-Border Commercial Transactions",
      ],
    },
  ];

  for (const partner of partners) {
    const existing = await prisma.partner.findFirst({ where: { name: partner.name } });
    if (existing) {
      await prisma.partner.update({ where: { id: existing.id }, data: partner });
    } else {
      await prisma.partner.create({ data: partner });
    }
  }

  console.log("Seed complete.");
  console.log(`Admin login -> email: ${ADMIN_EMAIL}  password: ${ADMIN_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
