// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';
import { NextBlock, Block, changeBlockColor } from '../../../../../src/client/components/Game/Display/Block';

const props = { color: 'testColor' };

describe('testing nextBlock', () => {
  it('smoke tests the component', () => {
    expect(shallow(NextBlock('testColor', 'testkey')).update()).toMatchSnapshot();
  })
})

describe('testing block', () => {
  it('smoke tests the component', () => {
    expect(shallow(Block('testColor', 'testKey')).update()).toMatchSnapshot();
  })
})

describe('testing changeBlockColor', () => {
  it('switches the skyBlue', () => {
    expect(changeBlockColor('skyBlue')).toEqual('#adf0ff');
  })
  it('switches the blue', () => {
    expect(changeBlockColor('blue')).toEqual('#7427CC');
  })
  it('switches the orange', () => {
    expect(changeBlockColor('orange')).toEqual('#EF6A00');
  })
  it('switches the yellow', () => {
    expect(changeBlockColor('yellow')).toEqual('#FFC851');
  })
  it('switches the green', () => {
    expect(changeBlockColor('green')).toEqual('#EFA300');
  })
  it('switches the purple', () => {
    expect(changeBlockColor('purple')).toEqual('#650000');
  })
  it('switches the red', () => {
    expect(changeBlockColor('red')).toEqual('#B11515');
  })
  it('returns the default', () => {
    expect(changeBlockColor('black')).toEqual('black');
  })
})