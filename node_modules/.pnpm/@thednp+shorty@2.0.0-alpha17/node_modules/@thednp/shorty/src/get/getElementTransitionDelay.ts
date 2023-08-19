import transitionDelay from '../strings/transitionDelay';
import transitionProperty from '../strings/transitionProperty';
import getElementStyle from './getElementStyle';

/**
 * Utility to get the computed `transitionDelay`
 * from Element in miliseconds.
 *
 * @param element target
 * @return the `transitionDelay` value in miliseconds
 */
const getElementTransitionDelay = (element: HTMLElement): number => {
  const propertyValue = getElementStyle(element, transitionProperty);
  const delayValue = getElementStyle(element, transitionDelay);
  const delayScale = delayValue.includes('ms') ? /* istanbul ignore next */ 1 : 1000;
  const duration =
    propertyValue && propertyValue !== 'none'
      ? parseFloat(delayValue) * delayScale
      : /* istanbul ignore next */ 0;

  return !Number.isNaN(duration) ? duration : /* istanbul ignore next */ 0;
};

export default getElementTransitionDelay;
