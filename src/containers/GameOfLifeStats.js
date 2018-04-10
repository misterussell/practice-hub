import React, { Component } from 'react';

import StackedAreaChart from '../components/StackedAreaChart';
import RadialBarChart from '../components/RadialBarChart';

import Store from '../Store';

export default class GameOfLifeStats extends Component {
  componentWillMount() {
    console.log(this.props.location.state.stats.cellStats);
    console.log(Store.tracking.getRadialDataFromObj('averageLifeSpan', this.props.location.state.stats.cellStats))
  }
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
      </div>
    );
  }
}
