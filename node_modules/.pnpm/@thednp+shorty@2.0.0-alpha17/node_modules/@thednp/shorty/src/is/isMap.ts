import isObject from './isObject';

/**
 * Checks if an element is a `Map`.
 *
 * @param obj the target object
 * @returns the query result
 */
const isMap = (obj?: unknown): obj is Map<any, any> =>
  (isObject(obj) && obj.constructor.name === 'Map') || false;
export default isMap;
