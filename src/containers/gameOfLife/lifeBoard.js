import React, { Component } from 'react';

import Button from '../../components/Button';

// import {
//   getNextGeneration,
//   generateGenState,
//   generateNextGenState,
//   createCell,
//   getNextCellState,
//   changeCellState
// } from '../../drills/gameOfLife/life';

export default class GameOfLife extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lifeBound: [5, 5],
      cells: []
    }
  }

  render() {
    let cells = Array.from(new Array(10), (i, t) => <div key={ t } onClick={ this.handleSelect }>cell</div>);
    return (
      <div className="universe">
        <div className="life-board">
          { cells }
        </div>
        <div className="world-meter">
          <Button callback={ this.reduceWorldSize } text={ 'Shrink' } />
          <Button callback={ this.growWorldSize } text={ 'Grow' } />
        </div>
      </div>
    );
  }

  handleSelect(e) {
    console.log('change cell to a live cell for seed generation');
  }

  reduceWorldSize() {
    console.log('shrink');
  }

  growWorldSize() {
    console.log('grow');
  }
}
