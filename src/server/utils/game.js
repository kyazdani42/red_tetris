const { getRandomPiece } = require('./pieces');

const timeout = (time) => new Promise(resolve => setTimeout(resolve, time));

const generate = () => [...Array(200)].map(() => getRandomPiece());

const counting = async (socket) => {
  socket.emit('updateData', { gameStatus: '3' });
  await timeout(500);
  socket.emit('updateData', { gameStatus: '2' });
  await timeout(500);
  socket.emit('updateData', { gameStatus: '1' });
};

const playersLoop = (players, allPieces) => {
  let maxIndex = 0;
  for (const player of players) {
    if (player.isPlaying) {
      player.updateStack();
      if (player.piece.fixed) {
        maxIndex = maxIndex > player.pieceIndex ? maxIndex : player.pieceIndex;
        player.setNextPiece(allPieces[player.pieceIndex], allPieces[player.pieceIndex + 1]);
      }
      player.tryMoveDown();
    }
  }
  return maxIndex;
};

const playersAddLine = (players) => {
  let nbPlayerPlaying = 0;
  for (const player of players) {
    for (const looserPlayer of players) {
      if (looserPlayer.id !== player.id && looserPlayer.isPlaying) {
        looserPlayer.addLine(player.nbLine);
      }
    }
    player.updateScore();
    if (player.isPlaying) {
      nbPlayerPlaying += 1;
    }
  }
  return checkRunning(players, nbPlayerPlaying);
};

const checkRunning = (players, nbPlayerPlaying) => {
  if (nbPlayerPlaying === 0 || (players.length > 1 && nbPlayerPlaying < 2)) {
    for (const player of players) {
      if (player.isPlaying) {
        player.isPlaying = false;
        player.winner = true;
      }
    }
    return false;
  }
  return true;
};

module.exports = {
  timeout,
  generate,
  counting,
  playersLoop,
  playersAddLine,
};
