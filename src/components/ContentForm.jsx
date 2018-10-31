import { contentModes, contentModesByID } from "./contentModes";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "./common/select";
import { setFormData } from "../actions/characters";
import {
  dataGetLocations,
  dataGetEpisodes,
  dataGetCharacters,
  charactersGetFormData,
  charactersGetContentMode
} from "./../reducers";
import { getSpecies } from "./../services/speciesService";

const mapStateToProps = state => ({
  ...charactersGetFormData(state),
  //characters: a(),
  species: getSpecies(dataGetCharacters(state)),
  episodes: dataGetEpisodes(state),
  origins: dataGetLocations(state),
  contentMode: charactersGetContentMode(state)
});

const mapDispatchToProps = dispatch => ({
  handler: ({ currentTarget }) => {
    return dispatch(setFormData(currentTarget.name, currentTarget.value));
  }
});

const ContentForm = connect(
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
    handler,
    contentMode
  }) => {
    const data = {
      speciesFilter: species,
      episodeFilter: episodes,
      statusFilter: statuses,
      originFilter: origins,
      viewMode: viewModes
    };
    const values = {
      speciesFilter,
      episodeFilter,
      statusFilter,
      originFilter,
      viewMode
    };
    const filters = contentModesByID[contentMode].filters;
    return filters.map(filter => (
      <Select
        key={filter.name}
        name={filter.name}
        label={filter.label}
        options={filter.optionsFn(data[filter.name])}
        value={values[filter.name]}
        onChange={handler}
        error={null}
      />
    ));
  }
);

export default ContentForm;
