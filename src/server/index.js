const bodyParser = require('body-parser');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const uniqId = require('uniqid');
const { getGames, setGame } = require('./services/games');
const Game = require('./models/Game');

const corsConfig = require('./middlewares/cors');

app.disable('x-powered-by');
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
app.use(bodyParser.json({ limit: '15mb' }));
app.use(corsConfig);

io.on('connection', socket =>
  socket.emit('games', getGames())
);

setGame(new Game({ io, name: '123' }), '123');

app.post('/createRoom', async (_, res) => {
    const name = uniqId();
    const game = new Game({ io, name });
    setGame(game, name);
    res.json({ gameName: name });
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
