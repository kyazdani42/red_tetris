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

const getRooms = () => rooms.reduce((accu, value, index) => {
  return accu.push(index);
}, []);

const getSocket = () => socket;

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

      rooms[name].data.playeurs.push({id: socket.id, playing: false});
      if (!rooms[name].data.owner) {
        rooms[name].data.owner = socket.id;
      }
      console.log(socket.id);

      socket.on('disconnect', () => {
        const playeurIndex = rooms[name].data.playeurs.findIndex((playeur) => {
          return playeur.id === socket.id;
        });
        rooms.data.playeurs.splice(playeurIndex, 1);
        if (rooms.data.playeurs !== {}) {
          if (rooms[name].data.owner === socket.id) {
            rooms[name].data.owner = rooms[name].data.playeurs[0].id;
          }
        } else {
          rooms[name] = undefined;
        }
      });

      socket.on('update', (data) => {
        console.log('update');
        socket.emit('update2', data);
      });
      socket.emit('start', {
        that: 'only'
        , '/chat': 'will get'
      });
      rooms[name].socket.emit('start', {
        everyone: 'in'
        , '/chat': 'will get'
      });
    });
  return name;
};

// function start() {
//   debug('start socket.io');
//
//   const app = express();
//   const http = sysHttp.Server(app);
//   const io = socketIo(http);
//
//   const port = process.env.PORT || config.get('port');
//
//   http.listen(port, function() {
//     debug('server started and listening on port HTTP ' + port);
//   });
//
//   io.on('connection', function(socket) {
//     debug('a client connected');
//
//     const room = socket.handshake.query.room;
//
//     if (room) {
//       debug('client joining room ' + room);
//       socket.join(room);
//     }
//
//     socket.on('disconnect', function(){
//       debug('client disconnected');
//     });
//
//     socket.on('error', function(error) {
//       debug(error);
//     });
//   });
//
// };

module.exports = {
  newRoom,
  getRooms,
  initServer,
  getSocket,
};