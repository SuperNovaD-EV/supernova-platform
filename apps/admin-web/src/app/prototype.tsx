"use client";

import {
  AdminShell,
  Badge,
  Button,
  DataTable,
  FinancialSummary,
  MapPanel,
  PageHeader,
  StatCard,
  Surface,
  type WebContext,
} from "@supernova/ui-web";
import { SuperNovaChart } from "@supernova/charts-web";
import {
  demoAdminStats,
  demoChartSeries,
  demoComplaint,
  demoDriverApplication,
  demoLedgerEntries,
  demoPayout,
  demoRide,
  demoZones,
} from "@supernova/testing";

const context: WebContext = { locale: "en", theme: "dark" };

const routeContent: Record<
  string,
  { title: string; eyebrow: string; active: string }
> = {
  dashboard: {
    title: "Operations command center",
    eyebrow: "Live marketplace intelligence",
    active: "Dashboard",
  },
  "live-operations": {
    title: "Live operations",
    eyebrow: "Supply, demand, active routes, and incidents",
    active: "Live operations",
  },
  drivers: {
    title: "Driver supply",
    eyebrow: "Verified supply overview",
    active: "Drivers",
  },
  "drivers/applications": {
    title: "Driver applications",
    eyebrow: "Manual verification queue",
    active: "Drivers",
  },
  "drivers/applications/demo-application-17": {
    title: "Driver application review",
    eyebrow: demoDriverApplication.id,
    active: "Drivers",
  },
  rides: { title: "Rides", eyebrow: "Ride lifecycle review", active: "Rides" },
  "rides/demo-ride-2048": {
    title: "Ride investigation",
    eyebrow: demoRide.id,
    active: "Rides",
  },
  incidents: {
    title: "Safety incidents",
    eyebrow: "Escalation preview",
    active: "Live operations",
  },
  complaints: {
    title: "Complaints",
    eyebrow: "Support queue",
    active: "Complaints",
  },
  "complaints/demo-complaint-1": {
    title: "Complaint investigation",
    eyebrow: demoComplaint.state,
    active: "Complaints",
  },
  payments: {
    title: "Payments",
    eyebrow: "Provider-neutral reconciliation",
    active: "Payments",
  },
  payouts: { title: "Payouts", eyebrow: demoPayout.state, active: "Payments" },
  pricing: {
    title: "Pricing",
    eyebrow: "Versioned configuration preview",
    active: "Pricing",
  },
  "service-zones": {
    title: "Service zones",
    eyebrow: "Cairo and Giza rollout controls",
    active: "Zones",
  },
  analytics: {
    title: "Analytics",
    eyebrow: "Aggregated demo metrics",
    active: "Dashboard",
  },
  settings: {
    title: "Settings",
    eyebrow: "Prototype-only controls",
    active: "Dashboard",
  },
  "design-system": {
    title: "Design system",
    eyebrow: "Components and tokens",
    active: "Dashboard",
  },
  "prototype-overview": {
    title: "Prototype overview",
    eyebrow: "Phase 2 route inventory",
    active: "Dashboard",
  },
};

export function AdminPrototypePage(props: { routeKey: string }) {
  const content = routeContent[props.routeKey] ?? {
    title: "Operations command center",
    eyebrow: "Live marketplace intelligence",
    active: "Dashboard",
  };
  return (
    <AdminShell {...context} active={content.active}>
      <PageHeader
        {...context}
        eyebrow={content.eyebrow}
        title={content.title}
        action={
          <Button {...context} variant="secondary">
            Export review pack
          </Button>
        }
      />
      <Overview routeKey={props.routeKey} />
    </AdminShell>
  );
}

function Overview(props: { routeKey: string }) {
  if (
    props.routeKey === "live-operations" ||
    props.routeKey === "service-zones"
  ) {
    return <LiveOperations />;
  }
  if (props.routeKey.includes("applications")) {
    return <ApplicationReview />;
  }
  if (props.routeKey.includes("rides") || props.routeKey === "incidents") {
    return <RideInvestigation />;
  }
  if (props.routeKey.includes("complaints")) {
    return <ComplaintInvestigation />;
  }
  if (props.routeKey === "payments" || props.routeKey === "payouts") {
    return <FinanceView />;
  }
  if (props.routeKey === "pricing") {
    return <PricingView />;
  }
  return <Dashboard />;
}

