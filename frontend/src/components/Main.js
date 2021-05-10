import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Routes from './Router';
import AppFields from "./AppFields";
import Header from './Header';

const Main = () => {
  return (
    <Router>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={AppFields} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default Main;
