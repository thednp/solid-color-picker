import type { OriginalEvent } from '../interface/originalEvent';
import isObject from '../is/isObject';
import ObjectAssign from './ObjectAssign';

/**
 * Returns a namespaced `CustomEvent` specific to each component.
 *
 * @param eventType Event.type
 * @param config Event.options | Event.properties
 * @returns a new namespaced event
 */
const createCustomEvent = <T extends OriginalEvent>(
  eventType: string,
  config?: CustomEventInit<any>,
): T => {
  const OriginalCustomEvent = new CustomEvent<any>(eventType, {
    cancelable: true,
    bubbles: true,
  } as CustomEventInit<any>) as T;

  /* istanbul ignore else */
  if (isObject(config)) {
    ObjectAssign(OriginalCustomEvent, config);
  }
  return OriginalCustomEvent;
};

export default createCustomEvent;
