import Store from '../../Store';

const _pipe = (a, b) => (...args) => b(a(...args));
const pipe = (...fns) => fns.reduce(_pipe);

// let store = {};
// store.changes = {};

function getNextGeneration(cells, generations) {
  const initiateSeed = pipe(generateGenState, generateNextGenState, setNextGenState);
  const progressLife = pipe(generateNextGenState, setNextGenState)

  const noCells = cells.length === 0 ? true : false;
  const areSeedCells = Array.isArray(cells) === true ? true : false;
  const live = generations > 0 ? true : false

    return noCells
      ? []
      : live
        ? areSeedCells
          ? getNextGeneration(initiateSeed(cells), generations - 1)
          : getNextGeneration(progressLife(cells), generations - 1)
        : cells
}

function generateGenState(rawCells) {
  let genState = {};
  let arrayPosition = 0;
  rawCells.forEach((terrian, i, arr) => {
    terrian.forEach((cell, p, arr2) => {
      const toroidalLimits = [arr.length, arr2.length];
      const cellState = cell;
      const cellObj = createCell(i + 1, p + 1, cellState, toroidalLimits, arrayPosition);
      arrayPosition += 1;
      return genState[cellObj.cellHash] = cellObj;
    });
  });
  return genState;
}

function generateNextGenState(gen) {
  // for each Cell in our hashmap see if the value changes
  for (let cell in gen) {
    gen[cell] = getNextCellState(gen[cell], gen)
  }
  return gen;
}

function setNextGenState(gen) {
  let newGen = {};
  for (let cell in gen) {
    newGen[cell] = changeCellState(gen[cell])
  }
  // console.log(gen);
  // console.log(newGen);
  // because of the way this factory works, in order to be able to actively track the object changes without implementing some sort of timeout/promise setup we need to return a copy of our object at each change pass. I anticipate needing to store some sort of emit
  return newGen;
}

function createCell(x, y, cellState, toroidalLimits, arrayPosition) {
  // factory settings
  const cellHash = (x * 15486047) + (y * 15487429);
  // factory
  const Cell = () => ({
    x,
    y,
    cellHash,
    cellState,
    toroidalLimits,
    arrayPosition
  });
  return Cell();
}

function getNextCellState(cell, genState) {
  const lowLimit = cell.x === cell.toroidalLimits[0] ? 1 : cell.x + 1;
  const highLimit = cell.x === 1 ? cell.toroidalLimits[0] : cell.x - 1;
  const rightLimit = cell.y === cell.toroidalLimits[1] ? 1 : cell.y + 1;
  const leftLimit = cell.y === 1 ? cell.toroidalLimits[1] : cell.y - 1;

  const blockSum = [
      [highLimit, leftLimit], [highLimit, cell.y], [highLimit, rightLimit],
      [cell.x, leftLimit], [cell.x, cell.y], [cell.x, rightLimit],
      [lowLimit, leftLimit], [lowLimit, cell.y], [lowLimit, rightLimit]
    ].map(xyPosition => {
        return genState[(xyPosition[0] * 15486047) + (xyPosition[1] * 15487429)].cellState;
      }).reduce((a, b) => a + b);

  const sum3 = blockSum === 3 ? true : false;
  const sum4 = blockSum === 4 ? true : false
  const nextState = sum3 ? 1 : sum4 ? cell.cellState : 0;

  if (cell.cellState !== nextState) {
    Store.changes[cell.arrayPosition] = nextState;
  }

  return { ...cell, nextState };
}

function changeCellState(cell) {
  const nextState = cell.nextState;
  const cellState = nextState;
  // this is what will need to change the visuals if I put this on screen
  return { ...cell, cellState, nextState: null}
}

function createCellArray(length) {
  let cells = [];

  for (var i = 0; i < length; i++) {
    cells.push(0);
  }

  return cells;
}

function createHashableArray(cells, totalBound) {
  let hashableArray = [];

  for (let i = 0; i < totalBound * totalBound; i += totalBound) {
    hashableArray.push(cells.slice(i, i + totalBound));
  }

  return hashableArray;
}

// let testArray = Array.from(new Array(25), t => {
  // return 0;
// });

// testArray[4] = 1;
// testArray[10] = 1;
// console.log(testArray);

// let testObj = generateGenState(createHashableArray(testArray, 5));

// console.log(testObj);

// let objKeys = Object.keys(testObj)

// let updatedObj = generateNextGenState(testObj);

// console.log(updatedObj);

// hard overwriting each store.changes each time updates are made
// console.log(store);

// updatedObj = generateNextGenState(updatedObj);

// console.log(testArray);

// Object.keys(store.changes).forEach(key => {
//   testArray[key] = store.changes[key];
// });

// console.log(store);
// console.log(testArray);

// updatedObj = generateNextGenState(updatedObj);
// console.log(store);

export { getNextGeneration, generateGenState, generateNextGenState, createCell, getNextCellState, changeCellState, createCellArray, createHashableArray, pipe };
