import Cell from '../models/Cell';

export default function Cells() {
  let hashMap = {};

  function getHashMap(cells, toroidalBound) {
    const toroidalArray = createToroidalArray(cells, toroidalBound);
    const cellObjs = createCellObjects(toroidalArray);
    const cellsWithNextState = getNextCells(cellObjs);
    return hashMap;
  }

  function createCellArray(length) {
    let cells = [];

    for (var i = 0; i < length; i++) {
      cells.push(0);
    }

    return cells;
  }

  function growCellArray(array, alpha) {
    const newRow = Array.from(new Array(Math.sqrt(array.length) + alpha), () => {
      return 0;
    });
    const rowPadding = Array.from(new Array(alpha / 2), () => {
      return 0;
    });
    const updatedRows = createToroidalArray(array, Math.sqrt(array.length)).map(row => {
      return [...rowPadding, ...row, ...rowPadding];
    });

    return newRow.concat(...updatedRows, newRow);
  }

  function shrinkCellArray(array, alpha) {
    return createToroidalArray(array, Math.sqrt(array.length)).map((row, i, arr) => {
      return row.slice((alpha / 2), (arr[i].length - (alpha / 2)));
    }).filter((row, i, arr) => {
      return i === 0 || i === arr.length - (alpha/2) ? false : true;
    }).reduce((a, b) => {
      return a.concat(b);
    }, [] );
  }

  function createToroidalArray(cells, toroidalBound) {
    let toroidalArray = [];

    for (var i = 0; i < toroidalBound * toroidalBound; i += toroidalBound) {
      toroidalArray.push(cells.slice(i, i + toroidalBound));
    }

    return toroidalArray;
  }

  function createCellObjects(rawCells) {
    let cellObjects = {};
    let arrayPosition = 0;
    rawCells.forEach((terrain, i, arr) => {
      terrain.forEach((cell, p, arr2) => {
        const toroidalLimits = [arr.length, arr2.length];
        const cellState = cell;
        let cellObj = Cell(
            i + 1,
            p + 1,
            cellState,
            toroidalLimits,
            arrayPosition
          );
        arrayPosition += 1;
        cellObjects[cellObj.cellHash] = cellObj;
      });
    });
    hashMap = cellObjects;
    return hashMap = cellObjects;
  }

  function getNextCells() {
    for (let cell in hashMap) {
      hashMap[cell] = hashMap[cell].getNextCellState(hashMap);
    };
  }

  function setNewCellsState() {
    let newState = {};
    for (let cell in hashMap) {
      hashMap[cell].cellState === hashMap[cell].nextState
        ? newState[cell] = hashMap[cell]
        : newState[cell] = hashMap[cell].changeCellState();
    };
    return newState;
  }

  function getChangedCells() {
    let changes = {};
    for (var cell in hashMap) {
      if (hashMap[cell].cellState !== hashMap[cell].nextState) {
        changes[hashMap[cell].arrayPosition] = hashMap[cell].nextState;
      };
    };
    return changes;
  }

  return Object.freeze({
    createCellArray,
    growCellArray,
    shrinkCellArray,
    getChangedCells,
    getHashMap
  });

};
