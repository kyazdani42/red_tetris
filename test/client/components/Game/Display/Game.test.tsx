// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { mapStateToProps, Game } from '../../../../../src/client/components/Game/Display/Game';

const props: any = {
  gameData: {
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
  },
  socket: null
};

describe('testing the component', () => {
  it('smoke tests the component', () => {
    const wrapper = shallow(<Game {...props} />)
    expect(wrapper.update()).toMatchSnapshot();
  }) 
})

describe('testing mapStateToProps', () => {
  const state: any = {
    app: {
      gameData: 'gameData',
      socket: 'socket'
    }
  }
  it('test the mapping', () => {
    const expected = { gameData: 'gameData', socket: 'socket' };
    expect(mapStateToProps(state)).toEqual(expected);
  })
})
