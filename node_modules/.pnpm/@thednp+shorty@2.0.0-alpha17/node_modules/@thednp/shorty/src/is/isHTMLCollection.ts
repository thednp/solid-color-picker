import isObject from './isObject';

/**
 * Checks if an object is an `HTMLCollection`.
 *
 * @param obj the target object
 * @returns the query result
 */
const isHTMLCollection = (obj?: unknown): obj is HTMLCollection =>
  (isObject(obj) && obj.constructor.name === 'HTMLCollection') || false;

export default isHTMLCollection;
