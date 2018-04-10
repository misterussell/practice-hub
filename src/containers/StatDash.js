import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import GameOfLifeStats from './GameOfLifeStats';

export default class StatDash extends Component {
  render() {

    const stats = this.props.location.state.type === 'GOLstats'
      ? <Route path="/stats/gameOfLife" component={ GameOfLifeStats } />
      : null;

    return (
      <div>
        <h1>Stats</h1>
        {
          stats
        }
      </div>
    );
  }
};
