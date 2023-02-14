const Solver = require('./utils/solver');

class Day13 extends Solver {
  constructor() {
    super(13);
  }

  parseInput() {
    const input = super.getInput();

    const idt = Number(input[0]);

    const busIds = input[1]
      .split(',')
      .filter((busId) => busId !== 'x')
      .map((id) => Number(id));

    const rawIds = input[1]
      .split(',')
      .map((id, idx) => [idx, id])
      .filter(([_, id]) => id !== 'x')
      .map(([idx, id]) => [idx, Number(id)]);

    return { idt, busIds, rawIds };
  }

  getNearestDepartureTime(idt, busId) {
    return Math.ceil(idt / busId) * busId;
  }

  partOne() {
    const { idt, busIds } = this.parseInput();

    const sortedBusIds = busIds
      .map((busId) => {
        return [busId, this.getNearestDepartureTime(idt, busId) - idt];
      })
      .sort((a, b) => a[1] - b[1]);

    const [busId, wait] = sortedBusIds[0];

    const output = busId * wait;

    super.printOutput(1, output);
  }

  inverse(a, m) {
    // validate inputs
    [a, m] = [Number(a), Number(m)];
    if (Number.isNaN(a) || Number.isNaN(m)) {
      return NaN; // invalid input
    }
    a = ((a % m) + m) % m;
    if (!a || m < 2) {
      return NaN; // invalid input
    }
    // find the gcd
    const s = [];
    let b = m;
    while (b) {
      [a, b] = [b, a % b];
      s.push({ a, b });
    }
    if (a !== 1) {
      return NaN; // inverse does not exists
    }
    // find the inverse
    let x = 1;
    let y = 0;
    for (let i = s.length - 2; i >= 0; --i) {
      [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)];
    }
    return ((y % m) + m) % m;
  }

  crt(remainders, divisors) {
    const m = divisors.reduce((a, b) => BigInt(a) * BigInt(b));
    console.log(m);
    const mi = divisors.map((d) => Math.floor(Number(BigInt(m) / BigInt(d))));
    const yi = Object.keys(mi).map((i) =>
      this.inverse(BigInt(mi[i]), BigInt(divisors[i]))
    );

    console.log(remainders);
    console.log(mi);
    console.log(yi);

    const ts = Object.keys(yi).map((i) => {
      console.log(`${yi[i]} x ${remainders[i]} x ${mi[i]}`);
      return BigInt(remainders[i]) * BigInt(mi[i]) * BigInt(yi[i]);
    });

    console.log(ts.join(', '));

    const x = ts.reduce((a, b) => a + b);

    return x % BigInt(m);
  }

  partTwo() {
    const { idt, busIds, rawIds } = this.parseInput();
    const remainders = [];
    const divisors = [];

    for (let [idx, busId] of rawIds) {
      remainders.push(-idx - Math.floor(-idx / busId) * busId);
      divisors.push(busId);
    }

    const output = this.crt(remainders, divisors);

    super.printOutput(2, output);
  }
}

module.exports = Day13;
