import type { HSV } from '../interface/hsv';

/**
 * Converts an RGB colour value to HSV.
 */
const rgbToHsv = (r: number, g: number, b: number): HSV => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0; // achromatic
  } else {
    if (r === max) h = (g - b) / d + (g < b ? 6 : 0);
    if (g === max) h = (b - r) / d + 2;
    if (b === max) h = (r - g) / d + 4;

    h /= 6;
  }
  return { h, s, v };
};

export default rgbToHsv;
