/**
 * Shortcut for `Object.keys()` static method.
 *
 * @param obj a target object
 * @returns an array with object keys
 * @see https://github.com/devinrhode2/ObjectTyped/blob/master/src/index.ts
 */
const ObjectKeys = <O extends Record<string, any>>(obj: O) => Object.keys(obj) as (keyof O)[];

export default ObjectKeys;
