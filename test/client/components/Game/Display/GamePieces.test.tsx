// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { GamePieces, getDivsFromStack } from '../../../../../src/client/components/Game/Display/GamePieces';

const stackCase = { color: 'black', value: 0, fix: false };
const stack: any = [...Array(20)].map(_ => [...Array(10)].map(_ => stackCase));

describe('testing GamePieces', () => {
  it('smoke tests the component', () => {
    const wrapper = shallow(<GamePieces stack={stack}/>)
    expect(wrapper.update()).toMatchSnapshot();
  })
})

describe('testing getDivsFromStack', () => {
  const divs = getDivsFromStack(stack);
  it('checks that there are 200 elements' ,() => {
    expect(divs.length).toBe(200);
  })
})