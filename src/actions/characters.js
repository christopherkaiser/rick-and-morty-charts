export const toggleFormVisable = () => ({
  type: "TOGGLE_FORM_VISABLE"
});

export const setHoveredCharacterID = id => ({
  type: "SET_HOVERED_CHARACTER_ID",
  id
});

export const setFormData = (name, value) => ({
  type: "SET_FORM_DATA",
  name,
  value
});

export const setSortColumn = column => ({
  type: "SET_SORT_COLUMN",
  sortColumn: column
});

export const setContentMode = value => ({
  type: "SET_CONTENT_MODE",
  value
});
