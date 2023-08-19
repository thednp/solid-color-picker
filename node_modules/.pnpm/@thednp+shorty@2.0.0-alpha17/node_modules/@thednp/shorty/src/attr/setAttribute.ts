/**
 * Shortcut for `HTMLElement.setAttribute()` method.
 *
 * @param element target element
 * @param att attribute name
 * @param value attribute value
 */
const setAttribute = (element: HTMLElement, att: string, value: string) =>
  element.setAttribute(att, value);

export default setAttribute;
