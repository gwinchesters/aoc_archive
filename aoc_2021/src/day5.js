const Solver = require('./utils/solver');

class Day5 extends Solver {
  constructor() {
    super(5);
  }

  parseInput() {
    const lines = super.getInput();
    const xValues = [];
    const yValues = [];

    const parsedLines = lines.map((line) => {
      const [p1, p2] = line.split(' -> ');
      const [x1, y1] = p1.split(',').map((p) => Number(p));
      const [x2, y2] = p2.split(',').map((p) => Number(p));

      xValues.push(...[x1, x2]);
      yValues.push(...[y1, y2]);

      return [
        [x1, y1],
        [x2, y2],
      ];
    });

    xValues.sort((a, b) => b - a);
    yValues.sort((a, b) => b - a);

    return {
      lines: parsedLines,
      xMax: xValues[0],
      yMax: yValues[0],
    };
  }

  genGraph(xMax, yMax) {
    const graph = {};

    graph.grid = Array(yMax + 1)
      .fill()
      .map((r) => Array(xMax + 1).fill(0));

    graph.pointCount = {};

    graph.print = () => {
      for (let r of graph.grid) {
        console.log(r.join('').replaceAll('0', '.'));
      }
    };

    graph.plotPoints = (points) => {
      for (let [x, y] of points) {
        const point = `${x}_${y}`;
        graph.pointCount[point] = graph.pointCount[point] || 0;
        graph.pointCount[point]++;
        graph.grid[y][x]++;
      }
    };

    graph.getRange = (v1, v2) => {
      const [start, end] = [v1, v2].sort((a, b) => a - b);

      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    };

    graph.genPoints = ([x1, y1], [x2, y2], validSlopes) => {
      const slope = (y2 - y1) / (x2 - x1);
      const b = y1 - slope * x1;

      if (!validSlopes.includes(Math.abs(slope))) {
        return [];
      }

      if (Math.abs(slope) === Number.POSITIVE_INFINITY) {
        return graph.getRange(y1, y2).map((y) => [x1, y]);
      }
      return graph.getRange(x1, x2).map((x) => [x, slope * x + b]);
    };

    graph.plot = (lines, validSlopes) => {
      for (let [start, end] of lines) {
        graph.plotPoints(graph.genPoints(start, end, validSlopes));
      }
    };

    graph.countOverlap = (overlap) => {
      return Object.values(graph.pointCount).filter((v) => v >= overlap).length;
    };

    return graph;
  }

  partOne() {
    const { lines, xMax, yMax } = this.parseInput();
    const graph = this.genGraph(xMax, yMax);

    graph.plot(lines, [0, Number.POSITIVE_INFINITY]);

    super.printOutput(1, graph.countOverlap(2));
  }

  partTwo() {
    const { lines, xMax, yMax } = this.parseInput();
    const graph = this.genGraph(xMax, yMax);

    graph.plot(lines, [0, Number.POSITIVE_INFINITY, 1]);

    super.printOutput(2, graph.countOverlap(2));
  }
}

module.exports = Day5;
