const {
  generate,
  playersLoop,
  playersAddLine,
  timeout,
  counting,
} = require('../../../src/server/utils/game');

const { getTwoPlayers } = require('../utils');

describe('utils/game', () => {
  it('generate an array of pieces data', () => {
    const newArray = generate();
    expect(newArray.length).toBe(200);
    expect(typeof newArray[0].color).toBe('string');
    expect(typeof newArray[0].patterns).toBe('object');
  });
  it('loop over players with no player playing', () => {
    const players = getTwoPlayers();
    players[0].isPlaying = false;
    players[1].isPlaying = false;
    const newArray = generate();
    const maxIndex = playersLoop(players, newArray);
    expect(maxIndex).toBe(0);
  });
  it('loop over players', () => {
    const players = getTwoPlayers();
    const newArray = generate();
    const maxIndex = playersLoop(players, newArray);
    expect(maxIndex).toBe(0);
  });
  it('loop over players with piece fixed', () => {
    const players = getTwoPlayers();
    players[0].piece.fixed = true;
    players[0].pieceIndex = 198;
    const newArray = generate();
    const maxIndex = playersLoop(players, newArray);
    expect(maxIndex).toBe(198);
  });
  it('add line for looserPlayers', () => {
    const players = getTwoPlayers();
    const addLine = playersAddLine(players);
    expect(addLine).toBe(true);
  });
  it('add line for looserPlayers', () => {
    const players = getTwoPlayers();
    players[0].isPlaying = false;
    players[1].isPlaying = false;
    const addLine = playersAddLine(players);
    expect(addLine).toBe(false);
  });
  it('add line for 0 player', () => {
    const players = getTwoPlayers();
    players[1].isPlaying = false;
    const addLine = playersAddLine(players);
    expect(addLine).toBe(false);
  });
  it('wait 0.1s', async () => {
    await timeout();
    expect(true).toBe(true);
  });
  it('wait starting', async () => {
    await counting({ emit: () => true });
    expect(true).toBe(true);
  });
});
