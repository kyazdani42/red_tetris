const _ = require('lodash');

function getRoomWithoutPlayerId(room) {
  const players = _.reduce(room.players, (accu, player) => {
    accu.push({ name: player.name, isPlaying: player.isPlaying });
    return accu;
  }, []);
  console.log(room)
  return { id: room._id, players, running: room.running, updated: room.updated }
}

module.exports = {
  getRoomWithoutPlayerId,
};