import React from "react";
import Table from "./common/table";

const CharactersTable = ({ data, onSort, sortColumn, onMouseOver }) => {
  const columns = [
    {
      path: "name",
      label: "Name"
    },
    {
      path: "origin.name",
      label: "Origin"
    },
    {
      path: "status",
      label: "Status"
    },
    {
      path: "episode.length",
      label: "# of Episodes"
    }
  ];

  return (
    <Table
      columns={columns}
      data={data}
      sortColumn={sortColumn}
      onSort={onSort}
      onMouseOver={onMouseOver}
    />
  );
};

export default CharactersTable;
