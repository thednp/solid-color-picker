import animationDelay from '../strings/animationDelay';
import animationName from '../strings/animationName';
import getElementStyle from './getElementStyle';

/**
 * Utility to get the computed `animationDelay`
 * from Element in miliseconds.
 *
 * @param element target
 * @return the `animationDelay` value in miliseconds
 */
const getElementAnimationDelay = (element: HTMLElement): number => {
  const propertyValue = getElementStyle(element, animationName);
  const durationValue = getElementStyle(element, animationDelay);
  const durationScale = durationValue.includes('ms') ? /* istanbul ignore next */ 1 : 1000;
  const duration =
    propertyValue && propertyValue !== 'none' ? parseFloat(durationValue) * durationScale : 0;

  return !Number.isNaN(duration) ? duration : /* istanbul ignore next */ 0;
};

export default getElementAnimationDelay;
