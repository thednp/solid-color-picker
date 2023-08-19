import getDocument from './getDocument';

/**
 * Returns the `document.body` or the `<body>` element.
 *
 * @param node the reference node
 * @returns the parent `<body>` of the specified node
 */
const getDocumentBody = (node?: Node | Document | Window): HTMLElement => {
  return getDocument(node).body;
};

export default getDocumentBody;
