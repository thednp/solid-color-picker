/**
 * Check class in `HTMLElement.classList`.
 *
 * @param element target
 * @param classNAME to check
 */
const hasClass = (element: HTMLElement, classNAME: string): boolean => {
  return element.classList.contains(classNAME);
};

export default hasClass;
