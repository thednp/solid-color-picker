import isColorName from './isColorName';
import isNonColor from './isNonColor';
import getRGBFromName from './getRGBFromName';
import matchers from './matchers';
import parseIntFromHex from '../convert/parseIntFromHex';
import convertHexToDecimal from '../convert/convertHexToDecimal';

import type { RGBALike } from '../interface/rgbaLike';
import type { HSLALike } from '../interface/hslaLike';
import type { HWBALike } from '../interface/hwbaLike';
import type { HSVALike } from '../interface/hsvaLike';

/**
 * Permissive string parsing. Take in a number of formats, and output an object
 * based on detected format. Returns {r,g,b} or {h,s,l} or {h,s,v}
 */
const stringInputToObject = (input?: string): RGBALike | HSLALike | HSVALike | HWBALike => {
  const color: string = String(input).trim().toLowerCase();

  if (isColorName(color)) {
    return Object.assign(getRGBFromName(color), {
      a: 1,
      format: 'rgb',
      ok: true,
    });
  }
  if (isNonColor(color)) {
    const a = color === 'transparent' ? 0 : 1;
    return {
      r: 0,
      g: 0,
      b: 0,
      a,
      format: 'rgb',
      ok: true,
    };
  }

  // Try to match string input using regular expressions.
  // Keep most of the number bounding out of this function,
  //   don't worry about [0,1] or [0,100] or [0,360]
  // Just return an object and let the conversion functions handle that.
  // This way the result will be the same whether Color is initialized with string or object.
  let [, m1, m2, m3, m4] = matchers.rgb.exec(color) || [];
  if (m1 && m2 && m3 /* && m4 */) {
    return {
      r: m1,
      g: m2,
      b: m3,
      a: m4 !== undefined ? m4 : 1,
      format: 'rgb',
      ok: true,
    };
  }

  [, m1, m2, m3, m4] = matchers.hsl.exec(color) || [];
  if (m1 && m2 && m3 /* && m4 */) {
    return {
      h: m1,
      s: m2,
      l: m3,
      a: m4 !== undefined ? m4 : 1,
      format: 'hsl',
      ok: true,
    };
  }

  [, m1, m2, m3, m4] = matchers.hsv.exec(color) || [];
  if (m1 && m2 && m3 /* && m4 */) {
    return {
      h: m1,
      s: m2,
      v: m3,
      a: m4 !== undefined ? m4 : 1,
      format: 'hsv',
      ok: true,
    };
  }

  [, m1, m2, m3, m4] = matchers.hwb.exec(color) || [];
  if (m1 && m2 && m3) {
    return {
      h: m1,
      w: m2,
      b: m3,
      a: m4 !== undefined ? m4 : 1,
      format: 'hwb',
      ok: true,
    };
  }

  [, m1, m2, m3, m4] = matchers.hex8.exec(color) || [];
  if (m1 && m2 && m3 && m4) {
    return {
      r: parseIntFromHex(m1),
      g: parseIntFromHex(m2),
      b: parseIntFromHex(m3),
      a: convertHexToDecimal(m4),
      format: 'hex',
      ok: true,
    };
  }

  [, m1, m2, m3] = matchers.hex6.exec(color) || [];
  if (m1 && m2 && m3) {
    return {
      r: parseIntFromHex(m1),
      g: parseIntFromHex(m2),
      b: parseIntFromHex(m3),
      a: 1,
      format: 'hex',
      ok: true,
    };
  }

  [, m1, m2, m3, m4] = matchers.hex4.exec(color) || [];
  if (m1 && m2 && m3 && m4) {
    return {
      r: parseIntFromHex(m1 + m1),
      g: parseIntFromHex(m2 + m2),
      b: parseIntFromHex(m3 + m3),
      a: convertHexToDecimal(m4 + m4),
      format: 'hex',
      ok: true,
    };
  }

  [, m1, m2, m3] = matchers.hex3.exec(color) || [];
  if (m1 && m2 && m3) {
    return {
      r: parseIntFromHex(m1 + m1),
      g: parseIntFromHex(m2 + m2),
      b: parseIntFromHex(m3 + m3),
      a: 1,
      format: 'hex',
      ok: true,
    };
  }

  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
    format: 'rgb',
    ok: !input ? true : false,
  };
};

export default stringInputToObject;
