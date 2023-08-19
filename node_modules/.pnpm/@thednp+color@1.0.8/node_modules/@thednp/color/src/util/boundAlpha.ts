/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1.
 */
const boundAlpha = (a: string | number): number => {
  let na = parseFloat(a as string);

  if (Number.isNaN(na) || na < 0 || na > 1) {
    na = 1;
  }

  return na;
};

export default boundAlpha;
