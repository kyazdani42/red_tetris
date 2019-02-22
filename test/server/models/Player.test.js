const Player = require('../../../src/server/models/Player');
const { getRandomPiece } = require('../../../src/server/utils/pieces');

describe('models/Player', () => {
  it('new player', () => {
    const player = new Player('aSocket');
    const { } = player;
    const aPieceData = getRandomPiece();
    const aSecondPieceData = getRandomPiece();
    player.initPlayer(aPieceData, aSecondPieceData);
    expect(player.isPlaying).toBe(true);
    player.nbLine = 4;
    player.updateScore();
    expect(player.score).toBe(120);
    player.nbLine = 3;
    player.updateScore();
    expect(player.score).toBe(150);
    let tmpStack = player.tmpStack(true);
    expect(typeof tmpStack).toBe('object');
    tmpStack = player.tmpStack(false);
    expect(typeof tmpStack).toBe('object');
    player.updateStack();
    expect(typeof player.stack).toBe('object');
    player.tryGoDown();
    expect(player.piece.y).toBe(18);
    player.tryMoveDown();
    expect(player.piece.y).toBe(18);
    player.updateStack();
    expect(typeof player.stack).toBe('object');
    player.piece.y = 2;
    player.tryMoveDown();
    expect(player.piece.y).toBe(3);
    const { x } = player.piece;
    player.tryMoveLeft();
    expect(player.piece.x).toBe(x - 1);
    player.tryMoveRight();
    expect(player.piece.x).toBe(x);
    player.piece.x = 9;
    player.tryMoveRight();
    expect(player.piece.x).toBe(9);
    player.piece.x = 0;
    player.tryMoveLeft();
    expect(player.piece.x).toBe(0);
    player.tryRotate();
    expect(player.piece.patternIndex).toBe(1);
  });
});
/*

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
*/
