import ColorInputTypes from './colorInputTypes';
import stringInputToObject from './stringInputToObject';
import isColorType from './isColorType';
import isValidCSSUnit from './isValidCSSUnit';
import isPercentage from './isPercentage';
import bound01 from './bound01';
import boundAlpha from './boundAlpha';
import hsvToRgb from '../convert/hsvToRgb';
import hslToRgb from '../convert/hslToRgb';
import hwbToRgb from '../convert/hwbToRgb';

import type { RGBAObject } from '../interface/rgbaObject';
import type { RGB } from '../interface/rgb';

/**
 * Given a string or object, convert that input to RGB
 *
 * Possible string inputs:
 * ```
 * "red"
 * "#f00" or "f00"
 * "#ff0000" or "ff0000"
 * "#ff000000" or "ff000000" // CSS4 Module
 * "rgb 255 0 0" or "rgb (255, 0, 0)"
 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 * "rgba(255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 * "rgba(1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 * "rgb(255 0 0 / 10%)" or "rgb 255 0 0 0.1" // CSS4 Module
 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 * "hsl(0deg 100% 50% / 50%)" or "hsl 0 100 50 50" // CSS4 Module
 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 * "hsva(0, 100%, 100%, 0.1)" or "hsva 0 100% 100% 0.1"
 * "hsv(0deg 100% 100% / 10%)" or "hsv 0 100 100 0.1" // CSS4 Module
 * "hwb(0deg, 100%, 100%, 100%)" or "hwb 0 100% 100% 0.1" // CSS4 Module
 * ```
 */
const inputToRGB = (input?: ColorInputTypes): RGBAObject => {
  let rgb = { r: 0, g: 0, b: 0 };
  let color = input;
  let a = 1;
  let s: number;
  let v: number;
  let l: number;
  let w: number;
  let b: number;
  let h: number;
  let r: number;
  let g: number;
  let format = 'rgb';
  let ok = false;

  if (!color || typeof color === 'string') {
    color = stringInputToObject(color as string);
    ok = (color as RGBAObject).ok;
  }

  if (
    isColorType(color, rgb) &&
    isValidCSSUnit(color.r) &&
    isValidCSSUnit(color.g) &&
    isValidCSSUnit(color.b)
  ) {
    ({ r, g, b } = color as RGB);
    // RGB values now are all in [0, 1] range
    [r, g, b] = [r, g, b].map(n => bound01(n, isPercentage(n) ? 100 : 255));
    rgb = { r, g, b };
    format = 'format' in color ? (color as RGBAObject).format : 'rgb';
  }
  if (
    isColorType(color, { h: 0, s: 0, v: 0 }) &&
    isValidCSSUnit(color.h) &&
    isValidCSSUnit(color.s) &&
    isValidCSSUnit(color.v)
  ) {
    ({ h, s, v } = color);
    h = bound01(h, 360); // hue can be `5deg` or a [0, 1] value
    s = bound01(s, 100); // saturation can be `5%` or a [0, 1] value
    v = bound01(v, 100); // brightness can be `5%` or a [0, 1] value
    rgb = hsvToRgb(h, s, v);
    format = 'hsv';
  }
  if (
    isColorType(color, { h: 0, s: 0, l: 0 }) &&
    isValidCSSUnit(color.h) &&
    isValidCSSUnit(color.s) &&
    isValidCSSUnit(color.l)
  ) {
    ({ h, s, l } = color);
    h = bound01(h, 360); // hue can be `5deg` or a [0, 1] value
    s = bound01(s, 100); // saturation can be `5%` or a [0, 1] value
    l = bound01(l, 100); // lightness can be `5%` or a [0, 1] value
    rgb = hslToRgb(h, s, l);
    format = 'hsl';
  }
  if (
    isColorType(color, { h: 0, w: 0, b: 0 }) &&
    isValidCSSUnit(color.h) &&
    isValidCSSUnit(color.w) &&
    isValidCSSUnit(color.b)
  ) {
    ({ h, w, b } = color);
    h = bound01(h, 360); // hue can be `5deg` or a [0, 1] value
    w = bound01(w, 100); // whiteness can be `5%` or a [0, 1] value
    b = bound01(b, 100); // blackness can be `5%` or a [0, 1] value
    rgb = hwbToRgb(h, w, b);
    format = 'hwb';
  }

  if (isValidCSSUnit((color as RGBAObject).a)) {
    a = (color as RGBAObject).a;
    a = isPercentage(a) || parseFloat(`${a}`) > 1 ? bound01(a, 100) : a;
  }

  return {
    r: rgb.r,
    g: rgb.g,
    b: rgb.b,
    a: boundAlpha(a),
    format,
    ok,
  };
};

export default inputToRGB;
