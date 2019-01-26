const stackCase = { color: 'black', value: 0, fix: false };

class Player {


  constructor(id) {
    this.id = id;
    this.actualPieceIndex = 0;
    this.stack = [];
  }

  nextPiece = () => {
    this.actualPieceIndex++;
  };
}

module.exports = Player;
