import { isArrayContainNumSubArray } from '~/helpers/array/array';
export const countNumPairs = (arr, target) => {
    let result = 0;
    const alreadyCountedPair = [];
    arr.forEach((number) => {
        if (number >= target) {
            return;
        }
        const delta = Math.abs(target - number);
        if (arr.includes(delta) && !isArrayContainNumSubArray(alreadyCountedPair, [number, delta])) {
            alreadyCountedPair.push([number, delta]);
            result++;
        }
    });
    return result;
};
