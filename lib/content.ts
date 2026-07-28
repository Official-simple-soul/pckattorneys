import { cache } from "react";
import { prisma } from "./db";

export const getSiteSettings = cache(async () => {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "settings" } });
  if (settings) return settings;
  return prisma.siteSettings.create({ data: { id: "settings" } });
});

// HomePage/AboutPage/ContactPage have no field defaults at the DB level (MySQL
// doesn't allow defaults on TEXT/JSON columns), so unlike SiteSettings these rows
// can't be lazily created with partial data. `db:setup` always seeds them with full
// content before the app runs, so a missing row here means seeding hasn't happened.
export const getHomePage = cache(async () => {
  return prisma.homePage.findUniqueOrThrow({ where: { id: "home" } });
});

export const getAboutPage = cache(async () => {
  return prisma.aboutPage.findUniqueOrThrow({ where: { id: "about" } });
});

export const getContactPage = cache(async () => {
  return prisma.contactPage.findUniqueOrThrow({ where: { id: "contact" } });
});

export const getPracticeAreas = cache(async () => {
  return prisma.practiceArea.findMany({ orderBy: { order: "asc" } });
});

export const getPracticeAreaBySlug = cache(async (slug: string) => {
  return prisma.practiceArea.findUnique({ where: { slug } });
});

export const getPartners = cache(async () => {
  return prisma.partner.findMany({ orderBy: { order: "asc" } });
});
