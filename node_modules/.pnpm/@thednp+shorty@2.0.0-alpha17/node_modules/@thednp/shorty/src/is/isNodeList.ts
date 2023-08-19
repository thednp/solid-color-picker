import isObject from './isObject';

/**
 * Checks if an object is a `NodeList`.
 * => equivalent to `object instanceof NodeList`
 *
 * @param obj the target object
 * @returns the query result
 */
const isNodeList = (obj?: unknown): obj is NodeList =>
  (isObject(obj) && obj.constructor.name === 'NodeList') || false;

export default isNodeList;
