import _ from "lodash";

export const getOriginDetails = characterSet => {
  const reducer = (acc, current) => ({
    ...acc,
    [current.id]: acc[current.id] ? acc[current.id] + 1 : 1
  });
  return characterSet.map(c => c.origin).reduce(reducer, {});
};
