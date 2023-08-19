import isNode from './isNode';

/**
 * Checks if an element is an `HTMLCanvasElement` or `<canvas>`.
 *
 * @param element the target element
 * @returns the query result
 */

const isCanvas = (element?: unknown): element is HTMLCanvasElement =>
  (isNode(element) && element.nodeName === 'CANVAS') || false;

export default isCanvas;
