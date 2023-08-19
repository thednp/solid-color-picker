import getDocument from '../get/getDocument';
import ObjectAssign from './ObjectAssign';
import isString from '../is/isString';

/**
 * Shortie for `document.createElementNS` method
 * which allows you to create a new `HTMLElement` for a given `tagName`
 * or based on an object with specific non-readonly attributes with string values:
 * `id`, `className`, `textContent`, `style`, etc.
 * Note: some elements resulted from this function call may not be compatible with
 * some attributes.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
 *
 * @param ns `namespaceURI` to associate with the new `HTMLElement`
 * @param param `tagName` or object
 * @return a new `HTMLElement`
 */
const createElementNS = (
  ns: string,
  param?: string | Partial<HTMLElement>,
): HTMLElement | undefined => {
  if (!ns || !param) return undefined;

  if (isString(param)) {
    return getDocument().createElementNS(ns, param) as HTMLElement;
  }

  const { tagName } = param;
  const newElement = createElementNS(ns, tagName);

  if (!newElement) return undefined;

  const attr = { ...(param as Record<string, unknown>) };
  delete attr.tagName;

  return ObjectAssign(newElement, attr);
};

export default createElementNS;
