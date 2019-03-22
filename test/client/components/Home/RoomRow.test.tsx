// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { RoomRow } from '../../../../src/client/components/Home/RoomRow';

describe('testing the component', () => {
  const props = {
    running: false,
    name: 'test',
    players: 1,
    ownerName: 'testOwner'
  };
  const wrapper = shallow(<RoomRow {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('checks that join button exists', () => {
    expect(wrapper.find('.join-button').exists()).toBeTruthy();
  })
  it('checks that join button doesn\'t exists', () => {
    wrapper.setProps({ running: true });
    expect(wrapper.find('.join-button').exists()).toBeFalsy();
  })
});

