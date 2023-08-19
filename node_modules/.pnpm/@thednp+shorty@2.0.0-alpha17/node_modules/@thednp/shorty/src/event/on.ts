/**
 * Add eventListener to an `EventTarget` object.
 */
const on = (
  element: EventTarget,
  eventName: string,
  listener: EventListener,
  options?: AddEventListenerOptions,
) => {
  const ops = options || false;
  element.addEventListener(eventName, listener, ops);
};

export default on;
