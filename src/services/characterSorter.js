import { getCharacters } from "./characterService";
import _ from "lodash";

export const getMostFeaturedCharacters = async n => {
  const characters = await getCharacters();
  const sortedCharacters = _.orderBy(
    characters,
    [c => c.episode.length],
    ["desc"]
  );

  return sortedCharacters.slice(0, n);
};
