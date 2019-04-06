// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { PlayerScore, mapStateToProps } from '../../../../src/client/components/Home/PlayerScore';

describe('testing the component', () => {
  const props = {
    playerScore: {
      name: 'test',
      bestScore: 1,
      gamesPlay: 1,
      multiPlayersWin: 1
    }
  };
  const wrapper = shallow(<PlayerScore {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('check that component returns null when playerScore is null', () => {
    wrapper.setProps({ playerScore: null });
    expect(wrapper.exists('div')).toBeFalsy();
  })
});

describe('testing mapStateToProps', () => {
  const state: any = { app: { playerScore: 'playerScore' } };
  it('test the mapping', () => {
    const expected = { playerScore: 'playerScore' };
    expect(mapStateToProps(state)).toEqual(expected);
  })
})
