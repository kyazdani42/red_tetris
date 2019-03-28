// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { Result } from '../../../../../src/client/components/Game/Display/Result';

const props = { winner: true };

describe('testing Result', () => {
  const wrapper = shallow(<Result {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('checks the winner true impact on text', () => {
    expect(wrapper.text().includes('You Win!')).toBeTruthy();
  })
  it('checks the winner false impact on text', () => {
    wrapper.setProps({ winner: false })
    expect(wrapper.text().includes('Game Over!')).toBeTruthy();
  })
}); 
