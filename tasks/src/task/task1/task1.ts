export const task1 = (list: (number | string)[]): string[] => {
  return list.filter((element) => typeof element !== 'string') as string[];
};
