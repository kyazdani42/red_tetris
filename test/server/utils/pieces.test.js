const { generate, timeout } = require('../../../src/server/utils/pieces');

describe('utils/pieces', () => {
  it('generate an array of pieces data', () => {
    const newArray = generate();
    expect(newArray.length).toBe(200);
    expect(typeof newArray[0].color).toBe('string');
    expect(typeof newArray[0].patterns).toBe('object');
  });
});
