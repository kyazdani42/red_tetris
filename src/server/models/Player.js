const {
  fusionPieceAndStack,
  checkPosition,
  initStack,
  updateFullLine,
  addFixLine,
  getSpectre,
  getMirrorStack,
  calculNewScore,
} = require('../utils/player');
const Piece = require('./Piece');

module.exports = class Player {
  constructor(socket) {
    this.id = socket.id;
    this.socket = socket;
    this.pieceIndex = 0;
    this.stack = [];
    this.piece = null;
    this.nextPiece = null;
    this.isPlaying = false;
    this.spectre = null;
    this.nbLine = 0;
    this.winner = false;
    this.score = 0;
    this.name = '';
  }

  initPlayer(piece, nextPiece) {
    this.pieceIndex = 0;
    this.stack = initStack();
    this.isPlaying = true;
    this.spectre = null;
    this.nbLine = 0;
    this.score = 0;
    this.winner = false;
    this.setNextPiece(piece, nextPiece);
  }

  setNextPiece(pieceData, nextPieceData) {
    this.piece = new Piece(pieceData);
    this.nextPiece = nextPieceData;
    this.pieceIndex += 1;
  }

  tmpStack(mirror) {
    const stack = fusionPieceAndStack(this.piece, this.stack);
    return mirror ? getMirrorStack(stack) : stack;
  }

  updateStack() {
    const { x, y, pattern } = this.piece;
    if (checkPosition(x, y + 1, pattern, this.stack)) {
      this.isPlaying = !checkPosition(x, y, pattern, this.stack);
      if (!this.isPlaying) { return; }
      this.stack = fusionPieceAndStack(this.piece, this.stack);
      pattern.forEach((line, patternY) => {
        if (y + patternY > -1 && y + patternY < 20 && updateFullLine(y + patternY, this.stack)) {
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
      const { x, y, pattern } = this.piece;
      if (!addFixLine(this.stack)) {
        this.isPlaying = false;
      }
      if (checkPosition(x, y, pattern, this.stack)) {
        this.piece.moveUp();
      }
    }
  }

  updateScore() {
    this.score += calculNewScore(this.nbLine);
    this.nbLine = 0;
  }
};
