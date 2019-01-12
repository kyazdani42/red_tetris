const	socket = require('socket.io');
const uniqid = require('uniqid');

const config = require('../config');

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

const getRooms = () => rooms;

const getSocket = () => socket;

const newRoom = () => {
  // const name = uniqid();
  const name = '123';
  rooms[name] = {};
  rooms[name].socket = io
    .of(`/${name}`)
    .on('connection', (socket) => {
      console.log(socket.id);

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