/**
 * Shortcut for `Object.entries()` static method.
 *
 * @param obj a target object
 * @returns the entries of an object in an array format [key, value][]
 * @see https://github.com/devinrhode2/ObjectTyped/blob/master/src/index.ts
 */
const ObjectEntries = <O extends Record<string, any>>(obj: O) =>
  Object.entries(obj) as [keyof O, O[keyof O]][];

export default ObjectEntries;
