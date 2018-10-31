import React from "react";
import Table from "./common/table";
import { setSortColumn, setHoveredCharacterID } from "../actions/characters";
import { connect } from "react-redux";
import { charactersGetSortColumn } from "./../reducers";

// sortColumn={sortColumn}

// onSort={handleSort}
// onMouseOver={handleMouseOver}

const mapStateToProps = (state, ownProps) => ({
  sortColumn: charactersGetSortColumn(state)
});

const mapDispatchToProps = dispatch => ({
  onMouseOver: ({ id, species }) =>
    dispatch(setHoveredCharacterID(species ? id : "")),
  onSort: sortColumn => dispatch(setSortColumn(sortColumn))
});

const CharactersTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ columns, data, onSort, sortColumn, onMouseOver }) => {
  return (
    <Table
      columns={columns}
      data={data}
      sortColumn={sortColumn}
      onSort={onSort}
      onMouseOver={onMouseOver}
    />
  );
});

export default CharactersTable;
