const offsetLength =
  () => (globalThis.innerWidth > 980
    ? /* istanbul ignore next @preserve */ 300
    : 230);

export default offsetLength;
