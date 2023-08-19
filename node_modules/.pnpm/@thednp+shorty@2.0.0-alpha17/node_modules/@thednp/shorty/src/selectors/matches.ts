/**
 * Check if element matches a CSS selector.
 *
 * @param target the target element
 * @param selector the selector to match
 * @returns the query result
 */
const matches = (target: Element, selector: string): boolean => target.matches(selector);

export default matches;
