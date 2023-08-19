import getDocument from './getDocument';
/**
 * Returns the `document.head` or the `<head>` element.
 *
 * @param node the reference node
 * @returns the `<head>` of the node's parent document
 */
const getDocumentHead = (node?: Node | Document | Window): HTMLElement & HTMLHeadElement => {
  return getDocument(node).head;
};

export default getDocumentHead;
