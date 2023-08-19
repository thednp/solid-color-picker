import getDocument from './getDocument';

/**
 * Returns the `document.documentElement` or the `<HTML>` element.
 *
 * @param node the reference node
 * @returns the parent `<HTML>` of the node's parent document
 */
const getDocumentElement = (node?: Node | Document | Window): HTMLElement => {
  return getDocument(node).documentElement;
};

export default getDocumentElement;
