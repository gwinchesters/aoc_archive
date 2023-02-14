const Solver = require('./utils/solver');

class Day9 extends Solver {
  constructor() {
    super(9);
  }

  parseInput() {
    return super.getTestInput().map((r) => r.split('').map((h) => Number(h)));
  }

  getAdj(r, c, hMap) {
    const prevR = r - 1;
    const prevC = c - 1;
    const nxtR = r + 1;
    const nxtC = c + 1;
    const adjHeights = [];

    const addH = (r, c) => {
      const loc = [r, c];
      const h = hMap[r][c];

      if (h) {
        adjHeights.push({ loc, h });
      }
    };

    // top
    if (hMap[prevR]) {
      addH(prevR, c);
    }

    // bottom
    if (hMap[nxtR]) {
      addH(nxtR, c);
    }

    // left
    addH(r, prevC);
    // right
    addH(r, nxtC);

    return adjHeights;
  }

  getLocalMins(hMap) {
    const localMins = {};

    const addMin = (r, c, h) => {
      const hIdx = loc.join('_');

      localMins[hIdx] = h;
    };

    for (let r in hMap) {
      for (let c in hMap[r]) {
        const adjHeights = this.getAdj(r, c, hMap);
        const sortedHeights = adjHeights.sort((a, b) => b.h - a.h);

        console.log(sortedHeights);

        const minAdj = sortedHeights.pop();

        if (hMap[r][c] < minAdj.h) {
          addMin(r, c, hMap[r][c]);
        }
      }
    }

    return localMins;
  }

  partOne() {
    const hMap = this.parseInput();

    const localMins = this.getAdj(r, c, hMap);

    // const localMins = this.getLocalMins(hMap);

    console.log(localMins);

    super.printOutput(1, null);
  }

  partTwo() {
    const output = null;

    super.printOutput(2, null);
  }
}

module.exports = Day9;
