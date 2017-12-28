import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import NotFound from './containers/NotFound';
import LifeBoard from './containers/gameOfLife/lifeBoard';

export default () =>
  <Switch>
    <Route path="/" exact component={ Home } />
    <Route path='/gameOfLife' exact component={ LifeBoard } />
    <Route component={ NotFound } />
  </Switch>;
