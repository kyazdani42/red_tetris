const bodyParser = require('body-parser');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const uniqId = require('uniqid');
const { getGames, setGame } = require('./services/games');
const Game = require('./models/Game');
const corsConfig = require('./middlewares/cors');

io.on('connection', socket => {
  socket.emit('games', getGames());
  socket.on('createRoom', (playerName) => {
    const gameName = uniqId();
    const game = new Game({ io, name: gameName });
    setGame(game, gameName);
    socket.emit('gameName', { gameName, playerName });
  })
});

app.disable('x-powered-by');
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
app.use(bodyParser.json({ limit: '15mb' }));
app.use(corsConfig);

// application listener
const port = app.get('port');
server.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server started');
  }
});
