/**
 * Converts various color input formats to an {r:0,g:0,b:0} object.
 *
 * @param {string} color The string representation of a color
 * @example
 * colorToRgb('#000');
 * @example
 * colorToRgb('#000000');
 * @example
 * colorToRgb('rgb(0,0,0)');
 * @example
 * colorToRgb('rgba(0,0,0)');
 *
 * @return {{r: number, g: number, b: number, [a]: number}|null}
 */
export const colorToRgb = (color) => {
	let hex3 = color.match(/^#([0-9a-f]{3})$/i);
	if (hex3?.[1]) {
		hex3 = hex3[1];
		return {
			r: Number.parseInt(hex3.charAt(0), 16) * 0x11,
			g: Number.parseInt(hex3.charAt(1), 16) * 0x11,
			b: Number.parseInt(hex3.charAt(2), 16) * 0x11,
		};
	}

	let hex6 = color.match(/^#([0-9a-f]{6})$/i);
	if (hex6?.[1]) {
		hex6 = hex6[1];
		return {
			r: Number.parseInt(hex6.slice(0, 2), 16),
			g: Number.parseInt(hex6.slice(2, 4), 16),
			b: Number.parseInt(hex6.slice(4, 6), 16),
		};
	}

	const rgb = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
	if (rgb) {
		return {
			r: Number.parseInt(rgb[1], 10),
			g: Number.parseInt(rgb[2], 10),
			b: Number.parseInt(rgb[3], 10),
		};
	}

	const rgba = color.match(
		/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i,
	);
	if (rgba) {
		return {
			r: Number.parseInt(rgba[1], 10),
			g: Number.parseInt(rgba[2], 10),
			b: Number.parseInt(rgba[3], 10),
			a: Number.parseFloat(rgba[4]),
		};
	}

	return null;
};

/**
 * Calculates brightness on a scale of 0-255.
 *
 * @param {string} color See colorToRgb for supported formats.
 * @see {@link colorToRgb}
 */
export const colorBrightness = (color) => {
	if (typeof color === "string") color = colorToRgb(color);

	if (color) {
		return (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
	}

	return null;
};
