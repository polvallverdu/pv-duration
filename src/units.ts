type Unit = "ms" | "s" | "m" | "h" | "d" | "w" | "y";
export type DurationWithUnit = `${number}${Unit}` | `${number} ${Unit}`;

/**
 * Parse a duration string into a number of milliseconds
 * @param duration - The duration string to parse
 * @returns The duration in milliseconds
 */
export const parseDuration = (duration: DurationWithUnit) => {
	const match = duration.match(/^(\d+)\s*([a-zA-Z]+)$/);
	if (!match) {
		throw new Error(`Invalid duration format: ${duration}`);
	}
	const [, value, unit] = match;

	const valueNumber = Number(value);

	if (Number.isNaN(valueNumber)) {
		throw new Error(`Invalid duration format: ${duration}`);
	}

	switch (unit) {
		case "ms":
			return valueNumber * 1;
		case "s":
			return valueNumber * 1000;
		case "m":
			return valueNumber * 1000 * 60;
		case "h":
			return valueNumber * 1000 * 60 * 60;
		case "d":
			return valueNumber * 1000 * 60 * 60 * 24;
		case "w":
			return valueNumber * 1000 * 60 * 60 * 24 * 7;
		case "y":
			return valueNumber * 1000 * 60 * 60 * 24 * 365;
		default:
			throw new Error(`Invalid duration format: ${duration}`);
	}
};
