/**
 * Check if a value is an instance of an RGB(a)/HSL(a)/HSV(a)/HWB(a) instance.
 */
const isColorType = <T extends object>( // RGBALike | HSLALike | HSVALike | HWBALike
  obj: unknown,
  inst: T,
): obj is T => {
  return obj !== null && typeof obj === 'object' && Object.keys(inst).every(c => c in obj);
};

export default isColorType;
