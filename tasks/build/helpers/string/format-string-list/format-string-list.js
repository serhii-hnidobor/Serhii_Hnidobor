export const formatStringList = (splitString) => {
    return splitString
        .map((curStr) => {
        const [firstName, lastName] = curStr.split(':');
        return `(${firstName}, ${lastName})`;
    })
        .join('');
};
