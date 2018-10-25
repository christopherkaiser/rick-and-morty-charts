import { combineReducers } from "redux";
import characters from "./characters";
import { getFormData } from "./characters";

export const reducers = combineReducers({
  characters
});

export const charactersGetFormData = state => getFormData(state.characters);
