// Engraved seal used in place of a partner portrait until a photo is uploaded.

export function PartnerSeal({ name, firmName, city }: { name: string; firmName: string; city: string }) {
  const initials = name
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part) && !part.endsWith("."))
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const ringText = `${firmName} • ${city} •`.toUpperCase();
  const id = `seal-${initials}-${name.length}`;

  return (
    <svg viewBox="0 0 400 400" className="partner-seal" role="img" aria-label={`${name}: photograph not yet available`}>
      <defs>
        <path id={id} d="M200 200m-138 0a138 138 0 1 1 276 0a138 138 0 1 1-276 0" />
      </defs>
      <circle cx="200" cy="200" r="176" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="200" cy="200" r="168" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="200" cy="200" r="112" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="200" cy="200" r="104" fill="none" stroke="currentColor" strokeWidth="2" />
      <text fill="currentColor" fontSize="17" letterSpacing="4" fontFamily="var(--mantine-heading-font-family)">
        <textPath href={`#${id}`} textLength={2 * Math.PI * 138 - 6} lengthAdjust="spacing">
          {ringText}
        </textPath>
      </text>
      <text
        x="200"
        y="200"
        fill="currentColor"
        fontSize="78"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--mantine-heading-font-family)"
      >
        {initials}
      </text>
    </svg>
  );
}
