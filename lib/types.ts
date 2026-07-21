import { z } from "zod";

export const titleBodySchema = z.object({
  title: z.string(),
  body: z.string(),
});
export type TitleBody = z.infer<typeof titleBodySchema>;

export const extraSectionSchema = z.object({
  title: z.string(),
  body: z.string().default(""),
  points: z.array(z.string()).default([]),
});
export type ExtraSection = z.infer<typeof extraSectionSchema>;

export function asStringArray(value: unknown): string[] {
  const parsed = z.array(z.string()).safeParse(value);
  return parsed.success ? parsed.data : [];
}

export function asTitleBodyArray(value: unknown): TitleBody[] {
  const parsed = z.array(titleBodySchema).safeParse(value);
  return parsed.success ? parsed.data : [];
}

export function asExtraSections(value: unknown): ExtraSection[] {
  const parsed = z.array(extraSectionSchema).safeParse(value);
  return parsed.success ? parsed.data : [];
}
