import isString from './isString';

/**
 * Checks if a string is a `JSON` string.
 *
 * @param str the target string
 * @returns the query result
 */
const isJSON = (str?: string): boolean => {
  if (!isString(str)) return false;

  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export default isJSON;
