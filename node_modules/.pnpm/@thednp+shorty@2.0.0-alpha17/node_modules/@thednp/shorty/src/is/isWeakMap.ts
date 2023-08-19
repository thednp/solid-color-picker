import isObject from './isObject';

/**
 * Checks if an element is a `WeakMap`.
 *
 * @param obj the target object
 * @returns the query result
 */
const isWeakMap = (obj?: unknown): obj is WeakMap<any, any> =>
  (isObject(obj) && obj.constructor.name === 'WeakMap') || false;
export default isWeakMap;
