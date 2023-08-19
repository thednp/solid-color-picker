import getDocument from '../get/getDocument';
import isNode from '../is/isNode';
import isHTMLElement from '../is/isHTMLElement';

/**
 * Utility to check if target is typeof `HTMLElement`, `Element`, `Node`
 * or find one that matches a selector.
 *
 * @param selector the input selector or target element
 * @param parent optional node to look into
 * @return the `HTMLElement` or `querySelector` result
 */
const querySelector = (selector: HTMLElement | string, parent?: ParentNode): HTMLElement | null => {
  if (isHTMLElement(selector)) {
    return selector;
  }
  const lookUp = isNode(parent) ? parent : getDocument();

  return lookUp.querySelector(selector);
};

export default querySelector;
