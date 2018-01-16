import React, { Component} from 'react';
import { ButtonGroup } from 'react-bootstrap'

import Button from '../../components/Button';
import Grid from '../../components/Grid';
import Cell from '../../components/Cell';

// import '../../css/gameOfLife/gameOfLife.css'

import Store from '../../Store';

import {
  generateGenState,
  generateNextGenState,
  createCellArray,
  createHashableArray,
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
      hashMap: {},
      gameState: false,
      pendingChanges: {},
      interval: null
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

    this.setState((prevState) => {
      return { cells }
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
          callback={ this.state.gameState === false ? this.handleCellClick.bind(this) : null }
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
          <ButtonGroup bsStyle="large">
            <Button callback={ this.reduceWorldSize.bind(this) } classname={ 'game-button shrink' } text={ 'Shrink' }/>
            <Button callback={ this.updateGameState.bind(this) } classname={ 'game-button start-stop' }  text={ this.state.gameState === false ? 'Start' : 'Stop' } />
            <Button callback={ this.growWorldSize.bind(this) } classname ={ 'game-button grow' } text={ 'Grow' } />
          </ButtonGroup>
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
    return this.setState((prevState) => {
      const minBoundCheck = prevState.userBound === 0 ? 0 : prevState.userBound -= 2;
      const newTotalBound = prevState.userBound + prevState.minBound;
      const newCells = prevState.cells.slice(0, (newTotalBound * newTotalBound));
      return { userBound: minBoundCheck,
               totalBound: newTotalBound,
               cells: newCells
             };
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

  handleCellClick(cell) {
    return this.state.cells[cell] === undefined
      ? console.log('does not exist')
      : this.setState((prevState) => {
          const cellState = prevState.cells[cell] === 0 ? 1 : 0;
          const copy = [...prevState.cells]
          copy[cell] = cellState;
          return { cells: copy }
        });
  };

  updateGameState(e) {
    this.setState((prevState) => {
      const gameState = prevState.gameState === true ? false : true;
      const interval = prevState.gameState === true ? clearInterval(prevState.interval) : setInterval(this.updateGameBoard.bind(this), 1000)
      return { gameState, interval };
    });
  };

  updateGameBoard() {
    return this.setState((prevState) => {
      let hashMap;
      let cells;
      let nextState;
      if (prevState.gameState === false) {
        cells = [...prevState.cells];
        nextState = { cells };
      } else {
        hashMap = generateNextGenState(generateGenState(createHashableArray(prevState.cells, prevState.totalBound)));
        cells = [...prevState.cells];
        if (Object.keys(Store.changes).length === 0) {
          nextState = { gameState: false, interval: clearInterval(prevState.interval) }
        } else {
          Object.keys(Store.changes).forEach(key => {
            cells[key] = Store.changes[key];
          });
          Store.changes = {};
          nextState = { hashMap, cells };
        }
      }
      return nextState;
    });
  };

};
