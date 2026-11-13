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
      firmName: "Parah, Chen and King Attorneys",
      shortName: "PCK Attorneys",
      tagline:
        "Turning legal complexity into strategic advantage for businesses, investors, and governments worldwide.",
      logoText: "PCK",
      primaryColor: "#0B2545",
      secondaryColor: "#C9A227",
      accentColor: "#13315C",
      neutralColor: "#F7F5F0",
      headingFont: "libreCaslon",
      bodyFont: "sourceSans",
      phone: "+234 (0) 900 000 0000",
      email: "consult@pckattorneys.com",
      address: "Plot 1, Central Business District",
      city: "Abuja",
      country: "Nigeria",
      officeHours: "Monday – Friday, 9:00am – 5:00pm",
    },
  });

  // --- Homepage ---
  await prisma.homePage.upsert({
    where: { id: "home" },
    update: {},
    create: {
      heroEyebrow: "Abuja · Global Commercial Counsel",
      heroHeadline: "Strategic Legal Counsel for Businesses, Investors, and Governments",
      heroSubheadline:
        "Parah, Chen and King Attorneys is a full-service commercial law firm headquartered in Abuja, Nigeria, advising founders, investors, corporations, financial institutions, and public-sector entities on complex transactions, regulatory matters, disputes, and cross-border opportunities across global markets.",
      heroPrimaryCta: "Schedule a Consultation",
      heroSecondaryCta: "Speak With Our Team",
      heroImage: "",
      trustBarItems: [
        "Abuja Headquarters",
        "Global Operations",
        "Full-Service Commercial Practice",
        "Cross-Border Transactions",
        "Regulatory & Strategic Advisory",
      ],
      valuePropTitle: "We Show Clients How the Law Can Work for Them",
      valuePropBody: [
        "At Parah, Chen and King Attorneys, we believe legal counsel should do more than identify risk—it should create pathways for growth, investment, protection, and long-term value.",
        "Whether a client is launching a venture, raising capital, acquiring assets, navigating regulation, resolving a dispute, or executing a major infrastructure or energy project, our role is to provide clear answers, practical strategy, and decisive legal execution.",
        "Complex matters rarely come with simple instructions. Our clients come to us because they need lawyers who can think commercially, respond decisively, and move matters forward.",
      ],
      practiceOverviewTitle: "Full-Service Commercial Legal Solutions",
      practiceOverviewCta: "Explore Our Practice Areas",
      whyChooseUsTitle: "Why Leading Clients Choose Parah, Chen and King Attorneys",
      whyChooseUsIntro:
        "We combine deep knowledge of Nigerian law with the commercial realities of international transactions, investment structures, and cross-border operations.",
      whyChooseUsItems: [
        {
          title: "Commercially Intelligent Advice",
          body: "Our recommendations are designed not only to protect legal interests, but also to support business objectives, investor confidence, and operational efficiency.",
        },
        {
          title: "Decisive Problem Solving",
          body: "Clients rely on us when matters are urgent, complex, or high-stakes because we provide clear direction, practical options, and responsive execution.",
        },
        {
          title: "Clarity in Complexity",
          body: "We explain sophisticated legal issues in language decision-makers can act on, enabling founders, executives, investors, and public officials to move forward with confidence.",
        },
      ],
      aboutPreviewTitle: "A Firm Built for Complex Commercial Environments",
      aboutPreviewBody:
        "Headquartered in Abuja and operating across global markets, Parah, Chen and King Attorneys was established to serve clients whose legal needs extend beyond a single jurisdiction or a single discipline. Our lawyers work at the intersection of law, business, finance, regulation, and public policy—providing integrated advice that reflects the realities of modern commerce.",
      aboutPreviewImage: "",
      aboutPreviewCta: "Learn More About the Firm",
      finalCtaTitle: "Need Strategic Legal Guidance?",
      finalCtaBody:
        "Whether you are structuring an investment, negotiating a transaction, managing regulatory exposure, resolving a dispute, or pursuing a major infrastructure, energy, or commercial opportunity, our team is prepared to help you assess risk, identify opportunity, and take the next step with confidence.",
      finalCtaPrimary: "Schedule a Confidential Consultation",
      finalCtaSecondary: "Contact the Firm",
    },
  });

  // --- About page ---
  await prisma.aboutPage.upsert({
    where: { id: "about" },
    update: {},
    create: {
      heroTitle: "About Parah, Chen and King Attorneys",
      heroSubtitle: "A Firm Built for Complex Commercial Realities",
      intro:
        "Parah, Chen and King Attorneys is a full-service commercial law firm headquartered in Abuja, Nigeria, serving clients across domestic and international markets. We advise founders, investors, corporations, financial institutions, development partners, and public-sector entities on matters that demand strategic legal thinking, commercial judgment, and decisive execution.\n\nOur practice spans corporate and commercial law, banking and finance, intellectual property, dispute resolution, ESG, restructuring and insolvency, litigation, insurance, wealth and asset management, regulatory compliance, taxation, real estate, infrastructure, energy, and natural resources.\n\nIn an increasingly interconnected economy, legal issues rarely exist in isolation. A financing transaction may raise regulatory questions. An infrastructure project may involve land, environmental, tax, and government considerations. A commercial dispute may affect investor confidence and operational continuity. We are structured to provide integrated legal solutions that reflect the full commercial context in which our clients operate.",
      storyTitle: "Our Story",
      storyBody:
        "Parah, Chen and King Attorneys was founded on a simple but powerful conviction: the law should be a tool for progress, not an obstacle to it.\n\nToo often, businesses encounter legal advice that identifies problems without creating pathways forward. We established this firm to offer a different kind of counsel—advice that is legally rigorous, commercially intelligent, and oriented toward practical outcomes.\n\nFrom early-stage founders seeking clarity on corporate structure, to investors evaluating complex transactions, to government stakeholders navigating infrastructure and regulatory projects, our clients come to us because they need lawyers who can analyze complexity, provide clear direction, and help move critical matters forward with confidence.",
      missionText:
        "To provide strategic legal counsel that enables businesses, investors, institutions, and governments to navigate complexity, manage risk, unlock opportunity, and create long-term value across local and global markets.",
      visionText:
        "To be a globally respected African commercial law firm known for transforming legal complexity into strategic advantage for clients operating in high-growth and high-impact sectors.",
      philosophyTitle: "The Law Must Work for the Client",
      philosophyBody:
        "At the center of our practice is a principle that guides every engagement: we show clients how the law can work for them.\n\nThis means we do not approach legal problems with a purely academic mindset. We begin by understanding the client's objective—growth, investment, protection, restructuring, expansion, compliance, dispute resolution, or public impact—and then design a legal strategy aligned with that objective.",
      philosophyQuestions: [
        "What is legally permissible?",
        "What is commercially sensible?",
        "What is strategically sustainable?",
        "What will move the client closer to the desired outcome?",
      ],
      approachItems: [
        {
          title: "Commercial First",
          body: "We understand that legal decisions are business decisions. Our advice is grounded in commercial reality, market dynamics, and operational practicality.",
        },
        {
          title: "Clarity Over Complexity",
          body: "Sophisticated legal issues should not require a law degree to understand. We communicate with precision, transparency, and actionable clarity.",
        },
        {
          title: "Integrated Thinking",
          body: "Our multidisciplinary practice allows us to connect corporate, financial, regulatory, tax, litigation, and sector-specific considerations into a unified legal strategy.",
        },
        {
          title: "Responsive Execution",
          body: "In high-stakes matters, timing matters. We prioritize responsiveness, clear communication, and efficient execution so clients can make informed decisions without unnecessary delay.",
        },
      ],
      whoWeServeItems: [
        {
          title: "Founders and Growth Companies",
          body: "We help entrepreneurs build strong legal foundations, raise capital, protect intellectual property, negotiate commercial agreements, and scale with confidence.",
        },
        {
          title: "Investors and Financial Institutions",
          body: "We advise on transactions, due diligence, financing structures, regulatory exposure, asset protection, and cross-border investment opportunities.",
        },
        {
          title: "Corporations and Multinationals",
          body: "We provide ongoing commercial counsel, compliance support, dispute management, employment and governance advice, and strategic legal partnership across business operations.",
        },
        {
          title: "Governments and Public-Sector Stakeholders",
          body: "We support infrastructure development, public-private initiatives, regulatory frameworks, energy and natural resource projects, and matters involving complex stakeholder coordination.",
        },
      ],
      globalTitle: "Global Perspective, Local Strength",
      globalBody:
        "Although headquartered in Abuja, our outlook is inherently international. We regularly work on matters involving foreign investors, cross-border transactions, international counterparties, and global regulatory considerations.",
      globalPoints: [
        "Deep understanding of Nigerian legal and regulatory systems",
        "Appreciation of international business expectations",
        "Practical transaction experience",
        "Sector-specific commercial insight",
      ],
      standardTitle: "The Standard We Hold Ourselves To",
      standardIntro:
        "Clients often engage Parah, Chen and King Attorneys at moments of significant consequence—when capital is being deployed, businesses are being acquired, projects are being negotiated, disputes are escalating, or regulatory scrutiny is increasing.",
      standardPoints: [
        "Rigorous legal analysis",
        "Clear strategic advice",
        "Practical commercial solutions",
        "Decisive execution",
        "Unwavering client focus",
      ],
      closingBody:
        "Whether you are launching a venture, structuring an investment, negotiating a major transaction, managing regulatory risk, resolving a dispute, or pursuing a transformative infrastructure or energy opportunity, Parah, Chen and King Attorneys is prepared to serve as your strategic legal partner.",
    },
  });

  // --- Contact page ---
  await prisma.contactPage.upsert({
    where: { id: "contact" },
    update: {},
    create: {
      heroTitle: "Schedule a Confidential Consultation",
      heroSubtitle:
        "Tell us about your matter and a member of our team will respond promptly to arrange a consultation.",
      formIntro: "All submissions are treated as strictly confidential.",
    },
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
        "Parah, Chen and King Attorneys advises founders, growth companies, multinational corporations, investors, and public-sector entities on the legal and commercial decisions that shape business performance, investment readiness, and long-term enterprise value.\n\nFrom incorporation and governance to complex commercial transactions and cross-border expansion, we help clients structure opportunities, manage risk, and execute with confidence.",
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
      whyTitle: "Why Businesses Choose Parah, Chen and King Attorneys",
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
        "Whether you are launching a new venture, negotiating a strategic partnership, raising capital, acquiring a business, or expanding into new markets, Parah, Chen and King Attorneys provides the legal and commercial guidance required to protect value and accelerate opportunity.",
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
        "Parah, Chen and King Attorneys advises banks, financial institutions, investors, corporates, sponsors, development finance stakeholders, and public-sector entities on complex financing transactions, regulatory obligations, security arrangements, and strategic capital deployment across Nigerian and international markets.\n\nIn today's financial environment, transactions are shaped by evolving regulation, cross-border capital flows, collateral considerations, investor expectations, and execution timelines. Our Banking & Finance practice is designed to help clients structure transactions efficiently, protect their interests, and move capital with confidence.",
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
      whyTitle: "Why Clients Choose Parah, Chen and King Attorneys",
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
        "Whether you are a lender deploying capital, a borrower raising financing, an investor evaluating transaction risk, or a sponsor structuring a major project, Parah, Chen and King Attorneys provides the legal and commercial guidance required to execute financing transactions with clarity, protection, and strategic confidence.",
      ctaLabel: "Schedule a confidential consultation with our Banking & Finance team.",
    },
    {
      order: 3,
      slug: "energy-natural-resources",
      shortTitle: "Energy & Natural Resources",
      title: "Energy & Natural Resources",
      tagline: "Legal Counsel for High-Value Energy, Mining, and Resource Projects",
      intro:
        "Parah, Chen and King Attorneys advises investors, developers, operators, financiers, governments, and project stakeholders on the legal, regulatory, commercial, and transactional issues that arise across the energy and natural resources value chain.\n\nNigeria's extractive and infrastructure sectors present significant opportunity, but they also involve complex licensing regimes, regulatory oversight, land and environmental considerations, financing requirements, and multi-stakeholder negotiations. Our role is to help clients navigate that complexity with strategic clarity and execution-focused legal support.",
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
        "Successful energy and natural resource projects depend on more than obtaining a license. They require a legal strategy that aligns regulatory compliance, commercial viability, financing, stakeholder management, and long-term operational resilience. Parah, Chen and King Attorneys provides the integrated legal support required to move complex projects from opportunity to execution.",
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
        "Parah, Chen and King Attorneys advises developers, investors, corporations, financial institutions, governments, contractors, sponsors, and asset owners on the legal, regulatory, financing, and transactional issues that arise across the real estate and infrastructure lifecycle.\n\nReal estate and infrastructure projects are among the most capital-intensive and stakeholder-sensitive transactions in any economy. They require careful coordination of land rights, regulatory approvals, financing structures, construction arrangements, government interface, environmental considerations, and long-term operational risk.\n\nOur practice is built to provide integrated legal support from project conception through acquisition, development, financing, operation, restructuring, and dispute resolution.",
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
      whyTitle: "Why Clients Choose Parah, Chen and King Attorneys",
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
        "Whether you are acquiring strategic land, developing a commercial asset, structuring a PPP project, financing infrastructure, or managing a large-scale development portfolio, Parah, Chen and King Attorneys provides the integrated legal support required to move projects from opportunity to execution and from execution to enduring value.",
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
        "Parah, Chen and King Attorneys represents businesses, investors, financial institutions, insurers, project stakeholders, and public-sector entities in complex commercial disputes, litigation, arbitration, and regulatory enforcement matters.\n\nWhen disputes threaten capital, operations, reputation, contractual relationships, or strategic objectives, clients need more than courtroom representation. They need counsel that understands the commercial consequences of every procedural and strategic decision.",
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
        "Whether you are seeking to enforce a contract, defend a significant claim, resolve a shareholder conflict, recover assets, or manage a complex regulatory dispute, Parah, Chen and King Attorneys provides strategic advocacy designed to protect value, preserve leverage, and position clients for the strongest possible outcome.",
      ctaLabel: "Contact our Dispute Resolution & Litigation team for a confidential case assessment.",
    },
    {
      order: 6,
      slug: "regulatory-tax-esg",
      shortTitle: "Regulatory, Tax & ESG",
      title: "Regulatory, Tax & ESG",
      tagline: "Compliance, Taxation, Sustainability, and Public-Sector Obligations",
      intro:
        "Parah, Chen and King Attorneys advises clients on compliance, taxation, sustainability, governance, and public-sector obligations across Nigerian and international markets.",
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
        "Parah, Chen and King Attorneys advises clients on intellectual property, asset protection, wealth management, and insurance advisory matters across Nigerian and international markets.",
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

  // Only create practice areas that don't exist yet. This script is safe to re-run on every
  // deploy (e.g. as part of the build step) without ever clobbering edits made in /admin.
  for (const area of practiceAreas) {
    const existing = await prisma.practiceArea.findUnique({ where: { slug: area.slug } });
    if (!existing) {
      await prisma.practiceArea.create({ data: area });
    }
  }

  // --- Partners ---
  const partners = [
    {
      order: 1,
      name: "David E. Umem",
      credentials: "Esq.",
      title: "Principal Partner",
      photoUrl: "/images/partners/david-umem.webp",
      email: "davidumem@pckattorneys.com",
      phone: "+234 808 789 6082",
      quote:
        "Human development is the highest form of development, and the greatest innovations emerge from the potential of the human mind.",
      bio: "David E. Umem provides strategic leadership and legal expertise across the firm's diverse practice areas. A seasoned lawyer and advocate, he combines a strong background in law, organisational management, financial administration, and international consultancy to deliver innovative solutions for clients, institutions, and communities.\n\nHe holds a Bachelor of Laws (LL.B) degree and a Diploma in Accounting, giving him a distinctive foundation in both legal practice and financial management. This interdisciplinary perspective enables him to approach complex commercial and regulatory matters with a balanced understanding of legal risk, operational realities, and strategic decision-making.\n\nDavid's professional journey extends beyond traditional legal practice. He has served in leadership roles within international organisations, including as Program Manager at WN International, Brazil, and as a Board Member of Land of Hope, Denmark, and Children Philanthropy, Singapore. These engagements have provided him with significant experience in governance, international collaboration, stakeholder management, and mission-driven leadership.\n\nHe is also widely recognised as the Founder and Executive Director of the African Children's Aid Education and Development Foundation (ACAEDF), home to the internationally known Land of Hope Children's Center. Through this work, he has led transformative initiatives focused on child welfare, education, community development, and social justice across Africa.\n\nHis contributions to the legal profession, humanitarian service, and community development have been acknowledged through numerous national and international awards and recognitions.\n\nAt Parah, Chen and King Attorneys, David's philosophy is rooted in the conviction that human development is the highest form of development, and that the greatest innovations emerge from the potential of the human mind. This philosophy informs his approach to legal practice, leadership, mentorship, and institutional growth.\n\nHis dual commitment to legal excellence and social impact continues to shape the firm's culture and strengthen its mission of using the law as a tool for sustainable progress.",
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
      photoUrl: "/images/partners/grace-kalu.webp",
      email: "gracekalu@pckattorneys.com",
      phone: "+234 806 717 6550",
      quote: "",
      bio: "Grace Kalu serves as the Managing Partner of Parah, Chen and King Attorneys, where she leads the firm's operations, strategy, and client engagement with a blend of legal precision, commercial intelligence, and transformative leadership.\n\nHer practice reflects a rare intersection of corporate law, regulatory compliance, intellectual property, technology, and digital strategy, positioning her as a trusted adviser to businesses, founders, investors, and institutions navigating complex legal and commercial environments.\n\nGrace is a First-Class graduate of the Nigerian Law School and holds a Master of Laws (LL.M). She is also pursuing an MBA at the Lagos Business School, further strengthening her ability to integrate sophisticated legal analysis with business strategy, financial decision-making, and organisational leadership.\n\nHer professional reputation has earned significant national and continental recognition. She has been named among the Top 15 Under 40 Lawyers in Nigeria, recognised as one of the 50 Leading Female Lawyers in Nigeria, and honoured as one of the 25 Africans Changing the Face of Education and Creating Sustainable Impact in Africa (2023).\n\nThese recognitions reflect not only her legal accomplishments, but also her broader influence in innovation, leadership, education, and sustainable development.\n\nAt Parah, Chen and King Attorneys, Grace channels this award-winning drive into advancing the firm's mission of delivering exceptional legal services while fostering innovation, equity, institutional excellence, and long-term impact for clients and communities alike.\n\nShe is particularly known for bringing a commercially strategic lens to legal advisory, helping clients translate regulatory complexity into practical business opportunities and actionable growth strategies.",
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

  // Same rule as practice areas: only create partners that don't exist yet, never overwrite.
  // The exceptions are contact details and photos, added after partners were first seeded: they
  // are filled in only where still blank, so anything set in admin is left alone.
  for (const partner of partners) {
    const existing = await prisma.partner.findFirst({ where: { name: partner.name } });
    if (!existing) {
      await prisma.partner.create({ data: partner });
      continue;
    }
    const backfill = {};
    if (!existing.email && !existing.phone) {
      backfill.email = partner.email;
      backfill.phone = partner.phone;
    }
    if (!existing.photoUrl) backfill.photoUrl = partner.photoUrl;
    if (Object.keys(backfill).length > 0) {
      await prisma.partner.update({ where: { id: existing.id }, data: backfill });
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
