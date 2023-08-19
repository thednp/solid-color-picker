import documentHead from '../blocks/documentHead';

/**
 * A global `boolean` for CSS3 transition support.
 */
const supportTransition = ['webkitTransition', 'transition'].some(p => p in documentHead.style);

export default supportTransition;
