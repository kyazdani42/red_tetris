const fs = require('fs');

const { getRandomPiece } = require('./pieces');
const { getStats } = require('./common');

const defaultStat = name => ({
  bestScore: 0,
  gamesPlay: 0,
  multiPlayersWin: 0,
  name,
});

const timeout = (time) => new Promise(resolve => setTimeout(resolve, time));

const generate = () => [...Array(200)].map(() => getRandomPiece());

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

const saveData = (players) => {
  const stats = getStats();
  for (const player of players) {
    const playerStat = stats[player.token] || defaultStat(player.name);
    if (player.winner) {
      playerStat.multiPlayersWin += 1;
    }
    playerStat.gamesPlay += 1;
    playerStat.bestScore = Math.max(playerStat.bestScore, player.score);
    stats[player.token] = playerStat;
    player.socket.emit('playerScore', playerStat);
  }
  fs.writeFile(`${__dirname}/../stats/stats.json`, JSON.stringify(stats), 'utf8', (err) => {
    if (err) throw err;
  });
};

module.exports = {
  timeout,
  generate,
  playersLoop,
  playersAddLine,
  saveData,
};
