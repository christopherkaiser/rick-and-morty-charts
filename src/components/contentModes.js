import filters from "./filters";

export const contentModes = [
  {
    name: "characters",
    label: "Characters",
    filters: [
      filters["speciesFilter"],
      filters["episodeFilter"],
      filters["statusFilter"],
      filters["originFilter"],
      filters["viewMode"]
    ]
  },
  {
    name: "species",
    label: "Species",
    filters: [
      filters["episodeFilter"],
      filters["originFilter"],
      filters["viewMode"]
    ]
  },
  {
    name: "origins",
    label: "Origins",
    filters: [
      filters["speciesFilter"],
      filters["episodeFilter"],
      filters["viewMode"]
    ]
  }
];

export const contentModesByID = contentModes.reduce((acc, value) => {
  acc[value.name] = value;
  return acc;
}, {});

export default contentModes;
