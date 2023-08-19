import getBoundingClientRect from '../get/getBoundingClientRect';
import getDocumentElement from '../get/getDocumentElement';
import isNode from './isNode';

/**
 * Utility to determine if an `HTMLElement`
 * is partially visible in viewport.
 *
 * @param element target
 * @return the query result
 */
const isElementInScrollRange = (element?: HTMLElement): boolean => {
  if (!isNode(element)) return false;

  const { top, bottom } = getBoundingClientRect(element);
  const { clientHeight } = getDocumentElement(element);
  return top <= clientHeight && bottom >= 0;
};

export default isElementInScrollRange;
