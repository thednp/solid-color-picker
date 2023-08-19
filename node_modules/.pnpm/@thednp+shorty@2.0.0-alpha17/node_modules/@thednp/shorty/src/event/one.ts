import on from './on';
import off from './off';

/**
 * Add an `eventListener` to an `EventTarget`
 * element and remove it once callback is called.
 */
const one = (
  element: EventTarget,
  eventName: string,
  listener: EventListener,
  options?: AddEventListenerOptions,
) => {
  /** Wrap the listener for easy on -> off */
  const handlerWrapper = (e: Event): void => {
    /* istanbul ignore else */
    if (e.target === element || e.currentTarget === element) {
      listener.apply(element, [e]);
      off(element, eventName, handlerWrapper, options);
    }
  };
  on(element, eventName, handlerWrapper, options);
};

export default one;
