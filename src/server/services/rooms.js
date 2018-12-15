const _ = require('lodash');

const { Room } = require('../models');
const { getRoomWithoutPlayerId } = require('./utils');

async function searchRoomsDatabase(filter) {
  const query = await Room.find(filter).lean();
  const result = _.map(query, (room) => getRoomWithoutPlayerId(room));

  return result;
}

async function createRoomDatabase({ id, name }) {
  const data = {
    players: [{
      id,
      name,
      isPlaying: false,
    }],
    owner: id,
    running: false,
  };
console.log(data);
  const room = new Room(data);
  await room.save();
  return room;
}

async function addUserInRoomDatabase(idRoom, { id, name }) {
  const query = await Room.findOne({_id: idRoom, running:  false});
  if (!query) {
    return { roomIdError: 'No room available' };
  }
  const player = _.find(query.players, (player) => {
    return player.id === id;
  });
  if (!player) {
    query.players.push({
      id,
      name,
      isPlaying: false,
    });
    query.save();
  }

  return { success: 'ok' };
}

async function getRoomByIdDatabase(idRoom, { allField = false }) {
  const room = await Room.findOne({_id: idRoom});
  if (!room) {
    return { roomIdError: 'No room available' };
  }

  if (allField) {
    return room;
  }

  return getRoomWithoutPlayerId(room);
}

module.exports = {
  searchRoomsDatabase,
  createRoomDatabase,
  addUserInRoomDatabase,
  getRoomByIdDatabase,
};
