export const sumOfDigit = (num: number): number => {
  const digitArray = String(num)
    .split('')
    .map((symbol) => Number(symbol));
  return digitArray.reduce((prev, cur) => prev + cur);
};
