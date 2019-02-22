const {
  checkPosition,
  fusionPieceAndStack,
  initStack,
  updateFullLine,
  addFixLine,
  getSpectre,
  getMirrorStack,
  calculNewScore,
} = require('../../../src/server/utils/player');

describe('utils/player', () => {
  it('init stack', () => {
    const stack = initStack();
    expect(typeof stack).toBe('object');
    expect(stack.length).toBe(20);
    expect(stack[0].length).toBe(10);
  });
  it('add fix line', () => {
    const stack = initStack();
    const fixLine = addFixLine(stack);
    expect(fixLine).toBe(true);
  });
  it('add 20 fix line', () => {
    const stack = initStack();
    for (let i = 0; i < 20; i++) {
      addFixLine(stack);
    }
    const fixLine = addFixLine(stack);
    expect(fixLine).toBe(false);
  });
  it('get spectre', () => {
    const stack = initStack();
    addFixLine(stack);
    const spectre = getSpectre(stack);
    expect(spectre).toEqual([19,19,19,19,19,19,19,19,19,19]);
  });
  it('calcul Score', () => {
    const score = calculNewScore(4);
    expect(score).toBe(120);
  });
});
