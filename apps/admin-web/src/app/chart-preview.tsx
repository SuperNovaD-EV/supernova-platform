"use client";

import { SmoothAreaChart } from "@supernova/charts-web";

const samplePoints = [
  { label: "Foundation", value: 2 },
  { label: "Tokens", value: 5 },
  { label: "CI", value: 4 },
] as const;

export function ChartPreview() {
  return (
    <SmoothAreaChart
      points={samplePoints}
      label="Development-only sample data for chart rendering"
    />
  );
}
