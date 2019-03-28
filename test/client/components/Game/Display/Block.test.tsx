// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';
import { NextBlock, Block } from '../../../../../src/client/components/Game/Display/Block';

const props = { color: 'testColor' };

describe('testing nextBlock', () => {
  it('smoke tests the component', () => {
    expect(shallow(<NextBlock {...props} />).update()).toMatchSnapshot();
  })
})

describe('testing block', () => {
  it('smoke tests the component', () => {
    expect(shallow(<Block {...props} />).update()).toMatchSnapshot();
  })
})