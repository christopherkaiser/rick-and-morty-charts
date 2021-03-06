import reducers from "./reducers/index";
import { createStore } from "redux";

const addLoggingToDispatch = store => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return action => {
    if (action.type !== "SET_HOVERED_CHARACTER_ID") {
      // console.group(action.type);
      // console.log("%c prev state", "color: gray", store.getState());
      // console.log("%c action", "color: blue", action);
    }
    const returnValue = rawDispatch(action);
    if (action.type !== "SET_HOVERED_CHARACTER_ID") {
      // console.log("%c next state", "color: green", store.getState());
      // console.groupEnd(action.type);
    }

    return returnValue;
  };
};

const configureStore = () => {
  const store = createStore(reducers);

  if (process.env.NODE_ENV !== "production") {
    store.dispatch = addLoggingToDispatch(store);
  }

  return store;
};

export default configureStore;
