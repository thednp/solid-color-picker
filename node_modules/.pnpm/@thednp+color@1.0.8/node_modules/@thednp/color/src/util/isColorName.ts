import nonColors from './nonColors';
import COLOR_FORMAT from './colorFormat';
import webColors from './webColors';

type NonColor = 'transparent' | 'currentColor' | 'inherit' | 'revert' | 'initial';

/**
 * Check to see if string passed is a web safe colour.
 *
 * @see https://stackoverflow.com/a/16994164
 */
const isColorName = (color: string): color is NonColor => {
  if (nonColors.includes(color) || ['#', ...COLOR_FORMAT].some(f => color.includes(f))) {
    return false;
  }

  return webColors.some(([c]) => color === c);
};

export default isColorName;
