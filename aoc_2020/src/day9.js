const Solver = require('./utils/solver');

class Day9 extends Solver {
  constructor() {
    super(9);
  }

  parseInput() {
    const input = super.getInput('number');

    return input;
  }

  getSubset(nums, sz, i, sort = false) {
    const subSet = nums.slice(i - sz, i);

    if (sort) {
      subSet.sort();
    }

    return subSet;
  }

  checkSet(set, target) {
    const hash = {};
    for (let i in set) {
      const addend = target - set[i];

      if (addend in hash) {
        return [addend, set[i]];
      }

      hash[set[i]] = i;
    }

    return null;
  }

  getFirstInvalid(nums, preamble) {
    for (let i = preamble; i < nums.length; i++) {
      const set = this.getSubset(nums, preamble, i, true);
      const validNums = this.checkSet(set, nums[i]);

      if (!validNums) {
        return nums[i];
      }
    }

    return null;
  }

  getContigousSum(set, target) {
    const sum = (a, b) => a + b;
    for (let i in set) {
      const contigSet = [set[i]];
      let tempTotal = contigSet.reduce(sum);

      while (tempTotal < target) {
        contigSet.push(set[++i]);
        tempTotal = contigSet.reduce(sum);
      }

      if (tempTotal === target) {
        return contigSet;
      }
    }

    return null;
  }

  partOne() {
    const nums = this.parseInput();
    const output = this.getFirstInvalid(nums, 25);

    super.printOutput(1, output);
  }

  partTwo() {
    const nums = this.parseInput();
    const target = this.getFirstInvalid(nums, 25);
    const i = nums.indexOf(target);
    const set = this.getSubset(nums, i, i);
    const contigSet = this.getContigousSum(set, target);
    contigSet.sort((a, b) => a - b);

    console.log(contigSet);

    const sum = (a, b) => a + b;
    const total = contigSet.reduce(sum);

    console.log(total);

    const output = contigSet[0] + contigSet.pop();

    super.printOutput(2, output);
  }
}

module.exports = Day9;
