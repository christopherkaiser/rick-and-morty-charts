import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Characters from "./Characters";
import {
  fetchCharacterData,
  fetchEpisodesData,
  fetchLocationsData
} from "../services/fetchData";
import * as reducers from "../reducers";
import { setEpisodes, setLocations, setCharacters } from "../actions/data";
import Episodes from "./Episodes";

const Root = ({ store }) => {
  if (!reducers.dataGetCharactersFetched(store.getState())) {
    fetchCharacterData(c => store.dispatch(setCharacters(c)));
  }
  if (!reducers.dataGetEpisodesFeteched(store.getState()))
    fetchEpisodesData(e => store.dispatch(setEpisodes(e)));

  if (!reducers.dataGetLocationsFeteched(store.getState()))
    fetchLocationsData(l => store.dispatch(setLocations(l)));

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/characters/:id" component={Characters} />
          <Route path="/characters" component={Characters} />
          <Route path="/episodes" component={Episodes} />
          <Redirect from="/" to="/characters" exact component={Characters} />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
