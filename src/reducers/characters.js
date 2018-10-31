import { combineReducers } from "redux";

const formVisable = (state = false, action) => {
  if (action.type === "TOGGLE_FORM_VISABLE") return !state;
  else return state;
};

const hoveredCharacterID = (state = "", action) => {
  if (action.type === "SET_HOVERED_CHARACTER_ID") return action.id;
  else return state;
};

const formData = (
  state = {
    speciesFilter: "",
    episodeFilter: 0,
    statusFilter: "",
    originFilter: "",
    viewMode: "table"
  },
  action
) => {
  if (action.type === "SET_FORM_DATA") {
    return {
      ...state,
      [action.name]: action.value
    };
  } else return state;
};

const sortColumn = (
  state = { path: "episode.length", order: "desc" },
  action
) => {
  if (action.type === "SET_SORT_COLUMN") return action.sortColumn;
  else return state;
};

const contentMode = (state = "characters", action) => {
  if (action.type === "SET_CONTENT_MODE") return action.value;
  else return state;
};

const characters = combineReducers({
  formVisable,
  hoveredCharacterID,
  formData,
  sortColumn,
  contentMode
});

export default characters;

export const getFormVisable = state => state.formVisable;
export const getHoveredCharacterID = state => state.hoveredCharacterID;
export const getFormData = state => state.formData;
export const getSortColumn = state => state.sortColumn;
export const getContentMode = state => state.contentMode;
