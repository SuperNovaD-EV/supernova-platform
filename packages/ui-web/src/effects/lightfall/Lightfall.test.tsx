import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Lightfall } from "./Lightfall";

describe("Lightfall", () => {
  it("is SSR-safe before browser APIs are available", () => {
    expect(renderToString(<Lightfall />)).toContain("aria-hidden");
  });
});
