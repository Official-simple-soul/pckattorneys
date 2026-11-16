"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { Group, Stack, Text, Title } from "@mantine/core";
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { LinkButton } from "@/components/ui/link-button";

export type HeroSlideView = {
  key: string;
  label: string;
  eyebrow: string;
  headline: string;
  body: string;
  /** "cutout" sits on the navy at its natural size; "photo" fills the right half and fades into the navy. */
  image: { src: string; alt: string; kind: "cutout" | "photo"; width?: number; height?: number };
  actions: { label: string; href: string; secondary?: boolean }[];
};

const SLIDE_SECONDS = 8;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/** Homepage hero. Advances every few seconds; pauses on hover, keyboard focus, or the pause button. */
export function HeroCarousel({ slides }: { slides: HeroSlideView[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const reducedMotion = useReducedMotion();

  const rotating = slides.length > 1 && !reducedMotion && !stopped;
  const paused = hovered || focused;
  const next = () => setActive((i) => (i + 1) % slides.length);

  return (
    <div
      className="hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="hero-slides" aria-live={rotating && !paused ? "off" : "polite"}>
        {slides.map((slide, i) => {
          const isActive = i === active;
          const first = i === 0;
          return (
            <div
              key={slide.key}
              className="hero-slide home-hero-stage"
              data-active={isActive || undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${slide.label}`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <Stack gap="lg" className="home-hero-text">
                {slide.eyebrow && (
                  <Text className={first ? "home-hero-seq" : undefined} c="gold.4" fw={500} size="sm">
                    {slide.eyebrow}
                  </Text>
                )}
                <Title
                  order={first ? 1 : 2}
                  className={first ? "home-hero-seq" : undefined}
                  style={{ "--seq": "80ms", letterSpacing: "-0.01em" } as React.CSSProperties}
                  c="white"
                  lh={1.12}
                  fz={{ base: 34, sm: 44, lg: 52 }}
                  ff="var(--mantine-heading-font-family)"
                >
                  {slide.headline}
                </Title>
                <Text
                  className={first ? "home-hero-seq" : undefined}
                  style={{ "--seq": "160ms" } as React.CSSProperties}
                  c="gray.3"
                  fz={{ base: "md", md: "lg" }}
                  lh={1.6}
                >
                  {slide.body}
                </Text>
                {slide.actions.length > 0 && (
                  <Group
                    className={first ? "home-hero-seq" : undefined}
                    style={{ "--seq": "240ms" } as React.CSSProperties}
                    gap="md"
                    mt="xs"
                  >
                    {slide.actions.map((action) =>
                      action.secondary ? (
                        <LinkButton key={action.label} href={action.href} size="md" variant="outline" color="gray.3" c="white">
                          {action.label}
                        </LinkButton>
                      ) : (
                        <LinkButton key={action.label} href={action.href} size="md" color="gold.5" c="brand.9">
                          {action.label}
                        </LinkButton>
                      ),
                    )}
                  </Group>
                )}
              </Stack>

              {slide.image.kind === "photo" ? (
                <div className="hero-slide-photo">
                  <Image
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    priority={first}
                    loading={first ? undefined : "eager"}
                    sizes="(min-width: 62em) 54vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div className={`home-hero-figure${first ? " home-hero-seq" : ""}`} style={{ "--seq": "120ms" } as React.CSSProperties}>
                  <Image
                    src={slide.image.src}
                    alt={slide.image.alt}
                    width={slide.image.width}
                    height={slide.image.height}
                    priority={first}
                    sizes="(min-width: 62em) 54vw, 100vw"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <div className="section-container hero-tabs-row">
          <div className="hero-tabs">
            {slides.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                className="hero-tab"
                aria-current={i === active || undefined}
                aria-label={`Show slide ${i + 1}: ${slide.label}`}
                onClick={() => setActive(i)}
              >
                <span className="hero-tab-track" aria-hidden>
                  {i === active && (
                    <span
                      key={active}
                      className="hero-tab-progress"
                      data-running={rotating || undefined}
                      data-paused={paused || undefined}
                      style={{ animationDuration: `${SLIDE_SECONDS}s` }}
                      onAnimationEnd={next}
                    />
                  )}
                </span>
                <span className="hero-tab-text">
                  <span className="hero-tab-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hero-tab-label">{slide.label}</span>
                </span>
              </button>
            ))}
          </div>
          {!reducedMotion && (
            <button
              type="button"
              className="hero-toggle"
              onClick={() => setStopped((s) => !s)}
              aria-label={stopped ? "Play slideshow" : "Pause slideshow"}
            >
              {stopped ? <IconPlayerPlayFilled size={14} /> : <IconPlayerPauseFilled size={14} />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
