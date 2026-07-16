"use client";

import type { CSSProperties } from "react";

export function LightfallFallback(props: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={props.className}
      style={{
        ...styles.root,
        opacity: props.opacity ?? 0.8,
      }}
    >
      <span style={{ ...styles.beam, left: "8%", top: "-8%" }} />
      <span
        style={{
          ...styles.beam,
          left: "44%",
          top: "-18%",
          transform: "rotate(22deg)",
        }}
      />
      <span
        style={{
          ...styles.beam,
          left: "74%",
          top: "-6%",
          transform: "rotate(30deg)",
        }}
      />
      <span style={{ ...styles.glow, left: "12%", top: "18%" }} />
      <span
        style={{
          ...styles.glow,
          background: "rgba(37, 198, 218, 0.22)",
          right: "6%",
          top: "42%",
        }}
      />
    </div>
  );
}

const styles = {
  root: {
    background:
      "radial-gradient(circle at 24% 20%, rgba(99, 91, 255, 0.3), transparent 32%), radial-gradient(circle at 72% 48%, rgba(37, 198, 218, 0.18), transparent 34%), #0D1117",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
    position: "absolute",
  } satisfies CSSProperties,
  beam: {
    background:
      "linear-gradient(180deg, rgba(247, 248, 250, 0), rgba(247, 248, 250, 0.54), rgba(122, 92, 255, 0.08))",
    borderRadius: 999,
    filter: "blur(0.4px)",
    height: "82%",
    position: "absolute",
    transform: "rotate(16deg)",
    width: 2,
  } satisfies CSSProperties,
  glow: {
    background: "rgba(122, 92, 255, 0.24)",
    borderRadius: 999,
    filter: "blur(32px)",
    height: 180,
    position: "absolute",
    width: 180,
  } satisfies CSSProperties,
};
