import { combineReducers } from "redux";

const charactersData = (state = [], action) => {
  if (action.type === "SET_CHARACTERS") return action.characters;
  else return state;
};

const episodesData = (state = [], action) => {
  if (action.type === "SET_EPISODES") return action.episodes;
  else return state;
};

const locationsData = (state = [], action) => {
  if (action.type === "SET_LOCATIONS") return action.locations;
  else return state;
};

const charactersFetched = (state = false, action) => {
  if (action.type === "SET_CHARACTERS") return true;
  else return state;
};

const episodesFetched = (state = false, action) => {
  if (action.type === "SET_EPISODES") return true;
  else return state;
};

const locationsFetched = (state = false, action) => {
  if (action.type === "SET_LOCATIONS") return true;
  else return state;
};

const data = combineReducers({
  charactersData,
  episodesData,
  locationsData,
  charactersFetched,
  episodesFetched,
  locationsFetched
});

export default data;

export const getCharacters = state => state.charactersData;
export const getEpisodesData = state => state.episodesData;
export const getLocationsData = state => state.locationsData;
export const getCharactersFetched = state => state.charactersFetched;
export const getEpisodesFetched = state => state.episodesFetched;
export const getLocationsFetched = state => state.locationsFetched;
