import { describe, expect, it } from "bun:test";
import { Duration } from "../src/index";

describe("Duration", () => {
  describe("fromString", () => {
    it("should create a Duration object from a valid string", () => {
      const duration = Duration.fromString("1s");
      expect(duration.milliseconds).toBe(1000);
    });

    it("should throw an error for an invalid string", () => {
      // @ts-expect-error testing invalid input
      expect(() => Duration.fromString("invalid")).toThrow();
    });
  });

  describe("from", () => {
    it("should create a Duration object from a partial DurationObject", () => {
      const duration = Duration.from({ years: 1, days: 1 });
      const expected = 31536000000 + 86400000;
      expect(duration.milliseconds).toBe(expected);
    });

    it("should handle all units", () => {
      const duration = Duration.from({
        years: 1,
        months: 1,
        days: 1,
        hours: 1,
        minutes: 1,
        seconds: 1,
        milliseconds: 1,
      });
      const expected =
        31536000000 + 2592000000 + 86400000 + 3600000 + 60000 + 1000 + 1;
      expect(duration.milliseconds).toBe(expected);
    });

    it("should handle empty object", () => {
      const duration = Duration.from({});
      expect(duration.milliseconds).toBe(0);
    });
  });

  describe("getters", () => {
    const duration = Duration.fromString("1d");

    it("should return correct milliseconds", () => {
      expect(new Duration(100).milliseconds).toBe(100);
    });

    it("should return correct seconds", () => {
      expect(Duration.fromString("1s").seconds).toBe(1);
    });

    it("should return correct minutes", () => {
      expect(Duration.fromString("1m").minutes).toBe(1);
    });

    it("should return correct hours", () => {
      expect(Duration.fromString("1h").hours).toBe(1);
    });

    it("should return correct days", () => {
      expect(duration.days).toBe(1);
    });

    it("should return correct weeks", () => {
      expect(Duration.fromString("1w").weeks).toBe(1);
    });

    it("should return correct months", () => {
      expect(Duration.fromString("30d").months).toBe(1);
    });

    it("should return correct years", () => {
      expect(Duration.fromString("365d").years).toBe(1);
    });
  });

  describe("constructor", () => {
    it("should set duration in milliseconds", () => {
      const duration = new Duration(5000);
      expect(duration.milliseconds).toBe(5000);
    });
  });

  describe("arithmetic operations", () => {
    describe("add", () => {
      it("should add two durations correctly", () => {
        const duration1 = Duration.fromString("1s");
        const duration2 = Duration.fromString("2s");
        const result = duration1.add(duration2);

        expect(result.seconds).toBe(3);
        expect(result.milliseconds).toBe(3000);
        // Ensure original objects are unchanged
        expect(duration1.seconds).toBe(1);
        expect(duration2.seconds).toBe(2);
      });

      it("should handle adding zero duration", () => {
        const duration = Duration.fromString("5s");
        const zero = new Duration(0);
        const result = duration.add(zero);

        expect(result.seconds).toBe(5);
      });
    });

    describe("subtract", () => {
      it("should subtract two durations correctly", () => {
        const duration1 = Duration.fromString("5s");
        const duration2 = Duration.fromString("2s");
        const result = duration1.subtract(duration2);

        expect(result.seconds).toBe(3);
        expect(result.milliseconds).toBe(3000);
        // Ensure original objects are unchanged
        expect(duration1.seconds).toBe(5);
        expect(duration2.seconds).toBe(2);
      });

      it("should handle negative results", () => {
        const duration1 = Duration.fromString("2s");
        const duration2 = Duration.fromString("5s");
        const result = duration1.subtract(duration2);

        expect(result.seconds).toBe(-3);
        expect(result.milliseconds).toBe(-3000);
      });
    });

    describe("multiply", () => {
      it("should multiply duration by a factor", () => {
        const duration = Duration.fromString("2s");
        const result = duration.multiply(3);

        expect(result.seconds).toBe(6);
        expect(result.milliseconds).toBe(6000);
        // Ensure original object is unchanged
        expect(duration.seconds).toBe(2);
      });

      it("should handle multiplication by zero", () => {
        const duration = Duration.fromString("5s");
        const result = duration.multiply(0);

        expect(result.seconds).toBe(0);
        expect(result.milliseconds).toBe(0);
      });

      it("should handle negative factors", () => {
        const duration = Duration.fromString("2s");
        const result = duration.multiply(-1.5);

        expect(result.seconds).toBe(-3);
        expect(result.milliseconds).toBe(-3000);
      });
    });

    describe("divide", () => {
      it("should divide duration by a factor", () => {
        const duration = Duration.fromString("6s");
        const result = duration.divide(2);

        expect(result.seconds).toBe(3);
        expect(result.milliseconds).toBe(3000);
        // Ensure original object is unchanged
        expect(duration.seconds).toBe(6);
      });

      it("should throw error when dividing by zero", () => {
        const duration = Duration.fromString("5s");

        expect(() => duration.divide(0)).toThrow("Cannot divide by zero");
      });

      it("should handle negative factors", () => {
        const duration = Duration.fromString("4s");
        const result = duration.divide(-2);

        expect(result.seconds).toBe(-2);
        expect(result.milliseconds).toBe(-2000);
      });
    });
  });

  describe("comparison operations", () => {
    const duration1 = Duration.fromString("1s");
    const duration2 = Duration.fromString("2s");
    const duration3 = Duration.fromString("1s");

    describe("equals", () => {
      it("should return true for equal durations", () => {
        expect(duration1.equals(duration3)).toBe(true);
      });

      it("should return false for different durations", () => {
        expect(duration1.equals(duration2)).toBe(false);
      });
    });

    describe("greaterThan", () => {
      it("should return true when duration is greater", () => {
        expect(duration2.greaterThan(duration1)).toBe(true);
      });

      it("should return false when duration is smaller", () => {
        expect(duration1.greaterThan(duration2)).toBe(false);
      });

      it("should return false when durations are equal", () => {
        expect(duration1.greaterThan(duration3)).toBe(false);
      });
    });

    describe("lessThan", () => {
      it("should return true when duration is smaller", () => {
        expect(duration1.lessThan(duration2)).toBe(true);
      });

      it("should return false when duration is greater", () => {
        expect(duration2.lessThan(duration1)).toBe(false);
      });

      it("should return false when durations are equal", () => {
        expect(duration1.lessThan(duration3)).toBe(false);
      });
    });

    describe("greaterThanOrEqual", () => {
      it("should return true when duration is greater", () => {
        expect(duration2.greaterThanOrEqual(duration1)).toBe(true);
      });

      it("should return true when durations are equal", () => {
        expect(duration1.greaterThanOrEqual(duration3)).toBe(true);
      });

      it("should return false when duration is smaller", () => {
        expect(duration1.greaterThanOrEqual(duration2)).toBe(false);
      });
    });

    describe("lessThanOrEqual", () => {
      it("should return true when duration is smaller", () => {
        expect(duration1.lessThanOrEqual(duration2)).toBe(true);
      });

      it("should return true when durations are equal", () => {
        expect(duration1.lessThanOrEqual(duration3)).toBe(true);
      });

      it("should return false when duration is greater", () => {
        expect(duration2.lessThanOrEqual(duration1)).toBe(false);
      });
    });
  });

  describe("format", () => {
    describe("default formatting", () => {
      it("should format zero duration", () => {
        const duration = new Duration(0);
        expect(duration.format()).toBe("0 milliseconds");
      });

      it("should format simple durations", () => {
        expect(Duration.fromString("1s").format()).toBe("1 second");
        expect(Duration.fromString("2s").format()).toBe("2 seconds");
        expect(Duration.fromString("1m").format()).toBe("1 minute");
        expect(Duration.fromString("2m").format()).toBe("2 minutes");
      });

      it("should format complex durations with maxUnits=2", () => {
        const duration = Duration.from({
          hours: 2,
          minutes: 30,
          seconds: 45,
        });
        expect(duration.format()).toBe("2 hours, 30 minutes");
      });

      it("should handle very small durations", () => {
        const duration = new Duration(500);
        expect(duration.format()).toBe("500 milliseconds");
      });
    });

    describe("short formatting", () => {
      it("should format with short units", () => {
        expect(Duration.fromString("1s").format({ short: true })).toBe("1s");
        expect(Duration.fromString("2m").format({ short: true })).toBe("2m");
        expect(Duration.fromString("3h").format({ short: true })).toBe("3h");
      });

      it("should format zero with short units", () => {
        const duration = new Duration(0);
        expect(duration.format({ short: true })).toBe("0ms");
      });

      it("should format complex durations with short units", () => {
        const duration = Duration.from({
          days: 1,
          hours: 2,
          minutes: 30,
        });
        expect(duration.format({ short: true })).toBe("1d 2h");
      });
    });

    describe("maxUnits option", () => {
      it("should respect maxUnits parameter", () => {
        const duration = Duration.from({
          days: 2,
          hours: 3,
          minutes: 45,
          seconds: 30,
        });

        expect(duration.format({ maxUnits: 1 })).toBe("2 days");
        expect(duration.format({ maxUnits: 3 })).toBe(
          "2 days, 3 hours, 45 minutes",
        );
        expect(duration.format({ maxUnits: 4 })).toBe(
          "2 days, 3 hours, 45 minutes, 30 seconds",
        );
      });

      it("should handle maxUnits larger than available units", () => {
        const duration = Duration.fromString("1h");
        expect(duration.format({ maxUnits: 5 })).toBe("1 hour");
      });
    });

    describe("combined options", () => {
      it("should handle both short and maxUnits", () => {
        const duration = Duration.from({
          days: 1,
          hours: 2,
          minutes: 30,
          seconds: 15,
        });

        expect(duration.format({ short: true, maxUnits: 3 })).toBe("1d 2h 30m");
      });
    });

    describe("edge cases", () => {
      it("should handle very large durations", () => {
        const duration = Duration.from({ years: 2, months: 6 });
        expect(duration.format()).toBe("2 years, 6 months");
      });

      it("should handle fractional units properly", () => {
        // 1.5 hours should show as 1 hour, 30 minutes
        const duration = new Duration(5400000); // 1.5 hours in milliseconds
        expect(duration.format()).toBe("1 hour, 30 minutes");
      });

      it("should handle units that round to zero", () => {
        const duration = new Duration(1500); // 1.5 seconds
        expect(duration.format()).toBe("1 second, 500 milliseconds");
      });
    });
  });
});
