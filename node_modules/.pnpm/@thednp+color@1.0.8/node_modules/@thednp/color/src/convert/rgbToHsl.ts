import type { HSL } from '../interface/hsl';

/**
 * Converts an RGB colour value to HSL.
 */
const rgbToHsl = (r: number, g: number, b: number): HSL => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max === min) {
    s = 0;
    h = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    if (max === g) h = (b - r) / d + 2;
    if (max === b) h = (r - g) / d + 4;

    h /= 6;
  }
  return { h, s, l };
};

export default rgbToHsl;
