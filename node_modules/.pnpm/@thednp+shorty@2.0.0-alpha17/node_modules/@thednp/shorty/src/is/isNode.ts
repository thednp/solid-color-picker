import isObject from './isObject';

type NodeObject = object & { nodeType: number };

/**
 * Checks if an object is a `Node`.
 *
 * @param node the target object
 * @returns the query result
 */
const isNode = (node?: unknown): node is Node =>
  (isObject(node) &&
    typeof (node as NodeObject).nodeType === 'number' &&
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(x => (node as NodeObject).nodeType === x)) ||
  false;

export default isNode;
