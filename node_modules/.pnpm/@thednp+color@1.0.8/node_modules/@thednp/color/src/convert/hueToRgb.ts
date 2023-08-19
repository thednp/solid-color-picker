/**
 * Returns a normalized RGB component value.
 */
const hueToRgb = (p: number, q: number, t: number): number => {
  let T = t;
  if (T < 0) T += 1;
  if (T > 1) T -= 1;
  if (T < 1 / 6) return p + (q - p) * (6 * T);
  if (T < 1 / 2) return q;
  if (T < 2 / 3) return p + (q - p) * (2 / 3 - T) * 6;
  return p;
};
export default hueToRgb;
