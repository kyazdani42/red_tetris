const { isInContactWithStack, fusionPieceAndStack, checkPosition, initStack } = require('../utils/player');
const Piece = require('./Piece');

class Player {
  constructor(socket) {
    this.id = socket.id;
    this.socket = socket;
    this.pieceIndex = 0;
    this.stack = initStack();
    this.piece = null;
  }

  setNextPiece(pieceData) {
    console.log('nextPiece');
    this.piece = new Piece(pieceData);
    this.pieceIndex++;
  };

  tmpStack() {
    return fusionPieceAndStack(this.piece, this.stack);
  }

  updateStack() {
    console.log(this.stack);
    if (isInContactWithStack(this.piece, this.stack)) {
      console.log('ici');
      this.stack = fusionPieceAndStack(this.piece, this.stack);
      this.piece.fixPiece();
    }
  };

  tryMoveDown() {
    let { x, y, pattern } = this.piece;
    if (checkPosition(x, y + 1, pattern, this.stack)) {
      this.piece.moveDown();
    }
  };

}

module.exports = Player;
