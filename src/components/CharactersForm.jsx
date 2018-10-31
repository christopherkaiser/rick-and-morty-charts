import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "./common/select";
import { charactersGetFormData } from "../reducers/index";
import { setFormData } from "../actions/characters";
import {
  dataGetLocations,
  dataGetEpisodes,
  dataGetCharacters
} from "./../reducers";
import { getSpecies } from "./../services/speciesService";

//todo move this to common selectGroup

const mapStateToProps = state => ({
  ...charactersGetFormData(state),
  //characters: a(),
  species: getSpecies(dataGetCharacters(state)),
  episodes: dataGetEpisodes(state),
  origins: dataGetLocations(state)
});

const mapDispatchToProps = dispatch => ({
  handler: ({ currentTarget }) => {
    return dispatch(setFormData(currentTarget.name, currentTarget.value));
  }
});

const CharactersForm = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    ({
      species = [],
      episodes = [],
      statuses = [],
      origins = [],
      viewModes = [],
      speciesFilter,
      episodeFilter,
      statusFilter,
      originFilter,
      viewMode,
      handler
    }) => {
      return (
        <React.Fragment>
          <Select
            name={"speciesFilter"}
            label={"species"}
            options={species.map(s => ({ value: s, label: s }))}
            value={speciesFilter}
            onChange={handler}
            error={null}
          />

          <Select
            name={"episodeFilter"}
            label={"episode"}
            options={episodes.map(e => ({ value: e.id, label: e.name }))}
            value={episodeFilter}
            onChange={handler}
            error={null}
          />

          <Select
            name={"statusFilter"}
            label={"status"}
            options={statuses.map(s => ({ value: s, label: s }))}
            value={statusFilter}
            onChange={handler}
            error={null}
          />

          <Select
            name={"originFilter"}
            label={"origin"}
            options={origins.map(o => ({ value: o.id, label: o.name }))}
            value={originFilter}
            onChange={handler}
            error={null}
          />

          <Select
            name={"viewMode"}
            label={"Mode"}
            options={viewModes.map(m => ({ value: m, label: m }))}
            value={viewMode}
            onChange={handler}
            error={null}
          />
        </React.Fragment>
      );
    }
  )
);

export default CharactersForm;
