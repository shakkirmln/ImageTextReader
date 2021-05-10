import React from "react";
import { Route, Switch } from "react-router-dom";
import AppFields from "./AppFields";
import About from "./About";

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/home" component={AppFields} />
      <Route exact path="/contributors" component={About} />
    </Switch>
  );
};

export default Routes;