let games = [];

const getGames = () => ({ games: games.map(d => d.getPublicInfo()) });

const setGame = (game) => {
  games = games.concat(game);
};

const removeGame = (name) => {
  games = games.filter(d => d.name !== name);
};

module.exports = {
  getGames,
  setGame,
  removeGame,
};
