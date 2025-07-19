import { type DurationWithUnit, parseDuration } from "./units";

/**
 * Represents a duration object with time units
 */
export interface DurationObject {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

/**
 * A class representing a duration of time with various operations and conversions
 */
export class Duration {
  /**
   * The duration in milliseconds
   */
  private readonly duration: number;

  /**
   * Creates a new Duration instance
   * @param durationInMilliseconds - The duration in milliseconds
   */
  constructor(durationInMilliseconds: number) {
    this.duration = durationInMilliseconds;
  }

  /**
   * Creates a Duration from a partial duration object
   * @param duration - Partial duration object with time units
   * @returns A new Duration instance
   */
  public static from(duration: Partial<DurationObject>) {
    let durationInMilliseconds = 0;

    if (duration.years) {
      durationInMilliseconds += duration.years * 365 * 24 * 60 * 60 * 1000;
    }

    if (duration.months) {
      durationInMilliseconds += duration.months * 30 * 24 * 60 * 60 * 1000;
    }

    if (duration.days) {
      durationInMilliseconds += duration.days * 24 * 60 * 60 * 1000;
    }

    if (duration.hours) {
      durationInMilliseconds += duration.hours * 60 * 60 * 1000;
    }

    if (duration.minutes) {
      durationInMilliseconds += duration.minutes * 60 * 1000;
    }

    if (duration.seconds) {
      durationInMilliseconds += duration.seconds * 1000;
    }

    if (duration.milliseconds) {
      durationInMilliseconds += duration.milliseconds;
    }

    return new Duration(durationInMilliseconds);
  }

  /**
   * Alias for from method
   * @param duration - Partial duration object with time units
   * @returns A new Duration instance
   */
  public static of(duration: Partial<DurationObject>) {
    return Duration.from(duration);
  }

  /**
   * Creates a Duration from milliseconds
   * @param milliseconds - The duration in milliseconds
   * @returns A new Duration instance
   */
  public static fromMilliseconds(milliseconds: number): Duration {
    return new Duration(milliseconds);
  }

  /**
   * Creates a Duration from milliseconds
   * @param milliseconds - The duration in milliseconds
   * @returns A new Duration instance
   */
  public static ofMilliseconds(milliseconds: number): Duration {
    return Duration.fromMilliseconds(milliseconds);
  }

  /**
   * Creates a Duration from seconds
   * @param seconds - The duration in seconds
   * @returns A new Duration instance
   */
  public static fromSeconds(seconds: number): Duration {
    return new Duration(seconds * 1000);
  }

  /**
   * Creates a Duration from seconds
   * @param seconds - The duration in seconds
   * @returns A new Duration instance
   */
  public static ofSeconds(seconds: number): Duration {
    return Duration.fromSeconds(seconds);
  }

  /**
   * Creates a Duration from minutes
   * @param minutes - The duration in minutes
   * @returns A new Duration instance
   */
  public static fromMinutes(minutes: number): Duration {
    return new Duration(minutes * 60 * 1000);
  }

  /**
   * Creates a Duration from minutes
   * @param minutes - The duration in minutes
   * @returns A new Duration instance
   */
  public static ofMinutes(minutes: number): Duration {
    return Duration.fromMinutes(minutes);
  }

  /**
   * Creates a Duration from hours
   * @param hours - The duration in hours
   * @returns A new Duration instance
   */
  public static fromHours(hours: number): Duration {
    return new Duration(hours * 60 * 60 * 1000);
  }

  /**
   * Creates a Duration from hours
   * @param hours - The duration in hours
   * @returns A new Duration instance
   */
  public static ofHours(hours: number): Duration {
    return Duration.fromHours(hours);
  }

  /**
   * Creates a Duration from days
   * @param days - The duration in days
   * @returns A new Duration instance
   */
  public static fromDays(days: number): Duration {
    return new Duration(days * 24 * 60 * 60 * 1000);
  }

  /**
   * Creates a Duration from days
   * @param days - The duration in days
   * @returns A new Duration instance
   */
  public static ofDays(days: number): Duration {
    return Duration.fromDays(days);
  }

  /**
   * Creates a Duration from weeks
   * @param weeks - The duration in weeks
   * @returns A new Duration instance
   */
  public static fromWeeks(weeks: number): Duration {
    return new Duration(weeks * 7 * 24 * 60 * 60 * 1000);
  }

  /**
   * Creates a Duration from weeks
   * @param weeks - The duration in weeks
   * @returns A new Duration instance
   */
  public static ofWeeks(weeks: number): Duration {
    return Duration.fromWeeks(weeks);
  }

  /**
   * Creates a Duration from months (assuming 30 days per month)
   * @param months - The duration in months
   * @returns A new Duration instance
   */
  public static fromMonths(months: number): Duration {
    return new Duration(months * 30 * 24 * 60 * 60 * 1000);
  }

  /**
   * Creates a Duration from months (assuming 30 days per month)
   * @param months - The duration in months
   * @returns A new Duration instance
   */
  public static ofMonths(months: number): Duration {
    return Duration.fromMonths(months);
  }

  /**
   * Creates a Duration from years (assuming 365 days per year)
   * @param years - The duration in years
   * @returns A new Duration instance
   */
  public static fromYears(years: number): Duration {
    return new Duration(years * 365 * 24 * 60 * 60 * 1000);
  }

  /**
   * Creates a Duration from years (assuming 365 days per year)
   * @param years - The duration in years
   * @returns A new Duration instance
   */
  public static ofYears(years: number): Duration {
    return Duration.fromYears(years);
  }

