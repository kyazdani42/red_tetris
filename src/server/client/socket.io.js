const	socket = require('socket.io');

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

const getIo = () => io;

const initSocket = (game, name) => {
    io.emit('newRoom', name);
    const newSocket = io
        .of(`/${name}`)
        .on('connection', (socket) => {
            if (game.running) {
                socket.disconnect();
            }
            socket.emit('id', socket.id);
            game.addPlayer(socket.id);
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
    return newSocket;
};

module.exports = {
  initSocket,
  initServer,
  getIo,
};