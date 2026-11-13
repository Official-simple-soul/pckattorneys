import Image from "next/image";
import { Stack, Text, Title } from "@mantine/core";
import type { ReactNode } from "react";

type HeroImage = { src: string; alt: string; caption?: string };

/** Navy page header for inner pages, with an optional photograph fading in from the right. */
export function PageHero({
  title,
  intro,
  above,
  image,
}: {
  title: string;
  intro?: string;
  above?: ReactNode;
  image?: HeroImage;
}) {
  return (
    <section className="page-hero">
      {image && (
        <div className="page-hero-image">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 62em) 50vw, 1px"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className="section-container page-hero-inner">
        <Stack gap="md" className="page-hero-text">
          {above}
          <Title
            order={1}
            c="white"
            fz={{ base: 34, md: 48 }}
            lh={1.14}
            ff="var(--mantine-heading-font-family)"
            style={{ letterSpacing: "-0.01em" }}
          >
            {title}
          </Title>
          {intro && (
            <Text c="gray.3" fz={{ base: "md", md: "lg" }} lh={1.6}>
              {intro}
            </Text>
          )}
        </Stack>
        {image?.caption && <p className="page-hero-caption">{image.caption}</p>}
      </div>
    </section>
  );
}
