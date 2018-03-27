
// this function is rather long for doing something simple.
function getSustainedPeriods(arr) {
    let life = [];
    let lifeCount = 0;
    let death = [];
    let deathCount = 0;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === 1) {
            life[lifeCount] === undefined ? life[lifeCount] = [1] : life[lifeCount] = [...life[lifeCount], 1];
        } else lifeCount += 1;

        if (arr[i] === 0) {
            death[deathCount] === undefined ? death[deathCount] = [1] : death[deathCount] = [...death[deathCount], 1];
        } else deathCount += 1;
    }

    // remove empty values
    life = life.filter(n => true)
        .map(subArr => {
            return subArr.reduce((a, b) => a + b);
        });

    death = death.filter(n => true)
        .map(subArr => {
            return subArr.reduce((a, b) => a + b);
        });

    return {
        life,
        death
    };
}

// create an object to store all cell information
let cellTracking = {};
let lifeBoardTracking = {
    generationLifeSums: [],
    generationDeathSums: []
}

// generate stats for each cell and the complete cellTracking of the game
// it may be useful to seperate out these two sets of stats
// minimize the lines here. things can get broken out into more distinct functions
tests.forEach((obj, i, arr) => {

    lifeBoardTracking.generationLifeSums[i] === undefined ? lifeBoardTracking.generationLifeSums.push(0) : null;
    lifeBoardTracking.generationDeathSums[i] === undefined ? lifeBoardTracking.generationDeathSums.push(0) : null;

    Object.keys(obj).forEach((key, p, keys) => {

        let cellHistory;
        let cellState = obj[key].cellState;
        let nextState = obj[key].nextState;
        let cellStateSum;
        let count;
        let births;
        let deaths;
        let sustainedPeriods;
        lifeBoardTracking.generationLifeSums = [...lifeBoardTracking.generationLifeSums];

        if (cellTracking[key] === undefined) {
            // initiate the history of the cells life
            cellHistory = [cellState];
            // define defaults if case is new
            cellStateSum = cellState;
            count = 1;
            births = cellState === 0 && nextState === 1 ? 1 : 0;
            deaths = cellState === 1 && nextState === 0 ? 1 : 0;
        } else {
            // keep track of each life of the cell for comparative purposes
            cellHistory = [...cellTracking[key].cellHistory, cellState];
            // number of births
            births = cellTracking[key].births;
            // number of death
            deaths = cellTracking[key].deaths;
            // find total life value of a cell over progression
            cellStateSum = cellTracking[key].cellStateSum + cellState;
            // find the total number of lifecycles
            // this int can be moved onto state during implementation
            count = cellTracking[key].count + 1;
            // find the total number of births
            if (cellState === 0 && nextState === 1 || p === 0 && cellState === 1) {
                births += 1;
            }
            // find the total number of deaths
            if (cellState === 1 && nextState === 0) {
                deaths += 1;
            }
        };

        // find the total life for each generation
        // this can be moved onto state during implementation
        if (cellState === 1) {
            lifeBoardTracking.generationLifeSums[i] += 1;
        }

        if (cellState === 0) {
            lifeBoardTracking.generationDeathSums[i] += 1;
        }

        return cellTracking[key] = {
            cellHistory,
            cellStateSum,
            count,
            averageLife: cellStateSum / count,
            births,
            deaths
        };

    });
});
