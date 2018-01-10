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

describe('Game Of Life component:', () => {

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

  it('should exist', () => {
    const game = mount(<GameOfLife />);
    expect(game).to.exist;
  });

  it('should have a minBound state of 5', () => {
    const game = mount(<GameOfLife />);
    expect(game.state('minBound')).to.equal(5);
  });

  it('should have a minBound state of 5', () => {
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


});
