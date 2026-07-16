"use client";

import type { CSSProperties, ReactNode } from "react";
import { Children, useMemo } from "react";
import {
  createCssVariables,
  getTheme,
  radii,
  shadows,
  spacing,
  typography,
  type ThemeMode,
} from "@supernova/design-tokens";
import { getDirection, type Locale } from "@supernova/localization";
import { Lightfall, LightfallFallback } from "./effects/lightfall";

export { Lightfall, LightfallFallback };

export type WebContext = {
  locale: Locale;
  theme: ThemeMode;
};

export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

const toneColor = (context: WebContext, tone: StatusTone) => {
  const theme = getTheme(context.theme);
  if (tone === "success") return theme.color.status.success;
  if (tone === "warning") return theme.color.status.warning;
  if (tone === "danger") return theme.color.status.danger;
  if (tone === "info") return theme.color.brand.accent;
  return theme.color.text.secondary;
};

const shellBackground = (theme: ThemeMode) =>
  theme === "dark"
    ? "radial-gradient(circle at 18% 0%, rgba(99, 91, 255, 0.22), transparent 34%), radial-gradient(circle at 88% 18%, rgba(37, 198, 218, 0.14), transparent 30%), linear-gradient(180deg, #0D1117 0%, #111722 42%, #0D1117 100%)"
    : "radial-gradient(circle at 18% 0%, rgba(99, 91, 255, 0.12), transparent 34%), radial-gradient(circle at 82% 14%, rgba(37, 198, 218, 0.1), transparent 32%), linear-gradient(180deg, #F7F8FA 0%, #EEF2F8 100%)";

