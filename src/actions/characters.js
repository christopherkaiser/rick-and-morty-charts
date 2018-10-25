//TOGGLE_FORM_VISABLE
//SET_FETCH_STATUS_TO_COMPLETE
//SET_HOVERED_CHARACTER_ID
//SET_FORM_DATA
//SET_SORT_COLUMN

// runs update when fetch compelte instead of triggering state change
// export const setFetchStatusToComplete = () => ({
//   type: "SET_FETCH_STATUS_TO_COMPLETE"
// });

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

export const setSortColumn = (path, order = "desc") => ({
  type: "SET_SORT_COLUMN",
  sortColumn: { path, order }
});
