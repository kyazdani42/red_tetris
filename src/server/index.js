const path = require('path');
const express = require('express');
const app = express();
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
  socket.on('getScores', () => {
    const stats = getStats();
    socket.emit('scores', getBestScore(stats).slice(0, 25));
  });
  socket.on('getPlayerScore', (playerToken) => {
    const stats = getStats();
    socket.emit('playerScore', stats[playerToken]);
  });
});

app.disable('x-powered-by');
app.set('port', (process.env.PORT || 3000));
app.use(corsConfig);

app.use('/assets', express.static('assets'))
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
