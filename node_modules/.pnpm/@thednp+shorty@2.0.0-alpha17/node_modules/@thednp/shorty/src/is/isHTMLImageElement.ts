import isHTMLElement from './isHTMLElement';

/**
 * Check if a target element is an `<img>`.
 *
 * @param element the target element
 * @returns the query result
 */
const isHTMLImageElement = (element?: unknown): element is HTMLImageElement =>
  (isHTMLElement(element) && element.tagName === 'IMG') || false;

export default isHTMLImageElement;
