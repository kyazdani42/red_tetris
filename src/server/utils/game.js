const { getRandomPiece } = require('./pieces');

const timeout = () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};

const generate = (length) => {
  const allPieces = [];
  for (let i = length; i < length + 200; i++) {
    allPieces[i] = getRandomPiece();
  }
  return allPieces;
};


module.exports = {
  timeout,
  generate,
};