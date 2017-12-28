import React, { Component } from 'react';

import Button from '../../components/Button';
import Grid from '../../components/Grid';
import Cell from '../../components/Cell';
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
      totalBound: 0,
      boardWidth: 500
    };

    this.createGrid = this.createGrid.bind(this);
  }

  componentWillMount() {
    this.setState((prevState) => {
      return { totalBound: prevState.userBound + prevState.minBound }
    });
  }

  render() {

    let cellStyle = {
      height: `${ (this.state.boardWidth / this.state.totalBound) - 5 }px`,
    };

    let cells = Array.from(
      new Array((this.state.minBound + this.state.userBound)*(this.state.minBound + this.state.userBound)), (i, t) =>
        <Cell key={ t }
          style={ cellStyle }
          classname={ 'cell' }
          callback={ this.handleSelect }
          text={ 'text' }
        />
     );

    return (
      <div className="universe">
        <Grid
          classname={ 'life-board' }
          bound={ this.state.totalBound }
          width={ this.state.boardWidth }
          gridSettings= { this.createGrid() }
          children={ cells }/>
        <div className="world-meter">
          <Button callback={ this.reduceWorldSize.bind(this) } class={ 'game-button' } text={ 'Shrink' } />
          <Button callback={ this.growWorldSize.bind(this) } class ={ 'game-button' } text={ 'Grow' } />
        </div>
      </div>
    );
  }

  initializeSeed() {

  }

  createGrid() {
    return Array.from(new Array(this.state.totalBound), () => {
      return `${ this.state.boardWidth / this.state.totalBound }px`
    }).join(' ');
  }

  handleSelect(e) {
    console.log('change cell to a live cell for seed generation');
  }

  reduceWorldSize(e) {
    this.setState((prevState, props) => {
      const minBoundCheck = prevState.userBound === 0 ? 0 : prevState.userBound -= 2;
      return { userBound: minBoundCheck, totalBound: prevState.userBound + prevState.minBound }
    });
  }

  growWorldSize(e) {
    this.setState((prevState, props) => {
      const maxBoundCheck = prevState.userBound === 10 ? 10 : prevState.userBound += 2;
      return { userBound: maxBoundCheck, totalBound: prevState.userBound + prevState.minBound }
    });
  }
}
