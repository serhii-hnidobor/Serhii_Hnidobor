export const formatStringList = (splitString: string[]): string => {
  return splitString
    .map((curStr) => {
      const [firstName, lastName] = curStr.split(':');
      return `(${firstName}, ${lastName})`;
    })
    .join('');
};
