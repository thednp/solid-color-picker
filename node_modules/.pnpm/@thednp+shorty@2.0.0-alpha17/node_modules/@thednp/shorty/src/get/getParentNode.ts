import getDocumentElement from './getDocumentElement';
import isShadowRoot from '../is/isShadowRoot';
import isHTMLElement from '../is/isHTMLElement';
import isNode from '../is/isNode';

/**
 * Returns the `parentNode` also going through `ShadowRoot`.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {Node} node the target node
 * @returns {Node} the apropriate parent node
 */
const getParentNode = (node: Node): Node | ParentNode => {
  if (node.nodeName === 'HTML') {
    return node;
  }

  // this is a quicker (but less type safe) way to save quite some bytes from the bundle
  return (
    (isHTMLElement(node) && node.assignedSlot) || // step into the shadow DOM of the parent of a slotted node
    (isNode(node) && node.parentNode) || // DOM Element detected
    (isShadowRoot(node) && node.host) || // ShadowRoot detected
    getDocumentElement(node) // fallback to <HTML>
  );
};

export default getParentNode;
