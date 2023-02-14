const Solver = require('./utils/solver');

class Day6 extends Solver {
  constructor() {
    super(6);
  }

  parseInput() {
    const ages = Array(9).fill(0);
    const fish = super
      .getInput()[0]
      .split(',')
      .map((f) => Number(f));

    for (let f of fish) {
      ages[f] += 1;
    }

    return ages;
  }

  simGrowth(fishAges, numDays, day = 0) {
    //console.log(`After ${day} days: ${fish.join(',')}`);
    //console.log(`After ${day} days: ${fishAges.join(',')}`);
    if (numDays === day) {
      return fishAges.reduce((a, b) => a + b);
    }

    const fishReset = fishAges[0];

    for (let i = 0; i < 8; i++) {
      fishAges[i] = fishAges[i + 1];
    }
    fishAges[6] += fishReset;
    fishAges[8] = fishReset;

    return this.simGrowth(fishAges, numDays, day + 1);
  }

  partOne() {
    const initFishAges = this.parseInput();

    const numFish = this.simGrowth(initFishAges, 80);

    super.printOutput(1, numFish);
  }

  partTwo() {
    const initFishAges = this.parseInput();

    const numFish = this.simGrowth(initFishAges, 256);

    super.printOutput(2, numFish);
  }
}

module.exports = Day6;
