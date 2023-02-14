const fs = require('fs');

const BASE_PATH = '/Users/George/Development/Misc_Utils/aoc_2021/src/input';

const getContent = (file) => {
  const filePath = `${BASE_PATH}/${file}`;
  return fs.readFileSync(filePath, 'utf8').toString();
};

const toArray = (file, dataType = 'string') => {
  const typeMap = {
    string: (v) => v,
    binary: (v) => Number(`0b${v}`),
    number: (v) => Number(v),
  };

  const vals = getContent(file).split('\n');

  return vals.map((v) => typeMap[dataType](v));
};

module.exports = {
  toArray,
};
