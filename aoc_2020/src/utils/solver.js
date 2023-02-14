const { toArray } = require('./inputHelpers');

class Solver {
  constructor(day) {
    this.day = day;
  }

  getInput(type = 'string') {
    return toArray(`d${this.day}.txt`, type);
  }

  getTestInput(type = 'string') {
    return toArray(`test.txt`, type);
  }

  printOutput(part, output) {
    console.log(`Day ${this.day}: Part ${part} -> ${output}`);
  }

  partOne() {
    this.printOutput(1, null);
  }

  partTwo() {
    this.printOutput(2, null);
  }
}

// const Solver = require('./utils/solver');

// class Day7 extends Solver {
//   constructor() {
//     super(7);
//   }

//   parseInput() {
//     const input = super.getTestInput();

//     return input;
//   }

//   partOne() {
//     const i = this.parseInput();
//     const output = null;

//     super.printOutput(1, output);
//   }

//   partTwo() {
//     const i = this.parseInput();
//     const output = null;

//     super.printOutput(2, output);
//   }
// }

// module.exports = Day7;

module.exports = Solver;
