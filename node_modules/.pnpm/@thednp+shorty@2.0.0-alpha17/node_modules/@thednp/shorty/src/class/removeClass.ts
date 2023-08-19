/**
 * Remove one or more classes from `HTMLElement.classList`.
 *
 * @param element target
 * @param classNAME to remove
 */
const removeClass = (element: HTMLElement, ...classNAME: string[]): void => {
  element.classList.remove(...classNAME);
};

export default removeClass;
