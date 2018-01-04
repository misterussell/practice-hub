import React, { Component, PropTypes } from 'react';

import Button from '../../components/Button';
import Grid from '../../components/Grid';
import Cell from '../../components/Cell';
import '../../css/gameOfLife/gameOfLife.css'

import {
  getNextGeneration,
  generateGenState,
  generateNextGenState,
  createCell,
  getNextCellState,
  changeCellState
} from '../../drills/gameOfLife/life';

export default class GameOfLife extends Component {
  constructor() {
    super();
    this.state = {
      minBound: 5,
      userBound: 0,
      totalBound: 0,
      boardWidth: 500,
      cells: [],
      hashMap: {}
    };

    this.createGrid = this.createGrid.bind(this);
  }

  componentWillMount() {
    this.setState((prevState) => {
      return { totalBound: prevState.userBound + prevState.minBound }
    });
  }

  componentDidMount() {
    this.setState((prevState) => {
      return { cells: this.createCellArray(this.state.totalBound * this.state.totalBound) }
    });
  }

  render() {

    const cellStyle = {
      height: `${ (this.state.boardWidth / this.state.totalBound) - 5 }px`,
    };

    let cells = this.state.cells.map((cell, i) => {
      return <Cell key={ i }
          style={ cellStyle }
          classname={ 'cell' }
          text={ 'text' }
          callback={ this.activateCell.bind(this) }
          cellNumber={ i }
          cellState={ cell }
        />
    });

    return (
      <div className="universe">
        <Grid
          classname={ 'life-board' }
          bound={ this.state.totalBound }
          width={ this.state.boardWidth }
          gridSettings= { this.createGrid() }>
          { cells }
        </Grid>
        <div className="world-meter">
          <Button callback={ this.reduceWorldSize.bind(this) } class={ 'game-button' } text={ 'Shrink' } />
          <Button callback={ this.growWorldSize.bind(this) } class ={ 'game-button' } text={ 'Grow' } />
        </div>
      </div>
    );
  }

  createCellArray(length) {
    let cells = [];

    for (var i = 0; i < length; i++) {
      cells.push(0);
    }

    return cells;
  }

  createHashableArray(cells) {
    
  }

  createGrid() {
    return Array.from(new Array(this.state.totalBound), () => {
      return `${ this.state.boardWidth / this.state.totalBound }px`
    }).join(' ');
  }

  reduceWorldSize(e) {
    this.setState((prevState) => {
      const minBoundCheck = prevState.userBound === 0 ? 0 : prevState.userBound -= 2;
      const newTotalBound = prevState.userBound + prevState.minBound;
      const newCells = prevState.cells.slice(0, (newTotalBound * newTotalBound));
      return { userBound: minBoundCheck,
               totalBound: newTotalBound,
               cells: newCells
             }
    });
  }

  growWorldSize(e) {
    this.setState((prevState) => {
      const maxBoundCheck = prevState.userBound === 10 ? 10 : prevState.userBound += 2;
      const newTotalBound = maxBoundCheck + prevState.minBound;
      const totalNewCells = ((newTotalBound * newTotalBound) - (prevState.totalBound * prevState.totalBound));
      return {
              userBound: maxBoundCheck,
              totalBound: newTotalBound,
              cells: [...prevState.cells, ...this.createCellArray(totalNewCells)]
             }
    });
  }

  activateCell(cell) {
    this.setState((prevState) => {
      const cellState = prevState.cells[cell] === 0 ? 1 : 0;
      const copy = [...prevState.cells]
      copy[cell] = cellState;
      return { cells: copy }
    })
  }
}
