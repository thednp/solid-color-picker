/**
 * Shortcut for `Object.fromEntries()` static method.
 *
 * @param entries a target entries object
 * @returns a new Object created from the specified entries in array format [key, value][]
 * @see https://github.com/devinrhode2/ObjectTyped/blob/master/src/index.ts
 */
const ObjectFromEntries = <K extends string, V>(entries: [K, V][]) =>
  Object.fromEntries(entries) as Record<K, V>;

export default ObjectFromEntries;
