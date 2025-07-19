import { describe, expect, it } from "bun:test";
import { parseDuration } from "../src/units";

describe("parseDuration", () => {
  it("should parse milliseconds", () => {
    expect(parseDuration("100ms")).toBe(100);
  });

  it("should parse seconds", () => {
    expect(parseDuration("1s")).toBe(1000);
    expect(parseDuration("10s")).toBe(10000);
  });

  it("should parse minutes", () => {
    expect(parseDuration("1m")).toBe(60000);
  });

  it("should parse hours", () => {
    expect(parseDuration("1h")).toBe(3600000);
  });

  it("should parse days", () => {
    expect(parseDuration("1d")).toBe(86400000);
  });

  it("should parse weeks", () => {
    expect(parseDuration("1w")).toBe(604800000);
  });

  it("should parse years", () => {
    expect(parseDuration("1y")).toBe(31536000000);
  });

  it("should parse with space between value and unit", () => {
    expect(parseDuration("100 ms")).toBe(100);
    expect(parseDuration("1 s")).toBe(1000);
    expect(parseDuration("1 m")).toBe(60000);
    expect(parseDuration("1 h")).toBe(3600000);
    expect(parseDuration("1 d")).toBe(86400000);
    expect(parseDuration("1 w")).toBe(604800000);
    expect(parseDuration("1 y")).toBe(31536000000);
  });

  it("should parse zero values", () => {
    expect(parseDuration("0ms")).toBe(0);
    expect(parseDuration("0s")).toBe(0);
    expect(parseDuration("0 m")).toBe(0);
  });

  it("should throw error for invalid format", () => {
    // @ts-expect-error testing invalid input
    expect(() => parseDuration("1")).toThrow("Invalid duration format: 1");
    // @ts-expect-error testing invalid input
    expect(() => parseDuration("ms")).toThrow("Invalid duration format: ms");
    // @ts-expect-error testing invalid input
    expect(() => parseDuration("10 z")).toThrow(
      "Invalid duration format: 10 z",
    );
    // @ts-expect-error testing invalid input
    expect(() => parseDuration("")).toThrow("Invalid duration format: ");
    expect(() => parseDuration("1.5s")).toThrow(
      "Invalid duration format: 1.5s",
    );
    expect(() => parseDuration("-1s")).toThrow("Invalid duration format: -1s");
  });
});
