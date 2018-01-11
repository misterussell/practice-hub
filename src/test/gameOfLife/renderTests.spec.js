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
    expect(GameOfLife.prototype.componentWillMount.calledOnce).to.equal(true);
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

  it('should render only 2 Buttons', () => {
    const game = shallow(<GameOfLife />);
    expect(game.find(Button)).to.have.length(2);
  });

  it('should render 25 Cells by default', () => {
    const game = shallow(<GameOfLife />);
    expect(game.find(Cell)).to.have.length(25);
    expect(game.find(Cell)).to.not.have.length(5);
  });

  it('the updateCell() method should change the state.cells value of an empty cell to 1', () => {
    let testArray = Array.from(new Array(25), i => {
      return 0;
    });
    const game = shallow(<GameOfLife />);
    game.instance().updateCell(0);
    testArray[0] = 1;
    expect(game.state('cells')).to.deep.equal(testArray);
    game.instance().updateCell(1);
    testArray[1] = 1;
    expect(game.state('cells')).to.deep.equal(testArray);
  });

  it('the updateCell() method should change the state.cells value of an alive cell to 0', () => {
    let testArray = Array.from(new Array(25), i => {
      return 0;
    });
    testArray[0] = 1;
    const game = shallow(<GameOfLife />);
    game.instance().updateCell(0);
    expect(game.state('cells')).to.deep.equal(testArray);
  });

  it('the growWorldSize() method should update the userBound, totalBound, and cells state', () =>{
    'do stuff'
  });

});
