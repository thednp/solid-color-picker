/**
 * Shortcut for `Float32Array.from()` static method.
 *
 * @param arr array-like iterable object
 * @returns a new Float32Array
 */
const Float32ArrayFrom = (arr: ArrayLike<number> | Iterable<number>): Float32Array =>
  Float32Array.from(Array.from(arr));

export default Float32ArrayFrom;
