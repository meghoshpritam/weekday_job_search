function splitSearchTerms(searchString) {
  const lowerCaseSearchTerm = searchString?.toLowerCase() || '';
  const splits = lowerCaseSearchTerm?.replace(/([^\d])(\d+)/g, `$1 $2`)?.split(/[\s-_]/) || [];
  return splits?.filter((term) => term?.length > 0) || [];
}

export const searchStringInArray = (searchString, searchArray) => {
  const splitTerm = splitSearchTerms(searchString);

  if (splitTerm?.length === 0) return searchArray;

  return (
    searchArray.filter((item) => {
      const lowerCaseItem = item.toLowerCase();
      return splitTerm.every((term) => lowerCaseItem.includes(term));
    }) || []
  );
};
