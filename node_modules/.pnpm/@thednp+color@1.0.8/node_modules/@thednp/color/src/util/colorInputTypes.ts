import { HSLALike } from '../interface/hslaLike';
import { HSVALike } from '../interface/hsvaLike';
import { HWBALike } from '../interface/hwbaLike';
import { RGBALike } from '../interface/rgbaLike';

type ColorInputTypes = string | Partial<RGBALike | HSVALike | HSLALike | HWBALike>;

export default ColorInputTypes;
