const stackCase = { color: 'black', value: 0, fix: false };

const checkPosition = (x, y, pattern, stack) => {
  pattern.forEach((line, patternY) => {
    line.forEach((patternCase, patternX) => {
      if (patternCase === 1) {
        if (patternY + y > 19 || patternY + y < 0 || patternX + x > 9 || patternX + x < 0) { return false; }
        if (stack[patternY + y][patternX + x].value === 1) { return false; }
      }
    })
  });
  return true
};

const checkCase = (stack, y) => {
  return (patternCase, x) => {
    if (patternCase === 1) {
      if (y > 19) { return true; }
      if (stack[y][x].value === 1) { return true; }
    }
  }
};

const checkLine = (line, stack, x, y) => {
  let result = false;
  const check = checkCase(stack, y);
  line.forEach((patternCase, patternX) => {
    if (check(patternCase, x + patternX)) {
      result = true;
    }
  });
  return result;
};

const isInContactWithStack = (piece, stack) => {
  let result = false;
  piece.pattern.forEach((line, patternY) => {
    if (checkLine(line, stack,  piece.x, patternY + piece.y + 1)) {
      result = true;
    }
  });
  return result;
};

const fusionPieceAndStack = ({ x, y, pattern, color }, stack) => {
  const newStack = [...stack];
  pattern.forEach((line, patternY) => {
    line.forEach((patternCase, patternX) => {
      if (patternCase === 1 ) {
        newStack[patternY + y][patternX + x] = { color,  value: 1, fix: false };
      }
    })
  });
  return newStack;
};

const initStack = () => {
  const stack = [];
  for (let y = 0; y < 20; y++) {
    stack[y] = [];
    for (let x = 0; x < 10; x++) {
      stack[y].push(stackCase);
    }
  }
  return stack;
};

module.exports = {
  checkPosition,
  isInContactWithStack,
  fusionPieceAndStack,
  initStack,
};