import {
  getPaginatedJson,
  resolvePaginatedJson
} from "./../services/jsonPageService";

export const fetchCharacterData = async dispatchCall => {
  const characterPromises = getPaginatedJson("/character", 25);

  let characters = resolvePaginatedJson(await Promise.all(characterPromises));

  characters = characters.map(c => {
    c.location = {
      id: Number(c.location.url.match(/\d+$/)),
      name: c.location.name
    };

    c.origin = {
      id: Number(c.origin.url.match(/\d+$/)),
      name: c.origin.name
    };

    c.episode = c.episode.map(e => Number(e.match(/\d+$/)));
    return c;
  });

  dispatchCall(characters);
};

export const fetchEpisodesData = async dispatchCall => {
  const episodePromises = getPaginatedJson("/episode", 2);
  const episodes = resolvePaginatedJson(await Promise.all(episodePromises));
  dispatchCall(episodes);
};

export const fetchLocationsData = async dispatchCall => {
  const locationPromises = getPaginatedJson("/location", 4);
  const locations = resolvePaginatedJson(await Promise.all(locationPromises));
  dispatchCall(locations);
};
