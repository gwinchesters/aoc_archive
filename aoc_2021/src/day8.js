const Solver = require('./utils/solver');

class Day8 extends Solver {
  constructor() {
    super(8);
  }

  parseInput() {
    return super.getTestInput().map((seq) => {
      const [patterns, outputs] = seq.split(' | ').map((patternList) => {
        return patternList
          .split(' ')
          .map((pattern) => pattern.split('').sort().join(''));
      });

      return {
        patterns,
        outputs,
      };
    });
  }

  isUnique(v) {
    const numSegments = v.length;
    switch (true) {
      case numSegments === 2:
      case numSegments === 3:
      case numSegments === 4:
      case numSegments === 7:
        return true;
      default:
        return false;
    }
  }

  segment(i) {
    const seg = {
      i: Number(i),
      key: null,
      possibleKeys: 'abcdefg'.split(''),
    };

    seg.updateKeys = (keys) => {
      seg.possibleKeys = keys;
      seg.key = keys.length === 1 ? keys[0] : null;
    };

    seg.keepMatchingKeys = (keys) => {
      seg.updateKeys(seg.possibleKeys.filter((key) => keys.includes(key)));
    };

    seg.removeMatchingKeys = (keys) => {
      seg.updateKeys(seg.possibleKeys.filter((key) => !keys.includes(key)));
    };

    return seg;
  }

  digit() {
    const digit = {
      segments: Object.keys(Array(7).fill()).map((i) => this.segment(i)),
    };

    digit.getActiveSegs = (num) => {
      switch (num) {
        case 0:
          return [0, 1, 2, 3, 4, 5];
        case 1:
          return [1, 2];
        case 2:
          return [0, 1, 3, 4, 6];
        case 3:
          return [0, 1, 2, 3, 6];
        case 4:
          return [1, 2, 5, 6];
        case 5:
          return [0, 2, 3, 5, 6];
        case 6:
          return [0, 2, 3, 4, 5, 6];
        case 7:
          return [0, 1, 2];
        case 8:
          return [0, 1, 2, 3, 4, 5, 6];
        case 9:
          return [0, 1, 2, 3, 5, 6];
        default:
          return [];
      }
    };

    digit.segsToValueMap = Object.keys(Array(10).fill()).reduce(
      (segsMap, _, i) => {
        segsMap[digit.getActiveSegs(i).join('')] = i;

        return segsMap;
      },
      {}
    );

    digit.setPossibleKeysForSegment = (num, pattern) => {
      const activeSegs = digit.getActiveSegs(num);
      const keys = pattern.split('');
      for (let seg of digit.segments) {
        if (activeSegs.includes(seg.i)) {
          seg.keepMatchingKeys(keys);
        } else {
          seg.removeMatchingKeys(keys);
        }
      }
    };

    digit.getPossibleKeys = (segIndexes) => {
      return digit.segments
        .filter((seg) => segIndexes.includes(seg.i))
        .map((seg) => seg.possibleKeys)
        .flat();
    };

    digit.getValue = (pattern) => {
      const segIndxLookUp = pattern
        .split('')
        .map((key) => digit.segments.find((seg) => seg.key === key).i)
        .sort((a, b) => a - b)
        .join('');

      return digit.segsToValueMap[segIndxLookUp];
    };

    return digit;
  }

  solver(patterns) {
    const digit = this.digit();

    const getByLength = (l) => {
      return patterns.filter((p) => p.length === l);
    };

    const solveByLength = () => {
      const lenMap = {
        2: 1,
        3: 7,
        4: 4,
        7: 8,
      };
      for (let p of patterns) {
        if (lenMap[p.length]) {
          digit.setPossibleKeysForSegment(lenMap[p.length], p);
        }
      }
    };

    const solveForSix = () => {
      const [six] = getByLength(6).filter((p) => {
        return !digit.getPossibleKeys([1]).every((key) => p.indexOf(key) >= 0);
      });
      digit.setPossibleKeysForSegment(6, six);
    };

    const solveForThree = () => {
      const [three] = getByLength(5).filter((p) => {
        return digit
          .getPossibleKeys([0, 1, 2])
          .every((key) => p.indexOf(key) >= 0);
      });

      digit.setPossibleKeysForSegment(3, three);
    };

    solveByLength();
    solveForSix();
    solveForThree();

    return digit;
  }

  getOutput({ patterns, outputs }) {
    const digit = this.solver(patterns);

    return Number(outputs.map((output) => digit.getValue(output)).join(''));
  }

  partOne() {
    const seqList = this.parseInput();

    let uniqueCount = 0;

    for (let { outputs } of seqList) {
      uniqueCount += outputs.filter((output) => this.isUnique(output)).length;
    }
    super.printOutput(1, uniqueCount);
  }

  partTwo() {
    const seqList = this.parseInput();

    const total = [seqList[0]]
      .map((seq) => this.getOutput(seq))
      .reduce((a, b) => a + b);

    super.printOutput(2, total);
  }
}

module.exports = Day8;
