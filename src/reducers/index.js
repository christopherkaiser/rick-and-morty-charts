import { combineReducers } from "redux";
import characters, * as characterReducers from "./characters";
import data, * as dataReducers from "./data";

const reducers = combineReducers({
  characters,
  data
});

export default reducers;

export const charactersGetFormVisable = state =>
  characterReducers.getFormVisable(state.characters);

export const charactersGetFormData = state =>
  characterReducers.getFormData(state.characters);

export const charactersGetSortColumn = state =>
  characterReducers.getSortColumn(state.characters);

export const charactersGetHoveredCharacter = state =>
  dataGetCharacters(state).find(
    c => c.id === characterReducers.getHoveredCharacterID(state.characters)
  );

export const charactersGetContentMode = state =>
  characterReducers.getContentMode(state.characters);

export const dataGetCharacters = state =>
  dataReducers.getCharacters(state.data);

export const dataGetFilteredCharacters = state => {
  const filter = (predicates, characters) => {
    const reducer = (accumulator, currentValue) => c =>
      accumulator(c) && currentValue(c);

    return characters.filter(predicates.reduce(reducer));
  };

  const {
    speciesFilter,
    episodeFilter,
    statusFilter,
    originFilter
  } = charactersGetFormData(state);

  return filter(
    [
      speciesFilter ? c => speciesFilter === c.species : c => true,
      episodeFilter
        ? c => c.episode.includes(Number(episodeFilter))
        : c => true,
      statusFilter ? c => statusFilter === c.status : c => true,
      originFilter ? c => Number(originFilter) === c.origin.id : c => true
    ],
    dataGetCharacters(state)
  );
};

export const dataGetEpisodes = state =>
  dataReducers.getEpisodesData(state.data);

export const dataGetLocations = state =>
  dataReducers.getLocationsData(state.data);

export const dataGetCharactersFetched = state =>
  dataReducers.getCharactersFetched(state.data);

export const dataGetEpisodesFeteched = state =>
  dataReducers.getEpisodesFetched(state.data);

export const dataGetLocationsFeteched = state =>
  dataReducers.getLocationsFetched(state.data);
