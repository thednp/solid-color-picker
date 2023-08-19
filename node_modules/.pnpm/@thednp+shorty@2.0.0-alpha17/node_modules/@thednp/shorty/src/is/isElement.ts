import isNode from './isNode';

/**
 * Checks if an object is an `Element`.
 *
 * @see https://dom.spec.whatwg.org/#node
 *
 * ```
 * ELEMENT_NODE = 1;
 * ATTRIBUTE_NODE = 2;
 * TEXT_NODE = 3;
 * CDATA_SECTION_NODE = 4;
 * ENTITY_REFERENCE_NODE = 5; // legacy
 * ENTITY_NODE = 6; // legacy
 * PROCESSING_INSTRUCTION_NODE = 7;
 * COMMENT_NODE = 8;
 * DOCUMENT_NODE = 9;
 * DOCUMENT_TYPE_NODE = 10;
 * DOCUMENT_FRAGMENT_NODE = 11;
 * ```
 * @param element the target object
 * @returns the query result
 */
const isElement = (element?: unknown): element is Element =>
  (isNode(element) && [1, 2, 3, 4, 5, 6, 7, 8].some(x => element.nodeType === x)) || false;

export default isElement;
