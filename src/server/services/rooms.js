const { Game } = require('../models');

const rooms = [];

const newRoom = (name) => {
  rooms[name] = new Game(name);
};

const getRooms = () => rooms.reduce((accu, room, index) => {
    if (!room.data.running) {
        return accu.push(index);
    }
    return accu;
}, []);

module.exports = {
    getRooms,
    newRoom,
};