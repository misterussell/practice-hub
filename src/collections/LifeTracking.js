// tracking factory
export default function Tracking() {
  let fullHistory = [];
  let stats = {
    generationStats: {
      lifeSums: [],
      deathSums: [],
      lifeSpan: 0
    },
    cellStats: {}
  };

  function updateHistory(snapshot) {
    return fullHistory = [...fullHistory, snapshot];
  }

  function compileStats() {
    getCellStats();
    analyzeCells();
    analyzeGenerations();
    return stats;
  }

  function getCellStats() {
    fullHistory.forEach((obj, i, arr) => {

      stats.generationStats.lifeSums[i] === undefined ? stats.generationStats.lifeSums.push(0) : null;
      stats.generationStats.deathSums[i] === undefined ? stats.generationStats.deathSums.push(0) : null;
      stats.generationStats.lifeSpan += 1;

      Object.keys(obj).forEach((key, p, keys) => {

        let cellHistory;
        let cellState = obj[key].cellState;
        let nextState = obj[key].nextState;
        let cellStateSum;
        let count;
        let births;
        let deaths;
        let sustainedPeriods;

        if (stats.cellStats[key] === undefined) {
          // initiate the history of the cells life
          cellHistory = [cellState];
          // define defaults if case is new
          cellStateSum = cellState;
          count = 1;
          births = cellState === 0 && nextState === 1 ? 1 : 0;
          deaths = cellState === 1 && nextState === 0 ? 1 : 0;
        } else {
          // keep track of each life of the cell for comparative purposes
          cellHistory = [...stats.cellStats[key].cellHistory, cellState];
          // number of births
          births = stats.cellStats[key].births;
          // number of death
          deaths = stats.cellStats[key].deaths;
          // find total life value of a cell over progression
          cellStateSum = stats.cellStats[key].cellStateSum + cellState;
          // find the total number of lifecycles
          // this int can be moved onto state during implementation
          count = stats.cellStats[key].count + 1;
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
          stats.generationStats.lifeSums[i] += 1;
        }

        if (cellState === 0) {
          stats.generationStats.deathSums[i] += 1;
        }

        return stats.cellStats[key] = {
          cellHistory,
          cellStateSum,
          count,
          averageCellState: cellStateSum/count,
          births,
          deaths
        };
      });
    });
  }

  function analyzeCells() {
    return Object.keys(stats.cellStats).forEach((key, i, arr) => {
      let sustainedPeriods = { life: getContinousLife(stats.cellStats[key].cellHistory), death: getContinousDeath(stats.cellStats[key].cellHistory) };
      stats.cellStats[key].sustainedPeriods =  sustainedPeriods;
      // shortest periods
      stats.cellStats[key].shortestLifespan = Math.min(sustainedPeriods.life.length > 0 ? [...sustainedPeriods.life] : null);
      stats.cellStats[key].shortestDeathspan = Math.min(sustainedPeriods.death.length > 0 ? [...sustainedPeriods.death] : null);
      // longest periods
      stats.cellStats[key].longestLifeSpan = Math.max(sustainedPeriods.life.length > 0 ? [...sustainedPeriods.life] : null);
      stats.cellStats[key].longestDeathspan = Math.max(sustainedPeriods.death.length > 0 ? [...sustainedPeriods.death] : null);
      //average deathspan
      stats.cellStats[key].averageLifeSpan = sustainedPeriods.life.reduce((a, b) => a + b, 0) / sustainedPeriods.life.length;
      stats.cellStats[key].averageLifeSpan = sustainedPeriods.death.reduce((a, b) => a + b, 0) / sustainedPeriods.death.length;
    });
  }

  function analyzeGenerations() {
    stats.generationStats.lifeVariation = getVariation(stats.generationStats.lifeSums);
    stats.generationStats.deathVariation = getVariation(stats.generationStats.deathSums);
  }

  function getContinousDeath(arr) {
    let death = [];
    let deathCount = 0;

    for (let i = 0; i < fullHistory.length; i++) {
      if (arr[i] === 0 ) {
        death[deathCount] === undefined ? death[deathCount] = [1] : death[deathCount] = [...death[deathCount], 1];
      } else deathCount += 1;
    }
    // remove empty values
    death = death.filter(n => true)
                 .map(subArr => {
                   return subArr.reduce((a, b) => a + b);
                 });

    return death;
  }

  function getContinousLife(arr) {
    let life = [];
    let lifeCount = 0;

    for (let i = 0; i < fullHistory.length; i++) {
      if (arr[i] === 1) {
        life[lifeCount] === undefined ? life[lifeCount] = [1] : life[lifeCount] = [...life[lifeCount], 1];
      } else lifeCount += 1;
    }
    // remove empty values
    life = life.filter(n => true)
               .map(subArr => {
                 return subArr.reduce((a, b) => a + b);
               });

    return life;
  }

  function getVariation(arr) {
    let variations = {}

    arr.forEach((val, i, arr) => {
      let change = arr[i + 1] !== undefined ? arr[i + 1] - val : 'endOfGame';

      if (change !== 'endOfGame') {
        variations[change] === undefined
          ? variations[change] = [i + 1]
          : variations[change] = [...variations[change], i + 1];
      }
    });

    return variations;
  }

  function getIndecesForMaxVals(obj, count) {
    let changes = {};

    Array.from(Object.keys(obj)).sort((a, b) => {
      if (a < b) { return 1; }
      else if (a === b) { return 0; }
      else { return -1; }
    }).filter((val, i) => {
      if (i < count) {
        return true;
      } else return false;
    }).forEach(change => {
      changes[change] = obj[change];
    });

    return changes;
  }

  function checkChanges(cells, lookups) {
    let changes = [];
    // takes the cells and sees which cell were new PRIOR to the gen that caused the spike in birth
    for (var hash in cells) {
      for (var lookup in lookups) {
        lookups[lookup].forEach(maxAlphaIndex => {
          if (maxAlphaIndex >= 2) {
            cells[hash].cellHistory[maxAlphaIndex - 2] === 0 && cells[hash].cellHistory[maxAlphaIndex - 1] === 1
              ? changes = [...changes, hash]
              : console.log('no change');
          }
        });
      }
    }

    return changes;
  }

  return Object.freeze({
    updateHistory,
    compileStats
  });
}
