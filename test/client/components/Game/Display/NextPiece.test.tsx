// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { NextPiece, getBlocksFromPiece } from '../../../../../src/client/components/Game/Display/NextPiece';

const getPiece = (color: string) => ({
  color,
  patterns: [
    [
      [1,1,0],[1,1,0],
    ],
  ],
});

describe('testing NextPiece component', () => {
  const wrapper = shallow(<NextPiece nextPiece={getPiece('blue')} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  })
})

describe('testing getBlocksFromPiece', () => {
  it('returns null if nextpiece is null', () => {
    expect(getBlocksFromPiece(null)).toBe(null);
  })
})