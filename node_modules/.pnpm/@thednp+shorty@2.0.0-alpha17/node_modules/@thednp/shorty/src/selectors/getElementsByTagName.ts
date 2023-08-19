import getDocument from '../get/getDocument';
import isNode from '../is/isNode';

/**
 * Shortcut for `HTMLElement.getElementsByTagName` method. Some `Node` elements
 * like `ShadowRoot` do not support `getElementsByTagName`.
 *
 * @param selector the tag name
 * @param parent optional Element to look into
 * @return the 'HTMLCollection'
 */
const getElementsByTagName = (
  selector: string,
  parent?: ParentNode,
): HTMLCollectionOf<HTMLElement> => {
  const lookUp = isNode(parent) ? parent : getDocument();
  return (lookUp as Document).getElementsByTagName(selector) as HTMLCollectionOf<HTMLElement>;
};

export default getElementsByTagName;
