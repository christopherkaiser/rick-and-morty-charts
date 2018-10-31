import React from "react";
import CharactersTable from "./CharactersTable";
import { HorizontalBar } from "react-chartjs-2";
import { connect } from "react-redux";
import {
  charactersGetFormData,
  charactersGetHoveredCharacter,
  dataGetFilteredCharacters,
  charactersGetSortColumn,
  dataGetCharacters,
  dataGetLocations
} from "../reducers";
import { setHoveredCharacterID } from "./../actions/characters";
import _ from "lodash";
import { getSpeciesDetails } from "./../services/speciesService";
import { getOriginDetails } from "./../services/originsService";

const getData = (characterSet, path) => {
  return {
    labels: characterSet.map(c => c.name),

    datasets: [
      {
        label: "# of episodes appeared in",
        data: characterSet.map(c => _.get(c, path)),
        backgroundColor: "#1CAED2"
      }
    ]
  };
};

const getOrigins = state => {
  const details = getOriginDetails(dataGetCharacters(state));
  return dataGetLocations(state).map(l => ({
    ...l,
    characterCount: details[l.id] || 0
  }));
};

const mapStateToProps = state => ({
  characters: dataGetFilteredCharacters(state),
  species: getSpeciesDetails(dataGetCharacters(state)),
  origins: getOrigins(state),
  mode: charactersGetFormData(state).viewMode,
  hoveredCharacter: charactersGetHoveredCharacter(state),
  sortColumn: charactersGetSortColumn(state)
});

const mapDispatchToProps = dispatch => ({
  handleMouseOver: ({ id }) => dispatch(setHoveredCharacterID(id))
});

const CharactersViewMode = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    characters,
    mode,
    handleMouseOver,
    hoveredCharacter,
    sortColumn,
    species,
    origins,
    contentMode
  }) => {
    const data = {
      characters: _.orderBy(characters, [sortColumn.path], [sortColumn.order])
        .slice(0, 50)
        .map(c => ({
          _id: c.id,
          ...c
        })),

      species: _.orderBy(species, [sortColumn.path], [sortColumn.order])
        .slice(0, 50)
        .map(s => ({
          _id: s.name,
          ...s
        })),

      origins: _.orderBy(origins, [sortColumn.path], [sortColumn.order])
        .slice(0, 50)
        .map(s => ({
          _id: s.name,
          ...s
        }))
    };

    const columns = {
      characters: [
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
      ],

      species: [
        {
          path: "name",
          label: "Name"
        },
        {
          path: "characterCount",
          label: "# of Characters with Species"
        }
      ],
      origins: [
        {
          path: "name",
          label: "Name"
        },
        {
          path: "type",
          label: "Type"
        },
        {
          path: "dimension",
          label: "Dimension"
        },
        {
          path: "characterCount",
          label: "# of Characters with Origin"
        }
      ]
    };

    const graphValue = {
      characters: "episode.length",
      species: "characterCount",
      origins: "characterCount"
    };

    const hoverFunction = {
      character: tooltipModel => {
        const reletiveCharacterId =
          tooltipModel.dataPoints && tooltipModel.dataPoints[0].index;
        if (
          Number.isInteger(reletiveCharacterId) &&
          reletiveCharacterId !== hoveredCharacter.id
        ) {
          handleMouseOver(characters[reletiveCharacterId]);
        }
      },
      species: tooltipModel => {},
      origins: tooltipModel => {}
    };

    //characters
    //species
    //origins

    const dataViews = [
      {
        id: "table",
        content: (
          <CharactersTable
            columns={columns[contentMode]}
            data={data[contentMode]}
          />
        )
      },
      {
        id: "bar",
        content: (
          <HorizontalBar
            data={getData(data[contentMode], graphValue[contentMode])}
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
                      min: 0
                    }
                  }
                ]
              },
              tooltips: {
                custom: hoverFunction[contentMode]
              }
            }}
            height={500}
          />
        )
      }
    ];
    return dataViews.find(v => v.id === mode).content;
  }
);

export default CharactersViewMode;
