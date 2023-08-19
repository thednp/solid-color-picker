import documentHead from '../blocks/documentHead';

/**
 * A global `boolean` for CSS3 transform support.
 */
const supportTransform = ['webkitTransform', 'transform'].some(p => p in documentHead.style);

export default supportTransform;
