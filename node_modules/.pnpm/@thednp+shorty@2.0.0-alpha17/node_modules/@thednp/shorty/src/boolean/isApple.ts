import type { NavigatorUABrand } from '../interface/navigatorUA';
import userAgentData from '../strings/userAgentData';
import userAgent from '../strings/userAgent';

const appleBrands = /(iPhone|iPod|iPad)/;

/**
 * A global `boolean` for Apple browsers.
 */
const isApple: boolean = userAgentData
  ? userAgentData.brands.some((x: NavigatorUABrand) => appleBrands.test(x.brand))
  : /* istanbul ignore next */ appleBrands.test(userAgent);

export default isApple;
