const Solver = require('./utils/solver');

const sum = (a, b) => a + b;

class Day7 extends Solver {
  constructor() {
    super(7);
  }

  parseInput() {
    return super
      .getInput()[0]
      .split(',')
      .map((v) => Number(v))
      .sort((a, b) => a - b);
  }

  getCost(pos, costFunc) {
    const costs = pos.map(costFunc);

    return costs.reduce(sum);
  }

  partOne() {
    const pos = this.parseInput();
    const median = pos[~~(pos.length / 2)];

    const totalCost = this.getCost(pos, (p) => Math.abs(median - p));

    super.printOutput(1, totalCost);
  }

  partTwo() {
    const triangleNum = (num) => {
      let total = 0;
      while (num > 0) {
        total += num;
        num -= 1;
      }

      return total;
    };
    const pos = this.parseInput();
    const mean = pos.reduce(sum) / pos.length;
    const valA = Math.floor(mean);
    const valB = Math.round(mean);
    const align = valA < valB ? valA : valB;
    const costFunc = (p) => {
      return triangleNum(Math.abs(align - p));
    };
    const totalCost = this.getCost(pos, costFunc);

    super.printOutput(2, totalCost);
  }
}

module.exports = Day7;
