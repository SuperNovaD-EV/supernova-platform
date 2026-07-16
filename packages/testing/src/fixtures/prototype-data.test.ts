import { describe, expect, test } from "vitest";
import {
  demoRide,
  demoVehicleOptions,
  fixtureSafetyNotice,
} from "./prototype-data";

describe("prototype fixtures", () => {
  test("are marked as fictional and avoid credential-like values", () => {
    const serialized = JSON.stringify({
      demoRide,
      demoVehicleOptions,
      fixtureSafetyNotice,
    });
    expect(serialized).toContain("fictional");
    expect(serialized).not.toMatch(/AIza[0-9A-Za-z_-]{35}/);
    expect(serialized).not.toMatch(
      /[A-Za-z0-9_]{20,}\.[A-Za-z0-9_=-]{20,}\.[A-Za-z0-9_=-]{20,}/,
    );
    expect(serialized).not.toMatch(/\b\d{14}\b/);
  });
});
