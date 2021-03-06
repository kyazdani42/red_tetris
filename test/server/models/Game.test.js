const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const Game = require('../../../src/server/models/Game');

describe('models/Game', () => {
  it('new game', () => {
    const game = new Game({ io, name: 'aName' });
    expect(game.name).toBe('aName');
    let publicInfo = game.getPublicInfo();
    expect(publicInfo.name).toBe('aName');
    expect(publicInfo.running).toBe(false);
    expect(publicInfo.players).toBe(0);
    expect(publicInfo.owner).toBe(undefined);
    game.addPlayer({ handshake: { query: { playerName: 'aPlayerName' } }, id: 'anId', emit: () => true });
    game.addPlayer({ handshake: { query: { playerName: 'anotherPlayerNameB' } }, id: 'anotherId', emit: () => true });
    game.updatePlayerName('anotherId', 'anotherPlayerName');
    publicInfo = game.getPublicInfo();
    expect(publicInfo.ownerName).toEqual('aPlayerName');
    game.start('anId', { reverse: true, mirror: true, invisible: true });
    publicInfo = game.getPublicInfo();
    expect(publicInfo.running).toBe(true);
    const priveteInfo = game.privateInfo(game.players[0]);
    expect(priveteInfo.name).toBe('aName');
    game.actions('anId', 'moveDown');
    game.actions('anId', 'moveLeft');
    game.actions('anId', 'moveRight');
    game.actions('anId', 'rotate');
    game.actions('anId', 'goDown');
    expect(game.players[0].piece.y).toBe(18);
    game.removePlayer('anId');
    publicInfo = game.getPublicInfo();
    expect(publicInfo.ownerName).toEqual('anotherPlayerName');
    game.removePlayer('anotherId');
    expect(game.players).toEqual([]);
  });
});
