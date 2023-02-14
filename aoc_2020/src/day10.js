const Solver = require('./utils/solver');

class Day10 extends Solver {
  constructor() {
    super(10);
  }

  parseInput() {
    const input = super.getInput('number').sort((a, b) => a - b);

    return input;
  }

  getDiffMap(ratings) {
    const diffMap = {
      [1]: 0,
      [3]: 1,
    };
    const consecutiveSingleDiffs = [];
    let runningSingleDiffCount = 0;

    for (let i in ratings) {
      const prevRating = ratings[i - 1] || 0;
      const rating = ratings[i];
      const diff = rating - prevRating;

      if (diff === 1) {
        runningSingleDiffCount++;
      } else {
        if (runningSingleDiffCount > 0) {
          consecutiveSingleDiffs.push(runningSingleDiffCount);
        }
        runningSingleDiffCount = 0;
      }

      diffMap[diff]++;
    }

    if (runningSingleDiffCount > 0) {
      consecutiveSingleDiffs.push(runningSingleDiffCount);
    }

    return { diffMap, consecutiveSingleDiffs };
  }

  triangluarNum(num) {
    if (num === 0) {
      return 0;
    }

    return num + this.triangluarNum(num - 1);
  }

  getCombos(consecutiveRuns) {
    return consecutiveRuns.map((run) => {
      return 1 + this.triangluarNum(run - 1);
    });
  }

  partOne() {
    const ratings = this.parseInput();
    const { diffMap } = this.getDiffMap(ratings);

    super.printOutput(1, diffMap[1] * diffMap[3]);
  }

  partTwo() {
    const ratings = this.parseInput();
    const { diffMap, consecutiveSingleDiffs } = this.getDiffMap(ratings);

    console.log(diffMap);

    const combos = this.getCombos(consecutiveSingleDiffs);

    const totalOrders = combos.reduce((a, b) => a * b);

    super.printOutput(2, totalOrders);
  }
}

module.exports = Day10;
