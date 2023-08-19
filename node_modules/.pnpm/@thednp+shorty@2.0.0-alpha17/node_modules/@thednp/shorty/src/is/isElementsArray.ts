import isHTMLElement from './isHTMLElement';
import isArray from './isArray';

/**
 * Checks if an object is an `Array` in which all items are `Element`.
 *
 * @param obj the target object
 * @returns the query result
 */
const isElementsArray = (obj?: unknown): obj is HTMLElement[] =>
  (isArray(obj) && obj.every(isHTMLElement)) || false;

export default isElementsArray;
