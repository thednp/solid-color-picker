import documentHead from '../blocks/documentHead';

/**
 * A global `boolean` for CSS3 3D transform support.
 */
const support3DTransform = ['webkitPerspective', 'perspective'].some(p => p in documentHead.style);

export default support3DTransform;
