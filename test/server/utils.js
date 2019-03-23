const Player = require('../../src/server/models/Player');
const { generate } = require('../../src/server/utils/game');

const getTwoPlayers = () => {
  const players = [new Player({ handshake: { query: '123' }, emit: () => 'emit' }), new Player({ handshake: { query: '123' }, emit: () => 'emit' })];
  const allPiece = generate();
  players.forEach((player) => player.initPlayer(allPiece[0], allPiece[1]));
  return players;
};

const fakePiece = {
  color: 'red',
  patterns: [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
  ],
};

module.exports = {
  getTwoPlayers,
  fakePiece,
};
