import documentHead from '../blocks/documentHead';

/**
 * A global `boolean` for CSS3 animation support.
 */
const supportAnimation = ['webkitAnimation', 'animation'].some(p => p in documentHead.style);

export default supportAnimation;
