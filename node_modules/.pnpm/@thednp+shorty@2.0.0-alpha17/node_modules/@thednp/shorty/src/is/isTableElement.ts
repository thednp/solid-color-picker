import isNode from './isNode';

/**
 * Check if a target element is a `<table>`, `<td>` or `<th>`.
 * This specific check is important for determining
 * the `offsetParent` of a given element.
 *
 * @param element the target element
 * @returns the query result
 */
const isTableElement = (element?: unknown): element is HTMLTableElement | HTMLTableCellElement =>
  (isNode(element) && ['TABLE', 'TD', 'TH'].includes(element.nodeName)) || false;

export default isTableElement;
