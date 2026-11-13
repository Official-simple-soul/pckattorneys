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
