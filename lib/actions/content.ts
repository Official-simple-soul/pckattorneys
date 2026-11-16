"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

type ActionResult = { success: boolean; error?: string };

// --- Homepage ---

const homePageSchema = z.object({
  heroEyebrow: z.string(),
  heroHeadline: z.string().min(1),
  heroSubheadline: z.string().min(1),
  heroPrimaryCta: z.string(),
  heroSecondaryCta: z.string(),
  heroImage: z.string().optional().default(""),
  trustBarItems: z.array(z.string()),
  valuePropTitle: z.string(),
  valuePropBody: z.array(z.string()),
  practiceOverviewTitle: z.string(),
  practiceOverviewCta: z.string(),
  whyChooseUsTitle: z.string(),
  whyChooseUsIntro: z.string(),
  whyChooseUsItems: z.array(z.object({ title: z.string(), body: z.string() })),
  aboutPreviewTitle: z.string(),
  aboutPreviewBody: z.string(),
  aboutPreviewImage: z.string().optional().default(""),
  aboutPreviewCta: z.string(),
  finalCtaTitle: z.string(),
  finalCtaBody: z.string(),
  finalCtaPrimary: z.string(),
  finalCtaSecondary: z.string(),
});

export async function updateHomePage(values: unknown): Promise<ActionResult> {
  const parsed = homePageSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };
  await prisma.homePage.update({ where: { id: "home" }, data: parsed.data });
  revalidatePath("/", "layout");
  return { success: true };
}

// --- About page ---

const aboutPageSchema = z.object({
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  intro: z.string(),
  storyTitle: z.string(),
  storyBody: z.string(),
  missionText: z.string(),
  visionText: z.string(),
  philosophyTitle: z.string(),
  philosophyBody: z.string(),
  philosophyQuestions: z.array(z.string()),
  approachItems: z.array(z.object({ title: z.string(), body: z.string() })),
  whoWeServeItems: z.array(z.object({ title: z.string(), body: z.string() })),
  globalTitle: z.string(),
  globalBody: z.string(),
  globalPoints: z.array(z.string()),
  standardTitle: z.string(),
  standardIntro: z.string(),
  standardPoints: z.array(z.string()),
  closingBody: z.string(),
});

export async function updateAboutPage(values: unknown): Promise<ActionResult> {
  const parsed = aboutPageSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };
  await prisma.aboutPage.update({ where: { id: "about" }, data: parsed.data });
  revalidatePath("/about");
  return { success: true };
}

// --- Contact page ---

const contactPageSchema = z.object({
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  formIntro: z.string(),
});

export async function updateContactPage(values: unknown): Promise<ActionResult> {
  const parsed = contactPageSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };
  await prisma.contactPage.update({ where: { id: "contact" }, data: parsed.data });
  revalidatePath("/contact");
  return { success: true };
}

// --- Practice areas ---

const extraSectionSchema = z.object({
  title: z.string(),
  body: z.string(),
  points: z.array(z.string()),
});

const practiceAreaSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  shortTitle: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string(),
  intro: z.string(),
  servicesTitle: z.string(),
  services: z.array(z.string()),
  mattersTitle: z.string(),
  matters: z.array(z.string()),
  whyTitle: z.string(),
  whyItems: z.array(z.object({ title: z.string(), body: z.string() })),
  extraSections: z.array(extraSectionSchema),
  closingTitle: z.string(),
  closingBody: z.string(),
  ctaLabel: z.string(),
  heroImage: z.string().optional().default(""),
});

export async function createPracticeArea(values: unknown): Promise<ActionResult> {
  const parsed = practiceAreaSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const existing = await prisma.practiceArea.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) return { success: false, error: "A practice area with this slug already exists." };

  const count = await prisma.practiceArea.count();
  await prisma.practiceArea.create({ data: { ...parsed.data, order: count } });
  revalidatePath("/", "layout");
  redirect("/admin/practice-areas");
}

export async function updatePracticeArea(id: string, values: unknown): Promise<ActionResult> {
  const parsed = practiceAreaSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const existing = await prisma.practiceArea.findUnique({ where: { slug: parsed.data.slug } });
  if (existing && existing.id !== id) {
    return { success: false, error: "A practice area with this slug already exists." };
  }

  await prisma.practiceArea.update({ where: { id }, data: parsed.data });
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deletePracticeArea(id: string) {
  await prisma.practiceArea.delete({ where: { id } });
  revalidatePath("/", "layout");
}

// --- Partners ---

const partnerSchema = z.object({
  name: z.string().min(1),
  credentials: z.string(),
  title: z.string().min(1),
  photoUrl: z.string().optional().default(""),
  email: z.union([z.literal(""), z.email("Enter a valid email address.")]).optional().default(""),
  phone: z.string().trim().optional().default(""),
  quote: z.string().optional().default(""),
  bio: z.string(),
  practiceFocus: z.array(z.string()),
});

export async function createPartner(values: unknown): Promise<ActionResult> {
  const parsed = partnerSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };
  const count = await prisma.partner.count();
  await prisma.partner.create({ data: { ...parsed.data, order: count } });
  revalidatePath("/partners");
  redirect("/admin/partners");
}

export async function updatePartner(id: string, values: unknown): Promise<ActionResult> {
  const parsed = partnerSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };
  await prisma.partner.update({ where: { id }, data: parsed.data });
  revalidatePath("/partners");
  return { success: true };
}

export async function deletePartner(id: string) {
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/partners");
}

// --- Contact submissions ---

export async function markSubmissionRead(id: string, read: boolean) {
  await prisma.contactSubmission.update({ where: { id }, data: { read } });
  revalidatePath("/admin/messages");
}

export async function deleteSubmission(id: string) {
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/messages");
}

// --- Homepage hero slides ---

async function requireAdmin() {
  if (!(await getSession())) throw new Error("Not signed in.");
}

// Internal paths ("/contact", "/practice-areas/x#y"), in-page anchors, or full web/mail/phone links.
const linkHref = z
  .string()
  .trim()
  .refine((v) => v === "" || /^(\/|#|https?:\/\/|mailto:|tel:)/.test(v), {
    message: "Start with / for a page on this site, or https:// for another website.",
  });

const heroSlideSchema = z
  .object({
    label: z.string().trim().min(1, "Give the slide a short label."),
    eyebrow: z.string().trim().default(""),
    headline: z.string().trim().min(1, "Add a headline."),
    body: z.string().trim().min(1, "Add a short description."),
    imageUrl: z.string().trim().default(""),
    imageAlt: z.string().trim().default(""),
    ctaLabel: z.string().trim().default(""),
    ctaHref: linkHref.default(""),
    order: z.coerce.number().int().min(0).default(0),
    published: z.boolean().default(true),
  })
  .refine((v) => !v.ctaLabel || v.ctaHref, { message: "Add a link for the button.", path: ["ctaHref"] });

export async function createHeroSlide(values: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = heroSlideSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid data" };
  await prisma.heroSlide.create({ data: parsed.data });
  revalidatePath("/");
  redirect("/admin/hero-slides");
}

export async function updateHeroSlide(id: string, values: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = heroSlideSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid data" };
  await prisma.heroSlide.update({ where: { id }, data: parsed.data });
  revalidatePath("/");
  return { success: true };
}

export async function deleteHeroSlide(id: string) {
  await requireAdmin();
  await prisma.heroSlide.delete({ where: { id } });
  revalidatePath("/");
}
