/**
 * Shortie for `HTMLElement.focus()` method.
 *
 * @param element is the target
 * @param options allows to pass additional options such as `preventScroll: boolean`
 */
const focus = (element: HTMLOrSVGElement, options?: FocusOptions): void => element.focus(options);

export default focus;
