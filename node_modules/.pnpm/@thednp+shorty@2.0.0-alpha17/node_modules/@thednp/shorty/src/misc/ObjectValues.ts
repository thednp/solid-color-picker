/**
 * Shortcut for `Object.values()` static method.
 *
 * @param obj a target object
 * @returns an array with the object values
 * @see https://github.com/devinrhode2/ObjectTyped/blob/master/src/index.ts
 */
const ObjectValues = <O extends Record<string, unknown>>(obj: O): O[keyof O][] =>
  Object.values(obj) as O[keyof O][];

export default ObjectValues;
