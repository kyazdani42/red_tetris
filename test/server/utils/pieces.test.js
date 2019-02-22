const { getRandomPiece } = require('../../../src/server/utils/pieces');

describe('utils/pieces', () => {
  it('get a random piece', () => {
    const randomPiece = getRandomPiece();
    expect(typeof randomPiece).toBe('object');
    expect(typeof randomPiece.color).toBe('string');
    expect(typeof randomPiece.patterns).toBe('object');
    expect(randomPiece.patterns.length).toBe(4);
  });
});
