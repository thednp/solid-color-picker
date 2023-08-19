import isString from '../is/isString';
import getDocument from '../get/getDocument';
import ObjectAssign from './ObjectAssign';

/**
 * Shortie for `document.createElement` method
 * which allows you to create a new `HTMLElement` for a given `tagName`
 * or based on an object with specific non-readonly attributes with string values:
 * `id`, `className`, `textContent`, `style`, etc.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 *
 * @param param `tagName` or object
 * @return a new `HTMLElement`
 */
const createElement = (param?: string | Partial<HTMLElement>): HTMLElement | undefined => {
  if (!param) return undefined;

  if (isString(param)) {
    return getDocument().createElement(param);
  }

  const { tagName } = param;
  const newElement = createElement(tagName as string);

  if (!newElement) return undefined;

  const attr = { ...(param as Record<string, unknown>) };
  delete attr.tagName;

  return ObjectAssign(newElement, attr);
};

export default createElement;
