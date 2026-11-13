import Image from "next/image";
import { Anchor, Stack, Text, Title } from "@mantine/core";
import { getPartners, getSiteSettings } from "@/lib/content";
import { asStringArray } from "@/lib/types";
import { LEGAL_IMAGES } from "@/lib/legal-images";
import { PageHero } from "@/components/page-hero";
import { PartnerSeal } from "@/components/partner-seal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners",
};

const HEADING_FONT = "var(--mantine-heading-font-family)";

function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export default async function PartnersPage() {
  const [partners, settings] = await Promise.all([getPartners(), getSiteSettings()]);

  return (
    <>
      <PageHero
        title="Leadership Built on Legal Excellence, Commercial Insight, and Global Perspective"
        intro={`${settings.firmName} is led by partners whose combined experience spans commercial law, regulatory advisory, corporate leadership, international development, finance, and cross-border engagement.`}
        image={LEGAL_IMAGES.oldBaileyHall}
      />

      <div className="section-container">
        {partners.map((partner) => {
          const [bioLead, ...bioRest] = partner.bio.split("\n\n").filter(Boolean);
          const focus = asStringArray(partner.practiceFocus);
          const fullName = partner.credentials ? `${partner.name}, ${partner.credentials}` : partner.name;

          return (
            <article key={partner.id} className="partner" aria-labelledby={`partner-${partner.id}`}>
              <div className="partner-grid">
                <header className="partner-head">
                  <Text c="gold.8" fw={600} mb={6}>
                    {partner.title}
                  </Text>
                  <Title
                    id={`partner-${partner.id}`}
                    order={2}
                    fz={{ base: 32, md: 44 }}
                    ff={HEADING_FONT}
                    c="brand.9"
                    lh={1.12}
                  >
                    {fullName}
                  </Title>
                </header>

                <div className="partner-aside">
                  <div className="partner-portrait">
                    {partner.photoUrl ? (
                      <Image
                        src={partner.photoUrl}
                        alt={partner.name}
                        fill
                        sizes="(min-width: 62em) 30vw, 100vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <PartnerSeal name={partner.name} firmName={settings.firmName} city={settings.city} />
                    )}
                  </div>

                  {(partner.email || partner.phone) && (
                    <dl className="partner-contact">
                      {partner.email && (
                        <div>
                          <dt>Email</dt>
                          <dd>
                            <Anchor href={`mailto:${partner.email}`} c="brand.9" fw={500}>
                              {partner.email}
                            </Anchor>
                          </dd>
                        </div>
                      )}
                      {partner.phone && (
                        <div>
                          <dt>Phone</dt>
                          <dd>
                            <Anchor href={telHref(partner.phone)} c="brand.9" fw={500}>
                              {partner.phone}
                            </Anchor>
                          </dd>
                        </div>
                      )}
                    </dl>
                  )}
                </div>

                <div className="partner-body">
                  {partner.quote && (
                    <blockquote className="partner-quote">
                      <Text fz={{ base: 20, md: 24 }} ff={HEADING_FONT} fs="italic" c="brand.9" lh={1.45}>
                        {partner.quote}
                      </Text>
                    </blockquote>
                  )}

                  <Stack gap="md" maw={680}>
                    {bioLead && (
                      <Text fz={{ base: 18, md: 19 }} c="dark.7" lh={1.65}>
                        {bioLead}
                      </Text>
                    )}
                    {bioRest.map((para, i) => (
                      <Text key={i} c="dark.5" fz="md" lh={1.75}>
                        {para}
                      </Text>
                    ))}
                  </Stack>

                  {focus.length > 0 && (
                    <div className="partner-focus">
                      <Title order={3} fz={22} ff={HEADING_FONT} c="brand.9" mb="md">
                        Practice focus
                      </Title>
                      <ul>
                        {focus.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
