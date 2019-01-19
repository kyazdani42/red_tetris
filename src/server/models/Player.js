
class Player {
    this.id = id;
    this.actualPieceIndex = 0;
}

Player.prototype.nextPiece = () => {
    this.actualPieceIndex++;
};

module.exports = Player;