function Dashboard() {
  return (
    <div style={gridStyle}>
      {demoAdminStats.map((stat) => (
        <StatCard
          {...context}
          key={stat.label}
          label={stat.label}
          value={stat.value}
          tone={stat.status}
        />
      ))}
      <Surface {...context} style={{ gridColumn: "span 2" }} tone="panel">
        <PanelTitle title="Demand and ride health" badge="Operations summary" />
        <SuperNovaChart
          kind="area"
          points={demoChartSeries}
          label="Demo demand trend"
          theme="dark"
        />
      </Surface>
      <Surface {...context} tone="safety">
        <PanelTitle title="Open safety incidents" badge="Manual review" />
        <StatusList
          items={[
            "Driver application risk review",
            "Trip evidence check",
            "Complaint compensation preview",
          ]}
        />
      </Surface>
      <Surface {...context} tone="finance">
        <PanelTitle title="Payout queue" badge="Finance" />
        <SuperNovaChart
          kind="donut"
          points={demoChartSeries.slice(0, 4)}
          label="Demo payout mix"
          theme="dark"
        />
      </Surface>
      <Surface {...context} style={{ gridColumn: "span 2" }} tone="panel">
        <PanelTitle
          title="Recent operational events"
          badge="Black Box stream"
        />
        <DataTable
          {...context}
          columns={["Event", "Zone", "Status"]}
          rows={[
            [
              "Ride accepted atomically",
              "Dokki",
              <Badge {...context} key="ok" tone="success">
                healthy
              </Badge>,
            ],
            [
              "Driver application needs document review",
              "Nasr City",
              <Badge {...context} key="warn" tone="warning">
                review
              </Badge>,
            ],
            [
              "Complaint recommendation generated",
              "Zamalek",
              <Badge {...context} key="info" tone="info">
                draft
              </Badge>,
            ],
          ]}
        />
      </Surface>
    </div>
  );
}

function LiveOperations() {
  return (
    <div style={opsGridStyle}>
      <Surface {...context} style={{ minHeight: 560 }} tone="panel">
        <PanelTitle
          title="Fictional Cairo/Giza operating map"
          badge="Live preview"
        />
        <MapPanel
          {...context}
          operations
          label="Professional mock operations map"
        />
      </Surface>
      <div style={{ display: "grid", gap: 18 }}>
        <Surface {...context} tone="safety">
          <PanelTitle title="Alert panel" badge="Safety" />
          <StatusList
            items={[
              "Trip start verification delayed",
              "Vehicle photo review pending",
              "Zone heat rising in Giza",
            ]}
          />
        </Surface>
        <Surface {...context} tone="panel">
          <PanelTitle title="Selected trip" badge={demoRide.id} />
          <p style={mutedStyle}>{demoRide.pickup}</p>
          <p style={mutedStyle}>{demoRide.destination}</p>
          <Badge {...context} tone="success">
            Payment confirmed
          </Badge>
        </Surface>
        <Surface {...context} tone="panel">
          <PanelTitle title="Zone demand" badge="Filters" />
          <StatusList
            items={demoZones.map((zone) => `${zone}: balanced supply`)}
          />
        </Surface>
      </div>
    </div>
  );
}

function ApplicationReview() {
  return (
    <div style={twoColumnStyle}>
      <Surface {...context} tone="panel">
        <PanelTitle
          title={demoDriverApplication.applicant}
          badge="Identity overview"
        />
        <StatusList
          items={[
            "National ID placeholder reviewed",
            "Selfie liveness visual state",
            "Address evidence pending",
          ]}
        />
      </Surface>
      <Surface {...context} tone="panel">
        <PanelTitle title="Verification progress" badge="70%" />
        <SuperNovaChart
          kind="bar"
          points={demoChartSeries.slice(0, 4)}
          label="Driver verification progress"
          theme="dark"
        />
      </Surface>
      <Surface {...context} style={{ gridColumn: "span 2" }} tone="panel">
        <PanelTitle
          title="Document preview placeholders"
          badge="No real uploads"
        />
        <div style={documentGridStyle}>
          {demoDriverApplication.evidence.map((item) => (
            <div key={item} style={documentStyle}>
              <Badge {...context} tone="info">
                Required
              </Badge>
              <strong>{item}</strong>
              <span style={mutedStyle}>Watermarked prototype preview</span>
            </div>
          ))}
        </div>
      </Surface>
      <Surface {...context} tone="safety">
        <PanelTitle title="Risk indicators" badge="Review" />
        <StatusList
          items={[
            "Vehicle category consistent",
            "Manual address verification needed",
            "No production identity data",
          ]}
        />
      </Surface>
      <Surface {...context} tone="finance">
        <PanelTitle title="Decision controls" badge="Sensitive" />
        <div style={actionsStyle}>
          <Button {...context} tone="success">
            Approve
          </Button>
          <Button {...context} variant="secondary" tone="warning">
            Request information
          </Button>
          <Button {...context} variant="secondary" tone="danger">
            Reject
          </Button>
        </div>
      </Surface>
    </div>
  );
}

