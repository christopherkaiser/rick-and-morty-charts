import React, { Component } from "react";
import _ from "lodash";
import { getSpecies } from "./../services/speciesService";
import StickyCard from "./common/stickyCard";
import {
  getPaginatedJson,
  resolvePaginatedJson
} from "./../services/jsonPageService";
import CharactersForm from "./CharactersForm";
import CharactersViewMode from "./charactersViewMode";

//filter on status, location, origin, species, season, episode, name,
//chart data
// character c to number of episode with character c and character x
// character c to number of episodes with character c
// species s to number of characters with species s
// origins o to number of characters with origin o
// locations l to number of characters with location l

class Characters extends Component {
  state = {
    getStatus: "pending",
    data: {
      speciesFilter: "",
      episodeFilter: 0,
      statusFilter: "",
      originFilter: "",
      viewMode: "table"
    },
    sortColumn: { path: "episode.length", order: "desc" },
    hoveredCharacterId: "",
    formOpen: false
  };

  constructor(props) {
    super(props);
    this.episodes = [];
    this.locations = [];
    this.species = [];
    this.chartCharacters = [];
  }

  async componentDidMount() {
    const characterPromises = getPaginatedJson("/character", 25);
    const episodePromises = getPaginatedJson("/episode", 2);
    const locationPromises = getPaginatedJson("/location", 4);

    this.characters = resolvePaginatedJson(
      await Promise.all(characterPromises)
    );
    this.episodes = resolvePaginatedJson(await Promise.all(episodePromises));
    this.locations = resolvePaginatedJson(await Promise.all(locationPromises));
    this.species = getSpecies(this.characters);

    this.characters = this.characters.map(c => {
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

    this.chartCharacters = _.orderBy(
      this.characters,
      [c => c.episode.length],
      ["desc"]
    );
    this.setState({ getStatus: "complete" });
  }

  getMostFeaturedCharacters = (n, characterSet) => {
    const sortedCharacters = _.orderBy(
      characterSet,
      [c => c.episode.length],
      ["desc"]
    );

    return sortedCharacters.slice(0, n);
  };

  selectHandler = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, hoveredCharacterId: "" });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleMouseOver = item => {
    this.setState({ hoveredCharacterId: item.id });
  };

  fillerText =
    "Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon for Cartoon Network's late-night programming block Adult Swim.";

  episodePredicate = character => {
    return character.episode.includes(Number(this.state.data.episodeFilter));
  };

  render() {
    const { data, hoveredCharacterId, sortColumn, formOpen } = this.state;
    const {
      speciesFilter,
      episodeFilter,
      statusFilter,
      originFilter,
      viewMode
    } = data;

    let filteredCharacters = speciesFilter
      ? this.chartCharacters.filter(c => speciesFilter === c.species)
      : this.chartCharacters;

    filteredCharacters = episodeFilter
      ? filteredCharacters.filter(this.episodePredicate)
      : filteredCharacters;

    filteredCharacters = statusFilter
      ? filteredCharacters.filter(c => statusFilter === c.status)
      : filteredCharacters;

    filteredCharacters = originFilter
      ? filteredCharacters.filter(c => Number(originFilter) === c.origin.id)
      : filteredCharacters;

    const hoveredCharacter = filteredCharacters.find(
      c => c.id === hoveredCharacterId
    );

    filteredCharacters = _.orderBy(
      filteredCharacters,
      [sortColumn.path],
      [sortColumn.order]
    );
    filteredCharacters = filteredCharacters.slice(0, 50);

    return (
      <React.Fragment>
        <button
          className="btn btn-primary"
          onClick={() => this.setState({ formOpen: !formOpen })}
        >
          options
        </button>
        <div className={formOpen ? "collapse show" : "collapse"}>
          <div className="card card-body">
            <CharactersForm
              species={this.species}
              episodes={this.episodes}
              statuses={["Alive", "Dead", "unknown"]}
              origins={this.locations}
              viewModes={["table", "bar"]}
              speciesFilter={speciesFilter}
              episodeFilter={episodeFilter}
              statusFilter={statusFilter}
              originFilter={originFilter}
              viewMode={viewMode}
              handler={this.selectHandler}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <CharactersViewMode
              mode={viewMode}
              characters={filteredCharacters}
              sortColumn={sortColumn}
              handleSort={this.handleSort}
              handleMouseOver={this.handleMouseOver}
              hoveredCharacterId={hoveredCharacterId}
            />
          </div>

          <div className="col-3">
            {hoveredCharacter ? (
              <StickyCard
                imgSrc={hoveredCharacter.image}
                title={hoveredCharacter.name}
                detailsSet={[
                  { label: "status:", details: hoveredCharacter.status },
                  { label: "origin:", details: hoveredCharacter.origin.name },
                  { label: "species:", details: hoveredCharacter.species },
                  { label: "type:", details: hoveredCharacter.type }
                ]}
              />
            ) : (
              <StickyCard
                imgSrc={"/img/rick-and-morty-logo.png"}
                title={"Rick and Morty"}
                detailsSet={[{ label: "", details: this.fillerText }]}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Characters;
