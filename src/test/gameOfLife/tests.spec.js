import { expect } from 'chai'

import {
  getNextGeneration,
  generateGenState,
  generateNextGen,
  createCell,
  getNextCellState
} from '../../drills/gameOfLife/life';

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
    expect(getNextGeneration(gen, 1)).to.be.an('object');
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
  })

  it('the cell object created should have properties: x, y, cellHash, cellState, toroidal limits, getNextState(), and getHash()', () => {
    expect(testCell).to.have.property('x');
    expect(testCell).to.have.property('y');
    expect(testCell).to.have.property('cellHash');
    expect(testCell).to.have.property('cellState');
  });

  it('a generation seed, the initial object, should not have an nextState property before the first tick', () => {
    expect(testGen[testCell.cellHash]).to.not.have.property('nextState')
    generateNextGen(testGen);
    expect(testGen[testCell.cellHash]).to.have.property('nextState');
  });

  it('getNextCellState() should return an object', () => {
    expect(getNextCellState).to.be.a('function');
    expect(getNextCellState(testCell, testGen)).to.be.an('object');
  });

  it('getNextCellState() should set the state of the cell to 0 or 1', () => {
    2,3
    let secondCell = createCell(2, 3, cellState, toroidalLimits);
    expect(getNextCellState(testCell, testGen));
    expect(getNextCellState(secondCell, testGen));
  });

  it('getNextCellState() should return a cell with a dead inner field when the sum of itself + neighbors is less than 3 or greater than 4, a live cell if the sum is 3, and an unchanged cell if the sum is 4', () => {
    gen = [
        [1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 1]
    ];
    testCell = createCell(2, 2, 1, [5, 5]);
    expect(testCell).to.not.have.property('nextState');
    testGen = getNextGeneration(gen, 2);
    expect(testGen[testCell.cellHash].nextState).to.equal(0);

    let testCell2 = createCell(4, 4, 1, [5, 5]);
    expect(testGen[testCell2.cellHash].nextState).to.equal(1);

    let testCell3 = createCell(4, 3, 1, [5, 5]);
    expect(testGen[testCell3.cellHash].nextState).to.equal(1);

  });

  it('getNextCellState() should return a live cell when the sum of itself + neighbors is 3', () => {
    gen = [
        [1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 1]
    ];
    testCell = createCell(4, 4, 1, [5, 5]);
    expect(testCell).to.not.have.property('nextState');
    testGen = getNextGeneration(gen, 2);
    expect(testGen[testCell.cellHash].nextState).to.equal(1);
  });

  it('getNextCellState() should return an unchanged cell when the sum of itself + neighbors is 4', () => {
    gen = [
        [1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 1]
    ];
    createCell(4, 3, 1, [5, 5]);
    expect(testCell).to.not.have.property('nextState');
    testGen = getNextGeneration(gen, 2);
    expect(testGen[testCell.cellHash].nextState).to.equal(1);
  });


  it('generateNextGen() should return an object', () => {
    expect(generateNextGen).to.be.a('function');
    expect(generateNextGen(testGen)).to.be.an('object');
  })


})
