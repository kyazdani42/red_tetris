const { getRandomPiece } = require('../services/pieces');

class Piece {
  constructor(color, patterns) {
    this.pattern = patterns[0];
    this.patterns = patterns;
    this.color = color;
    this.patternIndex = 0;
    this.x = 4;
    this.y = 2;
  }

  moveRight() {
    if (this.x < 9) {
      this.x++;
    }
  };

  moveLeft() {
    if (this.x > 0) {
      this.x--;
    }
  };

 moveDown() {
    if (this.x > 0) {
      this.x--;
    }
  };

  rotate() {
    this.patternIndex = (this.patternIndex + 1) % 4;
    this.pattern = this.patterns[this.patternIndex];
  };
};

module.exports = Piece;