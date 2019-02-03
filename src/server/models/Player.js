const { fusionPieceAndStack, checkPosition, initStack, updateFullLine, addFixLine } = require('../utils/player');
const Piece = require('./Piece');

class Player {
  constructor(socket) {
    this.id = socket.id;
    this.socket = socket;
    this.pieceIndex = 0;
    this.stack = initStack();
    this.piece = null;
    this.isPlaying = false;
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
    let {x, y, pattern} = this.piece;
    let nbLine = 0;
    if (checkPosition(x, y + 1, pattern, this.stack)) {
      console.log('pose');
      this.isPlaying = !checkPosition(x, y, pattern, this.stack);
      console.log(this.isPlaying);
      this.stack = fusionPieceAndStack(this.piece, this.stack);
      console.log('fusion');
      pattern.forEach((line, patternY) => {
        if (y + patternY < 20 && updateFullLine(y + patternY, this.stack)) {
          console.log('line !');
          nbLine++;
        }
      });
      this.piece.fixPiece();
    }
    return nbLine;
  };

  tryMoveDown() {
    let { x, y, pattern } = this.piece;
    if (!checkPosition(x, y + 1, pattern, this.stack)) {
      this.piece.moveDown();
    }
  };

  tryRotate() {
    let { x, y, patternIndex, patterns } = this.piece;
    if (!checkPosition(x, y, patterns[(patternIndex + 1) % 4], this.stack)) {
      this.piece.rotate();
    }
  };

  tryMoveRight() {
    let { x, y, pattern } = this.piece;
    if (!checkPosition(x + 1, y, pattern, this.stack)) {
      this.piece.moveRight();
    }
  };

  tryMoveLeft() {
    let { x, y, pattern } = this.piece;
    if (!checkPosition(x - 1, y, pattern, this.stack)) {
      this.piece.moveLeft();
    }
  };

  tryGoDown() {
    let { x, pattern } = this.piece;
    while (!checkPosition(x, this.piece.y + 1, pattern, this.stack)) {
      this.piece.moveDown();
    }
  };

  addLine(nbLine) {
    for (let add = 0; add < nbLine; add++) {
      if (!addFixLine(this.stack)) {
        this.isPlaying = false;
      }
    }
  };
}

module.exports = Player;
