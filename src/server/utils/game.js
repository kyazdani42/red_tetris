const { getRandomPiece } = require('./pieces');

const timeout = () => new Promise(resolve => setTimeout(resolve, 500));

const generate = () => [...Array(200)].map(() => getRandomPiece());

module.exports = {
  timeout,
  generate,
};
