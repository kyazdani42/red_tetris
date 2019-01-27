const Game = require('../models/Game');

module.exports = class Socket {

    constructor(props) {
        this.io = props.io;
        this.rooms = [];
        this.io.of('/home').on('connection', (socket) => socket.emit('rooms', { rooms: this.rooms.map(d => ({ ...d.data, name: d.name })) }));
    }

    createNewRoom(name) {
      this.rooms = this.rooms.concat(new Game({ name, io: this.io }));
      this.io.of('/home').emit('rooms', { rooms: this.rooms.map(d => ({ ...d.data, name: d.name })) });
    }


};
