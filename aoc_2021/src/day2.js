const Solver = require('./utils/solver');

const getMove = ([h = 0, v = 0], { dir, dis }) => {
  switch (dir) {
    case 'forward':
      return [h + dis, v];
    case 'up':
      return [h, v - dis];
    case 'down':
      return [h, v + dis];
    default:
      return [h, v];
  }
};

const getMoveWithAim = ([h = 0, v = 0, a = 0], { dir, dis }) => {
  switch (dir) {
    case 'forward':
      return [h + dis, v + dis * a, a];
    case 'up':
      return [h, v, a - dis];
    case 'down':
      return [h, v, a + dis];
    default:
      return [h, v, a];
  }
};

class Day2 extends Solver {
  constructor() {
    super(2);
  }

  getCmds() {
    return super.getInput().map((cmd) => {
      const [dir, dis] = cmd.split(' ');

      return { dir, dis: Number(dis) };
    });
  }

  partOne() {
    const cmds = this.getCmds();
    let pos = [];

    cmds.forEach((cmd) => {
      pos = getMove(pos, cmd);
    });

    const [h, v] = pos;

    const output = h * v;

    super.printOutput(1, output);
  }

  partTwo() {
    const cmds = this.getCmds();
    let pos = [];

    cmds.forEach((cmd) => {
      pos = getMoveWithAim(pos, cmd);
    });

    const [h, v] = pos;

    const output = h * v;

    super.printOutput(2, output);
  }
}

module.exports = Day2;
