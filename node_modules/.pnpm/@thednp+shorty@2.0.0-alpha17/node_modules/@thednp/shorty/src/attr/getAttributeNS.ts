/**
 * Shortcut for `HTMLElement.getAttributeNS()` method.
 *
 * @param ns attribute namespace
 * @param element target element
 * @param att attribute name
 * @returns attribute value
 */
const getAttributeNS = (ns: string, element: HTMLElement, att: string) =>
  element.getAttributeNS(ns, att);

export default getAttributeNS;
