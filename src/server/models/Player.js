const {isInContactWithStack, fusionPieceAndStack, checkPosition, initStack } = require('../utils/player');
const Piece = require('./Piece');

class Player {
  constructor(id) {
    this.id = id;
    this.pieceIndex = 0;
    this.stack = initStack();
    this.piece = null;
  }

  setNextPiece(pieceData) {
    this.piece = new Piece(pieceData);
    this.pieceIndex++;
  };

  updateStack() {
    if (isInContactWithStack(this.piece, this.stack)) {
      console.log('ici');
      this.stack = fusionPieceAndStack(this.piece, this.stack);
      console.log(this.stack);
      this.piece.fixPiece();
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
