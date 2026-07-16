"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import { LightfallFallback } from "./LightfallFallback";

type LightfallProps = {
  className?: string;
  opacity?: number;
  speed?: number;
  streakCount?: number;
};

const vertex = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uOpacity;
uniform float uStreakCount;
uniform vec3 uIndigo;
uniform vec3 uViolet;
uniform vec3 uCyan;
uniform vec3 uPearl;
varying vec2 vUv;

float beam(vec2 uv, float offset, float width, float phase) {
  float x = uv.x + uv.y * 0.24 + offset + sin(uTime * 0.18 + phase) * 0.035;
  float stripe = abs(fract(x) - 0.5);
  float falloff = smoothstep(0.5, 0.08, uv.y) * smoothstep(-0.05, 0.42, uv.y);
  return smoothstep(width, 0.0, stripe) * falloff;
}

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 uv = vUv;
  vec3 color = vec3(0.051, 0.067, 0.09);
  float glow = distance(uv, vec2(0.28, 0.22));
  color += uViolet * smoothstep(0.92, 0.0, glow) * 0.24;
  color += uCyan * smoothstep(0.78, 0.0, distance(uv, vec2(0.82, 0.56))) * 0.12;

  float count = max(3.0, uStreakCount);
  for (float i = 0.0; i < 8.0; i++) {
    if (i >= count) break;
    float b = beam(uv, i * 0.19, 0.018, i * 1.7);
    color += mix(uIndigo, uPearl, 0.42) * b * 0.38;
    color += uCyan * b * 0.08;
  }

  float stars = step(0.992, noise(floor(uv * uResolution.xy * 0.42) + floor(uTime * 0.35)));
  color += uPearl * stars * 0.18;
  gl_FragColor = vec4(color, uOpacity);
}
`;

export function Lightfall(props: LightfallProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFallback(true);
      return undefined;
    }

    let renderer: Renderer;
    let mesh: Mesh;
    let observer: IntersectionObserver | undefined;
    let visible = true;
    let disposed = false;

    try {
      renderer = new Renderer({
        alpha: true,
        antialias: false,
        dpr: Math.min(
          window.devicePixelRatio || 1,
          window.innerWidth < 768 ? 1.25 : 1.75,
        ),
      });
      const gl = renderer.gl;
      gl.canvas.style.height = "100%";
      gl.canvas.style.inset = "0";
      gl.canvas.style.pointerEvents = "none";
      gl.canvas.style.position = "absolute";
      gl.canvas.style.width = "100%";
      host.appendChild(gl.canvas);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [host.clientWidth, host.clientHeight] },
          uOpacity: { value: props.opacity ?? 0.68 },
          uStreakCount: {
            value: props.streakCount ?? (window.innerWidth < 768 ? 3 : 5),
          },
          uIndigo: { value: [0.388, 0.357, 1.0] },
          uViolet: { value: [0.478, 0.361, 1.0] },
          uCyan: { value: [0.145, 0.776, 0.855] },
          uPearl: { value: [0.969, 0.973, 0.98] },
        },
      });
      mesh = new Mesh(gl, { geometry, program });
      const uniforms = program.uniforms as {
        uResolution: { value: [number, number] };
        uTime: { value: number };
      };

      const resize = () => {
        const width = Math.max(host.clientWidth, 1);
        const height = Math.max(host.clientHeight, 1);
        renderer.setSize(width, height);
        uniforms.uResolution.value = [width, height];
      };
      resize();

      const render = (time: number) => {
        if (disposed) return;
        if (visible && document.visibilityState === "visible") {
          uniforms.uTime.value = time * 0.001 * (props.speed ?? 0.42);
          renderer.render({ scene: mesh });
        }
        frameRef.current = window.requestAnimationFrame(render);
      };

      observer = new IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
      });
      observer.observe(host);
      window.addEventListener("resize", resize);
      frameRef.current = window.requestAnimationFrame(render);

      return () => {
        disposed = true;
        window.removeEventListener("resize", resize);
        observer?.disconnect();
        if (frameRef.current !== null)
          window.cancelAnimationFrame(frameRef.current);
        const extension = gl.getExtension("WEBGL_lose_context");
        extension?.loseContext();
        gl.canvas.remove();
      };
    } catch {
      setFallback(true);
      return undefined;
    }
  }, [props.opacity, props.speed, props.streakCount]);

  return (
    <div
      aria-hidden="true"
      className={props.className}
      ref={hostRef}
      style={styles.host}
    >
      {fallback ? (
        <LightfallFallback
          {...(props.opacity === undefined ? {} : { opacity: props.opacity })}
        />
      ) : null}
    </div>
  );
}

const styles = {
  host: {
    inset: 0,
    minHeight: "100%",
    overflow: "hidden",
    pointerEvents: "none",
    position: "absolute",
  } satisfies CSSProperties,
};