function RideInvestigation() {
  return (
    <div style={twoColumnStyle}>
      <Surface {...context} style={{ gridColumn: "span 2" }} tone="panel">
        <PanelTitle title="Ride route and evidence" badge={demoRide.id} />
        <MapPanel
          {...context}
          operations
          label="Fictional ride investigation map"
        />
      </Surface>
      <Surface {...context} tone="panel">
        <PanelTitle title="Black Box timeline" badge="Structured events" />
        <StatusList
          items={[
            "Request created",
            "Offer accepted",
            "PIN verified",
            "Trip completed",
          ]}
        />
      </Surface>
      <Surface {...context} tone="safety">
        <PanelTitle title="Safety evidence" badge="Protected" />
        <p style={mutedStyle}>
          No continuous audio or video. No real coordinates.
        </p>
      </Surface>
    </div>
  );
}

function ComplaintInvestigation() {
  return (
    <div style={twoColumnStyle}>
      <Surface {...context} tone="safety">
        <PanelTitle
          title={demoComplaint.category}
          badge={demoComplaint.state}
        />
        <p style={mutedStyle}>{demoComplaint.summary}</p>
        <StatusList
          items={[
            "Complaint opened",
            "Trip evidence attached",
            "Recommendation pending",
          ]}
        />
      </Surface>
      <Surface {...context} tone="panel">
        <PanelTitle
          title="Rider and driver summaries"
          badge="Demo identities"
        />
        <StatusList
          items={[
            "Rider protected account",
            "Driver verified vehicle",
            "Payment confirmed",
          ]}
        />
      </Surface>
      <Surface {...context} style={{ gridColumn: "span 2" }} tone="panel">
        <PanelTitle title="Evidence and financial impact" badge="Resolution" />
        <DataTable
          {...context}
          columns={["Evidence", "Impact", "Recommendation"]}
          rows={[
            ["Trip Black Box timeline", "Safety review", "Manual review"],
            ["Payment record", "EGP demo estimate", "Compensation preview"],
            ["Attachment placeholder", "No real media", "Request more info"],
          ]}
        />
      </Surface>
    </div>
  );
}

function FinanceView() {
  return (
    <div style={gridStyle}>
      <FinancialSummary
        {...context}
        label="Payout queue"
        amount="EGP 7,400 demo"
      />
      <FinancialSummary
        {...context}
        label="Payment health"
        amount="Visual only"
      />
      <Surface {...context} style={{ gridColumn: "span 2" }} tone="finance">
        <PanelTitle title="Ledger events" badge={demoPayout.state} />
        <DataTable
          {...context}
          columns={["Ledger event", "Amount"]}
          rows={demoLedgerEntries.map((entry) => [
            entry.label,
            entry.amountMinor,
          ])}
        />
      </Surface>
    </div>
  );
}

function PricingView() {
  return (
    <div style={twoColumnStyle}>
      <Surface {...context} tone="panel">
        <PanelTitle title="Versioned pricing preview" badge="Config" />
        <p style={mutedStyle}>
          No exact production fare or commission values are approved.
        </p>
      </Surface>
      <Surface {...context} tone="panel">
        <SuperNovaChart
          kind="bar"
          points={demoChartSeries}
          label="Demo fare estimate volume"
          theme="dark"
        />
      </Surface>
    </div>
  );
}

function PanelTitle(props: { title: string; badge: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <Badge {...context} tone="info">
        {props.badge}
      </Badge>
      <h2 style={{ fontSize: 26, lineHeight: 1.1, margin: "12px 0 0" }}>
        {props.title}
      </h2>
    </div>
  );
}

function StatusList(props: { items: readonly string[] }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {props.items.map((item) => (
        <div key={item} style={statusRowStyle}>
          <span style={statusDotStyle} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gap: 18,
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
} as const;

const opsGridStyle = {
  display: "grid",
  gap: 18,
  gridTemplateColumns: "minmax(0, 1.5fr) minmax(320px, 0.7fr)",
} as const;

const twoColumnStyle = {
  display: "grid",
  gap: 18,
  gridTemplateColumns: "repeat(2, minmax(280px, 1fr))",
} as const;

const documentGridStyle = {
  display: "grid",
  gap: 14,
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
} as const;

const documentStyle = {
  background: "rgba(247, 248, 250, 0.06)",
  border: "1px dashed rgba(247, 248, 250, 0.24)",
  borderRadius: 18,
  display: "grid",
  gap: 12,
  minHeight: 150,
  padding: 18,
} as const;

const actionsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
} as const;

const mutedStyle = {
  color: "var(--sn-theme-color-text-secondary)",
  lineHeight: 1.6,
} as const;

const statusRowStyle = {
  alignItems: "center",
  display: "flex",
  gap: 10,
  fontWeight: 800,
} as const;

const statusDotStyle = {
  background: "linear-gradient(135deg, #635BFF, #25C6DA)",
  borderRadius: 999,
  boxShadow: "0 0 0 5px rgba(99, 91, 255, 0.12)",
  height: 10,
  width: 10,
} as const;
