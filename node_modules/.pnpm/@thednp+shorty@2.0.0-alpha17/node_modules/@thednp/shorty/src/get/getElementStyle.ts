// import CSS4Declaration from "../interface/css4Declaration";

/**
 * Shortcut for `window.getComputedStyle(element).propertyName`
 * static method.
 *
 * * If `element` parameter is not an `HTMLElement`, `getComputedStyle`
 * throws a `ReferenceError`.
 *
 * @param element target
 * @param property the css property
 * @return the css property value
 */
const getElementStyle = (element: HTMLElement, property: string): string => {
  const computedStyle = getComputedStyle(element);
  const prop = property
    .replace('webkit', 'Webkit')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase();

  // modern browsers only
  return computedStyle.getPropertyValue(prop);
};

export default getElementStyle;
