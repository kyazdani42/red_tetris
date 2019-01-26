const stackCase = { color: 'black', value: 0, fix: false };

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

  updateGrid() {
    const update = this.piece.moveDown();
    if (update) {
      this.piece = null;
    }
  };
}

module.exports = Player;
