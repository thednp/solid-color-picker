import hueToRgb from './hueToRgb';
import type { RGB } from '../interface/rgb';

/**
 * Converts an HSL colour value to RGB.
 */
const hslToRgb = (h: number, s: number, l: number): RGB => {
  let r = 0;
  let g = 0;
  let b = 0;

  if (s === 0) {
    // achromatic
    g = l;
    b = l;
    r = l;
  } else if (l) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return { r, g, b };
};

export default hslToRgb;
