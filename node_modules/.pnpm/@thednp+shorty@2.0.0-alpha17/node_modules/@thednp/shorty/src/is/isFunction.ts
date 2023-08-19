/**
 * Checks if an object is a `Function`.
 *
 * @param fn the target object
 * @returns the query result
 */
const isFunction = (fn?: unknown): fn is (...arg0: any[]) => any =>
  typeof fn === 'function' || false;

export default isFunction;
