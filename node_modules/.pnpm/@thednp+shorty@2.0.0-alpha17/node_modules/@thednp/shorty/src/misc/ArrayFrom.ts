/**
 * Shortie for `Array.from()` static method.
 * The utility should also work with any typed arrays
 * like Float64Array or Int32Array.
 *
 * @param arr array-like iterable object
 * @returns a new array from iterable object
 */
const ArrayFrom = <T>(arr: ArrayLike<T> | Iterable<T>): T[] => Array.from(arr);

export default ArrayFrom;
