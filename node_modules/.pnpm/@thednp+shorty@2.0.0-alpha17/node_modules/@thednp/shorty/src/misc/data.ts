import isHTMLElement from '../is/isHTMLElement';

const componentData = new Map<string, Map<HTMLElement, any>>();

/**
 * An interface for web components background data.
 *
 * @see https://github.com/thednp/bootstrap.native/blob/master/src/components/base-component.js
 */
const Data = {
  data: componentData,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: <T>(element: HTMLElement, component: string, instance: T): void => {
    if (!isHTMLElement(element)) return;

    /* istanbul ignore else */
    if (!componentData.has(component)) {
      componentData.set(component, new Map<HTMLElement, T>());
    }

    const instanceMap = componentData.get(component) as Map<HTMLElement, T>;
    // not undefined, but defined right above
    instanceMap.set(element, instance);
  },

  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: <T>(component: string): Map<HTMLElement, T> | null => {
    const instanceMap = componentData.get(component) as Map<HTMLElement, T>;

    return instanceMap || null;
  },

  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: <T>(element: HTMLElement, component: string): T | null => {
    if (!isHTMLElement(element) || !component) return null;
    const instanceMap = Data.getAllFor<T>(component);
    // const instanceMap = componentData.get(component) as Map<HTMLElement, InstanceType<T>>;

    const instance = element && instanceMap && instanceMap.get(element);

    // return (instance as T) || null;
    return instance || null;
  },

  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: <T>(element: HTMLElement, component: string): void => {
    const instanceMap = Data.getAllFor<T>(component);
    // const instanceMap = componentData.get(component) as Map<HTMLElement, InstanceType<T>>;

    if (!instanceMap || !isHTMLElement(element)) return;

    instanceMap.delete(element);

    /* istanbul ignore else */
    if (instanceMap.size === 0) {
      componentData.delete(component);
    }
  },
};

export default Data;
