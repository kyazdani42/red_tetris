class Piece {
  constructor({ color, patterns }) {
    this.pattern = patterns[0];
    this.patterns = patterns;
    this.color = color;
    this.patternIndex = 0;
    this.fixed = false;
    this.x = 5 - (Math.floor(this.pattern[0].length / 2));
    this.y = 0;
  }

  fixPiece() {
    this.fixed = true;
  }

  moveRight() {
    this.x++;
  }

  moveLeft() {
    this.x--;
  }

  moveDown() {
    this.y++;
  }

  rotate() {
    this.patternIndex = (this.patternIndex + 1) % 4;
    this.pattern = this.patterns[this.patternIndex];
  }

  moveUp() {
    this.y--;
  }
}

module.exports = Piece;
