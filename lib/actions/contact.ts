"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import { SITE } from "@/content/site";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(200),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  phone: z.string().trim().max(50).optional().default(""),
  company: z.string().trim().max(200).optional().default(""),
  practiceArea: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(10, "Please tell us a little more about your matter").max(10000),
});

export type ContactFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContactForm(input: unknown): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fieldErrors[key] = issue.message;
    }
    return { success: false, error: "Please check the form and try again.", fieldErrors };
  }

  const { name, email, phone, company, practiceArea, message } = parsed.data;

  try {
    const { SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_USER || !SMTP_PASS) throw new Error("SMTP_USER and SMTP_PASS are not set");

    const port = Number(process.env.SMTP_PORT || 465);
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port,
      secure: port === 465,
      requireTLS: port !== 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 15000,
    });

    await transport.sendMail({
      // Sent from the firm's own mailbox; replying goes to the person who wrote in.
      from: { name: `${SITE.firmName} website`, address: SMTP_USER },
      to: process.env.CONTACT_TO || SITE.email,
      replyTo: { name, address: email },
      subject: `Website enquiry from ${name.replace(/\s+/g, " ")}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        `Company: ${company || "-"}`,
        `Practice area: ${practiceArea || "-"}`,
        "",
        message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("Could not email the website enquiry.", error);
    return {
      success: false,
      error: `We could not send your request. Please email ${SITE.email} or call ${SITE.phone}.`,
    };
  }

  return { success: true };
}
