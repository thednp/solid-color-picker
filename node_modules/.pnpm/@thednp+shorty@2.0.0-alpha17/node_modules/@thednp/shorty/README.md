# shorty

[![Coverage Status](https://coveralls.io/repos/github/thednp/shorty/badge.svg)](https://coveralls.io/github/thednp/shorty)
[![ci](https://github.com/thednp/shorty/actions/workflows/ci.yml/badge.svg)](https://github.com/thednp/shorty/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@thednp/shorty.svg)](https://www.npmjs.com/package/@thednp/shorty)
[![NPM Downloads](https://img.shields.io/npm/dm/@thednp/shorty.svg)](http://npm-stat.com/charts.html?package=@thednp/shorty)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hw/@thednp/shorty)](https://www.jsdelivr.com/package/npm/@thednp/shorty)
[![typescript version](https://img.shields.io/badge/typescript-5.1.6-brightgreen)](https://www.typescriptlang.org/)
[![eslint version](https://img.shields.io/badge/eslint-8.47.0-brightgreen)](https://github.com/eslint)
[![prettier version](https://img.shields.io/badge/prettier-2.8.8-brightgreen)](https://prettier.io/)
[![cypress version](https://img.shields.io/badge/cypress-12.17.4-brightgreen)](https://cypress.io/)
[![vite version](https://img.shields.io/badge/vite-4.4.9-brightgreen)](https://github.com/vitejs)


A small TypeScript library with various tools, all ESLint valid and featuring everything useful for creating light libraries or web components. If there is anything that is consistently repeating itself, **shorty** can help you save up to 50% of the code required, with little to no performance cost.

**shorty** is featured in [ColorPicker](https://github.com/thednp/color-picker), [KUTE.js](https://github.com/thednp/kute.js), [BSN](https://github.com/thednp/bootstrap.native), [Navbar.js](https://github.com/thednp/navbar.js) and other libraries.

- The purpose of the library is to speed up the development workflow, minimize the size of larger libraries by providing a shorter syntax for most used JavaScript API methods, most used strings or other helpful utilities.
- Another excellent use for the library is for its selectors in a testing environment where you need to check the `instanceof` for various objects.
- While the library comes with a working build in the `dist` folder, that is mainly for build consistency testing. You can make use of "tree shaking" to import one or anything your code needs.
- On that note, all shorties are organized in folders inside the `src` root folder, the structure is key to understanding the purpose of each type of shortie, whether we have `boolean` for various basic browser detection or browser feature support, `attr` for all things _Element_ attributes or `strings` for most common and most used _Element.prototype_ methods.

# npm

```
npm install @thednp/shorty
```

# TypeScript / ES6+ Base usage

```js
// import the tool you need
import { supportTransform } from "@thednp/shorty";

// use the tool in your ES6/ES7 sources
if (supportTransform) {
  // have modern browsers do something about that
}
```

# attr

- **_getAttribute_** - returns the value of a specified _Element_ attribute;
- **_getAttributeNS_** - returns the value of a specified namespaced _Element_ attribute (eg: namespaced SVG attributes);
- **_hasAttribute_** - check if element has a specified attribute;
- **_hasAttributeNS_** - check if element has a specified namespaced attribute;
- **_removeAttribute_** - removes a specified attribute from an element;
- **_removeAttributeNS_** - removes a specified namespaced attribute from an element;
- **_setAttribute_** - set a new attribute value for a given element;
- **_setAttributeNS_** - set a new namespaced attribute value for a given element;

```js
// EXAMPLES
import { getAttribute, hasAttribute, setAttribute } from "@thednp/shorty";

// check target has certain attribute
if (!hasAttribute(myTarget, "attribute-name")) {
  setAttribute(myTarget, "attribute-name", "new-value");
}

// get attribute value
const currentAttrValue = getAttribute(myTarget, "attribute-name");
```

# blocks

- **_documentBody_** - a shortie for `document.body`;
- **_documentElement_** - a shortie for `document.documentElement`;
- **_documentHead_** - a shortie for `document.head`;

# boolean

- **_isApple_** - checks and preserves a `boolean` value for the client browser is either Apple **Safari** browser or not;
- **_isFirefox_** - checks and preserves a `boolean` value for the client browser is either **Firefox** or not;
- **_isMobile_** - checks and preserves a `boolean` value for the client browser is either a Mobile device or not;
- **_support3DTransform_** - checks and preserves a `boolean` value for the client browser capability for webKit `perspective`;
- **_supportTouch_** - checks and preserves a `boolean` value for the client browser capability for `touch` events;
- **_supportPassive_** - checks and preserves a `boolean` value for the client browser capability for `passive` event option;
- **_supportTransform_** - checks and preserves a `boolean` value for the client browser capability for webKit `transform`;
- **_supportAnimation_** - checks and preserves a `boolean` value for the client browser capability for webKit keyframe `animation`;
- **_supportTransition_** - checks and preserves a `boolean` value for the client browser capability for webKit `transition`;

```js
// EXAMPLES
import { support3DTransform } from "@thednp/shorty";

// filter myAction to supported browsers
if (support3DTransform) {
  // do something with modern browsers
}
```

# class

- **_addClass_** - add a class to a target _Element_;
- **_removeClass_** - remove a class from a target _Element_;
- **_hasClass_** - checks the existence of a class for a target _Element_;

```js
// EXAMPLES
import { addClass, removeClass, hasClass } from "@thednp/shorty";

// add a class
addClass(targetElement, "className");

// remove a class
removeClass(targetElement, "className");

// check for a class
if (hasClass(targetElement, "className")) {
  // do something about that
}
```

# event

- **_on_** - attach an event listener to a specific target _Element_;
- **_off_** - detach an event listener from a specific target _Element_;
- **_one_** - attach an event listener to a specific target _Element_, and detach when complete;

```js
// EXAMPLES
import { on, off, one, passiveHandler } from "@thednp/shorty";

// attach a passive mousedown eventHandler
on(targetElement, "click", eventHandler, passiveHandler);

// detach a passive mouseup eventHandler
off(targetElement, "mouseup", eventHandler, passiveHandler);

// attach a single instance passive touchstart eventHandler
one(targetElement, "touchstart", eventHandler, passiveHandler);
```

For a more advanced method to handle event listeners, I recommend using the [event-listener](github.com/thednp/event-listener).

# get

- **_getBoundingClientRect_** - returns the bounding client rectangle of a given _Element_;
- **_getDocument_** - returns the containing `#Document` for a given _Element_ or just any _Document_, useful when working with *iframe*s;
- **_getDocumentBody_** - returns the containing `<body>` for a given _Element_ or just any;
- **_getDocumentElement_** - returns the containing `<html>` for a given _Element_ or just any;
- **_getDocumentHead_** - returns the containing `<head>` for a given _Element_ or just any;
- **_getElementAnimationDelay_** - returns the `animationDelay` property of an `animation` property;
- **_getElementAnimationDuration_** - returns the `animationDuration` property of a `animation` property;
- **_getElementTransitionDelay_** - returns the `transitionDelay` property of a `transition` property;
- **_getElementTransitionDuration_** - returns the `transitionDuration` property of a `transition` property;
- **_getElementStyle_** - returns the _Element_ computed style for a given property;
- **_getNodeScroll_** - returns the _Element_ / _Window_ current `{ x, y }` scroll position;
- **_getParentNode_** - returns parent of a given _Element_;
- **_getRectRelativeToOffsetParent_** - returns the bounding client rectangle of a given _Element_ relative to a given `offsetParent`;
- **_getUID_** - a nice utility that creates a unique ID for a given _Element_ and returns it;
- **_getWindow_** - returns the containing `Window` for a given _Element_ or just any _Window_;

```js
// EXAMPLES
import { getElementAnimationDuration } from "@thednp/shorty";

// store the transition duration for target element on a modern browser
const duration = getElementAnimationDuration(target);
```

# is

- **_isArray_** - check if a given value is an `Array`;
- **_isCanvas_** - check if a given value is a `HTMLCanvasElement` instance;
- **_isCustomElement_** - check if a given value is a `CustomElement` instance;
- **_isDocument_** - check if a given value is a `Document` instance;
- **_isElement_** - check if a given value is an `Element` instance;
- **_isElementInScrollRange_** - check if a given `Element` is partially visible in the viewport;
- **_isElementInViewport_** - check if a given `Element` is fully visible in the viewport;
- **_isElementsArray_** - check if a given value is an `Array` with `Element` instances;
- **_isFunction_** - check if a given value is a `Function` instance;
- **_isHTMLCollection_** - check if a given value is an `HTMLCollection` instance;
- **_isHTMLElement_** - check if a given value is an `HTMLElement` instance;
- **_isHTMLImageElement_** - check if a given value is an `HTMLImageElement` instance;
- **_isMedia_** - check if a given value is an `SVGElement`, `HTMLImageElement`, `HTMLCanvasElement` or `HTMLVideoElement` instance;
- **_isNode_** - check if a given value is a `Node` instance;
- **_isNodeList_** - check if a given value is a `NodeList` instance;
- **_isNumber_** - check if a given value is string;
- **_isRTL_** - check if a given node is contained in a `<html dir="rtl">`;
- **_isScaledElement_** - check if a given _Element_ is affected by scale;
- **_isShadowRoot_** - check if a given _Node_ is a `ShadowRoot` instance;
- **_isString_** - check if a given value is string;
- **_isSVGElement_** - check if a given value is `SVGElement` instance;
- **_isTableElement_** - check if a given value is `<table>`, `<td>` or `<th>` _Element_;
- **_isWindow_** - check if a given value is a `Window` instance;

```js
// EXAMPLES
import { isArray, isHTMLElement, isElementsArray } from "@thednp/shorty";

// check if a value is an `Array` of `Element` instances
if (isArray(myValue) && myValue.every(isHTMLElement)) {
  // do something with these instances
}

// or use the dedicated shortie of the above
if (isElementsArray(myValue)) {
  // do something with these instances
}
```

# misc

- **_ArrayFrom_** - a shortie for `Array.from()` method;
- **_Data_** - a small utility to store web components data that makes use of the native `Map`;
- **_dispatchEvent_** - a shortie for `Element.dispatchEvent()` method;
- **_distinct_** - a shortie you can use to filter duplicate values in an `Array`;
- **_emulateAnimationEnd_** - utility to execute a callback function when `animationend` event is triggered, or execute the callback right after for legacy browsers;
- **_emulateAnimationEndLegacy_** - for legacy browsers;
- **_emulateTransitionEnd_** - utility to execute a callback function when `transitionend` event is triggered, or execute the callback right after for legacy browsers;
- **_emulateTransitionEndLegacy_** - for legacy browsers;
- **_Float32ArrayFrom_** - a shortie for `Float32Array.from()` method;
- **_Float64ArrayFrom_** - a shortie for `Float64Array.from()` method;
- **_focus_** - a shortie for `Element.focus()` method;
- **_noop_** - is your regular `() => {}` NOOP;
- **_normalizeOptions_** - a cool utility to normalize and crosscheck JavaScript options and their DATA API counterparts for various web components; supports namespaced options like `data-NAMESPACE-option="value"`; priority: JavaScript options > DATA API options > default options
- **_ObjectAssign_** - a shortie for `Object.assign()` method;
- **_ObjectEntries_** - a shortie for `Object.entries()` method;
- **_ObjectHasOwn_** - a shortie for `Object.hasOwn()` method;
- **_ObjectKeys_** - a shortie for `Object.keys()` method;
- **_ObjectValues_** - a shortie for `Object.values()` method;
- **_OriginalEvent_** - a small utility that returns a synthetic `CustomEvent` with the added `relatedTarget` and other properties;
- **_passiveHandler_** - a constant that preserves a standard listener `options` with `passive: true` event option used;
- **_passiveHandlerLegacy_** - for legacy browsers;
- **_reflow_** - a small utility that force repaint of a given _Element_ by "checking" its `offsetHeight` value, also because using just `element.offsetHeight;` won't validate on ESLint;
- **_setElementStyle_** - a small utility that allows you to set multiple CSS properties at once for a given _Element_ target;
- **_Timer_** - a small but powerful utility that makes `setTimeout` have a meaning;
- **_toLowerCase_** - a shortie for `String.toLowerCase()` method;
- **_toUpperCase_** - a shortie for `String.toUpperCase()` method;

The **_Data_** and **_Timer_** utilities have their own specifics, you might want to check the [wiki](https://github.com/thednp/shorty/wiki).

```js
// EXAMPLES
import { emulateTransitionEnd, distinct } from "@thednp/shorty";

// execute a callback when transitionend is triggered for the target
emulateTransitionEnd(targetElement, callback);

// define some arrays of numbers
const array1 = [0, 1, 3, 5, 7, 9];
const array2 = [0, 2, 4, 6, 8, 10];

// merge them and filter them to make sure we have distinct values
const array3 = [...array1, ...array2].filter(distinct);
// [0, 1, 3, 5, 7, 9, 2, 4, 6, 8, 10]
```

# selectors

- **_closest_** - a shortie for `Element.closest()` method;
- **_getCustomElements_** - returns an `Array` with all registered `CustomElement`;
- **_getElementById_** - a shortie for `document.getElementById()` method;
- **_getElementsByClassName_** - a shortie for `Element.getElementsByClassName()` method;
- **_getElementsByTagName_** - a shortie for `Element.getElementsByTagName()` method;
- **_matches_** - a shortie for `Element.matches()` method;
- **_matchesLegacy_** - for legacy browsers;
- **_querySelector_** - a simple utility to check if a given value is an _Element_ or a selector string, and if a selector string find the FIRST _Element_ and return it;
- **_querySelectorAll_** - a simple utility to check if a certain item is an _Element_ or a selector string, and if a selector string find the FIRST _Element_ and return it;

```js
// EXAMPLES
import { querySelector, querySelectorAll, documentAll, matches } from "@thednp/shorty";

// get first element that matches a certain selector
const element = querySelector(".my-class-name");

// get all elements that matches same selector
const elements = querySelectorAll(".my-class-name");

// now do the same as the above, but differently
const elements = [...documentAll].filter((x) => matches(x, ".my-class-name"));
```

# strings

- **_bezierEasings_** - an _Object_ comprised or a set of valid CSS `transition-timing-function` based on Cubic Bezier; EG: `cubic-bezier(0.215,0.61,0.355,1)` for `bezierEasings.easingCubicOut`;
- **_mouseSwipeEvents_** - preserves the pointer events from mouse actions: start: `mousedown`, end: `mouseup`, move: `mousemove`, cancel: `mouseout`;
- **_mouseClickEvents_** - preserves the pointer events from mouse actions: down: `mousedown`, up: `mouseup`;
- **_mouseHoverEvents_** - preserve browser specific mouse hover events: `mouseenter` and `mouseleave` OR `mouseover` and `mouseout`;
- **_touchEvents_** - preserves the pointer events from touch actions: start: `touchstart`, end: `touchend`, move: `touchmove`, cancel: `touchcancel`;
- **_animationDuration_** - preserves the `animationDuration` property for modern browsers;
- **_animationDelay_** - preserves the `animationDelay` property for modern browsers;
- **_animationEndEvent_** - preserves the `animationEndEvent` event for modern browsers;
- **_animationName_** - preserves the `animationName` property name for modern browsers;
- **_transitionDuration_** - preserves the `transitionDuration` property name for modern browsers;
- **_transitionDelay_** - preserves the `transitionDelay` property name for modern browsers;
- **_transitionEndEvent_** - preserves the `transitionend` event name for modern browsers;
- **_transitionProperty_** - preserves the `transitionProperty` property name for modern browsers;
- **_addEventListener_** - preserves the `addEventListener` method name;
- **_removeEventListener_** - preserves the `removeEventListener` method name;

There are lots more string constants available which include native event names, browser strings, keyboard key codes or ARIA specific attribute names. Be sure to check the `src/strings` folder for a complete list.

```js
// EXAMPLES
import { on, off, one, mouseClickEvents, touchEvents, passiveHandler } from "@thednp/shorty";

// attach a passive mousedown eventHandler
on(targetElement, mouseClickEvents.down, eventHandler, passiveHandler);

// detach a passive mousedown eventHandler
off(targetElement, mouseClickEvents.down, eventHandler, passiveHandler);

// attach a single instance passive touchstart eventHandler
one(targetElement, touchEvents.start, eventHandler, passiveHandler);
```

# Advanced Use

Here's a simple example to showcase the benefit of using **_shorty_**.

```js
// This is your typical day to day scripting
const target = document.getElementById("my-element");

target.addEventListener("click", function (e) {
  target.classList.add("my-className");
});
```

Now make it all shorty. You might want to import shorties directly from their location, something we like to call "tree shaking".

```js
// Example
import on from "@thednp/shorty/src/event/on";
import addClass from "@thednp/shorty/src/class/addClass";
import getElementById from "@thednp/shorty/src/selectors/getElementById";
import mouseclickEvent from "@thednp/shorty/src/strings/mouseclickEvent";

const target = getElementById("my-element");

on(target, mouseclickEvent, function (e) {
  addClass(target, "my-className");
});
```

# License

**shorty** is released under the [MIT License](https://github.com/thednp/shorty/blob/master/LICENSE)
