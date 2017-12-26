function getNextGeneration(cells, generations) {
  // store the computed current generation
  const currentGen = generateGenState(cells)
  const nextGen = generateNextGen(currentGen);
  const noCells = cells.length === 0 ? true : false;
  return noCells ? [] : nextGen;
}

function generateGenState(rawCells) {
  let genState = {};
    rawCells.forEach((terrian, i, arr) => {
      terrian.forEach((cell, p, arr2) => {
        const toroidalLimits = [arr.length, arr2.length]
        const cellState = cell;
        const cellObj = createCell(i + 1, p + 1, cellState, toroidalLimits);
        return genState[cellObj.cellHash] === undefined ? genState[cellObj.cellHash] = cellObj : null
      });
   });
  return genState;
}

function generateNextGen(gen) {
  // for each Cell in our hashmap see if the value changes
  for (let cell in gen) {
    gen[cell] = getNextCellState(gen[cell], gen)
  }
  return gen;
}

function createCell(x, y, cellState, toroidalLimits) {
  // factory settings
  const cellHash = (x * 15486047) + (y * 15487429);
  // factory
  const Cell = () => ({
    x,
    y,
    cellHash,
    cellState,
    toroidalLimits
  });

  return Cell();
}

function getNextCellState(cell, genState) {
  // if the x value is 1 we need to check against x values with toroidalLimits[0]
  // if the x value is 5 we need to check against x values of 1
  // if the y value is 1 we need to check against y values toroidalLimits[1]
  // if the y value is 5 we need to check against y values of 1
  const lowLimit = cell.x === cell.toroidalLimits[0] ? 1 : cell.x + 1;
  const highLimit = cell.x === 1 ? cell.toroidalLimits[0] : cell.x - 1;
  const rightLimit = cell.y === cell.toroidalLimits[1] ? 1 : cell.y + 1;
  const leftLimit = cell.y === 1 ? cell.toroidalLimits[1] : cell.y - 1;

  const blockSum = [
      [highLimit, leftLimit],
      [highLimit, cell.y],
      [highLimit, rightLimit],
      [cell.x, leftLimit], /* current cell */
      [cell.x, rightLimit],
      [lowLimit, leftLimit],
      [lowLimit, cell.y],
      [lowLimit, rightLimit]
      ].map(neighbor => {
        return genState[(neighbor[0] * 15486047) + (neighbor[1] * 15487429)].cellState;
      }).reduce((a, b) => a + b);

  const sum3 = blockSum === 3 ? true : false;
  const sum4 = blockSum === 4 ? true : false
  const nextState = sum3 ? 1 : sum4 ? cell.cellState : 0;

  return {...cell, nextState };
}

export { getNextGeneration, generateGenState, generateNextGen, createCell, getNextCellState };
