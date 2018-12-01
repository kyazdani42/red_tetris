const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
  id: String,
  players: Array,
  activePlayers: Array,
  owner: {
    id: String,
    username: String,
  },
  running: Boolean
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;