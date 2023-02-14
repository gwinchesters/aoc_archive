const Solver = require('./utils/solver');

const findIncreasingDepths = (depths) => {
  const increasingDepths = depths.filter((depth, i) => {
    const prevDepth = depths[i - 1];
    return prevDepth && prevDepth < depth;
  });

  return increasingDepths.length;
};

const rollingSum = (lst, sz) => {
  const sum = (a, b) => a + b;
  return lst.reduce((sums, _, i, arr) => {
    if (i + sz > arr.length) {
      return sums;
    }

    sums.push(arr.slice(i, i + sz).reduce(sum));

    return sums;
  }, []);
};

class Day1 extends Solver {
  constructor() {
    super(1);
  }

  getDepths() {
    return super.getInput('number');
  }

  partOne() {
    const depths = this.getDepths();
    const output = findIncreasingDepths(depths);

    super.printOutput(1, output);
  }

  partTwo() {
    const depths = this.getDepths();
    const windowedDepths = rollingSum(depths, 3);
    const output = findIncreasingDepths(windowedDepths);

    super.printOutput(2, output);
  }
}

module.exports = Day1;
