const stackCase = { color: 'black', value: 0, fix: false };

const initStack = () => {
  const stack = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
        stack.push(stackCase);
    }
  }
  return stack;
};

class Player {


  constructor(id) {
    this.id = id;
    this.actualPieceIndex = 0;
    this.stack = initStack();
  }

  nextPiece() {
    this.actualPieceIndex++;
  };
}

module.exports = Player;
