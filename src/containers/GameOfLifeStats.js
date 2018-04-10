import React, { Component } from 'react';

import StackedAreaChart from '../components/StackedAreaChart';

import Store from '../Store';

export default class GameOfLifeStats extends Component {
  render() {
    return (
      <div>
        <StackedAreaChart
          data={
            Store.tracking.getLifeDeathPlottable(
              [this.props.location.state.stats.generationStats.lifeSums, this.props.location.state.stats.generationStats.deathSums])
            }
        />
      </div>
    );
  }
}
