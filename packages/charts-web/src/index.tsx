"use client";

import { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts/core";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  type GridComponentOption,
  type LegendComponentOption,
  type TooltipComponentOption,
} from "echarts/components";
import {
  BarChart,
  LineChart,
  PieChart,
  type BarSeriesOption,
  type LineSeriesOption,
  type PieSeriesOption,
} from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import {
  chartTokens,
  getTheme,
  type ThemeMode,
} from "@supernova/design-tokens";

echarts.use([
  GridComponent,
  LegendComponent,
  TooltipComponent,
  LineChart,
  BarChart,
  PieChart,
  CanvasRenderer,
]);

type Option = echarts.ComposeOption<
  | GridComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | LineSeriesOption
  | BarSeriesOption
  | PieSeriesOption
>;

export type ChartPoint = Readonly<{ label: string; value: number }>;

export type ChartKind =
  "area" | "line" | "bar" | "stacked-bar" | "donut" | "sparkline" | "demand";

export function createChartSummary(points: readonly ChartPoint[]): string {
  return points
    .map((point) => `${point.label}: ${String(point.value)}`)
    .join(", ");
}

function useChart(option: Option) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption(option, true);
    const resize = () => {
      chart.resize();
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, [option]);
  return ref;
}

export function SuperNovaChart(props: {
  points: readonly ChartPoint[];
  label: string;
  kind: ChartKind;
  theme?: ThemeMode;
}) {
  const mode = props.theme ?? "light";
  const theme = getTheme(mode);
  const option = useMemo<Option>(() => {
    const points = props.points.map((point) => ({ ...point }));
    const base = {
      color: chartTokens.series,
      tooltip: {
        trigger: props.kind === "donut" ? "item" : "axis",
        backgroundColor: theme.color.chart.tooltip,
        borderColor: theme.color.border.default,
        textStyle: { color: theme.color.text.primary },
      },
      grid: { left: 8, right: 8, top: 16, bottom: 8, containLabel: true },
      xAxis: {
        type: "category",
        data: points.map((point) => point.label),
        axisLine: { lineStyle: { color: theme.color.chart.grid } },
        axisLabel: { color: theme.color.text.secondary },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: theme.color.text.secondary },
        splitLine: { lineStyle: { color: theme.color.chart.grid } },
      },
    } satisfies Option;

    if (props.kind === "donut") {
      return {
        color: chartTokens.series,
        tooltip: base.tooltip,
        series: [
          {
            type: "pie",
            radius: ["58%", "78%"],
            data: points.map((point) => ({
              name: point.label,
              value: point.value,
            })),
          },
        ],
      };
    }

    if (props.kind === "bar" || props.kind === "demand") {
      return {
        ...base,
        series: [
          {
            type: "bar",
            barBorderRadius: [8, 8, 2, 2],
            data: points.map((point) => point.value),
          },
        ],
      };
    }

    if (props.kind === "stacked-bar") {
      return {
        ...base,
        series: [
          {
            type: "bar",
            stack: "demo",
            data: points.map((point) => Math.round(point.value * 0.62)),
          },
          {
            type: "bar",
            stack: "demo",
            data: points.map((point) => Math.round(point.value * 0.38)),
          },
        ],
      };
    }

    const lineSeries: LineSeriesOption = {
      type: "line",
      smooth: true,
      showSymbol: props.kind !== "sparkline",
      data: points.map((point) => point.value),
      lineStyle: {
        color: theme.color.brand.primary,
        shadowBlur: props.kind === "line" ? 8 : 0,
        shadowColor: "rgba(99, 91, 255, 0.22)",
        width: props.kind === "sparkline" ? 2 : 3,
      },
    };
    if (props.kind === "area") {
      lineSeries.areaStyle = {
        color: theme.color.chart.areaFrom,
        opacity: 0.34,
      };
    }

    return {
      ...base,
      series: [lineSeries],
    };
  }, [mode, props.kind, props.points, theme]);

  const ref = useChart(option);
  const summary = createChartSummary(props.points);

  return (
    <figure style={{ margin: 0 }}>
      <div
        ref={ref}
        style={{
          minHeight: props.kind === "sparkline" ? 96 : 260,
          width: "100%",
        }}
        role="img"
        aria-label={`${props.label}. ${summary}`}
      />
      <figcaption style={{ position: "absolute", left: -10000 }}>
        {props.label}. {summary}
      </figcaption>
    </figure>
  );
}

export function SmoothAreaChart(props: {
  points: readonly ChartPoint[];
  label: string;
}) {
  return (
    <SuperNovaChart kind="area" points={props.points} label={props.label} />
  );
}
