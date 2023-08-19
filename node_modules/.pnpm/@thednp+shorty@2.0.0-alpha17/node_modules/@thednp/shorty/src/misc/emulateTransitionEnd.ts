import transitionEndEvent from '../strings/transitionEndEvent';
import getElementTransitionDelay from '../get/getElementTransitionDelay';
import getElementTransitionDuration from '../get/getElementTransitionDuration';
import dispatchEvent from './dispatchEvent';

/**
 * Utility to make sure callbacks are consistently
 * called when transition ends.
 *
 * @param element event target
 * @param handler `transitionend` callback
 */
const emulateTransitionEnd = (element: HTMLElement, handler: EventListener): void => {
  let called = 0;
  const endEvent = new Event(transitionEndEvent);
  const duration = getElementTransitionDuration(element);
  const delay = getElementTransitionDelay(element);

  if (duration) {
    /** Wrap the handler in on -> off callback */
    const transitionEndWrapper = (e: Event): void => {
      /* istanbul ignore else */
      if (e.target === element) {
        handler.apply(element, [e]);
        element.removeEventListener(transitionEndEvent, transitionEndWrapper);
        called = 1;
      }
    };
    element.addEventListener(transitionEndEvent, transitionEndWrapper);
    setTimeout(() => {
      /* istanbul ignore next */
      if (!called) dispatchEvent(element, endEvent);
    }, duration + delay + 17);
  } else {
    handler.apply(element, [endEvent]);
  }
};

export default emulateTransitionEnd;
