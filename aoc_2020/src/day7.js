const Solver = require('./utils/solver');

class Day7 extends Solver {
  constructor() {
    super(7);
  }

  parseInput() {
    const rawRules = super.getInput();

    return rawRules.reduce((rules, rule) => {
      const [bagColor, rawContent] = rule.split(' bags contain ');

      if (rawContent === 'no other bags.') {
        rules[bagColor.trim()] = null;
        return rules;
      }

      rules[bagColor.trim()] = rawContent
        .split(',')
        .reduce((children, content) => {
          const [_, q, color] = content.match(/(\d{1})\s(.*)\sbag/);

          children[color] = Number(q);

          return children;
        }, {});

      return rules;
    }, {});
  }

  canContain(rules, bag, searchColor) {
    if (!bag) {
      return false;
    }

    if (bag[searchColor]) {
      return true;
    }

    return Object.keys(bag).some((c) =>
      this.canContain(rules, rules[c], searchColor)
    );
  }

  countBags(rules, bag) {
    if (!bag) {
      return 0;
    }

    return Object.keys(bag).reduce((totalCount, color) => {
      const childBags = bag[color];
      totalCount += childBags + childBags * this.countBags(rules, rules[color]);
      return totalCount;
    }, 0);
  }

  partOne() {
    const rules = this.parseInput();

    const canHoldGold = Object.keys(rules).filter((color) => {
      return this.canContain(rules, rules[color], 'shiny gold');
    });

    super.printOutput(1, canHoldGold.length);
  }

  partTwo() {
    const rules = this.parseInput();
    const bagCount = this.countBags(rules, rules['shiny gold']);
    const output = bagCount;

    super.printOutput(2, output);
  }
}

module.exports = Day7;
