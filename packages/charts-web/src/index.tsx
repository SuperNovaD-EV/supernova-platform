"use client";

import { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts/core";
import {
  GridComponent,
  TooltipComponent,
  type GridComponentOption,
  type TooltipComponentOption,
} from "echarts/components";
import { LineChart, type LineSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { tokens } from "@supernova/design-tokens";

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer]);

type Option = echarts.ComposeOption<
  GridComponentOption | TooltipComponentOption | LineSeriesOption
>;

export type AreaChartPoint = Readonly<{ label: string; value: number }>;

export function SmoothAreaChart(props: {
  points: readonly AreaChartPoint[];
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const option = useMemo<Option>(() => {
    const points = props.points.map((point) => ({ ...point }));
    return {
      color: [tokens.light.chart.line],
      tooltip: { trigger: "axis" },
      grid: { left: 8, right: 8, top: 16, bottom: 8, containLabel: true },
      xAxis: {
        type: "category",
        data: points.map((point) => point.label),
        axisLine: { lineStyle: { color: tokens.light.chart.grid } },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: tokens.light.chart.grid } },
      },
      series: [
        {
          type: "line",
          smooth: true,
          data: points.map((point) => point.value),
          areaStyle: { color: tokens.light.chart.area, opacity: 0.2 },
          lineStyle: { color: tokens.light.chart.line, width: 3 },
        },
      ],
    };
  }, [props.points]);

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

  return (
    <figure>
      <div
        ref={ref}
        style={{ minHeight: 260, width: "100%" }}
        role="img"
        aria-label={props.label}
      />
      <figcaption style={{ position: "absolute", left: -10000 }}>
        {props.label}
      </figcaption>
    </figure>
  );
}
