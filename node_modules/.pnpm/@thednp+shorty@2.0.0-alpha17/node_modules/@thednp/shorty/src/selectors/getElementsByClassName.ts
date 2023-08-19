import getDocument from '../get/getDocument';
import isNode from '../is/isNode';

/**
 * Shortcut for `HTMLElement.getElementsByClassName` method. Some `Node` elements
 * like `ShadowRoot` do not support `getElementsByClassName`.
 *
 * @param selector the class name
 * @param parent optional Element to look into
 * @return the 'HTMLCollection'
 */
const getElementsByClassName = (
  selector: string,
  parent?: ParentNode,
): HTMLCollectionOf<HTMLElement> => {
  const lookUp = parent && isNode(parent) ? parent : getDocument();
  return (lookUp as HTMLElement | Document).getElementsByClassName(
    selector,
  ) as HTMLCollectionOf<HTMLElement>;
};

export default getElementsByClassName;
