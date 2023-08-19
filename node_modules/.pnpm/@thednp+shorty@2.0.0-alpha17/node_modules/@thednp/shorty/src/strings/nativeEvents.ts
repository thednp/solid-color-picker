import abort from './abortEvent';
import beforeunload from './beforeunloadEvent';
import blur from './blurEvent';
import change from './changeEvent';
import contextmenu from './contextmenuEvent';
import DOMContentLoaded from './DOMContentLoadedEvent';
import DOMMouseScroll from './DOMMouseScrollEvent';
import error from './errorEvent';
import focus from './focusEvent';
import focusin from './focusinEvent';
import focusout from './focusoutEvent';
import gesturechange from './gesturechangeEvent';
import gestureend from './gestureendEvent';
import gesturestart from './gesturestartEvent';
import keydown from './keydownEvent';
import keypress from './keypressEvent';
import keyup from './keyupEvent';
import load from './loadEvent';
import click from './mouseclickEvent';
import dblclick from './mousedblclickEvent';
import mousedown from './mousedownEvent';
import mouseup from './mouseupEvent';
import hover from './mousehoverEvent';
import mouseenter from './mouseenterEvent';
import mouseleave from './mouseleaveEvent';
import mousein from './mouseinEvent';
import mouseout from './mouseoutEvent';
import mouseover from './mouseoverEvent';
import mousemove from './mousemoveEvent';
import mousewheel from './mousewheelEvent';
import move from './moveEvent';
import orientationchange from './orientationchangeEvent';
import pointercancel from './pointercancelEvent';
import pointerdown from './pointerdownEvent';
import pointerleave from './pointerleaveEvent';
import pointermove from './pointermoveEvent';
import pointerup from './pointerupEvent';
import readystatechange from './readystatechangeEvent';
import reset from './resetEvent';
import resize from './resizeEvent';
import select from './selectEvent';
import selectend from './selectendEvent';
import selectstart from './selectstartEvent';
import scroll from './scrollEvent';
import submit from './submitEvent';
import touchstart from './touchstartEvent';
import touchmove from './touchmoveEvent';
import touchcancel from './touchcancelEvent';
import touchend from './touchendEvent';
import unload from './unloadEvent';

/**
 * A global namespace for all browser native events.
 */
const nativeEvents = {
  DOMContentLoaded,
  DOMMouseScroll,
  abort,
  beforeunload,
  blur,
  change,
  click,
  contextmenu,
  dblclick,
  error,
  focus,
  focusin,
  focusout,
  gesturechange,
  gestureend,
  gesturestart,
  hover,
  keydown,
  keypress,
  keyup,
  load,
  mousedown,
  mousemove,
  mousein,
  mouseout,
  mouseenter,
  mouseleave,
  mouseover,
  mouseup,
  mousewheel,
  move,
  orientationchange,
  pointercancel,
  pointerdown,
  pointerleave,
  pointermove,
  pointerup,
  readystatechange,
  reset,
  resize,
  scroll,
  select,
  selectend,
  selectstart,
  submit,
  touchcancel,
  touchend,
  touchmove,
  touchstart,
  unload,
};

export default nativeEvents;
