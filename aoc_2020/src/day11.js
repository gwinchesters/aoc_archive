const Solver = require('./utils/solver');

class Day11 extends Solver {
  constructor() {
    super(11);
  }

  parseInput() {
    const input = super.getInput();

    return input;
  }

  seatMap(layout, visible = false, tolerance = 4) {
    const EMPTY = 'L';
    const OCCUPIED = '#';
    const FLOOR = '.';
    const seatMap = {
      chart: [],
      updates: [],
    };

    for (let row of layout) {
      seatMap.chart.push(row.split(''));
    }

    seatMap.getSeats = (row, col) => {
      const maxRow = seatMap.chart.length - 1;
      const maxCol = seatMap.chart[0].length - 1;

      const prevRow = row - 1;
      const nxtRow = row + 1;

      const prevCol = col - 1;
      const nxtCol = col + 1;

      const getNxtVisibleSeatIndex = (r, c, plane, offset) => {
        if (r < 0 || r > maxRow || c < 0 || c > maxCol) {
          return null;
        }

        if (!visible) {
          return seatMap.chart[r][c];
        }

        if (seatMap.chart[r][c] !== FLOOR) {
          return seatMap.chart[r][c];
        }

        const nextPointByPlane = {
          v: [r + offset, c],
          h: [r, c + offset],
          du: [r + offset, c - offset],
          dd: [r + offset, c + offset],
        };

        const [nxtRow, nxtCol] = nextPointByPlane[plane];

        return getNxtVisibleSeatIndex(nxtRow, nxtCol, plane, offset);
      };

      return [
        // top left, middle, right
        getNxtVisibleSeatIndex(prevRow, prevCol, 'dd', -1),
        getNxtVisibleSeatIndex(prevRow, col, 'v', -1),
        getNxtVisibleSeatIndex(prevRow, nxtCol, 'du', -1),
        // left, right
        getNxtVisibleSeatIndex(row, prevCol, 'h', -1),
        getNxtVisibleSeatIndex(row, nxtCol, 'h', 1),
        // bottom left, middle, right
        getNxtVisibleSeatIndex(nxtRow, prevCol, 'du', 1),
        getNxtVisibleSeatIndex(nxtRow, col, 'v', 1),
        getNxtVisibleSeatIndex(nxtRow, nxtCol, 'dd', 1),
      ];
    };

    seatMap.countByTypes = (types, points) => {
      const matchedAdj = points.filter(([r, c]) => {
        if (!seatMap.chart[r]) {
          return false;
        }
        if (!seatMap.chart[r][c]) {
          return false;
        }
        return types.includes(seatMap.chart[r][c]);
      });

      return matchedAdj.length;
    };

    seatMap.rule1 = (r, c) => {
      const seats = seatMap.getSeats(r, c);
      const occupiedCount = seats.filter((s) => s === OCCUPIED).length;

      return occupiedCount === 0 ? OCCUPIED : EMPTY;
    };

    seatMap.rule2 = (r, c) => {
      const seats = seatMap.getSeats(r, c);
      const occupiedCount = seats.filter((s) => s === OCCUPIED).length;

      return occupiedCount >= tolerance ? EMPTY : OCCUPIED;
    };

    seatMap.applyRules = (r, c) => {
      const seatVal = seatMap.chart[r][c];
      let newVal;

      if (seatVal === FLOOR) {
        newVal = seatVal;
      }

      if (seatVal === EMPTY) {
        newVal = seatMap.rule1(r, c);
      }

      if (seatVal === OCCUPIED) {
        newVal = seatMap.rule2(r, c);
      }

      if (seatVal !== newVal) {
        seatMap.updates.push([r, c, newVal]);
      }
    };

    seatMap.update = () => {
      for (let r in seatMap.chart) {
        for (let c in seatMap.chart[r]) {
          seatMap.applyRules(Number(r), Number(c));
        }
      }

      if (seatMap.updates.length > 0) {
        for (let [r, c, v] of seatMap.updates) {
          seatMap.chart[r][c] = v;
        }

        seatMap.updates = [];

        return true;
      }

      return false;
    };

    seatMap.print = () => {
      console.log();
      for (let r in seatMap.chart) {
        console.log(seatMap.chart[r].join(''));
      }
    };

    seatMap.getFinalOccupied = (print = false) => {
      while (seatMap.update()) {
        if (print) {
          seatMap.print();
        }
      }

      return seatMap.chart.flat().filter((seat) => seat === OCCUPIED).length;
    };

    return seatMap;
  }

  partOne() {
    const layout = this.parseInput();
    const seatMap = this.seatMap(layout);

    const occupiedSeats = seatMap.getFinalOccupied();

    super.printOutput(1, occupiedSeats);
  }

  partTwo() {
    const layout = this.parseInput();
    const seatMap = this.seatMap(layout, true, 5);

    const occupiedSeats = seatMap.getFinalOccupied();

    super.printOutput(2, occupiedSeats);
  }
}

module.exports = Day11;
