export function GradientMesh({ variant = "hero" }: { variant?: "hero" | "cta" }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: variant === "hero" ? "-20%" : "-40%",
          right: "-10%",
          width: "60%",
          aspectRatio: "1",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--mantine-color-gold-5) 35%, transparent) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-15%",
          width: "50%",
          aspectRatio: "1",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--mantine-color-brand-6) 30%, transparent) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
}

export function SkylineSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 260"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      style={{ width: "100%", height: "auto", opacity: 0.9 }}
      aria-hidden
    >
      <g fill="currentColor">
        <rect x="0" y="150" width="60" height="110" />
        <rect x="70" y="110" width="45" height="150" />
        <rect x="125" y="170" width="55" height="90" />
        <rect x="190" y="60" width="70" height="200" />
        <polygon points="190,60 225,20 260,60" />
        <rect x="270" y="130" width="50" height="130" />
        <rect x="330" y="90" width="60" height="170" />
        <rect x="400" y="150" width="45" height="110" />
        <rect x="455" y="40" width="80" height="220" />
        <rect x="470" y="20" width="10" height="20" />
        <rect x="500" y="20" width="10" height="20" />
        <rect x="545" y="120" width="55" height="140" />
        <rect x="610" y="170" width="50" height="90" />
        <rect x="670" y="100" width="65" height="160" />
        <rect x="745" y="150" width="55" height="110" />
      </g>
    </svg>
  );
}

export function DotGrid() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(color-mix(in srgb, var(--mantine-color-gray-5) 40%, transparent) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage: "linear-gradient(to bottom, black, transparent)",
        opacity: 0.5,
        pointerEvents: "none",
      }}
    />
  );
}
