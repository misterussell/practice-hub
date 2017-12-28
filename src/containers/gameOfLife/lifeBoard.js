import React, { Component } from 'react';

import Button from '../../components/Button';

import '../../css/gameOfLife/gameOfLife.css'

// import {
//   getNextGeneration,
//   generateGenState,
//   generateNextGenState,
//   createCell,
//   getNextCellState,
//   changeCellState
// } from '../../drills/gameOfLife/life';

export default class GameOfLife extends Component {
  constructor() {
    super();
    this.state = {
      minBound: 5,
      userBound: 0,
      cells: [],
    };
  }

  render() {
    let cellStyle = {
      width: `${100/(this.state.minBound + this.state.userBound)}%`,
      height: `${100/(this.state.minBound + this.state.userBound)}%`
    };

    let cells = Array.from(
      new Array((this.state.minBound + this.state.userBound)*(this.state.minBound + this.state.userBound)), (i, t) =>
       <div key={ t } style={ cellStyle } className="cell" onClick={ this.handleSelect }>cell</div>
     );

    return (
      <div className="universe">
        <div className="life-board">
          { cells }
        </div>
        <div className="world-meter">
          <Button callback={ this.reduceWorldSize.bind(this) } text={ 'Shrink' } />
          <Button callback={ this.growWorldSize.bind(this) } text={ 'Grow' } />
        </div>
      </div>
    );
  }

  initializeSeed() {

  }

  handleSelect(e) {
    console.log('change cell to a live cell for seed generation');
  }

  reduceWorldSize(e) {
    console.log('shrink');
    console.log(this.state.userBound);
    this.setState((prevState, props) => {
      const minBoundCheck = prevState.userBound === 0 ? 0 : prevState.userBound -= 2;
      return { userBound: minBoundCheck }
    });
  }

  growWorldSize(e) {
    console.log('grow');
    this.setState((prevState, props) => {
      const maxBoundCheck = prevState.userBound === 10 ? 10 : prevState.userBound += 2;
      return { userBound: maxBoundCheck }
    });
  }
}
