/**
 * Shortie for `typeof SOMETHING === "number"`.
 *
 * @param num input value
 * @returns the query result
 */
const isNumber = (num?: unknown): num is number => typeof num === 'number' || false;

export default isNumber;
