import isHTMLElement from './isHTMLElement';
import type { CustomElement } from '../interface/customElement';

/**
 * Checks if an object is a `CustomElement`.
 *
 * @param element the target object
 * @returns the query result
 */
const isCustomElement = <T extends CustomElement>(element?: unknown): element is T =>
  (isHTMLElement(element) && !!(element as T).shadowRoot) || false;

export default isCustomElement;
