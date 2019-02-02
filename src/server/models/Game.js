const { getRandomPiece } = require('../utils/pieces');
const { timeout, generate } = require('../utils/game');
const Player = require('./Player');

module.exports = class Game {
  constructor({ name, io }) {
    this.name = name;
    this.allPieces = generate(0);
    this.data = {
      owner: null,
      players: [],
      running: false,
    };
    this.socket = this.initSocket(name, io);
  }

    initSocket(name, io) {
        // io.emit('newRoom', name);
        const { data, game } = this;
        return io
            .of(`/${name}`)
            .on('connection', (socket) => {
                if (data.running) {
                    socket.disconnect();
                }
                // socket.emit('id', socket.id);
                this.addPlayer(socket.id);
                // console.log(socket.id);
                socket.on('disconnect', () => {
                    this.removePlayer(socket.id);
                });
                socket.on('start', () => {
                    io.emit('exitRoom', name);
                    this.start();
                });
                socket.on('updatePlayerName', (playerName) => {
                    this.start();
                });
                socket.on('stop', () => {
                    console.log('stop');
                    this.stop();
                });
                socket.on('update', (data) => {
                    console.log('update');
                    socket.emit('update2', data);
                });
            });
    }

    async run() {
    // await timeout();
    // this.socket.emit('updateData', {gameStatus: '3'});
    // await timeout();
    // this.socket.emit('updateData', {gameStatus: '2'});
    // await timeout();
    // this.socket.emit('updateData', {gameStatus: '1'});
    this.data.players.map((player) => {
      player.setNextPiece(this.allPieces[0]);
    });
    while (this.data.running) {
      await timeout();
      this.data.players.map((player) => {
        player.updateStack();
        if (player.piece.fixed) {
          player.setNextPiece(this.allPieces[player.pieceIndex]);
        }
        player.tryMoveDown();
      });
      this.socket.emit('updateData', { data: this.data });
    }
  };

    start(id) {
        if (id === this.owner && !this.data.running) {
            // map player playing: true
            console.log('start');
            this.data.running = true;
            this.run();
        }
    };

    stop() {
        this.data.running = false;
    };

    getPlayerIndex(id) {
        return this.data.players.findIndex((player) => {
            return player.id === id;
        });
    };

    addPlayer(id) {
        if (!this.data.owner) {
            this.data.owner = id;
        }
        this.data.players.push(new Player(id));
    };

    removePlayer(id) {
        // this.players.splice(playerIndex, 1);
        // if (this.owner === id && this.players !== {}) {
        //     this.owner = this.data.players[0].id;
        //     //rooms[name].socket.emit('updateData', { data: this });
        // }
    };
}
