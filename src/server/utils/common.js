const fs = require('fs');

const getStats = () => {
  return JSON.parse(fs.readFileSync(`${__dirname}/../stats/stats.json`, 'utf8'));
};

module.exports = {
  getStats,
};