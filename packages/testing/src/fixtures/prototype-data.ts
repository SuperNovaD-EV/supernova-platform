export type DemoVehicleCategory =
  | "Motorcycle"
  | "Scooter"
  | "Compact"
  | "Economy"
  | "Comfort"
  | "Premium"
  | "SUV"
  | "Van"
  | "Accessible";

export type DemoStatus = "success" | "warning" | "danger" | "info" | "neutral";

export const demoRider = {
  id: "demo-rider-001",
  name: "Mariam Hassan",
  trustedContact: "Nadine",
  homeLabel: "Demo home near Heliopolis",
  workLabel: "Demo office near New Cairo",
} as const;

export const demoDriver = {
  id: "demo-driver-001",
  name: "Youssef Karim",
  rating: "4.9",
  verification: "Verified driver",
  vehicle: "Demo pearl Comfort sedan",
  plateLabel: "Demo plate",
} as const;

export const demoZones = [
  "Nasr City",
  "Heliopolis",
  "New Cairo",
  "Maadi",
  "Dokki",
  "Sheikh Zayed",
] as const;

export const demoVehicleOptions: readonly {
  category: DemoVehicleCategory;
  eta: string;
  fareMinor: number;
  capacity: number;
  benefit: string;
  available: boolean;
}[] = [
  {
    category: "Motorcycle",
    eta: "4 min",
    fareMinor: 5200,
    capacity: 1,
    benefit: "Fast solo pickup",
    available: true,
  },
  {
    category: "Economy",
    eta: "6 min",
    fareMinor: 7800,
    capacity: 4,
    benefit: "Everyday verified ride",
    available: true,
  },
  {
    category: "Comfort",
    eta: "8 min",
    fareMinor: 11200,
    capacity: 4,
    benefit: "Calm premium cabin",
    available: true,
  },
  {
    category: "SUV",
    eta: "11 min",
    fareMinor: 14800,
    capacity: 6,
    benefit: "More seats and luggage",
    available: true,
  },
  {
    category: "Accessible",
    eta: "Limited",
    fareMinor: 0,
    capacity: 3,
    benefit: "Requires zone availability",
    available: false,
  },
] as const;

export const demoRide = {
  id: "demo-ride-2048",
  pickup: "Demo pickup near Heliopolis Square",
  destination: "Demo destination near Downtown Cairo",
  distanceKm: 13.8,
  durationMinutes: 28,
  estimateMinor: 11200,
  pin: "4826",
  routeSummary: "Fictional Cairo/Giza prototype route",
} as const;

export const demoLedgerEntries = [
  { id: "ledger-1", label: "Ride gross credit", amountMinor: 11200 },
  {
    id: "ledger-2",
    label: "Platform commission demo debit",
    amountMinor: -900,
  },
  { id: "ledger-3", label: "Promotion credit", amountMinor: 450 },
  { id: "ledger-4", label: "Payout queued", amountMinor: -7400 },
] as const;

export const demoPayout = {
  state: "queued",
  amountMinor: 7400,
  destination: "Demo payout destination",
} as const;

export const demoComplaint = {
  state: "manual_review_required",
  category: "Incorrect fare",
  summary: "Demo complaint linked to fictional fare review evidence.",
} as const;

export const demoSafetyEvents = [
  "Trip PIN verified",
  "Route progress normal",
  "Trusted contact sharing on",
] as const;

export const demoAdminStats = [
  { label: "Active demo rides", value: "42", status: "info" as DemoStatus },
  { label: "Drivers online", value: "118", status: "success" as DemoStatus },
  { label: "Safety reviews", value: "3", status: "warning" as DemoStatus },
  { label: "Payout queue", value: "EGP 74k", status: "neutral" as DemoStatus },
] as const;

export const demoDriverApplication = {
  id: "demo-application-17",
  applicant: "Youssef Karim",
  state: "under_review",
  vehicleState: "under_review",
  evidence: [
    "National ID visual check",
    "Driver license visual check",
    "Vehicle photo review",
  ],
} as const;

export const demoNotifications = [
  "Driver assigned",
  "Trip protection active",
  "Payout queued",
] as const;

export const demoChartSeries = [
  { label: "Mon", value: 18 },
  { label: "Tue", value: 24 },
  { label: "Wed", value: 21 },
  { label: "Thu", value: 30 },
  { label: "Fri", value: 28 },
  { label: "Sat", value: 35 },
] as const;

export const fixtureSafetyNotice =
  "All data in these fixtures is fictional demo data with no real credentials, identity documents, payment credentials, exact private locations, or account identifiers.";