  /**
   * Parse a duration units string into a Duration object
   * @param duration - The duration string to parse
   * @returns The Duration object
   */
  public static fromString(duration: DurationWithUnit) {
    const durationInMilliseconds = parseDuration(duration);

    return new Duration(durationInMilliseconds);
  }

  /**
   * Gets the duration in seconds
   */
  get seconds() {
    return this.duration / 1000;
  }

  /**
   * Gets the duration in minutes
   */
  get minutes() {
    return this.duration / (1000 * 60);
  }

  /**
   * Gets the duration in hours
   */
  get hours() {
    return this.duration / (1000 * 60 * 60);
  }

  /**
   * Gets the duration in days
   */
  get days() {
    return this.duration / (1000 * 60 * 60 * 24);
  }

  /**
   * Gets the duration in weeks
   */
  get weeks() {
    return this.duration / (1000 * 60 * 60 * 24 * 7);
  }

  /**
   * Gets the duration in months (assuming 30 days per month)
   */
  get months() {
    return this.duration / (1000 * 60 * 60 * 24 * 30);
  }

  /**
   * Gets the duration in years (assuming 365 days per year)
   */
  get years() {
    return this.duration / (1000 * 60 * 60 * 24 * 365);
  }

  /**
   * Gets the duration in milliseconds
   */
  get milliseconds() {
    return this.duration;
  }

  // Arithmetic operations

  /**
   * Adds another duration to this duration
   * @param other - The duration to add
   * @returns A new Duration instance with the sum
   */
  public add(other: Duration): Duration {
    return new Duration(this.duration + other.duration);
  }

  /**
   * Subtracts another duration from this duration
   * @param other - The duration to subtract
   * @returns A new Duration instance with the difference
   */
  public subtract(other: Duration): Duration {
    return new Duration(this.duration - other.duration);
  }

  /**
   * Multiplies this duration by a factor
   * @param factor - The multiplication factor
   * @returns A new Duration instance with the result
   */
  public multiply(factor: number): Duration {
    return new Duration(this.duration * factor);
  }

  /**
   * Divides this duration by a factor
   * @param factor - The division factor
   * @returns A new Duration instance with the result
   * @throws Error if factor is zero
   */
  public divide(factor: number): Duration {
    if (factor === 0) {
      throw new Error("Cannot divide by zero");
    }
    return new Duration(this.duration / factor);
  }

  // Comparison operations

  /**
   * Checks if this duration equals another duration
   * @param other - The duration to compare with
   * @returns True if durations are equal
   */
  public equals(other: Duration): boolean {
    return this.duration === other.duration;
  }

  /**
   * Checks if this duration is greater than another duration
   * @param other - The duration to compare with
   * @returns True if this duration is greater
   */
  public greaterThan(other: Duration): boolean {
    return this.duration > other.duration;
  }

  /**
   * Checks if this duration is less than another duration
   * @param other - The duration to compare with
   * @returns True if this duration is less
   */
  public lessThan(other: Duration): boolean {
    return this.duration < other.duration;
  }

  /**
   * Checks if this duration is greater than or equal to another duration
   * @param other - The duration to compare with
   * @returns True if this duration is greater than or equal
   */
  public greaterThanOrEqual(other: Duration): boolean {
    return this.duration >= other.duration;
  }

  /**
   * Checks if this duration is less than or equal to another duration
   * @param other - The duration to compare with
   * @returns True if this duration is less than or equal
   */
  public lessThanOrEqual(other: Duration): boolean {
    return this.duration <= other.duration;
  }

  /**
   * Formats the duration as a human-readable string
   * @param options - Formatting options
   * @returns A formatted string representation of the duration
   */
  public format(
    options: {
      /** Maximum number of units to display (default: 2) */
      maxUnits?: number;
      /** Whether to use short unit names (default: false) */
      short?: boolean;
    } = {}
  ): string {
    const { maxUnits = 2, short = false } = options;

    if (this.duration === 0) {
      return short ? "0ms" : "0 milliseconds";
    }

    const units = [
      {
        name: short ? "y" : "year",
        namePlural: short ? "y" : "years",
        value: Math.floor(this.years),
      },
      {
        name: short ? "mo" : "month",
        namePlural: short ? "mo" : "months",
        value: Math.floor(this.months % 12),
      },
      {
        name: short ? "d" : "day",
        namePlural: short ? "d" : "days",
        value: Math.floor(this.days % 30),
      },
      {
        name: short ? "h" : "hour",
        namePlural: short ? "h" : "hours",
        value: Math.floor(this.hours % 24),
      },
      {
        name: short ? "m" : "minute",
        namePlural: short ? "m" : "minutes",
        value: Math.floor(this.minutes % 60),
      },
      {
        name: short ? "s" : "second",
        namePlural: short ? "s" : "seconds",
        value: Math.floor(this.seconds % 60),
      },
      {
        name: short ? "ms" : "millisecond",
        namePlural: short ? "ms" : "milliseconds",
        value: Math.floor(this.milliseconds % 1000),
      },
    ];

    const nonZeroUnits = units.filter((unit) => unit.value > 0);
    const displayUnits = nonZeroUnits.slice(0, maxUnits);

    if (displayUnits.length === 0) {
      // If all major units are 0 but we have some milliseconds, show them
      const ms = Math.floor(this.milliseconds);
      return short ? `${ms}ms` : `${ms} millisecond${ms === 1 ? "" : "s"}`;
    }

    return displayUnits
      .map((unit) => {
        const unitName =
          short || unit.value === 1 ? unit.name : unit.namePlural;
        return short ? `${unit.value}${unitName}` : `${unit.value} ${unitName}`;
      })
      .join(short ? " " : ", ");
  }
}
