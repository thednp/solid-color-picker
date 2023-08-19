import Data from './data';

/**
 * An alias for `Data.get()`.
 */
const getInstance = <T>(target: HTMLElement, component: string): T | null =>
  Data.get(target, component);

export default getInstance;
