const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
  updated: { type: Date, default: Date.now },
  players: [{
    id: String,
    name: String,
    isPlaying: { type: Boolean, default: false },
  }],
  running: Boolean,
  owner: String,
}, {versionKey: false});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;