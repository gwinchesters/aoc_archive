const Solver = require('./utils/solver');

class Day4 extends Solver {
  constructor() {
    super(4);
  }

  parseInput() {
    const i = super.getInput();
    const nums = i[0].split(',').map((num) => Number(num));
    const boards = [];

    let boardStart = i.indexOf('');
    while (boardStart > 0) {
      const boardEnd = i.indexOf('', boardStart + 1);
      const board = i.slice(boardStart + 1, boardEnd < 0 ? i.length : boardEnd);
      boards.push(this.genBoard(board));
      boardStart = boardEnd;
    }

    return this.genBingo(nums, boards);
  }

  genBoard(vals) {
    const board = {
      id: Math.round(Date.now() * Math.random()),
    };

    board.grid = vals.map((row) => {
      return row
        .trim()
        .split(/\s+/)
        .map((sqr) => Number(sqr));
    });

    board.unmatchedSqrs = board.grid.flat();

    board.gridSize = board.grid[0].length;
    board.match = {
      row: Array(board.gridSize).fill(0),
      col: Array(board.gridSize).fill(0),
      diag: Array(2).fill(0),
    };

    board.checkMatch = (v) => {
      for (let r in board.grid) {
        for (let c in board.grid[r]) {
          if (board.grid[r][c] === v) {
            board.unmatchedSqrs = board.unmatchedSqrs.filter(
              (sqr) => sqr !== v
            );
            board.match.row[r]++;
            board.match.col[c]++;

            if (r === c) {
              board.match.diag[0]++;
              board.match.diag[1]++;
            }

            if (r + c === board.gridSize - 1) {
              board.match.diag[1]++;
            }
          }
        }
      }
    };

    board.checkBingo = () => {
      const winners = Object.keys(board.match).map((key) => {
        return board.match[key].includes(board.gridSize);
      });

      return winners.some((isWinner) => isWinner);
    };

    board.getScore = (winningNum) => {
      const sumUnmatched = board.unmatchedSqrs.reduce((a, b) => a + b, 0);

      return winningNum * sumUnmatched;
    };

    return board;
  }

  genBingo(nums, boards) {
    const bingo = {
      nums: nums,
      boards: boards,
      numIndx: 0,
      state: {
        winner: null,
        winners: [],
      },
    };

    bingo.getBoards = (getLast) => {
      if (getLast) {
        const remainingBoards = bingo.boards.filter(
          (board) => !bingo.state.winners.includes(board.id)
        );
        return remainingBoards;
      }

      return bingo.boards;
    };

    bingo.getBoardById = (id) => {
      return bingo.boards.find((b) => b.id === id);
    };

    bingo.run = (getLast = false) => {
      const shouldRun = () => {
        if (getLast) {
          const remainingBoards = bingo.getBoards(getLast);

          if (remainingBoards.length === 0) {
            console.log('No remaining boards');
            return false;
          }

          return bingo.numIndx < bingo.nums.length;
        }

        return !bingo.state.winner;
      };
      let currentNum;
      while (shouldRun()) {
        const boards = bingo.getBoards(getLast);
        currentNum = bingo.nums[bingo.numIndx];

        for (let b of boards) {
          b.checkMatch(currentNum);

          if (b.checkBingo()) {
            if (getLast) {
              bingo.state.winners.push(b.id);
            } else {
              bingo.state.winner = b;
              break;
            }
          }
        }

        bingo.numIndx++;
      }

      if (getLast) {
        const lstWinner = bingo.state.winners.pop();
        const winner = bingo.boards.find((b) => b.id === lstWinner);
        return { winningNum: currentNum, winner: winner };
      }

      return { winningNum: currentNum, winner: bingo.state.winner };
    };

    return bingo;
  }

  partOne() {
    const bingo = this.parseInput();

    const { winningNum, winner } = bingo.run();

    super.printOutput(1, winner.getScore(winningNum));
  }

  partTwo() {
    const bingo = this.parseInput();

    const { winningNum, winner } = bingo.run(true);

    super.printOutput(2, winner.getScore(winningNum));
  }
}

module.exports = Day4;
