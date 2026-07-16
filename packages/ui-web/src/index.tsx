import type { CSSProperties, ReactNode } from "react";
import { tokens } from "@supernova/design-tokens";
import { getDirection, type Locale } from "@supernova/localization";

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
        <p style={{ color: tokens.light.text.muted, margin: 0 }}>
          {props.eyebrow}
        </p>
        <h1 style={{ margin: "8px 0 16px", fontSize: 40, letterSpacing: 0 }}>
          {props.title}
        </h1>
        <div>{props.children}</div>
      </section>
    </main>
  );
}
