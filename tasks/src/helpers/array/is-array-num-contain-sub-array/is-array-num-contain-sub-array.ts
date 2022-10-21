const isArrayContainNumSubArray = (arr: number[][], targetValueArr: number[]): boolean => {
  for (const el of arr) {
    if (el[0] === targetValueArr[0] && el[1] === targetValueArr[1]) {
      return true;
    }
    if (el[1] === targetValueArr[0] && el[0] === targetValueArr[1]) {
      return true;
    }
  }
  return false;
};

export { isArrayContainNumSubArray };
