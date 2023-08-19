import type { OffsetRect } from '../interface/offsetRect';
import isScaledElement from '../is/isScaledElement';
import isHTMLElement from '../is/isHTMLElement';
import getBoundingClientRect from './getBoundingClientRect';

/**
 * Returns the rect relative to a given offset parent and its scroll position.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param element target
 * @param offsetParent the container / offset parent
 * @param scroll the offsetParent scroll position
 * @returns a DOMRect like object
 */
const getRectRelativeToOffsetParent = (
  element: HTMLElement,
  offsetParent: HTMLElement,
  scroll: { x: number; y: number },
): OffsetRect => {
  const isParentAnElement = isHTMLElement(offsetParent);
  const rect = getBoundingClientRect(element, isParentAnElement && isScaledElement(offsetParent));
  const offsets = { x: 0, y: 0 };

  /* istanbul ignore next */
  if (isParentAnElement) {
    const offsetRect = getBoundingClientRect(offsetParent, true);
    offsets.x = offsetRect.x + offsetParent.clientLeft;
    offsets.y = offsetRect.y + offsetParent.clientTop;
  }

  return {
    x: rect.left + scroll.x - offsets.x,
    y: rect.top + scroll.y - offsets.y,
    width: rect.width,
    height: rect.height,
  };
};

export default getRectRelativeToOffsetParent;
