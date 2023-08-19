/**
 * Force a hexadecimal value to have 2 characters.
 */
const pad2 = (c: string): string => {
  return c.length === 1 ? `0${c}` : String(c);
};

export default pad2;
