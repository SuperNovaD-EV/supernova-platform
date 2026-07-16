"use client";

import {
  Badge,
  Button,
  MarketingShell,
  MapPanel,
  Surface,
  type WebContext,
} from "@supernova/ui-web";
import { demoRide, demoVehicleOptions, demoZones } from "@supernova/testing";

const context: WebContext = { locale: "en", theme: "light" };

const pages: Record<string, { title: string; eyebrow: string; body: string }> =
  {
    home: {
      title: "Premium safety-first mobility for Cairo and Giza",
      eyebrow: "SuperNova launch-stage preview",
      body: "Verified independent drivers, transparent online payments, Trip Black Box event architecture, and calm product design for zone-by-zone launch.",
    },
    ride: {
      title: "Ride with verified protection",
      eyebrow: "Rider app",
      body: "Preview a current ride request, vehicle category selection, fare estimate, PIN or QR trip start, safety center, and support flow.",
    },
    drive: {
      title: "Drive independently with transparent earnings",
      eyebrow: "Driver app",
      body: "Driver onboarding, vehicle approval, offer review, net earnings, ledger, and payout request previews use fictional demo data only.",
    },
    safety: {
      title: "Safety designed into every state",
      eyebrow: "Trip protection",
      body: "Verified identity, vehicle review, trip sharing, PIN or QR start, support evidence, and structured Black Box telemetry without continuous audio or video.",
    },
    "how-it-works": {
      title: "How SuperNova works",
      eyebrow: "Simple, transparent flow",
      body: "Request, review estimate, match, verify, ride, pay online, receive receipt, and resolve support issues through guided evidence-based workflows.",
    },
    help: {
      title: "Help and support",
      eyebrow: "Guided resolution",
      body: "Complaint categories, manual review for safety and finance cases, appeal paths, and compensation controls are modeled from Phase 1 rules.",
    },
    about: {
      title: "Built for calm operational confidence",
      eyebrow: "About SuperNova",
      body: "SuperNova is a premium mobility marketplace concept for riders and independent verified drivers. Compliance and provider decisions remain external gates.",
    },
    "design-system": {
      title: "Design system preview",
      eyebrow: "Tokens, themes, and components",
      body: "Semantic tokens, light and dark themes, RTL/LTR behavior, map UI, chart foundations, and reusable components power all prototypes.",
    },
    "prototype-overview": {
      title: "Prototype overview",
      eyebrow: "Static review routes",
      body: "Review Rider, Driver, Admin, and Marketing surfaces with local mock data only. No backend, map, payment, auth, or notification calls occur.",
    },
  };

export function MarketingPrototypePage(props: { pageKey: string }) {
  const page = pages[props.pageKey] ?? {
    title: "Premium safety-first mobility for Cairo and Giza",
    eyebrow: "SuperNova launch-stage preview",
    body: "Verified independent drivers, transparent online payments, Trip Black Box event architecture, and calm product design for zone-by-zone launch.",
  };
  return (
    <MarketingShell {...context}>
      <main>
        <section style={heroStyle}>
          <div style={{ maxWidth: 760 }}>
            <Badge {...context} tone="info">
              {page.eyebrow}
            </Badge>
            <h1 style={heroTitleStyle}>{page.title}</h1>
            <p style={heroBodyStyle}>{page.body}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Button {...context} href="/ride">
                Ride with SuperNova
              </Button>
              <Button {...context} href="/drive" tone="success">
                Drive with SuperNova
              </Button>
            </div>
          </div>
        </section>
        <section style={sectionGridStyle}>
          <Surface {...context}>
            <div>
              <h2>Transparent demo fare</h2>
              <p>{demoRide.pickup}</p>
              <p>{demoRide.destination}</p>
            </div>
          </Surface>
          <Surface {...context}>
            <div>
              <h2>Vehicle categories</h2>
              <p>
                {demoVehicleOptions.map((option) => option.category).join(", ")}
              </p>
            </div>
          </Surface>
          <Surface {...context}>
            <div>
              <h2>Initial service area</h2>
              <p>Cairo and Giza launch zone-by-zone: {demoZones.join(", ")}.</p>
            </div>
          </Surface>
          <Surface {...context}>
            <div>
              <h2>Trip Black Box</h2>
              <p>
                Structured events and telemetry for safety review, not
                continuous recording.
              </p>
            </div>
          </Surface>
        </section>
        <section style={{ padding: "0 clamp(20px, 5vw, 72px) 64px" }}>
          <MapPanel {...context} label="Fictional Cairo and Giza launch map" />
        </section>
        <section style={sectionGridStyle}>
          {[
            "Driver verification",
            "Online payments",
            "Safety center",
            "FAQ",
          ].map((title) => (
            <Surface {...context} key={title}>
              <div>
                <h2>{title}</h2>
                <p>
                  Launch-stage preview content using approved Phase 1
                  terminology and fictional demo data.
                </p>
              </div>
            </Surface>
          ))}
        </section>
      </main>
    </MarketingShell>
  );
}

const heroStyle = {
  alignItems: "center",
  display: "flex",
  minHeight: "72vh",
  padding: "64px clamp(20px, 6vw, 88px)",
} as const;

const heroTitleStyle = {
  fontSize: "clamp(42px, 8vw, 88px)",
  letterSpacing: 0,
  lineHeight: 0.96,
  margin: "18px 0",
} as const;

const heroBodyStyle = {
  color: "var(--sn-theme-color-text-secondary)",
  fontSize: "clamp(18px, 2vw, 22px)",
  lineHeight: 1.55,
  maxWidth: 680,
} as const;

const sectionGridStyle = {
  display: "grid",
  gap: 18,
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  padding: "0 clamp(20px, 5vw, 72px) 32px",
} as const;
