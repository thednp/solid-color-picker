/**
 * Converts a base-16 hexadecimal value into a base-10 integer.
 */
const parseIntFromHex = (val: string): number => {
  return parseInt(val, 16);
};

export default parseIntFromHex;
