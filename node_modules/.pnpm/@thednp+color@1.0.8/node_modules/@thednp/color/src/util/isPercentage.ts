/**
 * Check to see if string passed in is a percentage
 */
const isPercentage = (n: string | number): boolean => {
  return typeof n === 'string' && n.includes('%');
};

export default isPercentage;
