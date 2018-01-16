import React from 'react';
import chai, { expect } from 'chai'
import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import defaults from '../defaults';

import GameOfLife from '../../containers/gameOfLife/lifeBoard';
import Button from '../../components/Button';
import Cell from '../../components/Cell';

describe('Game Of Life component:', () => {

  it('should exist', () => {
    const game = mount(<GameOfLife />);
    expect(game).to.exist;
  });

  it('calls componentDidMount', () => {
    spy(GameOfLife.prototype, 'componentDidMount');
    const game = mount(<GameOfLife />);
    expect(GameOfLife.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('calls componentWillMount', () => {
    spy(GameOfLife.prototype, 'componentWillMount');
    const game = mount(<GameOfLife />);
  });

  it('should have a minBound state of 5', () => {
    const game = mount(<GameOfLife />);
    expect(game.state('minBound')).to.equal(5);
  });

  it('should have a boardWidth state of 500', () => {
    const game = mount(<GameOfLife />);
    expect(game.state('boardWidth')).to.equal(500);
  });

  it('should have a default userBound of 0', () => {
    const game = mount(<GameOfLife />);
    expect(game.state('userBound')).to.equal(0);
  });

  it('should render only 3 Buttons', () => {
    const game = shallow(<GameOfLife />);
    expect(game.find(Button)).to.have.length(3);
  });

  it('should render 25 Cells by default', () => {
    const game = shallow(<GameOfLife />);
    expect(game.find(Cell)).to.have.length(25);
    expect(game.find(Cell)).to.not.have.length(5);
  });

  it('the handleCellClick() method should change the state.cells value of an empty cell to 1', () => {
    let testArray = Array.from(new Array(25), i => {
      return 0;
    });
    const game = shallow(<GameOfLife />);
    game.instance().handleCellClick(0);
    testArray[0] = 1;
    expect(game.state('cells')).to.deep.equal(testArray);
    game.instance().handleCellClick(1);
    testArray[1] = 1;
    expect(game.state('cells')).to.deep.equal(testArray);
  });

  it('the handleCellClick() method should change the state.cells value of an alive cell to 0', () => {
    let testArray = Array.from(new Array(25), i => {
      return 0;
    });
    testArray[0] = 1;
    const game = shallow(<GameOfLife />);
    game.instance().handleCellClick(0);
    expect(game.state('cells')).to.deep.equal(testArray);
  });

  it('the handleCellClick() method should not adjust state.hashMap directly because this should only be updated on render and when the game is started', () => {
    // need to figure out how to restore my active spy for componentWillMount so that I can test this again.
    // I will test that the willMount is called again on click
  });

  it('the growWorldSize() method should add cells to the state.cells array, limiting the user to add 10 segments of cells', () =>{
    // a segment of cells is a group of x*x cells
    const game = shallow(<GameOfLife />);
    const newUserBound = 2;
    const cells = 49;
    game.instance().growWorldSize();
    expect(game.state('userBound')).to.equal(2);
    expect(game.state('cells').length).to.equal(49);
  });

  it('the reduceWorldSize() method should remove cells from the state.cells array, but down to the original minBound x minBound array size', () => {
    const game = shallow(<GameOfLife />);
    game.instance().growWorldSize();
    game.instance().reduceWorldSize();
    expect(game.state('userBound')).to.equal(0);
    game.instance().reduceWorldSize();
    expect(game.state('userBound')).to.equal(0);
  });

  it('the updateGameState() method should update the start/stop button and remove functionality from cell clicks,', () => {
    const game = shallow(<GameOfLife />);
    game.instance().updateGameState();
    expect(game.state('gameState')).to.be.true;
    game.instance().updateGameState();
    expect(game.state('gameState')).to.be.false;
  });

});
