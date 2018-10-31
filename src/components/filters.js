const filters = {
  speciesFilter: {
    name: "speciesFilter",
    label: "species",
    optionsFn: data => data.map(s => ({ value: s, label: s }))
  },
  episodeFilter: {
    name: "episodeFilter",
    label: "episode",
    optionsFn: data => data.map(e => ({ value: e.id, label: e.name }))
  },
  statusFilter: {
    name: "statusFilter",
    label: "status",
    optionsFn: data => data.map(s => ({ value: s, label: s }))
  },
  originFilter: {
    name: "originFilter",
    label: "origin",
    optionsFn: data => data.map(o => ({ value: o.id, label: o.name }))
  },
  viewMode: {
    name: "viewMode",
    label: "Mode",
    optionsFn: data => data.map(m => ({ value: m, label: m }))
  }
};

export default filters;
