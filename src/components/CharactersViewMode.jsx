import React from "react";
import CharactersTable from "./CharactersTable";
import { HorizontalBar } from "react-chartjs-2";

const getData = characterSet => {
  return {
    labels: characterSet.map(c => c.name),

    datasets: [
      {
        label: "# of episodes appeared in",
        data: characterSet.map(c => c.episode.length),
        backgroundColor: "#1CAED2"
      }
    ]
  };
};

//filteredCharacters
//sortColumn
//this.handleSort
//this.handleMouseOver

//

//instead of switch case have object with id, and value pairs. pull the object with matching id

const CharactersViewMode = ({
  mode,
  characters,
  sortColumn,
  handleSort,
  handleMouseOver,
  hoveredCharacterId
}) => {
  const dataView = [
    {
      id: "table",
      content: (
        <CharactersTable
          data={characters.map(c => {
            return {
              _id: c.id,
              ...c
            };
          })}
          sortColumn={sortColumn}
          onSort={handleSort}
          onMouseOver={handleMouseOver}
        />
      )
    },
    {
      id: "bar",
      content: (
        <HorizontalBar
          data={getData(characters)}
          onElementsClick={context => {
            if (context[0])
              this.props.history.push(
                "/characters/" + characters[context[0]._index].id
              );
          }}
          options={{
            scales: {
              xAxes: [
                {
                  ticks: {
                    min: 0,
                    max: 40
                  }
                }
              ]
            },
            tooltips: {
              custom: tooltipModel => {
                const reletiveCharacterId =
                  tooltipModel.dataPoints && tooltipModel.dataPoints[0].index;
                if (
                  Number.isInteger(reletiveCharacterId) &&
                  reletiveCharacterId !== hoveredCharacterId
                ) {
                  handleMouseOver(characters[reletiveCharacterId]);
                }
              }
            }
          }}
          height={500}
        />
      )
    }
  ];
  return dataView.find(v => v.id === mode).content;
};

export default CharactersViewMode;
