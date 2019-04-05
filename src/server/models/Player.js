const uniqId = require('uniqid');

const {
  fusionPieceAndStack,
  checkPosition,
  initStack,
  updateFullLine,
  addFixLine,
  getSpectre,
  getMirrorStack,
  calculNewScore,
  initHistory,
} = require('../utils/player');
const Piece = require('./Piece');

module.exports = class Player {
  constructor(socket) {
    this.id = socket.id;
    this.token = socket.handshake.query.token || uniqId();
    this.socket = socket;
    this.pieceIndex = 0;
    this.stack = [];
    this.piece = null;
    this.nextPiece = null;
    this.isPlaying = false;
    this.spectre = null;
    this.nbLine = 0;
    this.winner = undefined;
    this.score = 0;
    this.name = socket.handshake.query.playerName;
    socket.emit('token', this.token);
  }

  initPlayer(piece, nextPiece) {
    this.pieceIndex = 0;
    this.stack = initStack();
    this.isPlaying = true;
    this.spectre = null;
    this.nbLine = 0;
    this.score = 0;
    this.winner = undefined;
    this.setNextPiece(piece, nextPiece);
  }

  setNextPiece(pieceData, nextPieceData) {
    this.piece = new Piece(pieceData);
    this.nextPiece = nextPieceData;
    this.pieceIndex += 1;
  }

  tmpStack({ mirror, invisible }) {
    const stack = invisible ? this.stack : fusionPieceAndStack(this.piece, this.stack);
    return mirror ? getMirrorStack(stack) : stack;
  }

  updateStack() {
    const { x, y, pattern } = this.piece;
    if (checkPosition(x, y + 1, pattern, this.stack)) {
      this.isPlaying = !checkPosition(x, y, pattern, this.stack);
      if (!this.isPlaying) {
        this.winner = false;
        return;
      }
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
      x, y, patternIndex, patterns, fixed,
    } = this.piece;
    if (!fixed && !checkPosition(x, y, patterns[(patternIndex + 1) % 4], this.stack)) {
      this.piece.rotate();
    }
  }

  tryMoveRight() {
    const { x, y, pattern, fixed } = this.piece;
    if (!fixed && !checkPosition(x + 1, y, pattern, this.stack)) {
      this.piece.moveRight();
    }
  }

  tryMoveLeft() {
    const { x, y, pattern, fixed } = this.piece;
    if (!fixed && !checkPosition(x - 1, y, pattern, this.stack)) {
      this.piece.moveLeft();
    }
  }

  tryGoDown() {
    const { x, pattern } = this.piece;
    while (!checkPosition(x, this.piece.y + 1, pattern, this.stack)) {
      this.piece.moveDown();
    }
    this.piece.fixed = true;
  }

  addLine(nbLine) {
    for (let add = 0; add < nbLine; add += 1) {
      const { x, y, pattern } = this.piece;
      if (!addFixLine(this.stack)) {
        this.isPlaying = false;
        this.winner = false;
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
