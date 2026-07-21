import { cache } from "react";
import { prisma } from "./db";

export const getSiteSettings = cache(async () => {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "settings" } });
  if (settings) return settings;
  return prisma.siteSettings.create({ data: { id: "settings" } });
});

export const getHomePage = cache(async () => {
  const home = await prisma.homePage.findUnique({ where: { id: "home" } });
  if (home) return home;
  return prisma.homePage.create({ data: {} });
});

export const getAboutPage = cache(async () => {
  const about = await prisma.aboutPage.findUnique({ where: { id: "about" } });
  if (about) return about;
  return prisma.aboutPage.create({ data: {} });
});

export const getContactPage = cache(async () => {
  const contact = await prisma.contactPage.findUnique({ where: { id: "contact" } });
  if (contact) return contact;
  return prisma.contactPage.create({ data: {} });
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
