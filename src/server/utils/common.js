const fs = require('fs');

const getStats = () => {
  return JSON.parse(fs.readFileSync(`${__dirname}/../stats/stats.json`, 'utf8'));
};

const getBestScore = (stats) => Object.values(stats).sort((a, b) => a.bestScore - b.bestScore);

module.exports = {
  getStats,
  getBestScore,
};