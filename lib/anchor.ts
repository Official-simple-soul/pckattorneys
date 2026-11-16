/** URL fragment for a section heading, e.g. "Environmental Law & ESG" -> "environmental-law-and-esg". */
export function anchorId(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
