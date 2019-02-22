const Piece = require('../../../src/server/models/Piece');
const { getRandomPiece } = require('../../../src/server/utils/pieces');

describe('models/Piece', () => {
  it('new piece', () => {
    const piece = new Piece(getRandomPiece());
    const { x, y, patternIndex } = piece;
    expect(piece.y).toBe(-1);
    piece.fixPiece();
    expect(piece.fixed).toBe(true);
    piece.moveLeft();
    expect(piece.x).toBe(x - 1);
    piece.moveRight();
    expect(piece.x).toBe(x);
    piece.moveDown();
    expect(piece.y).toBe(y + 1);
    piece.moveUp();
    expect(piece.y).toBe(y);
    piece.rotate();
    expect(piece.patternIndex).toBe(patternIndex + 1);
  });
});