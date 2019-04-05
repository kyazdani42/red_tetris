// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { Spectres, mapStateToProps } from '../../../../../src/client/components/Game/TopInfo/Spectres';

const props: any = {
  data: {
    name: '',
    running: true,
    isOwner: true,
    winner: true,
    isPlaying: true,
    score: 0,
    stack: [[{
      color: '',
      value: 0,
      fix: true,
    }]],
    nextPiece: {
      color: '',
      patterns: [
        [
          [0]
        ],
      ],
    },
    otherPlayers: [{
      name: '',
      spectre: [0],
    }],
  }
};

describe('testing the component', () => {
  it('smoke tests the component', () => {
    const wrapper = shallow(<Spectres {...props} />)
    expect(wrapper.update()).toMatchSnapshot();
  })
});

describe('testing mapStateToProps', () => {
  const state: any = { app: { gameData: 'test' } };
  it('tests the mapping', () => {
    expect(mapStateToProps(state)).toEqual({ data: 'test' })
  })
})