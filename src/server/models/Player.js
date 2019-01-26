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

const isInContactWithStack = ({ x, y, pattern }, stack) => {
  pattern.forEach((line, patternY) => {
    line.forEach((patternCase, patternX) => {
      if (patternCase === 1 && stack[patternY + y + 1][patternX + x].value === 1) {
        return true;
      }
    })
  });
  return false;
};

fusionnePieceAndStack = ({ x, y, pattern }, stack) => {
  pattern.forEach((line, patternY) => {
    line.forEach((patternCase, patternX) => {
      if (patternCase === 1 ) {
        stack[patternY + y][patternX + x].value = 1;
      }
    })
  });
  return stack;
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

class Player {


  constructor(id) {
    this.id = id;
    this.pieceIndex = 0;
    this.stack = initStack();
    this.piece = null;
  }

  setNextPiece(piece) {
    this.piece = piece;
    this.pieceIndex++;
  };

  updateStack() {
    if (isInContactWithStack(this.piece, this.stack)) {
      this.stack = fusionnePieceAndStack();
      this.piece = null;
    }
  };

  addToStack() {
    this.stack = [];
  };

  tryMoveDown() {
    let { x, y, pattern } = this.piece;
    if (checkPosition(x, y + 1, pattern, this.stack)) {
      this.piece.moveDown();
    }
  };

}

module.exports = Player;
