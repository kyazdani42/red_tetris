const stackCase = { color: 'black', value: 0, fix: false };
const fixStackCase = { color: 'grey', value: 1, fix: true };

const checkCase = (stack, y) => {
  return (patternCase, x) => {
    if (patternCase === 1) {
      if (y > 19 || x < 0 || x > 9) { return true; }
      if (stack[y][x].value === 1) { return true; }
    }
    return false;
  }
};

const checkLine = (line, stack, x, y) => {
  const check = checkCase(stack, y);
  return line.some((patternCase, patternX) => {
    return check(patternCase, x + patternX);
  });
};

const checkPosition = (x, y, pattern, stack) => {
  return pattern.some((line, patternY) => {
    return checkLine(line, stack,  x, patternY + y);
  });
};

const fusionPieceAndStack = ({ x, y, pattern, color }, stack) => {
  const newStack = JSON.parse(JSON.stringify( stack ));
  pattern.forEach((line, patternY) => {
    line.forEach((patternCase, patternX) => {
      if (patternCase === 1 ) {
        newStack[patternY + y][patternX + x] = { color,  value: 1, fix: false };
      }
    })
  });
  return newStack;
};

const isFullLine = (y, stack, value) => {
  return !stack[y].some((aCase) => {
    return aCase.value === value;
  })
};

const updateFullLine = (y, stack) => {
  if (!stack[y][0].fix && isFullLine(y, stack, 0)) {
    console.log('fullLine')
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

const initStack = () => {
  const stack = [];
  for (let y = 0; y < 20; y++) {
    stack[y] = initLine(stackCase);
  }
  return stack;
};

module.exports = {
  checkPosition,
  fusionPieceAndStack,
  initStack,
  updateFullLine,
  addFixLine,
};