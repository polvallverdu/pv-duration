# pv-duration

[![npm version](https://badge.fury.io/js/pv-duration.svg)](https://badge.fury.io/js/pv-duration)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Build Status](https://img.shields.io/github/actions/workflow/status/polvallverdu/pv-duration/ci.yml?branch=main)](https://github.com/polvallverdu/pv-duration/actions)
[![Coverage](https://img.shields.io/codecov/c/github/polvallverdu/pv-duration)](https://codecov.io/gh/polvallverdu/pv-duration)

A lightweight, type-safe TypeScript library for parsing and manipulating time durations with an intuitive API.

## ✨ Features

- 🚀 **Zero dependencies** - Lightweight and fast
- 📝 **Type-safe** - Full TypeScript support with strict typing
- 🎯 **Intuitive API** - Easy to use and understand
- ⚡ **High performance** - Optimized for speed
- 🧪 **Well tested** - Comprehensive test coverage
- 📦 **Multiple formats** - Support for various duration formats

## 📦 Installation

```bash
# Using bun (recommended)
bun add pv-duration

# Using npm
npm install pv-duration

# Using yarn
yarn add pv-duration

# Using pnpm
pnpm add pv-duration
```

## 🚀 Quick Start

```typescript
import { Duration } from "pv-duration";

// Parse duration strings
const duration1 = Duration.fromString("1h");
const duration2 = Duration.fromString("30m");
const duration3 = Duration.fromString("2d");

// Create from objects
const duration4 = Duration.from({
  hours: 2,
  minutes: 30,
  seconds: 15,
});

// Get values in different units
console.log(duration1.hours); // 1
console.log(duration1.minutes); // 60
console.log(duration1.milliseconds); // 3600000
```

## 📚 API Reference

### `Duration.fromString(duration: string)`

Parse a duration string into a Duration object.

**Supported formats:**

- `ms` - milliseconds
- `s` - seconds
- `m` - minutes
- `h` - hours
- `d` - days
- `w` - weeks
- `y` - years

**Examples:**

```typescript
Duration.fromString("100ms"); // 100 milliseconds
Duration.fromString("30s"); // 30 seconds
Duration.fromString("5m"); // 5 minutes
Duration.fromString("2h"); // 2 hours
Duration.fromString("1d"); // 1 day
Duration.fromString("2w"); // 2 weeks
Duration.fromString("1y"); // 1 year

// With spaces
Duration.fromString("10 ms");
Duration.fromString("1 h");
```

### `Duration.from(duration: Partial<DurationObject>)`

Create a Duration from an object with time units.

```typescript
interface DurationObject {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}
```

**Example:**

```typescript
const duration = Duration.from({
  hours: 1,
  minutes: 30,
  seconds: 45,
});
```

### `Duration.of(duration: Partial<DurationObject>)`

Alias for `Duration.from()`. Creates a Duration from an object with time units.

**Example:**

```typescript
const duration = Duration.of({
  hours: 1,
  minutes: 30,
  seconds: 45,
});
```

### Unit-specific Creation Methods

For convenience, you can create Duration objects directly from specific time units:

#### `Duration.fromMilliseconds(milliseconds: number)` / `Duration.ofMilliseconds(milliseconds: number)`

```typescript
const duration = Duration.fromMilliseconds(1500); // 1.5 seconds
const duration2 = Duration.ofMilliseconds(1500); // Same as above
```

#### `Duration.fromSeconds(seconds: number)` / `Duration.ofSeconds(seconds: number)`

```typescript
const duration = Duration.fromSeconds(30); // 30 seconds
const duration2 = Duration.ofSeconds(30); // Same as above
```

#### `Duration.fromMinutes(minutes: number)` / `Duration.ofMinutes(minutes: number)`

```typescript
const duration = Duration.fromMinutes(45); // 45 minutes
const duration2 = Duration.ofMinutes(45); // Same as above
```

#### `Duration.fromHours(hours: number)` / `Duration.ofHours(hours: number)`

```typescript
const duration = Duration.fromHours(2.5); // 2.5 hours
const duration2 = Duration.ofHours(2.5); // Same as above
```

#### `Duration.fromDays(days: number)` / `Duration.ofDays(days: number)`

```typescript
const duration = Duration.fromDays(7); // 1 week
const duration2 = Duration.ofDays(7); // Same as above
```

#### `Duration.fromWeeks(weeks: number)` / `Duration.ofWeeks(weeks: number)`

```typescript
const duration = Duration.fromWeeks(2); // 2 weeks
const duration2 = Duration.ofWeeks(2); // Same as above
```

#### `Duration.fromMonths(months: number)` / `Duration.ofMonths(months: number)`

```typescript
const duration = Duration.fromMonths(6); // 6 months (180 days)
const duration2 = Duration.ofMonths(6); // Same as above
```

#### `Duration.fromYears(years: number)` / `Duration.ofYears(years: number)`

```typescript
const duration = Duration.fromYears(1); // 1 year (365 days)
const duration2 = Duration.ofYears(1); // Same as above
```

### Properties

All Duration instances provide getters for different time units:

```typescript
const duration = Duration.fromString("1h");

duration.milliseconds; // Get duration in milliseconds
duration.seconds; // Get duration in seconds
duration.minutes; // Get duration in minutes
duration.hours; // Get duration in hours
duration.days; // Get duration in days
duration.weeks; // Get duration in weeks
duration.months; // Get duration in months
duration.years; // Get duration in years
```

## 🧪 Examples

### Basic Usage

```typescript
import { Duration } from "pv-duration";

// Create durations using different methods
const meeting = Duration.from({ hours: 1, minutes: 30 });
const meeting2 = Duration.of({ hours: 1, minutes: 30 }); // Same as above
const break_time = Duration.fromString("15m");

// Using unit-specific methods
const quick_break = Duration.fromMinutes(15);
const long_meeting = Duration.fromHours(2.5);
const project_duration = Duration.fromDays(30);

// Get total minutes
console.log(meeting.minutes); // 90
console.log(break_time.minutes); // 15
console.log(quick_break.minutes); // 15
console.log(long_meeting.hours); // 2.5

// Convert between units
const milliseconds = Duration.fromString("2s").milliseconds; // 2000
const hours = Duration.fromString("120m").hours; // 2
```

### Working with Different Units

```typescript
// Create from various string formats
const shortDuration = Duration.fromString("500ms");
const mediumDuration = Duration.fromString("5m");
const longDuration = Duration.fromString("2d");

// Create from object
const complexDuration = Duration.from({
  days: 1,
  hours: 12,
  minutes: 30,
});

// Using unit-specific methods
const preciseDuration = Duration.fromMilliseconds(1500);
const minuteDuration = Duration.fromMinutes(30);
const hourDuration = Duration.fromHours(2.5);
const dayDuration = Duration.fromDays(7);
const weekDuration = Duration.fromWeeks(1);
const monthDuration = Duration.fromMonths(6);
const yearDuration = Duration.fromYears(1);

// Using 'of' aliases
const alternativeDuration = Duration.of({ hours: 3, minutes: 45 });
const alternativeSeconds = Duration.ofSeconds(90);

console.log(complexDuration.hours); // 36.5 (1.5 days = 36.5 hours)
console.log(preciseDuration.seconds); // 1.5
console.log(weekDuration.days); // 7
console.log(monthDuration.days); // 180
```

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/polvallverdu/pv-duration.git
cd pv-duration

# Install dependencies
bun install
```

### Testing

```bash
# Run tests
bun test

# Run tests with coverage
bun test --coverage
```

### Building

```bash
# Build the project
bun run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Ensure all tests pass (`bun test`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Contributors

Thanks to these wonderful people who have contributed to this project:

<!-- ALL-CONTRIBUTORS-LIST:START -->

- [@polvallverdu](https://github.com/polvallverdu) - Creator and maintainer
<!-- ALL-CONTRIBUTORS-LIST:END -->

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help, please:

1. Check the [documentation](#-api-reference)
2. Search [existing issues](https://github.com/polvallverdu/pv-duration/issues)
3. Create a [new issue](https://github.com/polvallverdu/pv-duration/issues/new)

## 🗺️ Roadmap

- [ ] Support for compound duration strings (e.g., `"1h 30m"`)
- [ ] Localization support

---

<div align="center">
  <strong>⭐ Star this repository if you find it helpful!</strong>
</div>
