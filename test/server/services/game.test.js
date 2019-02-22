const {
  getGames,
  setGame,
  removeGame,
} = require('../../../src/server/services/games');

describe('services/game', () => {
  it('set get and remove a game', () => {
    setGame({name: 'aGame', getPublicInfo: () => 'aName' });
    const { games } = getGames();
    expect(games.length).toEqual(1);
    removeGame('aGame');
    const games2 = getGames();
    expect(games2.games.length).toEqual(0);
  });
});