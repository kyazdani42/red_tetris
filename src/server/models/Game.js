const {
  timeout,
  generate,
  playersLoop,
  playersAddLine,
  saveData,
} = require('../utils/game');
const Player = require('./Player');
const { removeGame, getGames } = require('../services/games');

module.exports = class Game {
  constructor({ name, io }) {
    this.io = io;
    this.name = name;
    this.allPieces = [];
    this.owner = undefined;
    this.ownerName = undefined;
    this.players = [];
    this.running = false;
    this.socket = this.initSocket(name, io);
    this.timer = 500;
    this.options = {
      reverse: false,
      mirror: false,
      invisible: false,
      speed: true,
    };
  }

  initSocket(name, io) {
    const game = this;
    return io.of(`/${name}`).on('connection', (socket) => {
      if (!game.running && game.players.length < 80) {
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
        socket.on('playerName', (playerName) => {
          game.updatePlayerName(socket.id, playerName);
        });
      }
    });
  }

  getPublicInfo() {
    return {
      name: this.name,
      running: this.running,
      players: this.players.length,
      ownerName: this.ownerName,
    };
  }

  getSpectres(player) {
    const otherPlayers = [];
    for (const otherPlayer of this.players) {
      if (otherPlayer.id !== player.id) {
        otherPlayers.push({ name: otherPlayer.name, spectre: otherPlayer.spectre || [] });
      }
    }
    return otherPlayers;
  }

  privateInfo(player) {
    const otherPlayers = this.getSpectres(player);
    return {
      name: this.name,
      playerName: player.name,
      running: this.running,
      isOwner: player.id === this.owner,
      stack: !this.running ? player.stack : player.tmpStack(this.options),
      isPlaying: player.isPlaying,
      nextPiece: player.nextPiece,
      winner: player.winner,
      otherPlayers,
      score: player.score,
    };
  }

  updateGame() {
    for (const player of this.players) {
      player.socket.emit('updateGame', this.privateInfo(player));
    }
  }

  async run() {
    while (this.running) {
      await timeout(this.timer);
      const maxIndex = playersLoop(this.players, this.allPieces, this.addPiecesData);
      this.addPiecesData(maxIndex);
      this.running = playersAddLine(this.players);
      this.updateGame();
    }
    saveData(this.players);
    this.io.emit('games', getGames());
  }

  setOptions(options) {
    if (options) {
      this.options.reverse = options.reverse;
      this.options.mirror = options.mirror;
      this.options.invisible = options.invisible;
      this.options.speed = !options.speed;
    }
  }

  initPlayers() {
    for (const player of this.players) {
      player.initPlayer(this.allPieces[0], this.allPieces[1]);
    }
  }

  updateTimer() {
    if (this.timer > 15) {
      this.timer -= 5;
      console.log(this.timer);
    }
  }

  reduceTimer() {
    this.timer = 500;
    if (this.options.speed && this.players.length === 1) {
      return setInterval(this.updateTimer.bind(this), 20000);
    }
  }

  async start(id, options) {
    if (id === this.owner && !this.running) {
      this.setOptions(options);
      this.allPieces = generate();
      this.initPlayers();
      console.log('start');
      this.running = true;
      const reduceTimer = this.reduceTimer();
      this.io.emit('games', getGames());
      await this.run();
      clearInterval(reduceTimer);
    }
  }

  addPlayer(socket) {
    if (!this.owner) {
      this.owner = socket.id;
      this.ownerName = socket.handshake.query.playerName;
    }
    const player = new Player(socket);
    this.players.push(player);
    this.io.emit('games', getGames());
    this.updateGame();
  }

  addPiecesData(maxIndex) {
    if (maxIndex > this.allPieces.length - 5) {
      const newPieceData = generate();
      this.allPieces.push(...newPieceData);
    }
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

  updatePlayerName(id, playerName) {
    const player = this.players.find(d => d.id === id);
    player.name = playerName;
  }

  removePlayer(id) {
    this.players = this.players.filter(d => d.id !== id);
    if (!this.players.length) {
      removeGame(this.name);
    } else if (this.owner === id) {
      this.owner = this.players[0].id;
      this.ownerName = this.players[0].name;
    }
    this.io.emit('games', getGames());
    this.updateGame();
  }
};
