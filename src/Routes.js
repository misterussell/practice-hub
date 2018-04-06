import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import NotFound from './containers/NotFound';
import LifeBoard from './containers/gameOfLife/lifeBoard';
import StatDash from './containers/StatDash';

export default () =>
  <Switch>
    <Route path="/" exact component={ Home } />
    <Route path='/gameOfLife' component={ LifeBoard } />
    <Route path='/gameOfLife/stats' component= { StatDash } />
    <Route component={ NotFound } />
  </Switch>;
