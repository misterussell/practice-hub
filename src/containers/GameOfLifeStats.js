import React, { Component } from 'react';

import StackedAreaChart from '../components/StackedAreaChart';
import RadialBarChart from '../components/RadialBarChart';
import StatGrid from '../components/StatGrid';

import Store from '../Store';

export default class GameOfLifeStats extends Component {
  render() {
    return (
      <div>
        <h3>Total Life/Death Sums</h3>
        <StackedAreaChart
          data={
            Store.tracking.getLifeDeathPlottable(
              [this.props.location.state.stats.generationStats.lifeSums,
               this.props.location.state.stats.generationStats.deathSums])
            }
        />
        <h3>Average Lifespans</h3>
        <RadialBarChart
          data={
            Store.tracking.getRadialDataFromObj(
              'averageLifeSpan',
              this.props.location.state.stats.cellStats)
          }
          dataKey={ 'val' } />
        <h3>Average Periods of Death</h3>
        <RadialBarChart
          data={
            Store.tracking.getRadialDataFromObj(
              'averageDeathSpan',
              this.props.location.state.stats.cellStats)
          }
          dataKey={ 'val' } />
        <StatGrid
          data={ Store.tracking.buildValueArray(this.props.location.state.stats.cellStats, 'cellStateSum') } />
      </div>
    );
  }
}
