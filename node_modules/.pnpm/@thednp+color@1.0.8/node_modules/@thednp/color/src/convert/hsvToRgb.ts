import { RGB } from '../interface/rgb';

/**
 * Converts an HSV colour value to RGB.
 */
const hsvToRgb = (H: number, S: number, V: number): RGB => {
  const h = H * 6;
  const s = S;
  const v = V;
  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const r = [v, q, p, p, t, v][mod];
  const g = [t, v, v, q, p, p][mod];
  const b = [p, p, t, v, v, q][mod];
  return { r, g, b };
};

export default hsvToRgb;
