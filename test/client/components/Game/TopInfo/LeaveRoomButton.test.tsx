// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';
import { LeaveRoomButton, mapDispatchToProps } from '../../../../../src/client/components/Game/TopInfo/LeaveRoomButton';

describe('testing the component', () => {
  const props = {
    dispatchLeaveRoom: jest.fn()
  };
  const wrapper = shallow(<LeaveRoomButton {...props} />)
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  })
  it('tests the onclick event', () => {
    wrapper.simulate('click');
    expect(props.dispatchLeaveRoom).toHaveBeenCalled();
  })
});

describe('testing mapDispatchToProps', () => {
  const dispatch = jest.fn();
  it('checks that dispatch is called', () => {
    mapDispatchToProps(dispatch).dispatchLeaveRoom();
    expect(dispatch).toHaveBeenCalled();
  })
})
