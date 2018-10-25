import React from "react";
import { Provider } from "react-redux";
import Characters from "./Characters";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

export const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/characters/:id" component={Characters} />
        <Route path="/characters" component={Characters} />
        <Redirect from="/" to="/characters" exact component={Characters} />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  </Provider>
);
