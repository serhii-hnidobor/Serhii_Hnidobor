import { formatStringList } from '~/helpers/helpers';

export const meeting = (listStr: string): string => {
  const getSortFunc = (isByFirstName: boolean) => {
    return (friendCredentialPrev: string, friendCredentialCur: string) => {
      const [firstNamePrevFriend, lastNamePrevFriend] = friendCredentialPrev.split(':');
      const [firstNameCurFriend, lastNameCurFriend] = friendCredentialCur.split(':');
      if (!isByFirstName) {
        return lastNamePrevFriend.charCodeAt(0) - lastNameCurFriend.charCodeAt(0);
      }
      if (lastNamePrevFriend[0] === lastNameCurFriend[0]) {
        return firstNamePrevFriend.charCodeAt(0) - firstNameCurFriend.charCodeAt(0);
      }
      return 0;
    };
  };
  const listArray = listStr.toUpperCase().split(';');
  const computedList = listArray.sort(getSortFunc(false)).sort(getSortFunc(true));
  return formatStringList(computedList);
};
