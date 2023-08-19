import isNode from '../is/isNode';
import isWindow from '../is/isWindow';
import isDocument from '../is/isDocument';

/**
 * Returns the `document` or the `#document` element.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param node the reference node
 * @returns the parent document of the given node
 */
const getDocument = (node?: Node | Document | Window): Document => {
  // node instanceof Window
  if (isWindow(node)) return node.document;
  // node instanceof Document
  if (isDocument(node)) return node;
  // node instanceof Node
  if (isNode(node)) return node.ownerDocument as Document;
  // node is undefined | NULL
  return window.document;
};

export default getDocument;
