const _ = require('lodash');

function getRoomWithoutPlayerId(room) {
  return _.reduce(room.players, (accu, player) => {
    accu.push({name: player.name, isPlaying: player.isPlaying});
    return accu;
  }, []);
}

module.exports = {
  getRoomWithoutPlayerId,
};