const { timeout, generate } = require('../utils/game');
const Player = require('./Player');
const { removeGame, getGames } = require('../services/games');

module.exports = class Game {
  constructor({ name, io }) {
    this.io = io;
    this.name = name;
    this.allPieces = [];
    this.owner = undefined;
    this.players = [];
    this.running = false;
    this.socket = this.initSocket(name, io);
    this.options = {
      reverse: false,
      mirror: false,
      invisible: false,
    }
  }

  initSocket(name, io) {
    const game = this;
    return io.of(`/${name}`).on('connection', (socket) => {
      if (!game.running) {
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
        socket.on('start', (options) => {
          game.start(socket.id, options);
        });
      }
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
    }
    return {
      name: this.name,
      running: this.running,
      isOwner: player.id === this.owner,
      stack: this.options.invisible ? player.stack : player.tmpStack(this.options.mirror),
      isPlaying: player.isPlaying,
      nextPiece: player.nextPiece,
      winner: player.winner,
      spectres,
      score: player.score,
    };
  }

  updateGame() {
    for (const player of this.players) {
      player.socket.emit('updateGame', this.privateInfo(player));
    }
  }

  async run() {
    // await timeout();
    // this.socket.emit('updateData', {gameStatus: '3'});
    // await timeout();
    // this.socket.emit('updateData', {gameStatus: '2'});
    // await timeout();
    // this.socket.emit('updateData', {gameStatus: '1'});
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
      let nbPlayerPlaying = 0;
      for (const player of this.players) {
        for (const looserPlayer of this.players) {
          if (looserPlayer.id !== player.id && looserPlayer.isPlaying) {
            looserPlayer.addLine(player.nbLine);
          }
        }
        player.updateScore();
        if (player.isPlaying) {
          nbPlayerPlaying += 1;
        }
      }
      if (nbPlayerPlaying === 0 || (this.players.length > 1 && nbPlayerPlaying < 2)) {
        this.running = false;
        for (const player of this.players) {
          if (player.isPlaying) {
            player.isPlaying = false;
            player.winner = true;
          }
        }
      }
      this.updateGame();
    }
  }

  setOptions(options) {
    if (options) {
      this.options.reverse = options.reverse;
      this.options.mirror = options.mirror;
      this.options.invisible = options.invisible;
    }
  }

  start(id, options) {
    if (id === this.owner && !this.running) {
      this.setOptions(options);
      this.allPieces = generate();
      for (const player of this.players) {
        player.initPlayer(this.allPieces[0], this.allPieces[1]);
      }
      console.log('start');
      this.running = true;
      this.run();
    }
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
    if (!player || !player.isPlaying) { return; }
    switch (action) {
      case 'moveDown':
        this.options.reverse ? player.tryRotate() : player.tryMoveDown();
        break;
      case 'rotate':
        this.options.reverse ? player.tryGoDown() : player.tryRotate();
        break;
      case 'moveRight':
        this.options.reverse ? player.tryMoveLeft() : player.tryMoveRight();
        break;
      case 'moveLeft':
        this.options.reverse ? player.tryMoveRight() : player.tryMoveLeft();
        break;
      case 'goDown':
        this.options.reverse ? player.tryMoveDown() : player.tryGoDown();
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
