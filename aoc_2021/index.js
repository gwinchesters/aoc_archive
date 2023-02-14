const solvers = [];

//solvers.push(new (require('./src/day1'))());
//solvers.push(new (require('./src/day2'))());
//solvers.push(new (require('./src/day3'))());
//solvers.push(new (require('./src/day4'))());
//solvers.push(new (require('./src/day5'))());
//solvers.push(new (require('./src/day6'))());
//solvers.push(new (require('./src/day7'))());
//solvers.push(new (require('./src/day8'))());
solvers.push(new (require('./src/day9'))());

solvers.forEach((solver) => {
  solver.partOne();
  solver.partTwo();
});
