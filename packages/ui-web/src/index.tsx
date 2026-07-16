import type { CSSProperties, ReactNode } from "react";
import { palette, tokens } from "@supernova/design-tokens";
import { getDirection, type Locale } from "@supernova/localization";

function BrandSymbol() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 128 128"
      style={{ width: 36, height: 36, flex: "0 0 auto" }}
    >
      <path
        fill={tokens.light.action.primary}
        d="M73 12C42 15 20 39 17 69c9-12 24-21 42-24 7-12 17-23 14-33Z"
      />
      <path
        fill={tokens.light.action.secondary}
        d="M111 58c-6 31-31 52-62 54 13-8 22-21 27-39 12-5 25-10 35-15Z"
      />
      <path
        fill={palette.space.midnight}
        opacity="0.92"
        d="M37 76c13 19 46 17 56-8C79 79 54 77 46 58c-5 5-8 11-9 18Z"
      />
      <path
        fill={palette.surface.pearl}
        d="M64 37c4 17 10 23 27 27-17 4-23 10-27 27-4-17-10-23-27-27 17-4 23-10 27-27Z"
      />
    </svg>
  );
}

export function BrandLockup() {
  return (
    <div
      aria-label="SuperNova"
      style={{
        alignItems: "center",
        display: "inline-flex",
        gap: tokens.spacing.sm,
      }}
    >
      <BrandSymbol />
      <strong
        style={{
          color: tokens.light.text.primary,
          fontSize: 18,
          letterSpacing: 2,
          lineHeight: 1,
        }}
      >
        SUPERNOVA
      </strong>
    </div>
  );
}

export function ShellFrame(props: {
  locale: Locale;
  title: string;
  eyebrow: string;
  children?: ReactNode;
}) {
  const dir = getDirection(props.locale);
  const fontFamily =
    props.locale === "ar" ? tokens.typography.arabic : tokens.typography.latin;
  const style: CSSProperties = {
    minHeight: "100vh",
    direction: dir,
    fontFamily,
    background: tokens.light.surface.canvas,
    color: tokens.light.text.primary,
    padding: tokens.spacing.xl,
  };
  return (
    <main style={style}>
      <section style={{ maxWidth: 960, margin: "0 auto" }}>
        <header
          style={{
            alignItems: "center",
            borderBottom: `1px solid ${tokens.light.border.subtle}`,
            display: "flex",
            justifyContent: "space-between",
            marginBottom: tokens.spacing["2xl"],
            paddingBottom: tokens.spacing.md,
          }}
        >
          <BrandLockup />
        </header>
        <p style={{ color: tokens.light.text.muted, margin: 0 }}>
          {props.eyebrow}
        </p>
        <h1 style={{ margin: "8px 0 16px", fontSize: 40, letterSpacing: 0 }}>
          {props.title}
        </h1>
        <div>{props.children}</div>
        <footer
          style={{
            borderTop: `1px solid ${tokens.light.border.subtle}`,
            color: tokens.light.text.muted,
            fontSize: 13,
            marginTop: tokens.spacing["2xl"],
            paddingTop: tokens.spacing.md,
          }}
        >
          SuperNova brand foundation
        </footer>
      </section>
    </main>
  );
}
