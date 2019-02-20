const Player = require('../../../src/server/models/Player');
const { generate } = require('../../../src/server/utils/game');

const getTwoPlayers = () => {
  const players = [new Player('aSocket'), new Player('aSocket')];
  const allPiece = generate();
  players.forEach((player) => player.initPlayer(allPiece[0], allPiece[1]));
};


module.exports = {
  getTwoPlayers,
};
