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
  if (tone === "info") return theme.color.status.info;
  return theme.color.text.secondary;
};

export function ThemeProviderShell(
  props: WebContext & { children: ReactNode; className?: string },
) {
  const variables = useMemo(
    () => createCssVariables(props.theme),
    [props.theme],
  );
  const dir = getDirection(props.locale);
  const theme = getTheme(props.theme);
  return (
    <div
      className={props.className}
      dir={dir}
      style={{
        ...variables,
        background: theme.color.background.canvas,
        color: theme.color.text.primary,
        direction: dir,
        fontFamily:
          props.locale === "ar"
            ? typography.family.arabic
            : typography.family.latin,
        minHeight: "100vh",
      }}
    >
      {Children.toArray(props.children)}
    </div>
  );
}

export function BrandLockup(props: { inverse?: boolean }) {
  return (
    <div aria-label="SuperNova" style={styles.lockup}>
      <span style={styles.symbol} aria-hidden="true">
        ✦
      </span>
      <strong
        style={{
          color: props.inverse ? "#FFFFFF" : "inherit",
          fontSize: 18,
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
  },
) {
  const theme = getTheme(props.theme);
  const Component = props.as ?? "section";
  return (
    <Component
      style={{
        background: props.elevated
          ? theme.color.background.elevated
          : theme.color.background.surface,
        border: `1px solid ${theme.color.border.default}`,
        borderRadius: radii.md,
        boxShadow: props.elevated ? shadows.soft : shadows.none,
        padding: spacing.xl,
        ...props.style,
      }}
    >
      {props.children}
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
  },
) {
  const color = toneColor(props, props.tone ?? "info");
  const content = (
    <span
      style={{
        alignItems: "center",
        background: color,
        border: 0,
        borderRadius: radii.md,
        color: "#FFFFFF",
        display: "inline-flex",
        fontWeight: 800,
        minHeight: 44,
        padding: "0 18px",
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
  const theme = getTheme(props.theme);
  return (
    <button
      type="button"
      aria-label={props.label}
      style={{
        alignItems: "center",
        background: theme.color.background.surface,
        border: `1px solid ${theme.color.border.default}`,
        borderRadius: radii.pill,
        color: theme.color.text.primary,
        display: "inline-flex",
        height: 44,
        justifyContent: "center",
        width: 44,
      }}
    >
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
        border: `1px solid ${color}`,
        borderRadius: radii.pill,
        color,
        display: "inline-flex",
        fontSize: 12,
        fontWeight: 800,
        padding: "4px 9px",
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
    <Surface {...props} style={{ padding: spacing.lg }}>
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
    "Dashboard",
    "Live operations",
    "Drivers",
    "Rides",
    "Complaints",
    "Payments",
    "Pricing",
    "Zones",
  ];
  return (
    <ThemeProviderShell {...props}>
      <div style={styles.adminGrid}>
        <aside
          style={{
            background: theme.color.background.surface,
            borderInlineEnd: `1px solid ${theme.color.border.default}`,
            padding: spacing.xl,
          }}
        >
          <BrandLockup />
          <nav style={{ display: "grid", gap: 8, marginTop: 32 }}>
            {links.map((link) => (
              <a
                key={link}
                href={`/${link.toLowerCase().replaceAll(" ", "-")}`}
                style={{
                  borderRadius: radii.md,
                  color:
                    props.active === link
                      ? theme.color.brand.primary
                      : theme.color.text.secondary,
                  fontWeight: 800,
                  padding: "10px 12px",
                  textDecoration: "none",
                }}
              >
                {link}
              </a>
            ))}
          </nav>
        </aside>
        <main style={{ minWidth: 0, padding: spacing["2xl"] }}>
          {props.children}
        </main>
      </div>
    </ThemeProviderShell>
  );
}

export function MarketingHeader(props: WebContext) {
  const theme = getTheme(props.theme);
  return (
    <header
      style={{
        alignItems: "center",
        borderBottom: `1px solid ${theme.color.border.default}`,
        display: "flex",
        gap: 16,
        justifyContent: "space-between",
        padding: "18px clamp(20px, 5vw, 72px)",
      }}
    >
      <BrandLockup />
      <nav style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        {["Ride", "Drive", "Safety", "Help"].map((link) => (
          <a
            href={`/${link.toLowerCase()}`}
            key={link}
            style={{ color: theme.color.text.secondary, fontWeight: 800 }}
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
    <footer
      style={{
        borderTop: `1px solid ${theme.color.border.default}`,
        color: theme.color.text.secondary,
        padding: "28px clamp(20px, 5vw, 72px)",
      }}
    >
      SuperNova · Cairo and Giza launch-stage prototype · No production claims.
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

export function MapPanel(props: WebContext & { label?: string }) {
  const theme = getTheme(props.theme);
  return (
    <div
      aria-label={props.label ?? "Fictional prototype map"}
      role="img"
      style={{
        background:
          props.theme === "dark"
            ? "linear-gradient(135deg, #101721, #1B2430)"
            : "linear-gradient(135deg, #EAF0F7, #F8FAFC)",
        border: `1px solid ${theme.color.border.default}`,
        borderRadius: radii.md,
        minHeight: 280,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <span style={{ ...styles.mapLine, background: theme.color.map.route }} />
      <span
        style={{
          ...styles.mapDot,
          background: theme.color.map.pickup,
          left: "24%",
          top: "62%",
        }}
      />
      <span
        style={{
          ...styles.mapDot,
          background: theme.color.map.destination,
          left: "70%",
          top: "32%",
        }}
      />
      <span
        style={{
          ...styles.mapDot,
          background: theme.color.map.driver,
          left: "44%",
          top: "48%",
        }}
      />
    </div>
  );
}

export function FinancialSummary(
  props: WebContext & { amount: string; label: string },
) {
  return (
    <Surface {...props}>
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
    <MarketingShell locale={props.locale} theme="light">
      <main style={{ padding: "48px clamp(20px, 5vw, 72px)" }}>
        <PageHeader
          locale={props.locale}
          theme="light"
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
    background: "#635BFF",
    borderRadius: 12,
    color: "#FFFFFF",
    display: "inline-flex",
    fontSize: 20,
    fontWeight: 900,
    height: 38,
    justifyContent: "center",
    width: 38,
  } satisfies CSSProperties,
  adminGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 264px) minmax(0, 1fr)",
    minHeight: "100vh",
  } satisfies CSSProperties,
  pageHeader: {
    alignItems: "center",
    display: "flex",
    gap: 16,
    justifyContent: "space-between",
    marginBottom: 24,
  } satisfies CSSProperties,
  eyebrow: {
    color: "var(--sn-theme-color-text-secondary)",
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: 0,
    margin: 0,
  } satisfies CSSProperties,
  h1: {
    fontSize: "clamp(30px, 5vw, 54px)",
    lineHeight: 1.05,
    letterSpacing: 0,
    margin: "6px 0 0",
  } satisfies CSSProperties,
  statValue: {
    fontFamily: typography.family.numeric,
    fontSize: 34,
    fontWeight: 900,
    margin: "12px 0 0",
  } satisfies CSSProperties,
  th: {
    fontSize: 12,
    letterSpacing: 0,
    padding: "10px",
    textAlign: "start",
    textTransform: "uppercase",
  } satisfies CSSProperties,
  mapLine: {
    borderRadius: 999,
    height: 8,
    left: "18%",
    position: "absolute",
    right: "16%",
    top: "48%",
    transform: "rotate(-18deg)",
  } satisfies CSSProperties,
  mapDot: {
    border: "3px solid #FFFFFF",
    borderRadius: 999,
    height: 22,
    position: "absolute",
    width: 22,
  } satisfies CSSProperties,
};
