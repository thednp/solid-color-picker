import nonColors from './nonColors';

/**
 * Check if a text is a valid CSS non-color value.
 */
const isNonColor = <T extends string>(str: T): boolean => {
  return (nonColors as T[]).includes(str);
};

export default isNonColor;
