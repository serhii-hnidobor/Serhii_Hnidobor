import { sumOfDigit } from '../../helpers/helpers';
const digitalSum = (number) => {
    const isNumberHaveOneDigit = String(number).split('').length === 1;
    const digitSum = sumOfDigit(number);
    if (isNumberHaveOneDigit) {
        return digitSum;
    }
    return digitalSum(digitSum);
};
export { digitalSum };
