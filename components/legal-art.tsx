// Hand-drawn vector artwork. Everything uses currentColor, so it follows the admin theme.

export function ScalesArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 220" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <circle cx="120" cy="20" r="6" />
      <path d="M120 26V190" />
      <path d="M116 190h8M104 198h32M88 206h64" strokeWidth={3} />
      <path d="M28 44C70 52 92 40 120 40s50 12 92 4" strokeWidth={2.5} />
      <circle cx="28" cy="44" r="3" />
      <circle cx="212" cy="44" r="3" />
      <path d="M28 47 4 126M28 47l24 79M212 47l-24 79M212 47l24 79" strokeWidth={1} />
      <path d="M2 126h52c-2 16-13 24-26 24S4 142 2 126Z" />
      <path d="M186 126h52c-2 16-13 24-26 24s-24-8-26-24Z" />
    </svg>
  );
}

const COLUMN_XS = [78, 192, 306, 420, 534, 648, 762, 876];

/** A classical court front. Its steps are flush with the bottom edge, so it can stand on the footer. */
export function PorticoArt({ className, background }: { className?: string; background: string }) {
  return (
    <svg viewBox="0 0 960 300" className={className} fill="currentColor" aria-hidden>
      <path d="M480 8 930 88H30Z" />
      <path d="M480 26 846 80H114Z" fill={background} />
      <g fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path d="M480 40v30M456 48c10 2 16 0 24 0s14 2 24 0" />
        <path d="M456 48l-8 16h16ZM504 48l-8 16h16Z" strokeWidth={1.5} />
        <path d="M470 72h20" />
      </g>
      <rect x="30" y="92" width="900" height="16" />
      <rect x="44" y="112" width="872" height="10" />
      {COLUMN_XS.map((x) => (
        <g key={x}>
          <rect x={x - 26} y="126" width="52" height="7" />
          <path d={`M${x - 19} 136h38l3 118h-44Z`} />
          <path
            d={`M${x - 9} 140l-1 112M${x} 140v112M${x + 9} 140l1 112`}
            stroke={background}
            strokeWidth={1.5}
            fill="none"
          />
          <rect x={x - 26} y="254" width="52" height="6" />
        </g>
      ))}
      <rect x="24" y="264" width="912" height="10" />
      <rect x="12" y="276" width="936" height="10" />
      <rect x="0" y="288" width="960" height="12" />
    </svg>
  );
}
