/**
 * Overloads for Object.assign.
 *
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/object-assign/index.d.ts
 */
declare function ObjectAssignTyped<T, U>(target: T, source: U): T & U;
declare function ObjectAssignTyped<T, U, V>(target: T, source1: U, source2: V): T & U & V;
declare function ObjectAssignTyped<T, U, V, W>(
  target: T,
  source1: U,
  source2: V,
  source3: W,
): T & U & V & W;
declare function ObjectAssignTyped<T, U, V, W, Q>(
  target: T,
  source1: U,
  source2: V,
  source3: W,
  source4: Q,
): T & U & V & W & Q;
declare function ObjectAssignTyped<T, U, V, W, Q, R>(
  target: T,
  source1: U,
  source2: V,
  source3: W,
  source4: Q,
  source5: R,
): T & U & V & W & Q & R;
declare function ObjectAssignTyped(target: any, ...sources: any[]): any;

/**
 * Shortcut for `Object.assign()` static method.
 *
 * @param obj a target object
 * @param source source object(s)
 * @see https://github.com/devinrhode2/ObjectTyped/blob/master/src/index.ts
 */
const ObjectAssign: typeof ObjectAssignTyped = <A extends Record<string, any>, B>(
  obj: A,
  ...source: B[]
): B extends Record<string, any>[] ? any : A & B => Object.assign(obj, ...source);

export default ObjectAssign;
