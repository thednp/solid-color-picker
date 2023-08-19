import isHTMLElement from './isHTMLElement';
import getBoundingClientRect from '../get/getBoundingClientRect';

/**
 * Checks if a target `HTMLElement` is affected by scale.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param element target
 * @returns the query result
 */
const isScaledElement = (element?: HTMLElement): boolean => {
  if (!isHTMLElement(element)) return false;
  const { width, height } = getBoundingClientRect(element);
  const { offsetWidth, offsetHeight } = element;
  return Math.round(width) !== offsetWidth || Math.round(height) !== offsetHeight;
};

export default isScaledElement;
