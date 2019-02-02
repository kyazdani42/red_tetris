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

const checkCase = () => {
  if (patternCase === 1) {
    if (patternY + y + 1 > 19) { return true; }
    if (stack[patternY + y + 1][patternX + x].value === 1) { return true; }
  }
};

const checkLine = ({ x, y, pattern }, stack) => {
  return line.forEach((patternCase, patternX) => {
    checkCase()
  })
};

const isInContactWithStack = (piece, stack) => {
  pattern.forEach((line, patternY) => {
    checkLine(piece, stack);

  });
  return false;
};

const fusionPieceAndStack = ({ x, y, pattern, color }, stack) => {
  const newStack = Object.assign({}, stack);
  pattern.forEach((line, patternY) => {
    line.forEach((patternCase, patternX) => {
      if (patternCase === 1 ) {
        newStack[patternY + y][patternX + x].value = { color,  value: 1, fix: false };
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