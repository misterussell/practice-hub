import React, { Component} from 'react';

import Button from '../../components/Button';
import Grid from '../../components/Grid';
import Cell from '../../components/Cell';

// import '../../css/gameOfLife/gameOfLife.css'

import {
  getNextGeneration,
  generateGenState,
  generateNextGenState,
  createCell,
  getNextCellState,
  changeCellState,
  createCellArray,
  createHashableArray,
  pipe
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
  };

  componentWillMount() {
    this.setState((prevState) => {
      return { totalBound: prevState.userBound + prevState.minBound }
    });
  };

  componentDidMount() {
    let cells = createCellArray(this.state.totalBound * this.state.totalBound);
    let hashableArray = createHashableArray(cells, this.state.totalBound);
    let hashMap = generateGenState(hashableArray);

    this.setState((prevState) => {
      return { cells, hashMap }
    });
  };

  render() {

    const cellStyle = {
      height: `${ (this.state.boardWidth / this.state.totalBound) - 5 }px`,
    };

    let cells = this.state.cells.map((cell, i) => {
      return <Cell key={ i }
          style={ cellStyle }
          classname={ 'cell' }
          text={ 'text' }
          callback={ this.updateCell.bind(this) }
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
          <Button callback={ this.reduceWorldSize.bind(this) } classname={ 'game-button' } text={ 'Shrink' } />
          <Button callback={ this.growWorldSize.bind(this) } classname ={ 'game-button' } text={ 'Grow' } />
        </div>
      </div>
    );
  };

  createGrid() {
    return Array.from(new Array(this.state.totalBound), () => {
      return `${ this.state.boardWidth / this.state.totalBound }px`
    }).join(' ');
  };

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
  };

  growWorldSize(e) {
    this.setState((prevState) => {
      const maxBoundCheck = prevState.userBound === 10 ? 10 : prevState.userBound += 2;
      const newTotalBound = maxBoundCheck + prevState.minBound;
      const totalNewCells = ((newTotalBound * newTotalBound) - (prevState.totalBound * prevState.totalBound));
      return {
              userBound: maxBoundCheck,
              totalBound: newTotalBound,
              cells: [...prevState.cells, ...createCellArray(totalNewCells)]
             }
    });
  };

  updateCell(cell) {
    return this.state.cells[0] === undefined
      ? console.log('does not exist')
      : this.setState((prevState) => {
          const cellState = prevState.cells[cell] === 0 ? 1 : 0;
          const copy = [...prevState.cells]
          copy[cell] = cellState;
          return { cells: copy }
        });
      };
};
