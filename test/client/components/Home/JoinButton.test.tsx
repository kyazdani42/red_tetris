// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { JoinButton } from '../../../../src/client/components/Home/JoinButton';

describe('testing the component', () => {
  const props = {
    dispatchJoinRoom: () => () => null,
    dispatchSetModal: () => null,
    displayModal: true,
    roomId: 'test-id'
  };
  const wrapper = shallow(<JoinButton {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('checks that join button exists', () => {
    expect(wrapper.find('.name-modal').exists()).toBeTruthy();
  })
  it('checks that join button doesn\'t exists', () => {
    wrapper.setProps({ displayModal: false });
    expect(wrapper.find('.name-modal').exists()).toBeFalsy();
  })
});
