import { combineReducers } from "redux";
import characters from "./characters";
import { getFormData } from "./characters";

const reducers = combineReducers({
  characters
});

export default reducers;

export const charactersGetFormData = state => getFormData(state.characters);
