import { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import {
  AppScreen,
  Button,
  FareSummary,
  Inline,
  MapCanvas,
  MoneyText,
  NovaAtmosphere,
  PickupMarker,
  DestinationMarker,
  DriverMarker,
  RideStatusTimeline,
  SegmentedControl,
  StatusPill,
  Surface,
  Text,
  TextField,
  type PrototypeContext,
} from "@supernova/ui-mobile";
import {
  demoDriver,
  demoDriverApplication,
  demoLedgerEntries,
  demoPayout,
  demoRide,
} from "@supernova/testing";
import { t, type Locale } from "@supernova/localization";
import type { ThemeMode } from "@supernova/design-tokens";

type DriverScreen = {
  id: string;
  title: string;
  subtitle: string;
  action: string;
};

const screens: readonly DriverScreen[] = [
  {
    id: "splash",
    title: "SuperNova Driver",
    subtitle: "Premium independent driver tools",
    action: "Start",
  },
  {
    id: "welcome",
    title: "Welcome",
    subtitle: "Apply with verified identity and vehicle evidence",
    action: "Verify phone",
  },
  {
    id: "phone",
    title: "Phone verification",
    subtitle: "Visual OTP state only",
    action: "Continue",
  },
  {
    id: "personal",
    title: "Personal details",
    subtitle: "Current address and profile summary",
    action: "Upload ID",
  },
  {
    id: "identity",
    title: "Identity document",
    subtitle: "No real upload in prototype",
    action: "Selfie check",
  },
  {
    id: "selfie",
    title: "Selfie verification",
    subtitle: "Visual liveness state",
    action: "Driver license",
  },
  {
    id: "license",
    title: "Driver license",
    subtitle: "Eligibility evidence preview",
    action: "Vehicle info",
  },
  {
    id: "vehicle",
    title: "Vehicle information",
    subtitle: demoDriver.vehicle,
    action: "Vehicle photos",
  },
  {
    id: "photos",
    title: "Vehicle photo review",
    subtitle: "Exterior, interior, seats, belts",
    action: "Payout setup",
  },
  {
    id: "payout",
    title: "Payout setup",
    subtitle: "Demo payout destination only",
    action: "Submit",
  },
  {
    id: "submitted",
    title: "Application submitted",
    subtitle: demoDriverApplication.id,
    action: "Review status",
  },
  {
    id: "review",
    title: "Application under review",
    subtitle: "Manual platform review",
    action: "Approved",
  },
  {
    id: "approved",
    title: "Driver approved",
    subtitle: "Eligible once online controls pass",
    action: "Home offline",
  },
  {
    id: "offline",
    title: "Driver home offline",
    subtitle: "GPS and network ready",
    action: "Go online",
  },
  {
    id: "online",
    title: "Driver home online",
    subtitle: "Waiting for eligible offer",
    action: "Incoming request",
  },
  {
    id: "incoming",
    title: "Incoming ride",
    subtitle: demoRide.pickup,
    action: "View details",
  },
  {
    id: "details",
    title: "Ride request details",
    subtitle: demoRide.destination,
    action: "Accept ride",
  },
  {
    id: "accepted",
    title: "Accepted ride",
    subtitle: "Atomic acceptance preview",
    action: "Navigate",
  },
  {
    id: "pickup",
    title: "Navigate to pickup",
    subtitle: "Minimal driving UI",
    action: "Arrived",
  },
  {
    id: "arrived",
    title: "Driver arrived",
    subtitle: "Wait for rider safely",
    action: "Start waiting",
  },
  {
    id: "waiting",
    title: "Waiting timer",
    subtitle: "No-show rules are configurable",
    action: "Verify rider",
  },
  {
    id: "verify",
    title: "QR/PIN verification",
    subtitle: "Server confirmation required",
    action: "Start trip",
  },
  {
    id: "active",
    title: "Active trip navigation",
    subtitle: "Low-distraction mode",
    action: "Complete trip",
  },
  {
    id: "completed",
    title: "Trip completed",
    subtitle: "Earnings record created",
    action: "Earnings",
  },
  {
    id: "summary",
    title: "Earnings summary",
    subtitle: "Net earnings after commission",
    action: "Dashboard",
  },
  {
    id: "earnings",
    title: "Earnings dashboard",
    subtitle: "Static chart placeholder",
    action: "Ledger",
  },
  {
    id: "ledger",
    title: "Ledger",
    subtitle: "Immutable demo entries",
    action: "Payout",
  },
  {
    id: "payout-request",
    title: "Payout request",
    subtitle: demoPayout.destination,
    action: "Support",
  },
  {
    id: "support",
    title: "Driver support",
    subtitle: "Complaint and payout help",
    action: "Profile",
  },
  {
    id: "profile",
    title: "Profile and settings",
    subtitle: "Prototype controls",
    action: "Restart",
  },
] as const;

export default function Page() {
  const [index, setIndex] = useState(0);
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const context = useMemo<PrototypeContext>(
    () => ({ locale, theme }),
    [locale, theme],
  );
  const screen = screens[index] ?? screens[0];
  const next = () => {
    setIndex((current) => (current + 1) % screens.length);
  };

  return (
    <AppScreen {...context}>
      <ScrollView
        contentContainerStyle={{ gap: 16, padding: 20, paddingBottom: 44 }}
      >
        <Inline style={{ justifyContent: "space-between" }}>
          <StatusPill
            {...context}
            label={t(locale, "prototypeOnly")}
            variant="info"
          />
          <Inline>
            <SegmentedControl
              {...context}
              options={["en", "ar"]}
              value={locale}
              onChange={(value) => {
                setLocale(value === "ar" ? "ar" : "en");
              }}
            />
            <SegmentedControl
              {...context}
              options={["light", "dark"]}
              value={theme}
              onChange={(value) => {
                setTheme(value === "dark" ? "dark" : "light");
              }}
            />
          </Inline>
        </Inline>
        <Surface {...context} elevated>
          {["splash", "approved", "online"].includes(screen.id) ? (
            <NovaAtmosphere {...context} compact={screen.id !== "approved"} />
          ) : null}
          <Text {...context} role="title">
            {locale === "ar" ? "نموذج السائق" : screen.title}
          </Text>
          <Text {...context} muted>
            {locale === "ar"
              ? "بيانات خيالية فقط ومراجعة بصرية"
              : screen.subtitle}
          </Text>
        </Surface>
        {index >= 14 && index <= 23 ? (
          <MapCanvas {...context}>
            <PickupMarker {...context} />
            <DestinationMarker {...context} />
            <DriverMarker {...context} />
          </MapCanvas>
        ) : null}
        <DriverBody context={context} id={screen.id} />
        <Button
          {...context}
          label={locale === "ar" ? "متابعة" : screen.action}
          onPress={next}
        />
        <Text {...context} role="caption" muted>
          {index + 1} / {screens.length} - Local prototype state only - no API
          calls.
        </Text>
      </ScrollView>
    </AppScreen>
  );
}

function DriverBody(props: { context: PrototypeContext; id: string }) {
  const { context, id } = props;
  if (
    [
      "phone",
      "personal",
      "identity",
      "selfie",
      "license",
      "vehicle",
      "photos",
      "payout",
    ].includes(id)
  ) {
    return (
      <TextField
        {...context}
        label="Application evidence"
        value={`${demoDriverApplication.applicant} - ${id}`}
      />
    );
  }
  if (
    [
      "incoming",
      "details",
      "accepted",
      "pickup",
      "arrived",
      "waiting",
      "verify",
      "active",
    ].includes(id)
  ) {
    return (
      <Surface {...context} elevated>
        <Text {...context} role="section">
          {id === "incoming" ? "Premium request ready" : demoRide.pickup}
        </Text>
        <Text {...context} muted>
          Pickup 1.8 km · ETA 4 min · {demoRide.destination}
        </Text>
        <Inline style={{ flexWrap: "wrap" }}>
          <StatusPill
            {...context}
            label="Payment confirmed"
            variant="success"
          />
          <StatusPill {...context} label="Rider trusted" variant="info" />
          <StatusPill {...context} label="Countdown 18s" variant="warning" />
        </Inline>
        <FareSummary
          {...context}
          fareMinor={demoRide.estimateMinor}
          distance={`${String(demoRide.distanceKm)} km`}
          duration={`${String(demoRide.durationMinutes)} min`}
        />
      </Surface>
    );
  }
  if (["summary", "earnings", "ledger", "payout-request"].includes(id)) {
    return (
      <Surface {...context} elevated>
        <Text {...context} role="section">
          Net demo earnings
        </Text>
        <MoneyText {...context} minorUnits={demoPayout.amountMinor} />
        <RideStatusTimeline
          {...context}
          items={demoLedgerEntries.map((entry) => entry.label)}
        />
      </Surface>
    );
  }
  return (
    <Surface {...context} elevated>
      <Text {...context}>{demoDriver.name}</Text>
      <Text {...context} muted>
        {demoDriver.verification} · GPS fresh · network ready
      </Text>
      {id === "offline" || id === "online" ? (
        <Inline style={{ flexWrap: "wrap" }}>
          <StatusPill {...context} label="Zone: Dokki" variant="info" />
          <StatusPill {...context} label="Demand: balanced" variant="success" />
          <StatusPill {...context} label="Documents valid" variant="success" />
        </Inline>
      ) : null}
      <StatusPill
        {...context}
        label={id === "offline" ? "Offline" : "Demo ready"}
        variant={id === "offline" ? "warning" : "success"}
      />
    </Surface>
  );
}
