import React from "react";
import { connect } from "react-redux";
import Select from "./common/select";
import { charactersGetFormData } from "../reducers/index";
import { setFormData } from "../actions/characters";

//todo move this to common selectGroup

const mapStateToProps = (state, ownProps) => ({
  ...charactersGetFormData(state)
});

const mapDispatchToProps = dispatch => ({
  handler: ({ currentTarget }) => {
    return dispatch(setFormData(currentTarget.name, currentTarget.value));
  }
});

const CharactersForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    species,
    episodes,
    statuses,
    origins,
    viewModes,
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
          options={
            species
              ? species.map(s => {
                  return { value: s, label: s };
                })
              : []
          }
          value={speciesFilter}
          onChange={handler}
          error={null}
        />
        <Select
          name={"episodeFilter"}
          label={"episode"}
          options={
            episodes
              ? episodes.map(e => {
                  return { value: e.id, label: e.name };
                })
              : []
          }
          value={episodeFilter}
          onChange={handler}
          error={null}
        />
        <Select
          name={"statusFilter"}
          label={"status"}
          options={
            statuses
              ? statuses.map(s => {
                  return { value: s, label: s };
                })
              : []
          }
          value={statusFilter}
          onChange={handler}
          error={null}
        />
        <Select
          name={"originFilter"}
          label={"origin"}
          options={
            origins
              ? origins.map(o => {
                  return { value: o.id, label: o.name };
                })
              : []
          }
          value={originFilter}
          onChange={handler}
          error={null}
        />

        <Select
          name={"viewMode"}
          label={"Mode"}
          options={
            viewModes
              ? viewModes.map(m => {
                  return { value: m, label: m };
                })
              : []
          }
          value={viewMode}
          onChange={handler}
          error={null}
        />
      </React.Fragment>
    );
  }
);

export default CharactersForm;
