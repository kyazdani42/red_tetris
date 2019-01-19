const	socket = require('socket.io');
const uniqid = require('uniqid');

let io;
const rooms = [];

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

timeout = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};

const getRooms = () => rooms.reduce((accu, value, index) => {
  return accu.push(index);
}, []);

const getSocket = () => socket;

const updateGrids = async (name) => {
    rooms[name].data.playeurs.map((playeur) => {
        playeur.grid = [];
        return playeur;
    })
};

const game = async (name) => {
    await timeout();
    rooms[name].socket.emit('updateData', {gameStatus: '3'});
    await timeout();
    rooms[name].socket.emit('updateData', {gameStatus: '2'});
    await timeout();
    rooms[name].socket.emit('updateData', {gameStatus: '1'});
    while (rooms[name].data.running) {
        await timeout();
        await updateGrids();
        rooms[name].socket.emit('updateData', { data: rooms[name].data });
    }
};

const newRoom = () => {
  // const name = uniqid();
  const name = '123';
  rooms[name] = {
    data: {
      running: false,
      playeurs: [],
      owner: null,
    },
  };
  rooms[name].socket = io
    .of(`/${name}`)
    .on('connection', (socket) => {
      if (rooms[name].data.running) {
        socket.disconnect();
      }

      rooms[name].data.playeurs.push({id: socket.id, playing: true});
      if (!rooms[name].data.owner) {
        rooms[name].data.owner = socket.id;
      }
      console.log(socket.id);

      socket.on('disconnect', () => {
        const playeurIndex = rooms[name].data.playeurs.findIndex((playeur) => {
          return playeur.id === socket.id;
        });
        rooms[name].data.playeurs.splice(playeurIndex, 1);
        if (rooms[name].data.playeurs !== {}) {
          if (rooms[name].data.owner === socket.id) {
            rooms[name].data.owner = rooms[name].data.playeurs[0].id;
            rooms[name].socket.emit('updateData', { data: rooms[name].data });
          }
        } else {
          rooms[name] = undefined;
        }
      });
        socket.on('start', () => {
            if (socket.id === rooms[name].data.owner) {
                // map playeur playing: true
                console.log('start');
                rooms[name].data.running = true;
                game(name);
            }
        });
        socket.on('stop', () => {
            console.log('stop');
            rooms[name].data.running = false;
        });

      socket.on('update', (data) => {
        console.log('update');
        socket.emit('update2', data);
      });
    });
  return name;
};

module.exports = {
  newRoom,
  getRooms,
  initServer,
  getSocket,
};