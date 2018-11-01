import React from "react";
import StickyCard from "./common/stickyCard";
import CharactersForm from "./CharactersForm";
import CharactersViewMode from "./CharactersViewMode";
import { connect } from "react-redux";
import { toggleFormVisable, setContentMode } from "../actions/characters";
import {
  charactersGetHoveredCharacter,
  charactersGetFormVisable,
  dataGetFilteredCharacters,
  charactersGetContentMode
} from "./../reducers";
import Select from "./common/select";
import { contentModes, contentModesByID } from "./contentModes";
import ContentForm from "./ContentForm";
import PropTypes from "prop-types";

//filter on status, location, origin, species, season, episode, name,
//chart data
// character c to number of episode with character c and character x
// character c to number of episodes with character c
// species s to number of characters with species s
// origins o to number of characters with origin o
// locations l to number of characters with location l

const fillerText =
  "Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon for Cartoon Network's late-night programming block Adult Swim.";

const mapStateToProps = state => ({
  characters: dataGetFilteredCharacters(state),
  hoveredCharacter: charactersGetHoveredCharacter(state),
  formOpen: charactersGetFormVisable(state),
  contentMode: charactersGetContentMode(state)
});

const mapDispatchToProps = dispatch => ({
  onFormClick: () => dispatch(toggleFormVisable()),
  contentModeHandler: ({ currentTarget }) =>
    dispatch(setContentMode(currentTarget.value))
});

const Characters = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    hoveredCharacter,
    formOpen,
    onFormClick,
    contentMode,
    contentModeHandler
  }) => {
    return (
      <div className="container">
        <Select
          name={"contentMode"}
          label={"Content Mode"}
          options={contentModes.map(c => ({ value: c.name, label: c.label }))}
          value={contentMode}
          onChange={contentModeHandler}
          error={null}
        />

        <button className="btn btn-primary" onClick={onFormClick}>
          Options
        </button>
        <div className={formOpen ? "collapse show" : "collapse"}>
          <div className="card card-body">
            <ContentForm
              statuses={["Alive", "Dead", "unknown"]}
              viewModes={["table", "bar"]}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <CharactersViewMode contentMode={contentMode} />
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
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{"Rick and Morty"}</h5>
                  <div className="card-text">{fillerText}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Characters.propTypes = {
  hoveredCharacter: PropTypes.shape({
    name: PropTypes.number,
    image: PropTypes.string,
    status: PropTypes.string,
    origin: PropTypes.shape({
      name: PropTypes.string
    }),
    species: PropTypes.string,
    type: PropTypes.string
  }),
  formOpen: PropTypes.string,
  onFormClick: PropTypes.func,
  contentMode: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string
  }),
  contentModeHandler: PropTypes.func
};

export default Characters;
