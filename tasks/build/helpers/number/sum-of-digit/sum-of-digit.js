export const sumOfDigit = (num) => {
    const digitArray = String(num)
        .split('')
        .map((symbol) => Number(symbol));
    return digitArray.reduce((prev, cur) => prev + cur);
};
