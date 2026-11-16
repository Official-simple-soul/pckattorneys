import Image from 'next/image';
import {
  Box,
  Grid,
  GridCol,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  getHeroSlides,
  getHomePage,
  getPracticeAreas,
  getSiteSettings,
} from '@/lib/content';
import { HeroCarousel, type HeroSlideView } from '@/components/hero-carousel';
import { asStringArray, asTitleBodyArray } from '@/lib/types';
import { PracticeIndex } from '@/components/practice-index';
import { LEGAL_IMAGES } from '@/lib/legal-images';
import { ScalesArt } from '@/components/legal-art';
import { ClosingCta } from '@/components/closing-cta';
import { LinkButton } from '@/components/ui/link-button';

const HEADING_FONT = 'var(--mantine-heading-font-family)';

export default async function HomePage() {
  const [home, settings, practiceAreas, extraSlides] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getPracticeAreas(),
    getHeroSlides(),
  ]);

  const trustBarItems = asStringArray(home.trustBarItems);
  const [valuePropLead, ...valuePropRest] = asStringArray(home.valuePropBody);
  const whyChooseUsItems = asTitleBodyArray(home.whyChooseUsItems);
  const { justiceStatue, lawBooks, magnaCarta, oldBaileyCourt } = LEGAL_IMAGES;

  const statue = {
    src: justiceStatue.src,
    alt: justiceStatue.alt,
    kind: 'cutout' as const,
    width: justiceStatue.width,
    height: justiceStatue.height,
  };
  const heroSlides: HeroSlideView[] = [
    {
      key: 'firm',
      label: 'The firm',
      eyebrow: home.heroEyebrow,
      headline: home.heroHeadline,
      body: home.heroSubheadline,
      image: home.heroImage
        ? { src: home.heroImage, alt: settings.firmName, kind: 'photo' }
        : statue,
      actions: [
        { label: home.heroPrimaryCta, href: '/contact' },
        { label: home.heroSecondaryCta, href: '/partners', secondary: true },
      ],
    },
    ...extraSlides.map((slide) => ({
      key: slide.id,
      label: slide.label,
      eyebrow: slide.eyebrow,
      headline: slide.headline,
      body: slide.body,
      image: slide.imageUrl
        ? { src: slide.imageUrl, alt: slide.imageAlt, kind: 'photo' as const }
        : statue,
      actions:
        slide.ctaLabel && slide.ctaHref
          ? [{ label: slide.ctaLabel, href: slide.ctaHref }]
          : [],
    })),
  ];

  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <HeroCarousel slides={heroSlides} />

        <div className="home-trust-bar">
          <div className="section-container">
            <ul className="home-trust">
              {trustBarItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="page-section">
        <div className="section-container">
          <Grid gap={{ base: 40, md: 72 }} align="center">
            <GridCol span={{ base: 12, md: 5 }}>
              <figure className="plate">
                <div className="plate-frame" style={{ aspectRatio: '4 / 5' }}>
                  <Image
                    src={magnaCarta.src}
                    alt={magnaCarta.alt}
                    fill
                    sizes="(min-width: 62em) 40vw, 100vw"
                    style={{ objectFit: 'cover', objectPosition: 'left top' }}
                  />
                </div>
                <figcaption className="plate-caption">
                  {magnaCarta.caption}
                </figcaption>
              </figure>
            </GridCol>
            <GridCol span={{ base: 12, md: 7 }}>
              <Title
                order={2}
                fz={{ base: 30, md: 42 }}
                ff={HEADING_FONT}
                c="brand.9"
                lh={1.18}
                mb="xl"
              >
                {home.valuePropTitle}
              </Title>
              <Stack gap="md" maw={640}>
                {valuePropLead && (
                  <Text
                    fz={{ base: 19, md: 21 }}
                    ff={HEADING_FONT}
                    c="brand.9"
                    lh={1.5}
                  >
                    {valuePropLead}
                  </Text>
                )}
                {valuePropRest.map((para) => (
                  <Text key={para} c="dark.5" fz="lg" lh={1.65}>
                    {para}
                  </Text>
                ))}
              </Stack>
            </GridCol>
          </Grid>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="page-section bg-tint">
        <div className="section-container">
          <Grid gap={{ base: 32, md: 72 }}>
            <GridCol span={{ base: 12, md: 4 }}>
              <div className="home-sticky">
                <Title
                  order={2}
                  fz={{ base: 30, md: 38 }}
                  ff={HEADING_FONT}
                  c="brand.9"
                  lh={1.18}
                  mb="xl"
                >
                  {home.practiceOverviewTitle}
                </Title>
                <Box
                  visibleFrom="md"
                  className="plate-frame"
                  style={{ aspectRatio: '4 / 3' }}
                  mb="xl"
                >
                  <Image
                    src={lawBooks.src}
                    alt={lawBooks.alt}
                    fill
                    sizes="33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <LinkButton href="/practice-areas" variant="outline" size="md">
                  {home.practiceOverviewCta}
                </LinkButton>
              </div>
            </GridCol>
            <GridCol span={{ base: 12, md: 8 }}>
              <PracticeIndex areas={practiceAreas} />
            </GridCol>
          </Grid>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="page-section">
        <div className="section-container">
          <Grid gap={32} align="flex-end" mb={56}>
            <GridCol span={{ base: 12, md: 9 }}>
              <Title
                order={2}
                fz={{ base: 30, md: 42 }}
                ff={HEADING_FONT}
                c="brand.9"
                lh={1.18}
                maw={760}
                mb="md"
              >
                {home.whyChooseUsTitle}
              </Title>
              <Text c="dark.5" fz="lg" lh={1.65} maw={640}>
                {home.whyChooseUsIntro}
              </Text>
            </GridCol>
            <GridCol span={{ base: 12, md: 3 }}>
              <ScalesArt className="home-scales" />
            </GridCol>
          </Grid>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={{ base: 32, md: 48 }}>
            {whyChooseUsItems.map((item) => (
              <div key={item.title} className="ruled-item">
                <Title
                  order={3}
                  fz={22}
                  ff={HEADING_FONT}
                  c="brand.9"
                  lh={1.3}
                  mb="sm"
                >
                  {item.title}
                </Title>
                <Text c="dark.5" lh={1.65}>
                  {item.body}
                </Text>
              </div>
            ))}
          </SimpleGrid>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section>
        <div className="home-court-photo">
          <Image
            src={home.aboutPreviewImage || oldBaileyCourt.src}
            alt={
              home.aboutPreviewImage
                ? home.aboutPreviewTitle
                : oldBaileyCourt.alt
            }
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="section-container">
          <div className="home-court-layout">
            <div className="home-court-panel">
              <Title
                order={2}
                fz={{ base: 28, md: 34 }}
                ff={HEADING_FONT}
                c="white"
                lh={1.2}
                mb="md"
              >
                {home.aboutPreviewTitle}
              </Title>
              <Text c="gray.3" lh={1.65} mb="xl">
                {home.aboutPreviewBody}
              </Text>
              <LinkButton
                href="/about"
                variant="outline"
                color="gray.3"
                c="white"
              >
                {home.aboutPreviewCta}
              </LinkButton>
            </div>
            {!home.aboutPreviewImage && (
              <p className="home-court-caption">{oldBaileyCourt.caption}</p>
            )}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <ClosingCta title={home.finalCtaTitle} body={home.finalCtaBody}>
        <LinkButton href="/contact" size="md">
          {home.finalCtaPrimary}
        </LinkButton>
        <LinkButton href="/contact" size="md" variant="outline">
          {home.finalCtaSecondary}
        </LinkButton>
      </ClosingCta>
    </>
  );
}
