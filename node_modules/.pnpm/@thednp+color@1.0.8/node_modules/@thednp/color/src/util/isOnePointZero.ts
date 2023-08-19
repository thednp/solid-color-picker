/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 */
const isOnePointZero = (n: string | number): boolean => {
  return `${n}`.includes('.') && parseFloat(n as string) === 1;
};

export default isOnePointZero;
