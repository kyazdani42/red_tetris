const stackCase = { color: 'black', value: 0, fix: false };
const fixStackCase = { color: 'grey', value: 1, fix: true };

const getSpectre = (stack) => {
  const result = [];
  for (let x = 0; x < 10; x += 1) {
    for (let y = 0; y < 20; y += 1) {
      if (stack[y][x].value === 1) {
        result[x] = y;
        break;
      }
    }
  }
  return result;
};

const isOutOfBoundsOrOccupied = (x, y, stack) => y < 0 || y > 19 || x < 0 || x > 9 || stack[y][x].value === 1;
const checkCase = (stack, y) => (patternCase, x) => patternCase === 1 && isOutOfBoundsOrOccupied(x, y, stack);

const checkLine = (line, stack, x, y) => {
  const check = checkCase(stack, y);
  return line.some((patternCase, patternX) => check(patternCase, x + patternX));
};

const checkPosition = (x, y, pattern, stack) => pattern.some((line, patternY) => checkLine(line, stack, x, patternY + y));

const fusionPieceAndStack = ({
  x, y, pattern, color,
}, stack) => {
  const newStack = stack.map(d => [...d]);
  for (let patternY = 0; patternY < pattern.length; patternY++) {
    for (let patternX = 0; patternX < pattern[patternY].length; patternX++) {
      if (pattern[patternY][patternX] === 1 && patternY + y > -1 && patternX + x > -1) {
        newStack[patternY + y][patternX + x] = { color, value: 1, fix: false };
      }
    }
  }
  return newStack;
};

const isFullLine = (y, stack, value) => !stack[y].some(aCase => aCase.value === value);

const updateFullLine = (y, stack) => {
  if (!stack[y][0].fix && isFullLine(y, stack, 0)) {
    stack.splice(y, 1);
    stack.unshift(initLine(stackCase));
    return true;
  }
  return false;
};

const addFixLine = (stack) => {
  if (isFullLine(0, stack, 1)) {
    stack.splice(0, 1);
    stack.push(initLine(fixStackCase));
    return true;
  }
  return false;
};

const initLine = (newCase) => {
  const line = [];
  for (let x = 0; x < 10; x++) {
    line.push(newCase);
  }
  return line;
};

const getMirrorStack = (stack) => {
  const mirrorStack = [];
  for (let y = 0; y < 20; y += 1) {
    mirrorStack[y] = [];
    for (let x = 0; x < 10; x += 1) {
      mirrorStack[y][x] = stack[19 - y][9 - x];
    }
  }
  return mirrorStack;
};

const initStack = () => {
  const stack = [];
  for (let y = 0; y < 20; y++) {
    stack[y] = initLine(stackCase);
  }
  return stack;
};

const calculNewScore = (nbLine) => {
  switch (nbLine) {
    case 4:
      return 120;
    case 3:
      return 30;
    case 2:
      return 10;
    case 1:
      return 4;
    default:
      return 0;
  }
};

module.exports = {
  checkPosition,
  fusionPieceAndStack,
  initStack,
  updateFullLine,
  addFixLine,
  getSpectre,
  getMirrorStack,
  calculNewScore,
};
