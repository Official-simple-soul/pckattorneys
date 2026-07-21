"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().default(""),
  company: z.string().optional().default(""),
  practiceArea: z.string().optional().default(""),
  message: z.string().min(10, "Please tell us a little more about your matter"),
});

export type ContactFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContactForm(
  input: unknown
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fieldErrors[key] = issue.message;
    }
    return { success: false, error: "Please check the form and try again.", fieldErrors };
  }

  await prisma.contactSubmission.create({ data: parsed.data });

  return { success: true };
}
