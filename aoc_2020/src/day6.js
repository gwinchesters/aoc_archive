const Solver = require('./utils/solver');

class Day6 extends Solver {
  constructor() {
    super(6);
  }

  parseInput() {
    let results = super.getInput();
    let nxtGroupEnd = results.indexOf('');

    const groupResults = [];

    while (nxtGroupEnd > 0) {
      groupResults.push(results.slice(0, nxtGroupEnd));
      results = results.slice(nxtGroupEnd + 1);
      nxtGroupEnd = results.indexOf('');
    }

    groupResults.push(results);

    return groupResults;
  }

  getUniqueByGrp(results) {
    return results.map((grpResults) => {
      const grpAns = grpResults.reduce((allAns, singleAns) => {
        allAns = allAns.concat(singleAns.split(''));
        return allAns;
      }, []);

      return [...new Set(grpAns)];
    });
  }

  getTotalAns(results) {
    const sum = (a, b) => a + b;

    return results.map((gr) => gr.length).reduce(sum);
  }

  partOne() {
    const results = this.parseInput();

    const uniqueResultsByGroup = this.getUniqueByGrp(results);

    const output = this.getTotalAns(uniqueResultsByGroup);

    super.printOutput(1, output);
  }

  partTwo() {
    const results = this.parseInput();

    const uniqueResultsByGroup = this.getUniqueByGrp(results);

    const commonGrpAns = results.map((grpAns, i) => {
      return uniqueResultsByGroup[i].filter((ans) => {
        return grpAns.every((ansSet) => ansSet.includes(ans));
      });
    });

    const output = this.getTotalAns(commonGrpAns);

    super.printOutput(2, output);
  }
}

module.exports = Day6;
