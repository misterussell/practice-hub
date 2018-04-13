import React, { Component } from 'react';
import { ButtonGroup } from 'react-bootstrap'

import Button from '../components/Button';
import Grid from '../components/Grid';
import Cell from '../components/Cell';
import Hero from '../components/Hero';

// import '../../css/gameOfLife/gameOfLife.css'

import Store from '../Store';

export default class GameOfLife extends Component {
  constructor(...args) {
    super(...args);

    this.createGrid = this.createGrid.bind(this);

    this.state = {
      minBound: 5,
      userBound: 0,
      totalBound: 0,
      boardWidth: 500,
      cells: [],
      gameOn: false,
      interval: null,
      gameOver: false
    };
  }

  componentWillMount() {
    this.setState((prevState) => {
      return { totalBound: prevState.userBound + prevState.minBound };
    });
  }

  componentDidMount() {
    this.setState((prevState) => {
      let cells = Store.cells.createCellArray(this.state.totalBound * this.state.totalBound);
      return { cells };
    });
  }

  render() {

    const cellStyle = {
      height: `${ (this.state.boardWidth / this.state.totalBound) - 5 }px`,
    };

    const gameOverHero = this.state.gameOver === true
      ? <Hero
          stats={ Store.tracking.compileStats() }
          gridSettings={{
            classname: 'stat-board',
            width: this.state.boardWidth,
            gridTemplate: this.createGrid()
            }}
          close={ this.closeHero.bind(this) }
        />
      : null;

    let cells = this.state.cells.map((cell, i) => {

      return <Cell key={ i }
          style={ cellStyle }
          classname={ 'cell' }
          text={ 'text' }
          callback={ this.state.gameOn === false ? this.handleCellClick.bind(this) : null }
          cellNumber={ i }
          cellState={ cell }
        />
    });

    return (
      <div className="universe">
        <Grid
          classname={ 'life-board' }
          width={ this.state.boardWidth }
          gridTemplate= { this.createGrid() }>
          { cells }
        </Grid>
        <div className="world-meter">
          <ButtonGroup bsStyle="large">
            <Button callback={ this.state.gameOn === false ? this.reduceWorldSize.bind(this) : null } classname={ 'game-button shrink' } text={ 'Shrink' }/>
            <Button callback={ this.updateGameState.bind(this) } classname={ 'game-button start-stop' }  text={ this.state.gameOn === false ? 'Start' : 'Stop' } />
            <Button callback={ this.state.gameOn === false ? this.clearGameBoard.bind(this) : null } classname={ 'game-button clear'} text={ 'Clear' } />
            <Button callback={ this.state.gameOn === false ? this.growWorldSize.bind(this) : null } classname ={ 'game-button grow' } text={ 'Grow' } />
          </ButtonGroup>
        </div>
        { gameOverHero }
      </div>
    );
  }

  createGrid() {
    return Array.from(new Array(this.state.totalBound), () => {
      return `${ this.state.boardWidth / this.state.totalBound }px`
    }).join(' ');
  }

  reduceWorldSize(e) {
    return this.state.userBound === 0
      ? null
      : this.setState((prevState) => {
      // console.log(Store.cells.shrinkCellArray(prevState.cells, 2));
      const userBound = prevState.userBound -= 2;
      const newTotalBound = userBound + prevState.minBound;
      const cells = Store.cells.shrinkCellArray(prevState.cells, 2);
      return { userBound,
               totalBound: newTotalBound,
               cells,
               gameOver: false
             };
    });
  }

  growWorldSize(e) {
    // adjusting the userbound here will allow for a larger grid.
    return this.state.userBound === 12
      ? null
      : this.setState((prevState) => {
      const userBound = prevState.userBound += 2;
      const newTotalBound = userBound + prevState.minBound;
      const cells = Store.cells.growCellArray(prevState.cells, 2);
      return {
              userBound,
              totalBound: newTotalBound,
              cells,
              gameOver: false
            };
    });
  }

  handleCellClick(cell) {
    return this.state.cells[cell] === undefined
      ? console.log('does not exist')
      : this.setState((prevState) => {
          let cells = [...prevState.cells];
          const cellState = prevState.cells[cell] === 0 ? 1 : 0;
          const activeCells = prevState.cells[cell] === 0 ? prevState.activeCells += 1 : prevState.activeCells -=1;
          cells[cell] = cellState;
          Store.cells.getHashMap(cells, prevState.totalBound);
          return {
            cells,
            activeCells,
            gameOver: false
          };
        });
  }

  updateGameState(e) {
    return this.setState((prevState) => {
      const gameOn = prevState.gameOn === true ? false : true;
      const interval = prevState.gameOn === true
        ? clearInterval(prevState.interval)
        : setInterval(this.updateGameBoard.bind(this), 300);
      return { gameOn, interval, gameOver: false };
    });
  }

  updateGameBoard() {
    return this.setState((prevState) => {
      let cells;
      let nextState;

      let hashMap = Store.cells.getHashMap(prevState.cells, prevState.totalBound);

      Store.tracking.updateHistory(hashMap);

      if (prevState.gameOn === false) {
        nextState = { cells: [...prevState.cells] };
      } else {
        Store.changes = Store.cells.getChangedCells();
        // create mutable copy of current state.cells array
        cells = [...prevState.cells];

        // check changes to life state from the new life state above
        if (Object.keys(Store.changes).length === 0) {
          nextState = {
                        gameOn: false,
                        interval: clearInterval(prevState.interval),
                        gameOver: true
                      };
        } else {
          Object.keys(Store.changes).forEach(key => {
            cells[key] = Store.changes[key];
          });
          Store.changes = {};
          nextState = { cells };
        }
      }
      return nextState;
    });
  }

  clearGameBoard() {
    let cells = Store.cells.createCellArray(Math.pow(this.state.totalBound, 2));

    return this.state.activeCells === 0
      ? null
      : this.state.gameOn === true
        ? null
        : this.setState((prevState) => {
          return { cells, gameOver: false };
        });
  }

  closeHero() {
    return this.setState(prevState => {
      let cells = Store.cells.createCellArray(Math.pow(this.state.totalBound, 2));
      return { gameOver: false , cells };
    });
  }

};
