const Solver = require('./utils/solver');

class Day12 extends Solver {
  constructor() {
    super(12);
  }

  parseInput() {
    return super.getInput().map((cmd) => {
      const action = cmd[0];
      const distance = Number(cmd.substring(1));

      return [action, distance];
    });
  }

  genShip(useWaypoint = false) {
    const ship = {
      heading: 'E',
      pos: {
        E: 0,
        S: 0,
        W: 0,
        N: 0,
      },
      waypoint: {
        N: 1,
        E: 10,
      },
    };

    ship.getNewDirection = (start, direction, degrees) => {
      const cardinalDirections = ['N', 'E', 'S', 'W'];
      let turned = 0;
      let cardinalIdx = cardinalDirections.indexOf(start);

      while (turned < degrees) {
        if (direction === 'L') {
          cardinalIdx = cardinalIdx - 1 >= 0 ? cardinalIdx - 1 : 3;
        } else if (direction === 'R') {
          cardinalIdx = cardinalIdx + 1 <= 3 ? cardinalIdx + 1 : 0;
        }

        turned += 90;
      }

      return cardinalDirections[cardinalIdx];
    };

    ship.rotateHeading = (direction, degrees) => {
      ship.heading = ship.getNewDirection(ship.heading, direction, degrees);
    };

    ship.rotateWaypoint = (direction, degrees) => {
      const newWaypoint = Object.keys(ship.waypoint).reduce(
        (newWaypoint, waypointDirection) => {
          const newDirection = ship.getNewDirection(
            waypointDirection,
            direction,
            degrees
          );
          newWaypoint[newDirection] = ship.waypoint[waypointDirection];
          return newWaypoint;
        },
        {}
      );

      ship.waypoint = newWaypoint;
    };

    ship.turn = useWaypoint ? ship.rotateWaypoint : ship.rotateHeading;

    ship.movePos = (direction, value) => {
      ship.pos[direction] += value;
    };

    ship.moveWaypoint = (direction, value) => {
      const emptyWaypoint = {
        N: 0,
        E: 0,
        S: 0,
        W: 0,
      };
      const waypoint = { ...emptyWaypoint, ...ship.waypoint };

      waypoint[direction] += value;

      ship.waypoint = ship.getManhattanPos(waypoint);
    };

    ship.move = useWaypoint ? ship.moveWaypoint : ship.movePos;

    ship.travelByHeading = (distance) => {
      ship.movePos(ship.heading, distance);
    };

    ship.travelByWaypoint = (distance) => {
      Object.keys(ship.waypoint).forEach((direction) => {
        ship.movePos(direction, ship.waypoint[direction] * distance);
      });
    };

    ship.travel = useWaypoint ? ship.travelByWaypoint : ship.travelByHeading;

    ship.adjustCourse = ([action, val]) => {
      switch (action) {
        case 'N':
        case 'E':
        case 'S':
        case 'W':
          return ship.move(action, val);
        case 'L':
        case 'R':
          return ship.turn(action, val);
        case 'F':
          return ship.travel(val);
        default:
          return;
      }
    };

    ship.getManhattanPos = (pos = ship.pos) => {
      const { N, E, S, W } = pos;
      const nsKey = N >= S ? 'N' : 'S';
      const ewKey = E >= W ? 'E' : 'W';

      return {
        [nsKey]: Math.abs(N - S),
        [ewKey]: Math.abs(E - W),
      };
    };

    ship.print = () => {
      console.log('Position:');
      console.log(ship.pos);
      console.log('Waypoint:');
      console.log(ship.waypoint);
    };

    return ship;
  }

  partOne() {
    const cmds = this.parseInput();
    const ship = this.genShip();

    for (let cmd of cmds) {
      ship.adjustCourse(cmd);
    }

    const mPos = ship.getManhattanPos();

    const mDis = Object.values(mPos).reduce((a, b) => a + b);

    super.printOutput(1, mDis);
  }

  partTwo() {
    const cmds = this.parseInput();
    const ship = this.genShip(true);

    for (let cmd of cmds) {
      ship.adjustCourse(cmd);
      //ship.print();
    }

    const mPos = ship.getManhattanPos();

    const mDis = Object.values(mPos).reduce((a, b) => a + b);

    super.printOutput(2, mDis);
  }
}

module.exports = Day12;
