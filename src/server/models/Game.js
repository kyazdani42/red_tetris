const { initSocket, getIo } = require('../client/socket.io');
const Player = require('./Player');
const { timeout, generate } = require('../utils/game');

class Game {
  constructor(name) {
    this.name = name;
    this.socket = initSocket(this, name);
    this.allPieces = generate(0);
    this.data = {
      owner: null,
      players: [],
      running: false,
    };
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

module.exports = Game;