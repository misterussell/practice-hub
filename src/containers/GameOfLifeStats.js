import React, { Component } from 'react';

import StackedAreaChart from '../components/StackedAreaChart';
import StatGrid from '../components/StatGrid';

import Store from '../Store';

export default class GameOfLifeStats extends Component {
  render() {
    const parentStyle = {
      width: '75vw',
      margin: `0 auto`
    }

    const style = {
      margin: `0 auto`
    }

    return (
      <div className="all-stats" style= { parentStyle }>
        <h3 style={ style }>Total Life/Death Sums</h3>
        <StackedAreaChart
          data={
            Store.tracking.getLifeDeathPlottable(
              [this.props.location.state.stats.generationStats.lifeSums,
               this.props.location.state.stats.generationStats.deathSums])
            } />
        <h3 style={ style }>Average Lifespans</h3>
        <h3 style={ style }>Average Periods of Death</h3>
        <h3 style={ style }>Lives by Cell</h3>
        <StatGrid
          data={ Store.tracking.buildValueArray(this.props.location.state.stats.cellStats, 'cellStateSum') }
          type={ 'alive' }
          gridSettings={ this.props.location.state.gridSettings } />
        <h3 style={ style }>Deaths by Cell</h3>
        <StatGrid
          data={ Store.tracking.buildValueArray(this.props.location.state.stats.cellStats, 'deaths') }
          type={ 'dead'}
          gridSettings={ this.props.location.state.gridSettings } />
      </div>
    );
  }
}
