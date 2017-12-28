import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from "./components/AppliedRoute";

import Home from './containers/Home';
import NotFound from './containers/NotFound';
import LifeBoard from './containers/gameOfLife/lifeBoard';

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={ Home } props={ childProps } />
    <AppliedRoute path="/gameOfLife" exact component={ LifeBoard } props={ childProps } />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
