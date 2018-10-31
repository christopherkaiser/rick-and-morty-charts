import _ from "lodash";

export const getSpecies = characterSet => {
  const species = _.uniqBy(characterSet, "species").map(c => c.species);
  return species;
};

export const getSpeciesDetails = characterSet => {
  const reducer = (acc, current) => ({
    ...acc,
    [current]: {
      name: current,
      characterCount: acc[current] ? acc[current].characterCount + 1 : 1
    }
  });
  return _.values(characterSet.map(c => c.species).reduce(reducer, {}));
};
