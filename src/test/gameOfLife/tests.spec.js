import { expect } from 'chai'

import {
  getNextGeneration,
  generateGenState,
  generateNextGen,
  createCell,
  getNextCellState
} from '../../drills/gameOfLife/life';

describe('Of the generation functions:', () => {

  let gen, x, y, cellState, toroidalLimits, testCell, testGen;

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
    expect(getNextGeneration(gen, 1)).to.be.an('object');
  });

  it('generateGenState() should return an object when passed an array of arrays', () => {
    expect(generateGenState(gen)).to.be.an('object');
  });

  it('createCell() should return an object when passed an x, y, cellState, and toroidalLimits array', () => {
    expect(createCell(x, y, cellState, toroidalLimits)).to.be.an('object');
  });

  it('the cell created should have properties: x, y, cellHash, cellState, toroidal limits, getNextState(), and getHash()', () => {
    expect(testCell).to.have.property('x');
    expect(testCell).to.have.property('y');
    expect(testCell).to.have.property('cellHash');
    expect(testCell).to.have.property('cellState');
    expect(testCell).to.have.property('toroidalLimits');
  })

  it('a generation seed should not have an nextState property if before the first tick', () => {
    expect(testGen[testCell.cellHash]).to.not.have.property('nextState')
    generateNextGen(testGen);
    expect(testGen[testCell.cellHash]).to.have.property('nextState');
  })

  it('getNextCellState() should return an object', () => {
    expect(getNextCellState(testCell, testGen)).to.be.an('object');
  })

  it('getNextCellState() should set the state of the cell to 0 or 1', () => {
    2,3
    let secondCell = createCell(2, 3, cellState, toroidalLimits);
    expect(getNextCellState(testCell, testGen));
    expect(getNextCellState(secondCell, testGen));
  })

})
