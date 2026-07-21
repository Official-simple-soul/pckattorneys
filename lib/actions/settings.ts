"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

const hexColor = z.string().regex(/^#([0-9a-fA-F]{6})$/, "Must be a hex color like #0B2545");

const settingsSchema = z.object({
  firmName: z.string().min(1),
  shortName: z.string().min(1),
  tagline: z.string().min(1),
  logoText: z.string().min(1).max(4),
  logoUrl: z.string().optional().default(""),
  primaryColor: hexColor,
  secondaryColor: hexColor,
  accentColor: hexColor,
  neutralColor: hexColor,
  radius: z.enum(["xs", "sm", "md", "lg", "xl"]),
  headingFont: z.string(),
  bodyFont: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  linkedinUrl: z.string().optional().default(""),
  twitterUrl: z.string().optional().default(""),
  officeHours: z.string(),
});

export type SettingsFormState = {
  success: boolean;
  error?: string;
};

export async function updateSiteSettings(values: unknown): Promise<SettingsFormState> {
  const parsed = settingsSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid settings" };
  }

  await prisma.siteSettings.update({ where: { id: "settings" }, data: parsed.data });
  revalidatePath("/", "layout");

  return { success: true };
}
