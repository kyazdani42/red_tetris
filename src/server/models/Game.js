const { initSocket } = require('../client/socket.io');
const Player = require('./Player');

timeout = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};

class Game {

    socket;
    allPieces = [];
    data = {
        owner: null,
        players: [],
        running: false,
    };


    constructor(name) {
        socket = initSocket(name);
    }

    async run() {
        await timeout();
        this.socket.emit('updateData', {gameStatus: '3'});
        await timeout();
        this.socket.emit('updateData', {gameStatus: '2'});
        await timeout();
        this.socket.emit('updateData', {gameStatus: '1'});
        while (this.data.running) {
            await timeout();
            await this.data.players.map((player) => {
                player.updateGrid()
            });
            this.socket.emit('updateData', { data: this.data });
        }
    };

    generate() {
        this.allPices = [];
    }

    start(id) {
        if (id === this.owner) {
            // map player playing: true
            console.log('start');
            this.data.running = true;
            run(name);
        }
    };

    stop = () => {
        this.data.running = false;
    };

    getPlayerIndex = (id) => {
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
        this.players.splice(playerIndex, 1);
        if (this.owner === id && this.players !== {}) {
            this.owner = this.players[0].id;
            rooms[name].socket.emit('updateData', { data: this });
        }
    };
}

module.exports = Game;