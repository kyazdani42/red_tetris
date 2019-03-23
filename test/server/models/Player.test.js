const Player = require('../../../src/server/models/Player');
const { fakePiece } = require('../utils');

describe('models/Player', () => {
  it('new player', () => {
    const player = new Player({ handshake: { query: '123' }, emit: () => 'emit' });
    player.initPlayer(fakePiece, fakePiece);
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
    const { x } = player.piece;
    player.piece.y = 0;
    player.tryMoveLeft();
    expect(player.piece.x).toEqual(x - 1);
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
    player.tryMoveDown();
    expect(player.piece.y).toBe(1);
    player.tryGoDown();
    expect(player.piece.y).toBe(17);
    player.tryMoveDown();
    expect(player.piece.y).toBe(17);
    player.updateStack();
    expect(typeof player.stack).toBe('object');
  });
});

