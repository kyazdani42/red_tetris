const { timeout, generate } = require('../utils/game');
const Player = require('./Player');
const { removeGame, getGames } = require('../services/games');

module.exports = class Game {
  constructor({ name, io }) {
    this.io = io;
    this.name = name;
    this.allPieces = generate();
    this.owner = undefined;
    this.players = [];
    this.running = false;
    this.socket = this.initSocket(name, io);
  }

  initSocket(name, io) {
    const game = this;
    return io.of(`/${name}`).on('connection', (socket) => {
      if (game.running) {
        socket.leave(name);
      }
      game.addPlayer(socket);
      socket.on('disconnect', () => {
        game.removePlayer(socket.id);
      });
      socket.on('leaveRoom', () => {
        game.removePlayer(socket.id);
        socket.leave(name);
      });
      socket.on('rotate', () => {
        game.actions(socket.id, 'rotate');
      });
      socket.on('moveDown', () => {
        game.actions(socket.id, 'moveDown');
      });
      socket.on('moveLeft', () => {
        game.actions(socket.id, 'moveLeft');
      });
      socket.on('moveRight', () => {
        game.actions(socket.id, 'moveRight');
      });
      socket.on('goDown', () => {
        game.actions(socket.id, 'goDown');
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
      players: this.players.length,
      owner: this.owner,
    };
  }

  privateInfo(player) {
    const spectres = [];
    for (const otherPlayer of this.players) {
      if (otherPlayer.id !== player.id && otherPlayer.spectre !== null) {
        spectres.push(otherPlayer.spectre);
      }
    };
    return {
      name: this.name,
      running: this.running,
      isOwner: player.id === this.owner,
      stack: player.tmpStack(),
      isPlaying: player.isPlaying,
      nextPiece: player.nextPiece,
      spectres,
    };
  }

  updateGame() {
    for (const player of this.players) {
      player.socket.emit('updateGame', this.privateInfo(player));
      console.log('updateGame');
    }
  }

  async run() {
    // await timeout();
    // this.socket.emit('updateData', {gameStatus: '3'});
    // await timeout();
    // this.socket.emit('updateData', {gameStatus: '2'});
    // await timeout();
    // this.socket.emit('updateData', {gameStatus: '1'});
    for (const player of this.players) {
      player.setNextPiece(this.allPieces[0], this.allPieces[1]);
      player.isPlaying = true;
    }
    while (this.running) {
      await timeout();
      for (const player of this.players) {
        if (player.isPlaying) {
          player.updateStack();
          if (player.piece.fixed) {
            if (player.pieceIndex >= this.allPieces.length - 2) {
              const newPieces = generate();
              this.allPieces = this.allPieces.concat(newPieces);
            }
            player.setNextPiece(this.allPieces[player.pieceIndex], this.allPieces[player.pieceIndex + 1]);
          }
          player.tryMoveDown();
        }
      }
      for (const player of this.players) {
        for (const looserPlayer of this.players) {
          if (looserPlayer.id !== player.id && looserPlayer.isPlaying) {
            looserPlayer.addLine(player.nbLine);
            player.nbLine = 0;
          }
        }
      }
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

  actions(id, action) {
    const player = this.players.find(d => d.id === id);
    if (player && !player.isPlaying) { return; }
    switch (action) {
      case 'moveDown':
        player.tryMoveDown();
        break;
      case 'rotate':
        player.tryRotate();
        break;
      case 'moveRight':
        player.tryMoveRight();
        break;
      case 'moveLeft':
        player.tryMoveLeft();
        break;
      case 'goDown':
        player.tryGoDown();
        break;
    }
    this.updateGame();
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
