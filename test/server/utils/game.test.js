const { generate, timeout } = require('../../../src/server/utils/game');

test('game generate', () => {
  const newArray = generate();
  expect(newArray.length).toBe(200);
  expect(typeof newArray[0].color).toBe('string');
  expect(typeof newArray[0].patterns).toBe('object');
});