export function ThemeProviderShell(
  props: WebContext & { children: ReactNode; className?: string },
) {
  const variables = useMemo(
    () => createCssVariables(props.theme),
    [props.theme],
  );
  const dir = getDirection(props.locale);
  return (
    <div
      className={props.className}
      dir={dir}
      style={{
        ...variables,
        background: shellBackground(props.theme),
        color: getTheme(props.theme).color.text.primary,
        direction: dir,
        fontFamily:
          props.locale === "ar"
            ? typography.family.arabic
            : "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      {Children.toArray(props.children)}
    </div>
  );
}

export function BrandLockup(props: { inverse?: boolean; compact?: boolean }) {
  return (
    <div aria-label="SuperNova" style={styles.lockup}>
      <span style={styles.symbol} aria-hidden="true">
        ✦
      </span>
      <strong
        style={{
          color: props.inverse ? "#FFFFFF" : "inherit",
          fontSize: props.compact ? 16 : 19,
          letterSpacing: 0,
          lineHeight: 1,
        }}
      >
        SuperNova
      </strong>
    </div>
  );
}

export const BrandMark = BrandLockup;

export function Surface(
  props: WebContext & {
    children: ReactNode;
    elevated?: boolean;
    style?: CSSProperties;
    as?: "section" | "article" | "div";
    tone?: "metric" | "finance" | "safety" | "marketing" | "panel";
  },
) {
  const Component = props.as ?? "section";
  const dark = props.theme === "dark";
  const toneGlow =
    props.tone === "safety"
      ? "rgba(255, 122, 128, 0.12)"
      : props.tone === "finance"
        ? "rgba(59, 212, 137, 0.12)"
        : props.tone === "marketing"
          ? "rgba(99, 91, 255, 0.16)"
          : "rgba(37, 198, 218, 0.08)";
  return (
    <Component
      style={{
        background: dark
          ? `linear-gradient(145deg, rgba(21, 27, 35, 0.92), rgba(13, 17, 23, 0.84)), radial-gradient(circle at 16% 0%, ${toneGlow}, transparent 42%)`
          : `linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(247, 248, 250, 0.82)), radial-gradient(circle at 12% 0%, ${toneGlow}, transparent 46%)`,
        border: `1px solid ${dark ? "rgba(210, 216, 226, 0.12)" : "rgba(13, 17, 23, 0.08)"}`,
        borderRadius: 18,
        boxShadow: props.elevated
          ? dark
            ? "0 24px 80px rgba(0, 0, 0, 0.36)"
            : shadows.soft
          : "none",
        overflow: "hidden",
        padding: spacing.xl,
        position: "relative",
        ...props.style,
      }}
    >
      {Children.toArray(props.children)}
    </Component>
  );
}

export const Card = Surface;
export const ChartCard = Surface;
export const AlertCard = Surface;

export function Button(
  props: WebContext & {
    children: ReactNode;
    tone?: StatusTone;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "ghost";
  },
) {
  const color = toneColor(props, props.tone ?? "info");
  const ghost = props.variant === "ghost";
  const secondary = props.variant === "secondary";
  const content = (
    <span
      style={{
        alignItems: "center",
        background: ghost
          ? "transparent"
          : secondary
            ? "rgba(247, 248, 250, 0.08)"
            : `linear-gradient(135deg, ${color}, #7A5CFF)`,
        border: `1px solid ${secondary || ghost ? "rgba(247, 248, 250, 0.18)" : "rgba(255, 255, 255, 0.18)"}`,
        borderRadius: 999,
        boxShadow: ghost ? "none" : "0 14px 34px rgba(99, 91, 255, 0.28)",
        color:
          props.theme === "light" && (secondary || ghost)
            ? "#0D1117"
            : "#FFFFFF",
        display: "inline-flex",
        fontWeight: 900,
        minHeight: 48,
        padding: "0 20px",
        textDecoration: "none",
      }}
    >
      {props.children}
    </span>
  );
  if (props.href) {
    return (
      <a href={props.href} style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={props.onClick}
      style={{ all: "unset", cursor: "pointer" }}
    >
      {content}
    </button>
  );
}

export function IconButton(
  props: WebContext & { label: string; icon: ReactNode },
) {
  return (
    <button type="button" aria-label={props.label} style={styles.iconButton}>
      {props.icon}
    </button>
  );
}

export function Badge(
  props: WebContext & { children: ReactNode; tone?: StatusTone },
) {
  const color = toneColor(props, props.tone ?? "neutral");
  return (
    <span
      style={{
        alignItems: "center",
        background: `${color}18`,
        border: `1px solid ${color}55`,
        borderRadius: radii.pill,
        color,
        display: "inline-flex",
        fontSize: 12,
        fontWeight: 900,
        minHeight: 28,
        padding: "4px 10px",
      }}
    >
      {props.children}
    </span>
  );
}

export const StatusPill = Badge;

export function PageHeader(
  props: WebContext & { eyebrow?: string; title: string; action?: ReactNode },
) {
  return (
    <header style={styles.pageHeader}>
      <div>
        {props.eyebrow ? <p style={styles.eyebrow}>{props.eyebrow}</p> : null}
        <h1 style={styles.h1}>{props.title}</h1>
      </div>
      {props.action}
    </header>
  );
}

export const SectionHeader = PageHeader;

export function StatCard(
  props: WebContext & { label: string; value: string; tone?: StatusTone },
) {
  return (
    <Surface {...props} tone="metric" style={{ padding: 18 }}>
      <Badge {...props} tone={props.tone ?? "neutral"}>
        {props.label}
      </Badge>
      <p style={styles.statValue}>{props.value}</p>
    </Surface>
  );
}

export function DataTable(
  props: WebContext & {
    columns: readonly string[];
    rows: readonly (readonly ReactNode[])[];
  },
) {
  const theme = getTheme(props.theme);
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{ borderCollapse: "collapse", minWidth: 680, width: "100%" }}
      >
        <thead>
          <tr>
            {props.columns.map((column) => (
              <th
                key={column}
                style={{ ...styles.th, color: theme.color.text.secondary }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row, index) => (
            <tr key={`row-${String(index + 1)}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`cell-${String(index + 1)}-${String(cellIndex + 1)}`}
                  style={{
                    borderTop: `1px solid ${theme.color.border.default}`,
                    padding: "14px 10px",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminShell(
  props: WebContext & { children: ReactNode; active?: string },
) {
  const theme = getTheme(props.theme);
  const links = [
    ["Dashboard", "/dashboard"],
    ["Live operations", "/live-operations"],
    ["Drivers", "/drivers"],
    ["Rides", "/rides"],
    ["Complaints", "/complaints"],
    ["Payments", "/payments"],
    ["Pricing", "/pricing"],
    ["Zones", "/service-zones"],
  ] as const;
  return (
    <ThemeProviderShell {...props}>
      <div style={styles.adminGrid}>
        <aside style={styles.adminAside}>
          <BrandLockup inverse={props.theme === "dark"} />
          <nav style={{ display: "grid", gap: 8, marginTop: 34 }}>
            {links.map(([label, href]) => {
              const active = props.active === label;
              return (
                <a
                  key={label}
                  href={href}
                  style={{
                    background: active
                      ? "linear-gradient(135deg, rgba(99, 91, 255, 0.22), rgba(37, 198, 218, 0.1))"
                      : "transparent",
                    border: `1px solid ${active ? "rgba(99, 91, 255, 0.28)" : "transparent"}`,
                    borderRadius: 14,
                    color: active
                      ? theme.color.text.primary
                      : theme.color.text.secondary,
                    fontWeight: 900,
                    padding: "12px 14px",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              );
            })}
          </nav>
        </aside>
        <main style={styles.adminMain}>
          <div style={styles.commandBar}>
            <Badge {...props} tone="info">
              Development operations preview
            </Badge>
            <span
              style={{ color: theme.color.text.secondary, fontWeight: 800 }}
            >
              Cairo/Giza demo data only
            </span>
          </div>
          {props.children}
        </main>
      </div>
    </ThemeProviderShell>
  );
}

export function MarketingHeader(props: WebContext) {
  return (
    <header style={styles.marketingHeader}>
      <BrandLockup inverse={props.theme === "dark"} />
      <nav style={styles.marketingNav}>
        {["Ride", "Drive", "Safety", "How it works", "Help"].map((link) => (
          <a
            href={`/${link.toLowerCase().replaceAll(" ", "-")}`}
            key={link}
            style={styles.navLink}
          >
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function MarketingFooter(props: WebContext) {
  const theme = getTheme(props.theme);
  return (
    <footer style={styles.footer}>
      <BrandLockup inverse={props.theme === "dark"} compact />
      <div style={styles.footerGrid}>
        {["Ride", "Drive", "Safety", "Help", "About", "Legal"].map((item) => (
          <span key={item} style={{ color: theme.color.text.secondary }}>
            {item}
          </span>
        ))}
      </div>
      <p style={{ color: theme.color.text.secondary, margin: 0 }}>
        Cairo and Giza launch-stage prototype. No production claims.
      </p>
    </footer>
  );
}

export function MarketingShell(props: WebContext & { children: ReactNode }) {
  return (
    <ThemeProviderShell {...props}>
      <MarketingHeader {...props} />
      {props.children}
      <MarketingFooter {...props} />
    </ThemeProviderShell>
  );
}

export function MapPanel(
  props: WebContext & {
    label?: string;
    dense?: boolean;
    operations?: boolean;
  },
) {
  const dark = props.theme === "dark";
  return (
    <div
      aria-label={props.label ?? "Fictional Cairo and Giza prototype map"}
      role="img"
      style={{
        background: dark
          ? "linear-gradient(135deg, #111923, #0D1117)"
          : "linear-gradient(135deg, #E7EDF6, #F7F8FA)",
        border: `1px solid ${dark ? "rgba(210,216,226,0.14)" : "rgba(13,17,23,0.08)"}`,
        borderRadius: 22,
        minHeight: props.dense ? 320 : 420,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
        viewBox="0 0 960 520"
        style={{
          display: "block",
          height: "100%",
          minHeight: "inherit",
          width: "100%",
        }}
      >
        <defs>
          <linearGradient id="route" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#635BFF" />
            <stop offset="1" stopColor="#25C6DA" />
          </linearGradient>
          <radialGradient id="demand">
            <stop stopColor="#7A5CFF" stopOpacity="0.42" />
            <stop offset="1" stopColor="#7A5CFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect fill={dark ? "#101821" : "#E8EEF6"} height="520" width="960" />
        <path
          d="M0 370 C190 330 330 410 520 350 C690 298 784 356 960 302 L960 520 L0 520 Z"
          fill={dark ? "#0F2C35" : "#D8EEF1"}
          opacity="0.42"
        />
        <path
          d="M120 90 L250 38 L380 92 L520 54 L690 108 L850 76"
          stroke={dark ? "#273343" : "#CFD8E6"}
          strokeWidth="22"
          strokeLinecap="round"
          fill="none"
          opacity="0.78"
        />
        <path
          d="M50 252 C180 170 280 300 410 214 S650 120 840 210"
          stroke={dark ? "#354156" : "#C8D2E0"}
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M84 430 C270 344 396 472 558 378 S750 332 924 404"
          stroke={dark ? "#303C50" : "#D2DAE6"}
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        {Array.from({ length: 12 }).map((_, index) => {
          const start = 60 + index * 78;
          const controlOne = 80 + index * 42;
          const controlTwo = 130 + index * 30;
          const end = 112 + index * 64;
          return (
            <path
              d={`M${String(start)} 0 C${String(controlOne)} 140 ${String(controlTwo)} 290 ${String(end)} 520`}
              fill="none"
              key={`minor-${String(index)}`}
              opacity="0.42"
              stroke={dark ? "#222C3A" : "#D7DEE8"}
              strokeLinecap="round"
              strokeWidth="7"
            />
          );
        })}
        <path
          d="M124 340 C248 286 330 310 440 250 S628 184 794 238"
          stroke="url(#route)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="260" cy="300" fill="url(#demand)" r="94" />
        <circle cx="704" cy="240" fill="url(#demand)" r="124" />
        <path
          d="M590 104 L760 136 L820 276 L670 312 L540 224 Z"
          fill="none"
          stroke="#25C6DA"
          strokeDasharray="8 10"
          strokeOpacity="0.7"
          strokeWidth="3"
        />
        <MarkerSvg color="#3BD489" label="P" x={124} y={340} />
        <MarkerSvg color="#25C6DA" label="D" x={794} y={238} />
        <MarkerSvg color="#635BFF" label="S" x={440} y={250} />
        {props.operations
          ? [180, 350, 612, 720, 838].map((x, index) => (
              <circle
                cx={x}
                cy={index % 2 === 0 ? 180 : 382}
                fill="#F7F8FA"
                key={`driver-${String(index)}`}
                r="5"
                stroke="#635BFF"
                strokeWidth="4"
              />
            ))
          : null}
      </svg>
    </div>
  );
}

function MarkerSvg(props: {
  x: number;
  y: number;
  color: string;
  label: string;
}) {
  return (
    <g>
      <circle cx={props.x} cy={props.y} fill={props.color} r="18" />
      <circle
        cx={props.x}
        cy={props.y}
        fill="none"
        r="32"
        stroke={props.color}
        strokeOpacity="0.28"
        strokeWidth="5"
      />
      <text
        fill="#FFFFFF"
        fontSize="14"
        fontWeight="900"
        textAnchor="middle"
        x={props.x}
        y={props.y + 5}
      >
        {props.label}
      </text>
    </g>
  );
}

export function AppMockup(props: WebContext & { kind: "rider" | "driver" }) {
  const title =
    props.kind === "rider" ? "Where are you going?" : "Online in Dokki";
  return (
    <div style={styles.phoneShell}>
      <div style={styles.phoneMap}>
        <MapPanel {...props} dense />
      </div>
      <div style={styles.phoneSheet}>
        <Badge {...props} tone={props.kind === "rider" ? "info" : "success"}>
          {props.kind === "rider" ? "Protected trip" : "Payment confirmed"}
        </Badge>
        <h3 style={{ fontSize: 24, margin: "14px 0 8px" }}>{title}</h3>
        <p style={{ color: "var(--sn-theme-color-text-secondary)", margin: 0 }}>
          {props.kind === "rider"
            ? "Vehicle options, transparent fare, and PIN start."
            : "Net earnings, route clarity, and low-distraction controls."}
        </p>
      </div>
    </div>
  );
}

export function VehicleSilhouette(props: { type: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 86"
      style={{ height: 74, width: "100%" }}
    >
      <path
        d="M34 54 C44 28 60 18 92 18 H118 C136 18 150 32 158 54"
        fill="rgba(99,91,255,0.22)"
        stroke="#635BFF"
        strokeWidth="4"
      />
      <path
        d="M56 50 H138"
        stroke="#25C6DA"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <circle
        cx="58"
        cy="60"
        fill="#0D1117"
        r="12"
        stroke="#F7F8FA"
        strokeWidth="4"
      />
      <circle
        cx="136"
        cy="60"
        fill="#0D1117"
        r="12"
        stroke="#F7F8FA"
        strokeWidth="4"
      />
      <text
        fill="#D2D8E2"
        fontSize="13"
        fontWeight="900"
        textAnchor="middle"
        x="90"
        y="42"
      >
        {props.type}
      </text>
    </svg>
  );
}

export function FinancialSummary(
  props: WebContext & { amount: string; label: string },
) {
  return (
    <Surface {...props} tone="finance">
      <p style={styles.eyebrow}>{props.label}</p>
      <p style={styles.statValue}>{props.amount}</p>
    </Surface>
  );
}

export const AdminSidebar = Surface;
export const AdminTopbar = Surface;
export const FilterBar = Surface;
export const SearchField = Surface;
export const Tabs = Surface;
export const Avatar = Badge;
export const EmptyState = Surface;
export const LoadingState = Surface;
export const ErrorState = Surface;
export const Dialog = Surface;
export const Drawer = Surface;
export const Sheet = Surface;
export const FormField = Surface;
export const Select = Surface;
export const Checkbox = Badge;
export const Switch = Badge;
export const Pagination = Surface;
export const Timeline = Surface;
export const EvidencePanel = Surface;
export const AppShell = AdminShell;

export function ShellFrame(props: {
  locale: Locale;
  title: string;
  eyebrow: string;
  children?: ReactNode;
}) {
  return (
    <MarketingShell locale={props.locale} theme="dark">
      <main style={{ padding: "48px clamp(20px, 5vw, 72px)" }}>
        <PageHeader
          locale={props.locale}
          theme="dark"
          eyebrow={props.eyebrow}
          title={props.title}
        />
        {props.children}
      </main>
    </MarketingShell>
  );
}

const styles = {
  lockup: {
    alignItems: "center",
    display: "inline-flex",
    gap: 10,
  } satisfies CSSProperties,
  symbol: {
    alignItems: "center",
    background: "linear-gradient(135deg, #635BFF, #25C6DA)",
    border: "1px solid rgba(255, 255, 255, 0.22)",
    borderRadius: 14,
    boxShadow: "0 12px 36px rgba(99, 91, 255, 0.34)",
    color: "#FFFFFF",
    display: "inline-flex",
    fontSize: 20,
    fontWeight: 900,
    height: 40,
    justifyContent: "center",
    width: 40,
  } satisfies CSSProperties,
  adminGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 268px) minmax(0, 1fr)",
    minHeight: "100vh",
  } satisfies CSSProperties,
  adminAside: {
    background:
      "linear-gradient(180deg, rgba(13, 17, 23, 0.96), rgba(21, 27, 35, 0.92))",
    borderInlineEnd: "1px solid rgba(210, 216, 226, 0.1)",
    padding: spacing.xl,
    position: "sticky",
    top: 0,
    height: "100vh",
  } satisfies CSSProperties,
  adminMain: {
    minWidth: 0,
    padding: "24px clamp(22px, 4vw, 48px) 48px",
  } satisfies CSSProperties,
  commandBar: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 24,
  } satisfies CSSProperties,
  marketingHeader: {
    alignItems: "center",
    backdropFilter: "blur(18px)",
    background: "rgba(13, 17, 23, 0.68)",
    borderBottom: "1px solid rgba(247, 248, 250, 0.1)",
    display: "flex",
    gap: 16,
    justifyContent: "space-between",
    padding: "18px clamp(20px, 5vw, 72px)",
    position: "sticky",
    top: 0,
    zIndex: 20,
  } satisfies CSSProperties,
  marketingNav: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
  } satisfies CSSProperties,
  navLink: {
    color: "#D2D8E2",
    fontSize: 14,
    fontWeight: 900,
    textDecoration: "none",
  } satisfies CSSProperties,
  pageHeader: {
    alignItems: "end",
    display: "flex",
    gap: 16,
    justifyContent: "space-between",
    marginBottom: 24,
  } satisfies CSSProperties,
  eyebrow: {
    color: "var(--sn-theme-color-text-secondary)",
    fontSize: 13,
    fontWeight: 900,
    letterSpacing: 0,
    margin: 0,
    textTransform: "uppercase",
  } satisfies CSSProperties,
  h1: {
    fontSize: "clamp(34px, 5vw, 64px)",
    lineHeight: 1,
    letterSpacing: 0,
    margin: "8px 0 0",
    maxWidth: 920,
  } satisfies CSSProperties,
  statValue: {
    fontFamily: typography.family.numeric,
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: 950,
    letterSpacing: 0,
    margin: "14px 0 0",
  } satisfies CSSProperties,
  th: {
    fontSize: 12,
    letterSpacing: 0,
    padding: "10px",
    textAlign: "start",
    textTransform: "uppercase",
  } satisfies CSSProperties,
  iconButton: {
    alignItems: "center",
    background: "rgba(247, 248, 250, 0.08)",
    border: "1px solid rgba(247, 248, 250, 0.14)",
    borderRadius: 999,
    color: "#FFFFFF",
    display: "inline-flex",
    height: 44,
    justifyContent: "center",
    width: 44,
  } satisfies CSSProperties,
  footer: {
    borderTop: "1px solid rgba(247, 248, 250, 0.1)",
    display: "grid",
    gap: 18,
    padding: "34px clamp(20px, 5vw, 72px)",
  } satisfies CSSProperties,
  footerGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 18,
    fontWeight: 800,
  } satisfies CSSProperties,
  phoneShell: {
    background:
      "linear-gradient(180deg, rgba(247, 248, 250, 0.14), rgba(247, 248, 250, 0.04))",
    border: "1px solid rgba(247, 248, 250, 0.16)",
    borderRadius: 34,
    boxShadow: "0 30px 90px rgba(0, 0, 0, 0.42)",
    maxWidth: 360,
    overflow: "hidden",
    padding: 10,
  } satisfies CSSProperties,
  phoneMap: {
    borderRadius: 26,
    height: 300,
    overflow: "hidden",
  } satisfies CSSProperties,
  phoneSheet: {
    background: "rgba(13, 17, 23, 0.92)",
    borderRadius: 26,
    marginTop: -48,
    padding: 22,
    position: "relative",
  } satisfies CSSProperties,
};
