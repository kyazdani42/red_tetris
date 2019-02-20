const {
  generate,
  playersLoop,
  playersAddLine,
} = require('../../../src/server/utils/game');

const { getTwoPlayers } = require('./utils');

describe('utils/game', () => {
  it('generate an array of pieces data', () => {
    const newArray = generate();
    expect(newArray.length).toBe(200);
    expect(typeof newArray[0].color).toBe('string');
    expect(typeof newArray[0].patterns).toBe('object');
  });
  it('loop over players', () => {
    const players = new Player('aSocket');
    expect(newArray.length).toBe(200);
    expect(typeof newArray[0].color).toBe('string');
    expect(typeof newArray[0].patterns).toBe('object');
  });
  it('add line for looserPlayers', () => {
    const newArray = generate();
    expect(newArray.length).toBe(200);
    expect(typeof newArray[0].color).toBe('string');
    expect(typeof newArray[0].patterns).toBe('object');
  });
  it('add line for looserPlayers', () => {
    const newArray = generate();
    expect(newArray.length).toBe(200);
    expect(typeof newArray[0].color).toBe('string');
    expect(typeof newArray[0].patterns).toBe('object');
  });
});
