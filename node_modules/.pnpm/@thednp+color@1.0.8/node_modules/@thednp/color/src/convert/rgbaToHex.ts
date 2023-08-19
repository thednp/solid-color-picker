import pad2 from '../util/pad2';
import roundPart from '../util/roundPart';
import convertDecimalToHex from './convertDecimalToHex';

/**
 * Converts an RGBA color plus alpha transparency to hex8.
 */
const rgbaToHex = (r: number, g: number, b: number, a: number, allow4Char?: boolean): string => {
  const hex = [
    pad2(roundPart(r).toString(16)),
    pad2(roundPart(g).toString(16)),
    pad2(roundPart(b).toString(16)),
    pad2(convertDecimalToHex(a)),
  ];

  // Return a 4 character hex if possible
  if (
    allow4Char &&
    hex[0].charAt(0) === hex[0].charAt(1) &&
    hex[1].charAt(0) === hex[1].charAt(1) &&
    hex[2].charAt(0) === hex[2].charAt(1) &&
    hex[3].charAt(0) === hex[3].charAt(1)
  ) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join('');
};

export default rgbaToHex;
