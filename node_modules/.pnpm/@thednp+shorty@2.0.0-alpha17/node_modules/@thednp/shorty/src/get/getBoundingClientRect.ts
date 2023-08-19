import isHTMLElement from '../is/isHTMLElement';
import type { BoundingClientRect } from '../interface/boundingClientRect';

/**
 * Returns the bounding client rect of a target `HTMLElement`.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param element event.target
 * @param includeScale when *true*, the target scale is also computed
 * @returns the bounding client rect object
 */
const getBoundingClientRect = (
  element: HTMLElement,
  includeScale?: boolean,
): BoundingClientRect => {
  const { width, height, top, right, bottom, left } = element.getBoundingClientRect();
  let scaleX = 1;
  let scaleY = 1;

  if (includeScale && isHTMLElement(element)) {
    const { offsetWidth, offsetHeight } = element;
    scaleX = offsetWidth > 0 ? Math.round(width) / offsetWidth : /* istanbul ignore next */ 1;
    scaleY = offsetHeight > 0 ? Math.round(height) / offsetHeight : /* istanbul ignore next */ 1;
  }

  return {
    width: width / scaleX,
    height: height / scaleY,
    top: top / scaleY,
    right: right / scaleX,
    bottom: bottom / scaleY,
    left: left / scaleX,
    x: left / scaleX,
    y: top / scaleY,
  };
};

export default getBoundingClientRect;
