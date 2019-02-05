const { getRandomPiece } = require('./pieces');

const timeout = () => {
  return new Promise(resolve => setTimeout(resolve, 500));
};

const generate = () => [...Array(200)].map(() => getRandomPiece());

module.exports = {
  timeout,
  generate,
};