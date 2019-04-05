// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { ScoreDisplay, mapStateToProps, mapDispatchToProps } from '../../../../src/client/components/Home/ScoreDisplay';
import { setScores } from '../../../../src/client/redux/actions';

describe('testing the component', () => {
  const props = {
    scores: [
      { bestScore: 10, name: 'testplayer', gamesPlay: 1, multiPlayersWin: 1 }
    ],
    resetScores: jest.fn()
  };
  const wrapper = shallow(<ScoreDisplay {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('simulate the click but doesnt call the function', () => {
    const mockedEvent = { target: { classList: { contains(s: string) { return this.elements.includes(s) }, elements: ['not-modal'] } } };
    wrapper.simulate('click', mockedEvent);
    expect(props.resetScores).not.toHaveBeenCalled();
  });
  it('simulate the click and calls the function', () => {
    const mockedEvent = { target: { classList: { contains(s: string) { return this.elements.includes(s) }, elements: ['modal'] } } };
    wrapper.simulate('click', mockedEvent);
    expect(props.resetScores).toHaveBeenCalled();
  });
  it('return null when there are no scores', () => {
    wrapper.setProps({ scores: null, resetScore: null });
    expect(wrapper.exists('div')).toBeFalsy();
  })
});

describe('testing mapStateToProps', () => {
  const state: any = { app: { scores: 'scores' } };
  it('test the mapping', () => {
    const expected = { scores: 'scores' };
    expect(mapStateToProps(state)).toEqual(expected);
  })
})

describe('testing mapDispatchToProps', () => {
  const dispatch = jest.fn();
  const mapper = mapDispatchToProps(dispatch);
  it('checks the keys', () => {
    expect(Object.keys(mapper)).toEqual(['resetScores']);
  })
  it('checks the dispatch functions', () => {
    mapper.resetScores();
    expect(dispatch).toHaveBeenCalledWith(setScores(null));
  })
})