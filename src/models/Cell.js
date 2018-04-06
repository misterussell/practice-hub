export default function Cell(x, y, cellState, toroidalLimits, arrayPosition) {
  const cellHash = (x * 15486047) + (y * 15487429);

  function getNextCellState(allCells) {
    const lowLimit = this.x === this.toroidalLimits[0] ? 1 : this.x + 1;
    const highLimit = this.x === 1 ? this.toroidalLimits[0] : this.x - 1;
    const rightLimit = this.y === this.toroidalLimits[1] ? 1 : y + 1;
    const leftLimit = this.y === 1 ? this.toroidalLimits[1] : this.y - 1;

    const blockSum = [
        [highLimit, leftLimit], [highLimit, this.y], [highLimit, rightLimit],
        [this.x, leftLimit], [this.x, this.y], [this.x, rightLimit],
        [lowLimit, leftLimit], [lowLimit, this.y], [lowLimit, rightLimit]
      ].map(xyPosition => {
          return allCells[(xyPosition[0] * 15486047) + (xyPosition[1] * 15487429)].cellState;
        }).reduce((a, b) => a + b);

    const sum3 = blockSum === 3 ? true : false;
    const sum4 = blockSum === 4 ? true : false
    const nextState = sum3 ? 1 : sum4 ? this.cellState : 0;

    return Object.freeze({ ...this, nextState });
  }

  function changeCellState() {
    const cellState = this.nextState;
    return Object.freeze({ ...this, cellState, nextState: null })
  }

  return Object.freeze({
    x,
    y,
    cellState,
    cellHash,
    toroidalLimits,
    arrayPosition,
    getNextCellState
  });
};
