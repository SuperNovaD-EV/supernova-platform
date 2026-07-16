"use client";

import {
  AppMockup,
  Badge,
  Button,
  Lightfall,
  MapPanel,
  MarketingShell,
  Surface,
  VehicleSilhouette,
  type WebContext,
} from "@supernova/ui-web";
import { demoRide, demoVehicleOptions, demoZones } from "@supernova/testing";

const context: WebContext = { locale: "en", theme: "dark" };

const pageCopy: Record<
  string,
  { eyebrow: string; title: string; body: string }
> = {
  home: {
    eyebrow: "SuperNova launch-stage marketplace",
    title:
      "Safety-first mobility for Cairo and Giza, built with premium operational precision.",
    body: "A cinematic but serious preview of verified independent drivers, transparent online payments, Trip Black Box evidence, and zone-by-zone rollout controls.",
  },
  ride: {
    eyebrow: "Rider app",
    title: "A calmer way to request, verify, and complete protected trips.",
    body: "Riders see clear vehicle options, fictional EGP estimates, PIN or QR trip start, trip sharing, and guided evidence-based support.",
  },
  drive: {
    eyebrow: "Driver opportunity",
    title:
      "Independent driver tools with earnings clarity and low-distraction operations.",
    body: "Driver onboarding, verification, offer review, net earnings, ledger, payout request, and support previews are modeled with local demo data only.",
  },
  safety: {
    eyebrow: "Trip protection",
    title: "Safety is designed into the state model, not added as decoration.",
    body: "Verified documents, QR/PIN start, Trip Black Box events, support timelines, and compensation controls remain visible throughout the experience.",
  },
  "how-it-works": {
    eyebrow: "How it works",
    title:
      "Request, review, match, verify, ride, pay online, and resolve with evidence.",
    body: "The static flow follows the approved Phase 1 lifecycle without backend, auth, map provider, or payment provider integrations.",
  },
  help: {
    eyebrow: "Support",
    title: "Guided resolution for safety, payment, and trip quality issues.",
    body: "Complaint categories, evidence attachments, appeal paths, and manual review states are presented as visual prototypes only.",
  },
  about: {
    eyebrow: "About SuperNova",
    title: "A serious modern mobility marketplace foundation.",
    body: "SuperNova connects riders with independent verified drivers through transparent pricing, online payment positioning, and intelligent trip protection.",
  },
  "design-system": {
    eyebrow: "Design system",
    title:
      "A reusable visual system for mobile, admin, marketing, maps, and charts.",
    body: "Semantic tokens, dark and light themes, RTL/LTR behavior, chart styling, map UI, and reusable components power the prototypes.",
  },
  "prototype-overview": {
    eyebrow: "Prototype overview",
    title: "Review the product surfaces as one connected SuperNova system.",
    body: "Every route uses local fictional data. No provider calls, production credentials, or domain migrations are introduced.",
  },
};

