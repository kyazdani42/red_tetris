const path = require('path');
const bodyParser = require('body-parser');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const uniqId = require('uniqid');
const { getGames, setGame } = require('./services/games');
const Game = require('./models/Game');
const corsConfig = require('./middlewares/cors');
const { getBestScore, getStats } = require('./utils/common');

io.on('connection', socket => {
  socket.emit('games', getGames());
  socket.on('createRoom', () => {
    const gameName = uniqId();
    const game = new Game({ io, name: gameName });
    setGame(game, gameName);
    socket.emit('gameName', { gameName });
  });
  io.on('getScores', (socketClient) => {
    const stats = getStats();
    socketClient.emit('scores', getBestScore(stats).slice(0, 25));
  })
});

app.disable('x-powered-by');
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
app.use(bodyParser.json({ limit: '15mb' }));
app.use(corsConfig);

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
app.get('/bundle.js', (_, res) => {
  res.sendFile(path.join(__dirname + '/dist/bundle.js'));
});

// application listener
const port = app.get('port');
server.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server started');
  }
});
