/**
 * Remove eventListener from an `EventTarget` object.
 */
const off = (
  element: EventTarget,
  eventName: string,
  listener: EventListener,
  options?: AddEventListenerOptions,
) => {
  const ops = options || false;
  element.removeEventListener(eventName, listener, ops);
};

export default off;