export function MarketingPrototypePage(props: { pageKey: string }) {
  const page = pageCopy[props.pageKey] ?? {
    eyebrow: "SuperNova launch-stage marketplace",
    title:
      "Safety-first mobility for Cairo and Giza, built with premium operational precision.",
    body: "A cinematic but serious preview of verified independent drivers, transparent online payments, Trip Black Box evidence, and zone-by-zone rollout controls.",
  };
  const overview = props.pageKey === "prototype-overview";
  const useHeroLightfall = props.pageKey === "home" || overview;
  return (
    <MarketingShell {...context}>
      <main>
        <section style={heroStyle}>
          {useHeroLightfall ? (
            <Lightfall opacity={0.62} streakCount={overview ? 4 : 5} />
          ) : null}
          <div className="sn-marketing-hero-grid" style={heroContentStyle}>
            <div style={{ maxWidth: 860 }}>
              <Badge {...context} tone="info">
                {page.eyebrow}
              </Badge>
              <h1 style={heroTitleStyle}>{page.title}</h1>
              <p style={heroBodyStyle}>{page.body}</p>
              <div style={actionsStyle}>
                <Button {...context} href="/ride">
                  Ride with SuperNova
                </Button>
                <Button {...context} href="/drive" variant="secondary">
                  Drive with SuperNova
                </Button>
              </div>
            </div>
            <div className="sn-marketing-mockups" style={mockupsStyle}>
              <AppMockup {...context} kind="rider" />
              <div style={{ transform: "translateY(52px)" }}>
                <AppMockup {...context} kind="driver" />
              </div>
            </div>
          </div>
        </section>

        <Section
          eyebrow="Product ecosystem"
          title="One marketplace, four connected surfaces."
        >
          {[
            [
              "Rider app",
              "One-handed request flow, fare clarity, and visible safety access.",
            ],
            [
              "Driver app",
              "Operational clarity, verified eligibility, and transparent net earnings.",
            ],
            [
              "Safety",
              "Trip Black Box, QR/PIN start, trip sharing, and support evidence.",
            ],
            [
              "Payments",
              "Provider-neutral online payment and payout previews.",
            ],
            [
              "Operations",
              "Admin intelligence for supply, incidents, payouts, and zones.",
            ],
          ].map(([title, body]) => (
            <Surface {...context} key={title} tone="marketing">
              <div>
                <Badge {...context} tone="info">
                  {title}
                </Badge>
                <h3 style={cardTitleStyle}>{title}</h3>
                <p style={mutedStyle}>{body}</p>
              </div>
            </Surface>
          ))}
        </Section>

        <Section
          eyebrow="Vehicle marketplace"
          title="Configurable categories without visual noise."
        >
          {demoVehicleOptions.slice(0, 6).map((option) => (
            <Surface {...context} key={option.category} tone="marketing">
              <div>
                <VehicleSilhouette type={option.category} />
                <h3 style={cardTitleStyle}>{option.category}</h3>
                <p style={mutedStyle}>
                  {option.eta} · {option.capacity} seats · EGP demo estimate.
                </p>
              </div>
            </Surface>
          ))}
        </Section>

        <section className="sn-marketing-split" style={splitSectionStyle}>
          <div>
            <Badge {...context} tone="success">
              Cairo and Giza rollout
            </Badge>
            <h2 style={sectionTitleStyle}>
              A fictional service map built for product review, not live
              navigation.
            </h2>
            <p style={mutedLargeStyle}>
              Launch-zone previews use stylized original road geometry and
              service outlines inspired by urban density. No Google tiles, OSM
              tiles, real private locations, or live coordinates are used.
            </p>
            <p style={mutedStyle}>
              Current demo zones: {demoZones.join(", ")}.
            </p>
          </div>
          <MapPanel
            {...context}
            operations
            label="Stylized Cairo and Giza rollout map"
          />
        </section>

        <Section
          eyebrow="Safety system"
          title="Trust signals appear exactly where decisions happen."
        >
          {[
            "Trip Black Box event timeline",
            "QR/PIN start verification",
            "Verified documents and vehicle review",
            "Trusted contact trip sharing",
            "Support resolution and appeal path",
          ].map((item) => (
            <Surface {...context} key={item} tone="safety">
              <div>
                <h3 style={cardTitleStyle}>{item}</h3>
                <p style={mutedStyle}>
                  Prototype-only visual treatment connected to the approved
                  Phase 1 rules.
                </p>
              </div>
            </Surface>
          ))}
        </Section>

        <section style={finalCtaStyle}>
          <Lightfall opacity={0.42} streakCount={3} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Badge {...context} tone="info">
              Launch-stage preview
            </Badge>
            <h2 style={sectionTitleStyle}>
              SuperNova is being shaped for premium safety-first mobility.
            </h2>
            <p style={mutedLargeStyle}>
              {demoRide.pickup} to {demoRide.destination} remains fictional
              review data. Production app-store, provider, and coverage claims
              are intentionally absent.
            </p>
            <div style={actionsStyle}>
              <Button {...context} href="/prototype-overview">
                Review prototypes
              </Button>
              <Button {...context} href="/safety" variant="secondary">
                Explore safety
              </Button>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}

function Section(props: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={sectionStyle}>
      <div style={{ marginBottom: 24 }}>
        <Badge {...context} tone="info">
          {props.eyebrow}
        </Badge>
        <h2 style={sectionTitleStyle}>{props.title}</h2>
      </div>
      <div style={gridStyle}>{props.children}</div>
    </section>
  );
}

const heroStyle = {
  minHeight: "calc(100vh - 77px)",
  overflow: "hidden",
  position: "relative",
} as const;

const heroContentStyle = {
  alignItems: "center",
  display: "grid",
  gap: 42,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
  minHeight: "calc(100vh - 77px)",
  padding: "64px clamp(20px, 6vw, 88px) 88px",
  position: "relative",
  zIndex: 1,
} as const;

const heroTitleStyle = {
  fontSize: "clamp(48px, 7vw, 96px)",
  letterSpacing: 0,
  lineHeight: 0.92,
  margin: "22px 0",
  maxWidth: 1050,
} as const;

const heroBodyStyle = {
  color: "#D2D8E2",
  fontSize: "clamp(18px, 2vw, 23px)",
  lineHeight: 1.58,
  maxWidth: 760,
} as const;

const actionsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  marginTop: 26,
} as const;

const mockupsStyle = {
  alignItems: "start",
  display: "grid",
  gap: 18,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
  justifyContent: "end",
} as const;

const sectionStyle = {
  padding: "84px clamp(20px, 5vw, 72px)",
} as const;

const gridStyle = {
  display: "grid",
  gap: 18,
  gridTemplateColumns: "repeat(auto-fit, minmax(238px, 1fr))",
} as const;

const splitSectionStyle = {
  alignItems: "center",
  display: "grid",
  gap: 32,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
  padding: "84px clamp(20px, 5vw, 72px)",
} as const;

const finalCtaStyle = {
  borderTop: "1px solid rgba(247, 248, 250, 0.1)",
  minHeight: 420,
  overflow: "hidden",
  padding: "84px clamp(20px, 5vw, 72px)",
  position: "relative",
} as const;

const sectionTitleStyle = {
  fontSize: "clamp(34px, 5vw, 64px)",
  letterSpacing: 0,
  lineHeight: 1,
  margin: "18px 0 0",
  maxWidth: 920,
} as const;

const cardTitleStyle = {
  fontSize: 24,
  lineHeight: 1.1,
  margin: "18px 0 10px",
} as const;

const mutedStyle = {
  color: "var(--sn-theme-color-text-secondary)",
  lineHeight: 1.6,
  margin: 0,
} as const;

const mutedLargeStyle = {
  color: "#D2D8E2",
  fontSize: 18,
  lineHeight: 1.7,
  maxWidth: 720,
} as const;
