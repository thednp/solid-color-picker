import getAttribute from '../attr/getAttribute';
import normalizeValue from './normalizeValue';
import ObjectEntries from './ObjectEntries';
import toLowerCase from './toLowerCase';
// import { optionValues } from '../types';

/**
 * Utility to normalize component options.
 *
 * @param element target
 * @param defaultOps component default options
 * @param inputOps component instance options
 * @param ns component namespace
 * @return normalized component options object
 */
const normalizeOptions = <T extends { [key: string]: any }>(
  element: HTMLElement,
  defaultOps: T,
  inputOps: Partial<T>,
  ns?: string,
): T => {
  const INPUT = { ...inputOps };
  const data = { ...element.dataset };
  const normalOps = { ...defaultOps };
  const dataOps: Partial<T> = {};
  const title = 'title';

  ObjectEntries(data).forEach(([k, v]) => {
    const key: keyof T =
      ns && typeof k === 'string' && k.includes(ns)
        ? k.replace(ns, '').replace(/[A-Z]/g, (match: string) => toLowerCase(match))
        : k;

    dataOps[key] = normalizeValue(v) as T[keyof T];
  });

  ObjectEntries(INPUT).forEach(([k, v]) => {
    INPUT[k] = normalizeValue(v) as T[keyof T];
  });

  ObjectEntries(defaultOps).forEach(([k, v]) => {
    /* istanbul ignore else */
    if (k in INPUT) {
      normalOps[k] = INPUT[k] as T[keyof T];
    } else if (k in dataOps) {
      normalOps[k] = dataOps[k] as T[keyof T];
    } else {
      normalOps[k] = (k === title ? getAttribute(element, title) : v) as T[keyof T];
    }
  });

  return normalOps;
};

export default normalizeOptions;
