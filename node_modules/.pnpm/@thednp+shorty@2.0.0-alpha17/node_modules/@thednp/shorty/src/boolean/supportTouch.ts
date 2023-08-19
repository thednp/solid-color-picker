/**
 * A global `boolean` for touch events support.
 */
const supportTouch =
  'ontouchstart' in window || /* istanbul ignore next */ 'msMaxTouchPoints' in navigator;

export default supportTouch;
