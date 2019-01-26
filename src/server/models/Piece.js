const { getRandomPiece } = require('../services/pieces');

class Piece {
  x = 4;
  y = 2;

  constructor(color, patterns) {
    this.pattern = patterns[0];
    this.patterns = patterns;
    this.color = color;
    this.patternIndex = 0;
    this.x = 4;
    this.y = 2;
  }
};

Piece.prototype.moveRight = () => {
  if (this.x < 9) {
    this.x++;
  }
};

Piece.prototype.moveLeft = () => {
  if (this.x > 0) {
    this.x--;
  }
};

Piece.prototype.moveLeft = () => {
  if (this.x > 0) {
    this.x--;
  }
};

Piece.prototype.rotate = () => {
  this.patternIndex = (this.patternIndex + 1) % 4;
  this.pattern = this.patterns[this.patternIndex];
};

module.exports = Piece;