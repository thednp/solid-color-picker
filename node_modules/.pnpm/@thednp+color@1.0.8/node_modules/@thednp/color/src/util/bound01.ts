import isOnePointZero from './isOnePointZero';
import isPercentage from './isPercentage';
/**
 * Take input from [0, n] and return it as [0, 1]
 */
const bound01 = (N: string | number, max: number): number => {
  let n = N;

  if (
    typeof N === 'number' &&
    Math.min(N, 0) === 0 && // round values to 6 decimals Math.round(N * (10 ** 6)) / 10 ** 6
    Math.max(N, 1) === 1
  )
    return N;

  if (isOnePointZero(N)) n = '100%';

  const processPercent = isPercentage(n);
  n = max === 360 ? parseFloat(n as string) : Math.min(max, Math.max(0, parseFloat(n as string)));

  // Automatically convert percentage into number
  if (processPercent) n = (n * max) / 100;

  // Handle floating point rounding errors
  if (Math.abs(n - max) < 0.000001) {
    return 1;
  }
  // Convert into [0, 1] range if it isn't already
  if (max === 360) {
    // If n is a hue given in degrees,
    // wrap around out-of-range values into [0, 360] range
    // then convert into [0, 1].
    n = (n < 0 ? (n % max) + max : n % max) / max;
  } else {
    // If n not a hue given in degrees
    // Convert into [0, 1] range if it isn't already.
    n = (n % max) / max;
  }
  return n;
};

export default bound01;
