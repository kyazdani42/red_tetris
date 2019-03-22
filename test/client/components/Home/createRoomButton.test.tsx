// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { CreateRoomButton } from '../../../../src/client/components/Home/CreateRoom';

describe('testing the component', () => {
  const props = {
    dispatchCreateRoom: () => null,
    dispatchSetModal: () => null,
    displayModal: true,
  };
  const wrapper = shallow(<CreateRoomButton {...props} />);
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
