import DOMContentLoadedEvent from '../strings/DOMContentLoadedEvent';
import one from '../event/one';
import noop from '../misc/noop';

/**
 * A global `boolean` for passive events support,
 * in general event options are not suited for scroll prevention.
 *
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 */
const supportPassive = (() => {
  let result = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: () => {
        result = true;
        return result;
      },
    });
    /* istanbul ignore next */
    one(document, DOMContentLoadedEvent, noop, opts);
  } catch (e) {
    // throw Error('Passive events are not supported');
  }

  return result;
})();

export default supportPassive;
