/**
 * Shortcut for `Float64Array.from()` static method.
 *
 * @param arr array-like iterable object
 * @returns a new Float64Array
 */
const Float64ArrayFrom = (arr: ArrayLike<number> | Iterable<number>): Float64Array =>
  Float64Array.from(Array.from(arr));

export default Float64ArrayFrom;
