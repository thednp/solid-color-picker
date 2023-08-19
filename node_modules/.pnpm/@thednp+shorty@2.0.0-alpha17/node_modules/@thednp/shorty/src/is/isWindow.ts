import isObject from './isObject';

/**
 * Check if a target object is `Window`.
 * => equivalent to `object instanceof Window`
 *
 * @param obj the target object
 * @returns the query result
 */
const isWindow = (obj?: unknown): obj is Window =>
  (isObject(obj) && obj.constructor.name === 'Window') || false;

export default isWindow;
