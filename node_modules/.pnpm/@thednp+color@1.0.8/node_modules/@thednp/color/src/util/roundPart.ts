/**
 * Round colour components, for all formats except HEX.
 */
const roundPart = (v: number): number => {
  const floor = Math.floor(v);
  return v - floor < 0.5 ? floor : Math.round(v);
};

export default roundPart;
