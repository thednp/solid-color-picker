/**
 * Utility to force re-paint of an `HTMLElement` target.
 *
 * @param element is the target
 * @return the `Element.offsetHeight` value
 */
const reflow = (element: HTMLElement): number => element.offsetHeight;

export default reflow;
