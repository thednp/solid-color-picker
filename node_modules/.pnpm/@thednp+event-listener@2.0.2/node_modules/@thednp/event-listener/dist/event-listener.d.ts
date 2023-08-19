/**
 * Advanced event listener based on subscribe / publish pattern.
 *
 * @see https://www.patterns.dev/posts/classic-design-patterns/#observerpatternjavascript
 * @see https://gist.github.com/shystruk/d16c0ee7ac7d194da9644e5d740c8338#file-subpub-js
 * @see https://hackernoon.com/do-you-still-register-window-event-listeners-in-each-component-react-in-example-31a4b1f6f1c8
 */
export type ListenerObject = Map<EventListener, AddEventListenerOptions | undefined | boolean>;
export type EventsRegistry = Record<string, Map<EventTarget, ListenerObject>>;
export declare const registry: EventsRegistry;
/**
 * The global event listener. This function must be a Function.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
 * eslint-ignore-next
 */
export declare const globalListener: (e: Event) => void;
/**
 * Register a new listener with its options and attach the `globalListener`
 * to the target if this is the first listener.
 */
export declare const addListener: (element: EventTarget, eventType: string, listener: EventListener, options?: AddEventListenerOptions) => void;
/**
 * Remove a listener from registry and detach the `globalListener`
 * if no listeners are found in the registry.
 *
 */
export declare const removeListener: (element: EventTarget, eventType: string, listener: EventListener, options?: AddEventListenerOptions) => void;
export declare const on: typeof addListener;
export declare const off: typeof removeListener;

export as namespace Listener;

export {};
