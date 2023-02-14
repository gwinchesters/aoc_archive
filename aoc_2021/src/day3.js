const Solver = require('./utils/solver');

const NUM_BITS = 12;

class Day3 extends Solver {
  constructor() {
    super(3);
  }

  parseInput() {
    return super.getInput('binary');
  }

  countSetBits(report, numBits) {
    const setBits = Array(numBits).fill(0);
    const maxBitIndx = numBits - 1;

    for (let b of report) {
      let bitIndx = maxBitIndx;
      while (b > 0) {
        setBits[bitIndx] += b & 1;
        b = b >> 1;
        bitIndx--;
      }
    }

    return setBits;
  }

  getRates(setBitCount, report) {
    const v = setBitCount
      .map((count) => (count * 2 >= report.length ? 1 : 0))
      .join('');

    const gamma = Number(`0b${v}`);
    const epsilon = gamma ^ (Math.pow(2, NUM_BITS) - 1);

    return { gamma, epsilon };
  }

  filterReport(report, bitPos, rateType) {
    if (report.length === 1) {
      console.log(`${rateType} @ pos ${bitPos}`);
      return report[0];
    }
    const setBitCount = this.countSetBits(report, NUM_BITS);
    const rate = this.getRates(setBitCount, report)[rateType];
    const rateBit = (rate >> (bitPos - 1)) & 1;

    report = report.filter((v) => {
      const valBit = (v >> (bitPos - 1)) & 1;
      return rateBit === valBit;
    });

    if (report.length === 0) {
      return report.pop();
    }

    return this.filterReport(report, bitPos - 1, rateType);
  }

  printReport(report) {
    for (let v of report) {
      console.log(v.toString(2));
    }
  }

  partOne() {
    const report = this.parseInput();
    const setBitCount = this.countSetBits(report, NUM_BITS);
    const { gamma, epsilon } = this.getRates(setBitCount, report);

    super.printOutput(1, gamma * epsilon);
  }

  partTwo() {
    const report = this.parseInput();
    const oxRating = this.filterReport(report, NUM_BITS, 'gamma');
    const co2Rating = this.filterReport(report, NUM_BITS, 'epsilon');

    super.printOutput(2, oxRating * co2Rating);
  }
}

module.exports = Day3;
