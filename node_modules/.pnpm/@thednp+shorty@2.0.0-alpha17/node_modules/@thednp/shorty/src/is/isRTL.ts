import getDocumentElement from '../get/getDocumentElement';

/**
 * Checks if a page is Right To Left.
 *
 * @param node the target
 * @returns the query result
 */
const isRTL = (node?: Node): boolean => getDocumentElement(node).dir === 'rtl';

export default isRTL;
