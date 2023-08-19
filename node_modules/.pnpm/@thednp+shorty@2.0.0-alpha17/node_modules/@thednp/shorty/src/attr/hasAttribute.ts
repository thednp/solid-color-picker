/**
 * Shortcut for `HTMLElement.hasAttribute()` method.
 *
 * @param element target element
 * @param att attribute name
 * @returns the query result
 */
const hasAttribute = (element: HTMLElement, att: string): boolean => element.hasAttribute(att);

export default hasAttribute;
