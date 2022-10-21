export const firstNunRepeatingLetter = (inputStr: string): string => {
  const inputStrSymbolArray = inputStr.toLowerCase().split('');
  const inputStrLength = inputStr.length;
  for (let i = 0; i < inputStrLength; i++) {
    const letter = inputStrSymbolArray.shift();
    if (letter && !inputStrSymbolArray.includes(letter)) {
      return inputStr[i];
    }
  }
  return '';
};
