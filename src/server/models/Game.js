const { getRandomPiece } = require('../utils/pieces');
const { timeout, generate } = require('../utils/game');
const Player = require('./Player');
const { removeGame, getGames } = require('../services/games');

module.exports = class Game {
  constructor({ name, io }) {
    this.io = io;
    this.name = name;
    this.allPieces = generate(0);
    this.owner = undefined;
    this.players = [];
    this.running = false;
    this.socket = this.initSocket(name, io);
  }

  initSocket(name, io) {
    const game = this;
    return io.of(`/${name}`).on('connection', socket => {
      if (game.running) {
        socket.disconnect();
      }
      game.addPlayer(socket);
      socket.on('disconnect', () => {
        game.removePlayer(socket.id);
      });
      socket.on('rotate', () => {
        console.log('rotate');
      });
      socket.on('moveDown', () => {
        console.log('moveDown');
      });
      socket.on('moveLeft', () => {
        console.log('moveLeft');
      });
      socket.on('moveRight', () => {
        console.log('moveRight');
      });
      socket.on('goDown', () => {
        console.log('goDown');
      });
      socket.on('start', () => {
        game.start(socket.id);
      });
      socket.on('stop', () => {
        console.log('stop');
        game.stop();
      });
    });
  }

  getPublicInfo() {
    return {
      name: this.name,
      running: this.running,
    };
  }

  privateInfo(player) {
    return {
      name: this.name,
      running: this.running,
      isOwner: player.id === this.owner,
      stack: player.tmpStack(),
    }
  }

  updateGame() {
    this.players.forEach((player) => {
      player.socket.emit('updateGame', this.privateInfo(player));
      console.log(player.stack)
    });
  }

  async run() {
    // await timeout();
    // this.socket.emit('updateData', {gameStatus: '3'});
    // await timeout();
    // this.socket.emit('updateData', {gameStatus: '2'});
    // await timeout();
    // this.socket.emit('updateData', {gameStatus: '1'});
    this.players.map(player => {
      player.setNextPiece(this.allPieces[0]);
    });
    while (this.running) {
      await timeout();
      this.players.map(player => {
        player.updateStack();
        if (player.piece.fixed) {
          player.setNextPiece(this.allPieces[player.pieceIndex]);
        }
        player.tryMoveDown();
      });
      this.updateGame();
    }
  }

  start(id) {
    if (id === this.owner && !this.running) {
      // map player playing: true
      console.log('start');
      this.running = true;
      this.run();
    }
  }

  stop() {
    this.running = false;
  }

  addPlayer(socket) {
    if (!this.owner) {
      this.owner = socket.id;
    }
    this.players.push(new Player(socket));
    this.io.emit('games', getGames());
  }

  removePlayer(id) {
    this.players = this.players.filter(d => d.id !== id);
    if (this.owner === id && this.players.length) {
      this.owner = this.players[0].id;
    } else {
      removeGame(this.name);
    }
    this.io.emit('games', getGames());
  }
};
