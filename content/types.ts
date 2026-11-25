export type TitleBody = { title: string; body: string };

export type ExtraSection = TitleBody & { points: string[] };

export type SiteSettings = {
  firmName: string;
  tagline: string;
  logoText: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  neutralColor: string;
  radius: string;
  headingFont: string;
  bodyFont: string;
  phone: string;
  email: string;
  city: string;
  officeHours: string;
};

export type HomeContent = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroImage: string;
  trustBarItems: string[];
  valuePropTitle: string;
  valuePropBody: string[];
  practiceOverviewTitle: string;
  practiceOverviewCta: string;
  whyChooseUsTitle: string;
  whyChooseUsIntro: string;
  whyChooseUsItems: TitleBody[];
  aboutPreviewTitle: string;
  aboutPreviewBody: string;
  aboutPreviewImage: string;
  aboutPreviewCta: string;
  finalCtaTitle: string;
  finalCtaBody: string;
  finalCtaPrimary: string;
  finalCtaSecondary: string;
};

export type AboutContent = {
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  storyTitle: string;
  storyBody: string;
  missionText: string;
  visionText: string;
  philosophyTitle: string;
  philosophyBody: string;
  philosophyQuestions: string[];
  approachItems: TitleBody[];
  whoWeServeItems: TitleBody[];
  globalTitle: string;
  globalBody: string;
  globalPoints: string[];
  standardTitle: string;
  standardIntro: string;
  standardPoints: string[];
  closingBody: string;
};

export type ContactContent = {
  heroTitle: string;
  heroSubtitle: string;
  formIntro: string;
};

export type PracticeArea = {
  slug: string;
  shortTitle: string;
  title: string;
  tagline: string;
  intro: string;
  servicesTitle: string;
  services: string[];
  mattersTitle: string;
  matters: string[];
  whyTitle: string;
  whyItems: TitleBody[];
  extraSections: ExtraSection[];
  closingTitle: string;
  closingBody: string;
  ctaLabel: string;
  heroImage: string;
};

export type Partner = {
  id: string;
  name: string;
  credentials: string;
  title: string;
  photoUrl: string;
  email: string;
  phone: string;
  bio: string;
  quote: string;
  practiceFocus: string[];
};

export type HeroSlide = {
  id: string;
  label: string;
  eyebrow: string;
  headline: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
};
