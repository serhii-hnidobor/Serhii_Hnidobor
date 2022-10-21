import { sumOfDigit } from '../../helpers/helpers';

interface digitalSumNewFunc {
  (input: number): number;
}

const digitalSum = (number: number): number | digitalSumNewFunc => {
  const isNumberHaveOneDigit = String(number).split('').length === 1;
  const digitSum = sumOfDigit(number);
  if (isNumberHaveOneDigit) {
    return digitSum;
  }
  return digitalSum(digitSum);
};

export { digitalSum };
