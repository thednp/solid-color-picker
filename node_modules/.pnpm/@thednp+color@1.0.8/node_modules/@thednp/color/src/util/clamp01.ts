/**
 * Force a number between 0 and 1.
 */
const clamp01 = (v: number): number => {
  return Math.min(1, Math.max(0, v));
};

export default clamp01;
