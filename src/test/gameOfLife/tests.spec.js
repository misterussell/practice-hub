// import React from 'react';
import chai, { expect } from 'chai'
// import Enzyme from 'enzyme';
// import { shallow } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

import {
  getNextGeneration,
  generateGenState,
  generateNextGenState,
  setNextGenState,
  createCell,
  getNextCellState,
  changeCellState,
  createCellArray,
  createHashableArray
} from '../../drills/gameOfLife/life';

// import GameOfLife from '../../containers/gameOfLife/lifeBoard';

describe('Of the generation functions:', () => {

  let gen;
  let x;
  let y;
  let cellState;
  let toroidalLimits;
  let testCell;
  let testGen;

  beforeEach(() => {
    gen = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ];
    x = 1;
    y = 1;
    cellState = true;
    toroidalLimits = [5, 5]
    testCell = createCell(x, y, cellState, toroidalLimits);
    testGen = generateGenState(gen);
  });

  it('getNextGeneration() should return an object when passed an array of arrays', () => {
    expect(getNextGeneration).to.be.a('function');
  });

  it('getNextGeneration() should return an empty array is passed an empty array', () => {
    expect(getNextGeneration([], 1)).to.deep.equal([])
  });

  it('generateGenState() should return an object when passed an array of arrays', () => {
    expect(generateGenState).to.be.a('function');
    expect(generateGenState(gen)).to.be.an('object');
  });

  it('createCell() should return an object when passed an x, y, cellState, and toroidalLimits array', () => {
    expect(createCell).to.be.a('function');
    expect(createCell(x, y, cellState, toroidalLimits)).to.be.an('object');
  });

  it('createCell() should correctly compute a unique hash', () => {
    let result = (1 * 15486047) + (y * 15487429);
    expect(testCell.cellHash).to.equal(result)
  });

  it('getNextCellState() should return an object', () => {
    expect(getNextCellState).to.be.a('function');
    expect(getNextCellState(testCell, testGen)).to.be.an('object');
  });

  it('getNextCellState() should set the state of the cell to 0 or 1', () => {
    let secondCell = createCell(2, 3, cellState, toroidalLimits);
    expect(getNextCellState(testCell, testGen));
    expect(getNextCellState(secondCell, testGen));
  });

  it('generateNextGenState() should return an object', () => {
    expect(generateNextGenState).to.be.a('function');
    expect(generateNextGenState(testGen, 1)).to.be.an('object');
  });

  it('createCellArray() should return an array of the specified length', () => {
    expect(createCellArray(10)).to.be.an('array');
    expect(createCellArray(10)).to.have.lengthOf(10);
  });

  it('createHashableArray() should return an array', () => {
    expect(createHashableArray([0, 0, 0, 0, 0, 0, 0, 0, 0], 3)).to.be.an('array');
    expect(createHashableArray([0, 0, 0, 0, 0, 0, 0, 0, 0], 3)).to.deep.equal([[0,0,0],[0,0,0],[0,0,0]]);
    expect(createHashableArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 5)).to.deep.equal([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]);
  });

});

describe('Specific patterns should match for the toroidal arrays:', () => {

  let gen;

  function getHash(x, y) {
    return (x * 15486047) + (y * 15487429);
  }

  beforeEach(() => {
    gen = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ];
  });

  it('corners should share each other as neighbors', () => {
    gen = [
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1]
    ];
    let objectOutput = getNextGeneration(gen, 2);
    expect(objectOutput[getHash(1, 1)].cellState).to.equal(1);
    expect(objectOutput[getHash(1, 5)].cellState).to.equal(1);
    expect(objectOutput[getHash(5, 1)].cellState).to.equal(1);
    expect(objectOutput[getHash(5, 5)].cellState).to.equal(1);

    objectOutput = getNextGeneration(gen, 1);
    expect(objectOutput[getHash(1, 1)].cellState).to.equal(1);
    expect(objectOutput[getHash(1, 5)].cellState).to.equal(1);
    expect(objectOutput[getHash(5, 1)].cellState).to.equal(1);
    expect(objectOutput[getHash(5, 5)].cellState).to.equal(1);

    objectOutput = getNextGeneration(gen, 3);
    expect(objectOutput[getHash(1, 1)].cellState).to.equal(1);
    expect(objectOutput[getHash(1, 5)].cellState).to.equal(1);
    expect(objectOutput[getHash(5, 1)].cellState).to.equal(1);
    expect(objectOutput[getHash(5, 5)].cellState).to.equal(1);
  });

});

describe('A cell should:', () => {

  let gen;
  let x;
  let y;
  let cellState;
  let toroidalLimits;
  let testCell;
  let testGen;

  function getHash(x, y) {
    return (x * 15486047) + (y * 15487429);
  }

  beforeEach(() => {
    gen = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ];
    x = 1;
    y = 1;
    cellState = true;
    toroidalLimits = [5, 5]
    testCell = createCell(x, y, cellState, toroidalLimits);
    testGen = generateGenState(gen);
  });

  it('As a generation seed, not have a nextState property before the first tick', () => {
    expect(testGen[testCell.cellHash]).to.not.have.property('nextState')
    generateNextGenState(testGen);
    expect(testGen[testCell.cellHash]).to.have.property('nextState');
  });

  it('have properties: x, y, cellHash, cellState, and toroidal limits,', () => {
    expect(testCell).to.have.property('x');
    expect(testCell).to.have.property('y');
    expect(testCell).to.have.property('cellHash');
    expect(testCell).to.have.property('cellState');
  });

  it('should die with < 2 neighbors', () => {
    gen = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ];
    let objectOutput = getNextGeneration(gen, 2);
    expect(objectOutput[getHash(4, 3)].cellState).to.equal(0);
  });

  it('should die with a sum of > 4 neighbors and itself', () => {
    gen = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ];
    let objectOutput = getNextGeneration(gen, 1);
    expect(objectOutput[getHash(4, 3)].cellState).to.equal(0);
  });

  it('should become alive with a sum of 3 neighbors and itself', () => {
    gen = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ];
    let objectOutput = getNextGeneration(gen, 1);
    expect(objectOutput[getHash(4, 3)].cellState).to.equal(1);
  });

  it('should not change state with a sum of 4 neighbors and itself', () => {
    gen = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ];
    let objectOutput = getNextGeneration(gen, 1);
    expect(objectOutput[getHash(3, 3)].cellState).to.equal(0);
  })

});

// describe('Main section component', () => {
//   let gameOfLife;
//
//   beforeEach(() => {
//     gameOfLife = shallow(<GameOfLife />);
//   });
//
//   it('calls componentDidMount', () => {
//     console.log('test');
//   });
//
// });
