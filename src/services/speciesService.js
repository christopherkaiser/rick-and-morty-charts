import _ from "lodash";

export const getSpecies = characterSet => {
  const species = _.uniqBy(characterSet, "species").map(c => c.species);
  return species;
};
