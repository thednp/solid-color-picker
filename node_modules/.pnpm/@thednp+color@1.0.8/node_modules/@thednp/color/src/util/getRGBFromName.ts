import webColors from './webColors';

import type { RGB } from '../interface/rgb';

/**
 * Returns the RGB value of a web safe colour.
 */
const getRGBFromName = (name: string): RGB => {
  const [[, rgbValue]] = webColors.filter(([k]) => k === name.toLowerCase());

  return rgbValue;
};

export default getRGBFromName;
