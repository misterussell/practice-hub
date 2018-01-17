import React, { Component} from 'react';
import { ButtonGroup } from 'react-bootstrap'

import Button from '../../components/Button';
import Grid from '../../components/Grid';
import Cell from '../../components/Cell';
import GameModal from '../../components/GameModal';

// import '../../css/gameOfLife/gameOfLife.css'

import Store from '../../Store';

import {
  generateGenState,
  generateNextGenState,
  createCellArray,
  createHashableArray,
} from '../../drills/gameOfLife/life';

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
      activeCells: 0,
      hashMap: {},
      gameState: false,
      pendingChanges: {},
      interval: null,
      modal: {
        show: false,
        title: 'title',
        header: 'header',
        text: 'text'
      }
    };
  }

  componentWillMount() {
    this.setState((prevState) => {
      return { totalBound: prevState.userBound + prevState.minBound }
    });

  }

  componentDidMount() {
    let cells = createCellArray(this.state.totalBound * this.state.totalBound);

    this.setState((prevState) => {
      return { cells }
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
          callback={ this.state.gameState === false ? this.handleCellClick.bind(this) : null }
          cellNumber={ i }
          cellState={ cell }
        />
    });

    return (
      <div className="universe">
        <GameModal
          showModal={ this.state.modal.show }
          callback={ this.handleModal.bind(this) }
          title={ this.state.modal.title }
          header={ this.state.modal.header }
          text={ this.state.modal.text }
          animation={ true }/>
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
            <Button callback={ this.clearGameBoard.bind(this) } classname={ 'game-button clear'} text={ 'Clear' } />
            <Button callback={ this.growWorldSize.bind(this) } classname ={ 'game-button grow' } text={ 'Grow' } />
          </ButtonGroup>
        </div>
      </div>
    );
  }

  createGrid() {
    return Array.from(new Array(this.state.totalBound), () => {
      return `${ this.state.boardWidth / this.state.totalBound }px`
    }).join(' ');
  }

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
  }

  growWorldSize(e) {
    this.setState((prevState) => {
      const maxBoundCheck = prevState.userBound === 12 ? 12 : prevState.userBound += 2;
      const newTotalBound = maxBoundCheck + prevState.minBound;
      const totalNewCells = ((newTotalBound * newTotalBound) - (prevState.totalBound * prevState.totalBound));
      return {
              userBound: maxBoundCheck,
              totalBound: newTotalBound,
              cells: [...prevState.cells, ...createCellArray(totalNewCells)]
             }
    });
  }

  handleCellClick(cell) {
    return this.state.cells[cell] === undefined
      ? console.log('does not exist')
      : this.setState((prevState) => {
          const cellState = prevState.cells[cell] === 0 ? 1 : 0;
          const activeCells = prevState.cells[cell] === 0 ? prevState.activeCells += 1 : prevState.activeCells -=1;
          const copy = [...prevState.cells]
          copy[cell] = cellState;
          return { cells: copy, activeCells }
        });
  };

  updateGameState(e) {
    this.setState((prevState) => {
      const gameState = prevState.gameState === true ? false : true;
      const interval = prevState.gameState === true ? clearInterval(prevState.interval) : setInterval(this.updateGameBoard.bind(this), 175);
      return { gameState, interval };
    });
  }

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
          // add active cell tracking for modal message
          const modal = {
            show: true,
            title: 'Game Over',
            header: 'Your civilization has died.',
            text: 'Text'
          };
          nextState = { gameState: false, interval: clearInterval(prevState.interval), modal }
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
  }

  clearGameBoard() {
    let cells = createCellArray(this.state.totalBound * this.state.totalBound);

    return this.state.activeCells === 0
      ? null
      : this.state.gameState === true
        ? null
        : this.setState((prevState) => {
          return { cells, activeCells: 0 }
        });
  }

  handleModal() {
    return this.setState((prevState) => {
      let modal;
      let show;
      if (prevState.modal.show === true) {
        show = false;
        modal = { ...prevState.modal, show };
      } else {
        show = true;
        modal = { ...prevState.modal, show };
      }
      return { modal }
    });
  }
};
