// One-off script: rewrites existing database rows created before the LLP -> Attorneys
// rebrand. Safe to run multiple times (no-op once everything is already renamed).
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const REPLACEMENTS = [
  [/Parah, Chen and King LLP/g, "Parah, Chen and King Attorneys"],
  [/PCK LLP/g, "PCK Attorneys"],
  [/consult@pckllp\.com/g, "consult@pckattorneys.com"],
];

function fix(value) {
  if (typeof value === "string") {
    return REPLACEMENTS.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), value);
  }
  if (Array.isArray(value)) return value.map(fix);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fix(v)]));
  }
  return value;
}

function buildUpdate(row, skipFields = ["id", "createdAt", "updatedAt"]) {
  const update = {};
  for (const [key, value] of Object.entries(row)) {
    if (skipFields.includes(key)) continue;
    const fixed = fix(value);
    if (JSON.stringify(fixed) !== JSON.stringify(value)) update[key] = fixed;
  }
  return Object.keys(update).length > 0 ? update : null;
}

async function updateIfChanged(label, row, updateFn) {
  if (!row) return;
  const update = buildUpdate(row);
  if (update) {
    await updateFn(update);
    console.log(`Updated ${label}:`, Object.keys(update));
  }
}

async function main() {
  await updateIfChanged(
    "SiteSettings",
    await prisma.siteSettings.findUnique({ where: { id: "settings" } }),
    (data) => prisma.siteSettings.update({ where: { id: "settings" }, data })
  );

  await updateIfChanged(
    "HomePage",
    await prisma.homePage.findUnique({ where: { id: "home" } }),
    (data) => prisma.homePage.update({ where: { id: "home" }, data })
  );

  await updateIfChanged(
    "AboutPage",
    await prisma.aboutPage.findUnique({ where: { id: "about" } }),
    (data) => prisma.aboutPage.update({ where: { id: "about" }, data })
  );

  await updateIfChanged(
    "ContactPage",
    await prisma.contactPage.findUnique({ where: { id: "contact" } }),
    (data) => prisma.contactPage.update({ where: { id: "contact" }, data })
  );

  const areas = await prisma.practiceArea.findMany();
  for (const area of areas) {
    await updateIfChanged(`PracticeArea (${area.slug})`, area, (data) =>
      prisma.practiceArea.update({ where: { id: area.id }, data })
    );
  }

  const partners = await prisma.partner.findMany();
  for (const partner of partners) {
    await updateIfChanged(`Partner (${partner.name})`, partner, (data) =>
      prisma.partner.update({ where: { id: partner.id }, data })
    );
  }

  console.log("Rebrand fix complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
