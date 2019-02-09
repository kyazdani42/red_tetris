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
    this.spectre = null;
    this.nbLine = 0;
  }

  setNextPiece(pieceData) {
    console.log('nextPiece');
    this.piece = new Piece(pieceData);
    this.pieceIndex += 1;
  }

  tmpStack() {
    return fusionPieceAndStack(this.piece, this.stack);
  }

  updateStack() {
    const { x, y, pattern } = this.piece;
    if (checkPosition(x, y + 1, pattern, this.stack)) {
      console.log('pose');
      this.isPlaying = !checkPosition(x, y, pattern, this.stack);
      console.log(this.isPlaying);
      this.stack = fusionPieceAndStack(this.piece, this.stack);
      console.log('fusion');
      pattern.forEach((line, patternY) => {
        if (y + patternY < 20 && updateFullLine(y + patternY, this.stack)) {
          console.log('line !');
          this.nbLine += 1;
        }
      });
      this.piece.fixPiece();
      this.spectre = getSpectre(this.stack);
    }
  }

  tryMoveDown() {
    const { x, y, pattern } = this.piece;
    if (!checkPosition(x, y + 1, pattern, this.stack)) {
      this.piece.moveDown();
    }
  }

  tryRotate() {
    const {
      x, y, patternIndex, patterns,
    } = this.piece;
    if (!checkPosition(x, y, patterns[(patternIndex + 1) % 4], this.stack)) {
      this.piece.rotate();
    }
  }

  tryMoveRight() {
    const { x, y, pattern } = this.piece;
    if (!checkPosition(x + 1, y, pattern, this.stack)) {
      this.piece.moveRight();
    }
  }

  tryMoveLeft() {
    const { x, y, pattern } = this.piece;
    if (!checkPosition(x - 1, y, pattern, this.stack)) {
      this.piece.moveLeft();
    }
  }

  tryGoDown() {
    const { x, pattern } = this.piece;
    while (!checkPosition(x, this.piece.y + 1, pattern, this.stack)) {
      this.piece.moveDown();
    }
  }

  addLine(nbLine) {
    for (let add = 0; add < nbLine; add += 1) {
      if (!addFixLine(this.stack)) {
        this.isPlaying = false;
      }
    }
  }
}

module.exports = Player;
