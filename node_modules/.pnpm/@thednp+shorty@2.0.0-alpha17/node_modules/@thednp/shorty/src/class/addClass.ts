/**
 * Add one or more CSS classes to `HTMLElement.classList`.
 *
 * @param element target
 * @param classNAME to add
 */
const addClass = (element: HTMLElement, ...classNAME: string[]): void => {
  element.classList.add(...classNAME);
};

export default addClass;
