import { expect } from 'chai'

import life from '../../drills/gameOfLife/life';

describe('testing', () => {

  let gen = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0]
  ]

  it('getNextGeneration() to return an object when passed an array of arrays', () => {
    expect(life.getNextGeneration(gen, 1)).to.be.an('object');
  });

  it('generateGenState() to return an object when passed an array of arrays', () => {
    expect(life.generateGenState(gen)).to.be.an('object');
  })


})
