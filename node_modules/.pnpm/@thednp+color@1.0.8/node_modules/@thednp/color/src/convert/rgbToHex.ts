import pad2 from '../util/pad2';
import roundPart from '../util/roundPart';

/**
 * Converts an RGB colour to hex
 *
 * Assumes r, g, and b are contained in the set [0, 255]
 * Returns a 3 or 6 character hex
 */
const rgbToHex = (r: number, g: number, b: number, allow3Char?: boolean): string => {
  const hex = [
    pad2(roundPart(r).toString(16)),
    pad2(roundPart(g).toString(16)),
    pad2(roundPart(b).toString(16)),
  ];

  // Return a 3 character hex if possible
  if (
    allow3Char &&
    hex[0].charAt(0) === hex[0].charAt(1) &&
    hex[1].charAt(0) === hex[1].charAt(1) &&
    hex[2].charAt(0) === hex[2].charAt(1)
  ) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }

  return hex.join('');
};

export default rgbToHex;
