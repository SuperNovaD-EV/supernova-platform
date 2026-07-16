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

const context: WebContext = { locale: "en", theme: "light" };

const routeContent: Record<string, { title: string; eyebrow: string }> = {
  dashboard: {
    title: "Dashboard overview",
    eyebrow: "Operational intelligence",
  },
  "live-operations": {
    title: "Live operations",
    eyebrow: "Zone and ride monitoring",
  },
  drivers: { title: "Drivers", eyebrow: "Verified supply overview" },
  "drivers/applications": {
    title: "Driver applications",
    eyebrow: "Manual verification queue",
  },
  "drivers/applications/demo-application-17": {
    title: "Driver application review",
    eyebrow: demoDriverApplication.id,
  },
  rides: { title: "Rides", eyebrow: "Ride lifecycle review" },
  "rides/demo-ride-2048": { title: "Ride investigation", eyebrow: demoRide.id },
  incidents: { title: "Incidents", eyebrow: "Safety escalation preview" },
  complaints: { title: "Complaints", eyebrow: "Support resolution queue" },
  "complaints/demo-complaint-1": {
    title: "Complaint investigation",
    eyebrow: demoComplaint.state,
  },
  payments: { title: "Payments", eyebrow: "Provider-neutral reconciliation" },
  payouts: { title: "Payouts", eyebrow: demoPayout.state },
  pricing: { title: "Pricing", eyebrow: "Versioned configuration preview" },
  "service-zones": {
    title: "Service zones",
    eyebrow: "Cairo and Giza launch controls",
  },
  analytics: { title: "Analytics", eyebrow: "Aggregated demo metrics" },
  settings: { title: "Settings", eyebrow: "Prototype-only controls" },
  "design-system": { title: "Design system", eyebrow: "Components and tokens" },
  "prototype-overview": {
    title: "Prototype overview",
    eyebrow: "Phase 2 route inventory",
  },
};

export function AdminPrototypePage(props: { routeKey: string }) {
  const content = routeContent[props.routeKey] ?? {
    title: "Dashboard overview",
    eyebrow: "Operational intelligence",
  };
  const active = content.title.split(" ")[0] ?? "Dashboard";
  return (
    <AdminShell {...context} active={active}>
      <PageHeader
        {...context}
        eyebrow={content.eyebrow}
        title={content.title}
        action={<Button {...context}>Visual action</Button>}
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
    return (
      <div style={gridStyle}>
        <Surface {...context} style={{ gridColumn: "span 2" }}>
          <MapPanel {...context} label="Fictional service zone map" />
        </Surface>
        {demoZones.map((zone) => (
          <StatCard
            {...context}
            key={zone}
            label={zone}
            value="Active demo"
            tone="success"
          />
        ))}
      </div>
    );
  }
  if (props.routeKey.includes("applications")) {
    return (
      <div style={gridStyle}>
        <Surface {...context}>
          <h2>Evidence review</h2>
          {demoDriverApplication.evidence.map((item) => (
            <p key={item}>
              <Badge {...context} tone="info">
                Required
              </Badge>{" "}
              {item}
            </p>
          ))}
        </Surface>
        <Surface {...context}>
          <h2>Decision controls</h2>
          <p>
            Visual-only approve, request information, reject, and audit preview
            actions.
          </p>
          <Button {...context} tone="success">
            Approve visually
          </Button>
        </Surface>
      </div>
    );
  }
  if (props.routeKey.includes("rides") || props.routeKey === "incidents") {
    return (
      <div style={gridStyle}>
        <Surface {...context} style={{ gridColumn: "span 2" }}>
          <MapPanel {...context} label="Fictional ride investigation map" />
        </Surface>
        <Surface {...context}>
          <h2>Ride timeline</h2>
          <p>{demoRide.pickup}</p>
          <p>{demoRide.destination}</p>
        </Surface>
        <Surface {...context}>
          <h2>Safety evidence</h2>
          <p>Structured Trip Black Box preview. No real coordinates.</p>
        </Surface>
      </div>
    );
  }
  if (props.routeKey.includes("complaints")) {
    return (
      <div style={gridStyle}>
        <Surface {...context}>
          <h2>{demoComplaint.category}</h2>
          <p>{demoComplaint.summary}</p>
        </Surface>
        <Surface {...context}>
          <h2>Resolution controls</h2>
          <p>
            Manual review, appeal, compensation, and deduction previews only.
          </p>
        </Surface>
      </div>
    );
  }
  if (props.routeKey === "payments" || props.routeKey === "payouts") {
    return (
      <div style={gridStyle}>
        <FinancialSummary
          {...context}
          label="Payout queue"
          amount="EGP 7,400 demo"
        />
        <DataTable
          {...context}
          columns={["Ledger event", "Amount"]}
          rows={demoLedgerEntries.map((entry) => [
            entry.label,
            entry.amountMinor,
          ])}
        />
      </div>
    );
  }
  if (props.routeKey === "pricing") {
    return (
      <div style={gridStyle}>
        <Surface {...context}>
          <h2>Versioned pricing preview</h2>
          <p>No exact production fare or commission values are approved.</p>
        </Surface>
        <SuperNovaChart
          kind="bar"
          points={demoChartSeries}
          label="Demo fare estimate volume"
        />
      </div>
    );
  }
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
      <Surface {...context} style={{ gridColumn: "span 2" }}>
        <SuperNovaChart
          kind="area"
          points={demoChartSeries}
          label="Demo demand trend"
        />
      </Surface>
      <Surface {...context}>
        <SuperNovaChart
          kind="donut"
          points={demoChartSeries.slice(0, 4)}
          label="Demo service mix"
        />
      </Surface>
      <Surface {...context}>
        <SuperNovaChart
          kind="stacked-bar"
          points={demoChartSeries}
          label="Demo zone balance"
        />
      </Surface>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gap: 18,
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
} as const;
