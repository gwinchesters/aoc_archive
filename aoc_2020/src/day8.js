const Solver = require('./utils/solver');

class Day8 extends Solver {
  constructor() {
    super(8);
  }

  parseInput() {
    const instructions = super.getInput();

    return instructions.map((instruction) => {
      const [op, arg] = instruction.split(' ');

      return [op, Number(arg)];
    });
  }

  genCpu() {
    const cpu = {
      program: null,
      acc: 0,
      pointer: 0,
      history: {
        cmds: [],
        state: {},
      },
      repairMode: {
        attempts: 0,
        lstHistoryState: null,
        lstChanged: null,
      },
    };

    cpu.opMap = {
      nop: () => {
        cpu.pointer++;
      },
      acc: (arg) => {
        cpu.acc += arg;
        cpu.pointer++;
      },
      jmp: (arg) => {
        cpu.pointer += arg;
      },
    };

    cpu.loadProgram = (program) => {
      cpu.program = program;
      cpu.acc = 0;
      cpu.pointer = 0;
      cpu.history = {
        cmds: [],
        state: {},
      };
      cpu.repairMode = {
        attempts: 0,
        lstHistoryState: null,
        lstChanged: null,
      };
    };

    cpu.updateHistory = () => {
      const pointer = cpu.pointer.valueOf();
      cpu.history.cmds.push(pointer);
      cpu.history.state[pointer] = cpu.acc.valueOf();
    };

    cpu.changeCmd = (i) => {
      const [op, arg] = cpu.program[i];
      const newOp = op === 'nop' ? 'jmp' : 'nop';

      cpu.program[i] = [newOp, arg];
    };

    cpu.resetToNxtCmd = () => {
      const pointer = cpu.history.cmds.pop();
      const accState = cpu.history.state[pointer];
      delete cpu.history.state[pointer];

      if (cpu.program[pointer][0] !== 'acc') {
        cpu.repairMode.lstChanged = pointer;
        cpu.repairMode.lstHistoryState = [...cpu.history.cmds];
        cpu.acc = accState;
        cpu.pointer = pointer;
        cpu.repairMode.attempts++;
        cpu.changeCmd(pointer);
      } else {
        cpu.resetToNxtCmd();
      }
    };

    cpu.modProgram = () => {
      if (cpu.repairMode.lstChanged) {
        cpu.changeCmd(cpu.repairMode.lstChanged);
        cpu.history.cmds = [...cpu.repairMode.lstHistoryState];
      }
      cpu.resetToNxtCmd();
    };

    cpu.execute = (repairMode = false) => {
      if (cpu.history.state[cpu.pointer]) {
        if (repairMode) {
          cpu.modProgram();
          return cpu.execute(repairMode);
        } else {
          return cpu.acc;
        }
      }

      const cmd = cpu.program[cpu.pointer];

      if (!cmd) {
        if (cpu.repairMode.attempts) {
          console.log(
            `Updated line ${cpu.repairMode.attempts} after ${cpu.repairMode.attempts} attempts`
          );
        } else {
          console.log('Program successfully executed.');
        }
        return cpu.acc;
      }

      cpu.updateHistory();
      const [op, arg] = cmd;

      cpu.opMap[op](arg);

      return cpu.execute(repairMode);
    };

    return cpu;
  }

  partOne() {
    const program = this.parseInput();
    const cpu = this.genCpu();

    cpu.loadProgram(program);

    const output = cpu.execute();

    super.printOutput(1, output);
  }

  partTwo() {
    const program = this.parseInput();
    const cpu = this.genCpu();

    cpu.loadProgram(program);

    const output = cpu.execute(true);

    super.printOutput(2, output);
  }
}

module.exports = Day8;
