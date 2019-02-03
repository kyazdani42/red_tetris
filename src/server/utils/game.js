const { getRandomPiece } = require('./pieces');

const timeout = () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};

// ---------------------------------------
// oublie pas que dans js tout est objet, tout objet a un constructeur
// d'ailleurs length sert a quoi ? tu l'utilise que dans game et tu fais generate(0)
const generateOpti = () => Array(200).map(_ => getRandomPiece());

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