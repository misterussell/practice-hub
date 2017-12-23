export default {

    getNextGeneration(cells, generations) {
        // store the computed current generation
        const currentGen = this.generateGenState(cells)
        const nextGen = this.generateNextGen(currentGen);
        return nextGen;
    },

    generateGenState(rawCells) {
        let genState = {};

        rawCells.forEach((terrian, i, arr) => {
            terrian.forEach((cell, p, arr2) => {
                const toroidalLimits = [arr.length, arr2.length]
                const cellState = cell;
                const cellObj = this.createCell(i + 1, p + 1, cellState, toroidalLimits);
                return genState[cellObj.cellHash] === undefined ? genState[cellObj.cellHash] = cellObj : null
            });
        });

        return genState;
    },

    generateNextGen(currentGen) {
        // for each Cell in our hashmap see if the value changes
        for (let hash in currentGen) {
            currentGen[hash].getNextState(currentGen)
        }

        return currentGen;
    },

    createCell(x, y, cellState, toroidalLimits) {
        // factory settings
        const xPrime = 15486047;
        const yPrime = 15487429;
        const cellHash = (x * xPrime) + (y * yPrime);
        // factory
        const Cell = () => ({
            x,
            y,
            cellHash,
            cellState,
            toroidalLimits,
            getNextState(genState) {
                // if the x value is 1 we need to check against x values with toroidalLimits[0]
                // if the x value is 5 we need to check against x values of 1
                // if the y value is 1 we need to check against y values toroidalLimits[1]
                // if the y value is 5 we need to check against y values of 1
                const lowLimit = this.x === 5 ? 1 : this.x + 1;
                const highLimit = this.x === 1 ? 5 : this.x - 1;
                const rightLimit = this.y === 5 ? 1 : this.y + 1;
                const leftLimit = this.y === 1 ? 5 : this.y - 1;

                const blockSum = [
                    [highLimit, leftLimit],
                    [highLimit, this.y],
                    [highLimit, rightLimit],
                    [this.x, leftLimit], /* current cell */
                    [this.x, rightLimit],
                    [lowLimit, leftLimit],
                    [lowLimit, this.y],
                    [lowLimit, rightLimit]
                ].map(neighbor => {
                    return genState[this.getHash(neighbor)].cellState
                }).reduce((a, b) => a + b);

                // if the sum of all nine fields is 3, the inner field state for the next generation will be life (no matter of its previous contents)
                // if the all-field sum is 4, the inner field retains its current state
                // every other sum sets the inner field to death.
                const sum3 = blockSum === 3 ? true : false;
                const sum4 = blockSum === 4 ? true : false
                const nextState = sum3 ? 1 : sum4 ? this.cellState : 0;

                return this.nextState = nextState;
            },
            getHash([x, y]) {
                return (x * xPrime) + (y * yPrime);
            }
        });

        return Cell();
    }
}
