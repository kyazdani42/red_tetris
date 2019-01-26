const	socket = require('socket.io');
const { getRooms } = require('../services/rooms');

let io;

const initServer = (server) => {
  return new Promise(async (resolve, reject) => {
    try {
      io = await socket(server);
      resolve("done!")
    } catch (err) {
      reject(err);
    }
  });
};

io.on('connection', async (socket) => {
  const allRooms = getRooms();
  socket.emit('getRooms', allRooms);
});

const getIo = () => io;

const initSocket = (game, name) => {
  io.emit('newRoom', name);
    return io
        .of(`/${name}`)
        .on('connection', (socket) => {
            if (game.running) {
                socket.disconnect();
            }
            socket.emit('id', socket.id);
            game.addPlayeur(id);
            console.log(socket.id);

            socket.on('disconnect', () => {
                game.removePlayer(socket.id);
            });
            socket.on('start', () => {
                game.start();
            });
            socket.on('stop', () => {
                console.log('stop');
                game.stop();
            });

            socket.on('update', (data) => {
                console.log('update');
                socket.emit('update2', data);
            });
        });
};

module.exports = {
  initSocket,
  initServer,
  getIo,
};