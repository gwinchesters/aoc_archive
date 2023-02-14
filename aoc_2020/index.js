const solvers = [];

//solvers.push(new (require('./src/day6'))());
//solvers.push(new (require('./src/day7'))());
//solvers.push(new (require('./src/day8'))());
//solvers.push(new (require('./src/day9'))());
//solvers.push(new (require('./src/day10'))());
//solvers.push(new (require('./src/day11'))());
//solvers.push(new (require('./src/day12'))());
solvers.push(new (require('./src/day13'))());

solvers.forEach((solver) => {
  solver.partOne();
  solver.partTwo();
});
