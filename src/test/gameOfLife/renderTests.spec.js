import React from 'react';
import chai, { expect } from 'chai'
import Enzyme from 'enzyme';
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import GameOfLife from '../../containers/gameOfLife/lifeBoard';

describe('Main Game Of Life component:', () => {
  let gameOfLife;

  beforeEach(() => {
    gameOfLife = shallow(<GameOfLife />);
  });

  it('calls componentDidMount', () => {

  });

});
