import isNode from './isNode';

/**
 * Check if target is a `ShadowRoot`.
 *
 * @param element target
 * @returns the query result
 */
const isShadowRoot = (element?: unknown): element is ShadowRoot =>
  (isNode(element) && element.constructor.name === 'ShadowRoot') || false;

export default isShadowRoot;
