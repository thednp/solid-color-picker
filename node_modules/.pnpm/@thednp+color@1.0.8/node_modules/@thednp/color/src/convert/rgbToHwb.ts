import { HWB } from '../interface/hwb';

/**
 * Returns an HWB colour object from an RGB colour object.
 *
 * @link https://www.w3.org/TR/css-color-4/#hwb-to-rgb
 * @link http://alvyray.com/Papers/CG/hwb2rgb.htm
 */
const rgbToHwb = (r: number, g: number, b: number): HWB => {
  let f = 0;
  let i = 0;
  const whiteness = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const black = 1 - max;

  if (max === whiteness) return { h: 0, w: whiteness, b: black };
  if (r === whiteness) {
    f = g - b;
    i = 3;
  } else {
    f = g === whiteness ? b - r : r - g;
    i = g === whiteness ? 5 : 1;
  }

  const h = (i - f / (max - whiteness)) / 6;
  return {
    h: h === 1 ? 0 : h,
    w: whiteness,
    b: black,
  };
};

export default rgbToHwb;
