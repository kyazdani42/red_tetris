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
  const room = await Room.findOne({_id: idRoom, running:  false});
  if (!room) {
    return { roomIdError: 'No room available' };
  }
  const player = _.find(room.players, (player) => {
    return player.id === id;
  });
  if (!player) {
    room.players.push({
      id,
      name,
      isPlaying: false,
    });
    room.save();
  }
  const data = getRoomWithoutPlayerId(room);
  return { data };
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

async function removeUserInRoomDatabase(idRoom, userId) {
  const room = await Room.findOne({_id: idRoom});
  if (!room) {
    return { roomIdError: 'No room available' };
  }

  _.reduce(room.players, (accu, player) => {
    if (player.id !== userId) {
      accu.push(player);
    }
    return accu;
  }, []);
console.log(room);
  room.save();

  return {data: 'OK'};
}

module.exports = {
  searchRoomsDatabase,
  createRoomDatabase,
  addUserInRoomDatabase,
  getRoomByIdDatabase,
  removeUserInRoomDatabase,
};
